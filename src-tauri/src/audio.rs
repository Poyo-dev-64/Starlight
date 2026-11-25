use serde::Serialize;
use std::f32::consts::TAU;
use std::ptr;
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter};
use windows::Win32::Media::Audio::{
    eConsole, eRender, IAudioCaptureClient, IAudioClient, IMMDeviceEnumerator, MMDeviceEnumerator,
    AUDCLNT_BUFFERFLAGS_SILENT, AUDCLNT_SHAREMODE_SHARED, AUDCLNT_STREAMFLAGS_LOOPBACK,
    WAVEFORMATEX,
};
use windows::Win32::System::Com::{
    CoCreateInstance, CoInitializeEx, CoTaskMemFree, CLSCTX_ALL, COINIT_MULTITHREADED,
};

#[derive(Clone, Copy, Debug, Default, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AudioLevels {
    pub bass: f32,
    pub mid: f32,
    pub treble: f32,
    pub rms: f32,
    pub beat: f32,
    pub kick: f32,
    pub instrumental: f32,
}

struct CoTaskMemGuard(*mut WAVEFORMATEX);
impl Drop for CoTaskMemGuard {
    fn drop(&mut self) {
        if !self.0.is_null() {
            unsafe { CoTaskMemFree(Some(self.0.cast())) };
        }
    }
}

pub fn start_wasapi_thread(app: AppHandle) {
    std::thread::spawn(move || {
        unsafe {
            let _ = CoInitializeEx(None, COINIT_MULTITHREADED);
        }

        loop {
            match run_capture_loop(&app) {
                Ok(()) => break,
                Err(err) => {
                    eprintln!("[starlight] wasapi loopback reconnecting: {err:?}");
                    std::thread::sleep(Duration::from_millis(1000));
                }
            }
        }
    });
}

struct DspAlphas {
    lp_sub: f32,
    lp_bass: f32,
    lp_mid: f32,
    lp_air: f32,
}

impl DspAlphas {
    fn new(sample_rate: f32) -> Self {
        Self {
            lp_sub: 1.0 - (-TAU * 110.0 / sample_rate).exp(),
            lp_bass: 1.0 - (-TAU * 180.0 / sample_rate).exp(),
            lp_mid: 1.0 - (-TAU * 2200.0 / sample_rate).exp(),
            lp_air: 1.0 - (-TAU * 3800.0 / sample_rate).exp(),
        }
    }
}

#[derive(Default)]
struct DspFilterState {
    lp_sub_1: f32,
    lp_sub_2: f32,
    lp_bass: f32,
    lp_mid: f32,
    lp_air_1: f32,
    lp_air_2: f32,
    lp_side_low: f32,
}

#[derive(Default)]
struct BlockAccum {
    sub: f32,
    bass: f32,
    mid: f32,
    treble: f32,
    side_inst: f32,
    air: f32,
    sq: f32,
}

#[inline(always)]
fn accumulate_mono_side_sample(
    mono: f32,
    side: f32,
    alphas: &DspAlphas,
    st: &mut DspFilterState,
    acc: &mut BlockAccum,
) {
    st.lp_sub_1 += alphas.lp_sub * (mono - st.lp_sub_1);
    st.lp_sub_2 += alphas.lp_sub * (st.lp_sub_1 - st.lp_sub_2);
    st.lp_bass += alphas.lp_bass * (mono - st.lp_bass);
    st.lp_mid += alphas.lp_mid * (mono - st.lp_mid);

    // 2-pole HP (> 3800 Hz) keeps upper shimmer while strongly rejecting center-panned vocals
    st.lp_air_1 += alphas.lp_air * (mono - st.lp_air_1);
    let hp_air_1 = mono - st.lp_air_1;
    st.lp_air_2 += alphas.lp_air * (hp_air_1 - st.lp_air_2);
    let air = hp_air_1 - st.lp_air_2;

    // Stereo Side > 180 Hz cancels center-panned dry lead vocals while keeping panned/wide instruments
    st.lp_side_low += alphas.lp_bass * (side - st.lp_side_low);
    let side_hp = side - st.lp_side_low;

    let mid = st.lp_mid - st.lp_bass;
    let treble = mono - st.lp_mid;

    acc.sub += st.lp_sub_2 * st.lp_sub_2;
    acc.bass += st.lp_bass * st.lp_bass;
    acc.mid += mid * mid;
    acc.treble += treble * treble;
    acc.side_inst += side_hp * side_hp;
    acc.air += air * air;
    acc.sq += mono * mono;
}

#[inline(always)]
fn accumulate_stereo_sample(
    left: f32,
    right: f32,
    alphas: &DspAlphas,
    st: &mut DspFilterState,
    acc: &mut BlockAccum,
) {
    accumulate_mono_side_sample((left + right) * 0.5, (left - right) * 0.5, alphas, st, acc);
}

fn run_capture_loop(app: &AppHandle) -> windows::core::Result<()> {
    unsafe {
        let enumerator: IMMDeviceEnumerator = CoCreateInstance(&MMDeviceEnumerator, None, CLSCTX_ALL)?;
        let device = enumerator.GetDefaultAudioEndpoint(eRender, eConsole)?;
        let audio_client: IAudioClient = device.Activate(CLSCTX_ALL, None)?;

        let mix_ptr = audio_client.GetMixFormat()?;
        let _guard = CoTaskMemGuard(mix_ptr);
        let fmt = ptr::read_unaligned(mix_ptr);

        let channels = (fmt.nChannels as usize).max(1);
        let inv_channels = 1.0f32 / (channels as f32);
        let sample_rate = (fmt.nSamplesPerSec as f32).max(8000.0);
        let bits = fmt.wBitsPerSample;

        // Detect IEEE float (tag 3 or WAVE_FORMAT_EXTENSIBLE 0xFFFE with SubFormat Data1 == 3)
        let is_float = if fmt.wFormatTag == 3 {
            true
        } else if fmt.wFormatTag == 0xFFFE && fmt.cbSize >= 22 {
            let subformat_tag = ptr::read_unaligned((mix_ptr as *const u8).add(24) as *const u32);
            subformat_tag == 3
        } else {
            false
        };

        audio_client.Initialize(
            AUDCLNT_SHAREMODE_SHARED,
            AUDCLNT_STREAMFLAGS_LOOPBACK,
            10_000_000,
            0,
            mix_ptr,
            None,
        )?;

        let capture: IAudioCaptureClient = audio_client.GetService()?;
        audio_client.Start()?;
        eprintln!(
            "[starlight] wasapi loopback started ({} Hz, {} ch, {}-bit {})",
            sample_rate as u32,
            channels,
            bits,
            if is_float { "float" } else { "pcm" }
        );

        let alphas = DspAlphas::new(sample_rate);
        const INV_PCM16: f32 = 1.0 / 32768.0;

        let mut dsp = DspFilterState::default();

        let mut sm_bass = 0.0f32;
        let mut sm_mid = 0.0f32;
        let mut sm_treble = 0.0f32;
        let mut sm_rms = 0.0f32;
        let mut sm_kick = 0.0f32;
        let mut sm_inst = 0.0f32;
        let mut bass_avg = 0.01f32;
        let mut sub_avg = 0.008f32;
        let mut prev_sub = 0.0f32;
        let mut beat_env = 0.0f32;
        let mut kick_env = 0.0f32;
        let mut last_kick_at = Instant::now() - Duration::from_secs(1);
        let mut last_emit = Instant::now();
        let mut was_silent = false;
        let mut silent_polls: u32 = 0;

        loop {
            let sleep_ms = if silent_polls >= 36 { 55 } else { 16 };
            std::thread::sleep(Duration::from_millis(sleep_ms));

            let mut acc = BlockAccum::default();
            let mut total_frames = 0usize;

            loop {
                let packet_frames = capture.GetNextPacketSize()?;
                if packet_frames == 0 {
                    break;
                }

                let mut data_ptr: *mut u8 = ptr::null_mut();
                let mut num_frames: u32 = 0;
                let mut flags: u32 = 0;
                capture.GetBuffer(&mut data_ptr, &mut num_frames, &mut flags, None, None)?;

                let frames = num_frames as usize;
                let silent = (flags & (AUDCLNT_BUFFERFLAGS_SILENT.0 as u32)) != 0 || data_ptr.is_null();

                if !silent && frames > 0 {
                    if is_float && bits == 32 {
                        let samples = std::slice::from_raw_parts(
                            data_ptr as *const f32,
                            frames * channels,
                        );
                        if channels == 2 {
                            let mut idx = 0;
                            let end = samples.len() & !1;
                            while idx < end {
                                accumulate_stereo_sample(
                                    samples[idx],
                                    samples[idx + 1],
                                    &alphas,
                                    &mut dsp,
                                    &mut acc,
                                );
                                idx += 2;
                            }
                        } else if channels == 1 {
                            for &s in &samples[..frames] {
                                accumulate_mono_side_sample(s, 0.0, &alphas, &mut dsp, &mut acc);
                            }
                        } else {
                            for frame in samples.chunks_exact(channels) {
                                let mut sum = 0.0f32;
                                for &s in frame {
                                    sum += s;
                                }
                                let side = (frame[0] - frame[1]) * 0.5;
                                accumulate_mono_side_sample(
                                    sum * inv_channels,
                                    side,
                                    &alphas,
                                    &mut dsp,
                                    &mut acc,
                                );
                            }
                        }
                    } else if !is_float && bits == 16 {
                        let samples = std::slice::from_raw_parts(
                            data_ptr as *const i16,
                            frames * channels,
                        );
                        if channels == 2 {
                            let mut idx = 0;
                            let end = samples.len() & !1;
                            while idx < end {
                                accumulate_stereo_sample(
                                    (samples[idx] as f32) * INV_PCM16,
                                    (samples[idx + 1] as f32) * INV_PCM16,
                                    &alphas,
                                    &mut dsp,
                                    &mut acc,
                                );
                                idx += 2;
                            }
                        } else if channels == 1 {
                            for &s in &samples[..frames] {
                                accumulate_mono_side_sample(
                                    (s as f32) * INV_PCM16,
                                    0.0,
                                    &alphas,
                                    &mut dsp,
                                    &mut acc,
                                );
                            }
                        } else {
                            let scale = INV_PCM16 * inv_channels;
                            for frame in samples.chunks_exact(channels) {
                                let mut sum = 0.0f32;
                                for &s in frame {
                                    sum += s as f32;
                                }
                                let side = ((frame[0] as f32) - (frame[1] as f32)) * (0.5 * INV_PCM16);
                                accumulate_mono_side_sample(
                                    sum * scale,
                                    side,
                                    &alphas,
                                    &mut dsp,
                                    &mut acc,
                                );
                            }
                        }
                    }
                    total_frames += frames;
                }

                capture.ReleaseBuffer(num_frames)?;
            }

            if total_frames > 0 {
                let inv_n = 1.0f32 / (total_frames as f32);
                let raw_sub = ((acc.sub * inv_n).sqrt() * 3.8).min(1.2);
                let raw_bass = ((acc.bass * inv_n).sqrt() * 3.4).min(1.2);
                let raw_mid = ((acc.mid * inv_n).sqrt() * 4.2).min(1.2);
                let raw_treble = ((acc.treble * inv_n).sqrt() * 5.4).min(1.2);
                let raw_rms = ((acc.sq * inv_n).sqrt() * 3.0).min(1.2);
                let raw_side = ((acc.side_inst * inv_n).sqrt() * 6.5).min(1.2);
                let raw_air = ((acc.air * inv_n).sqrt() * 6.0).min(1.2);
                let raw_inst = (raw_side * 0.68 + raw_sub * 0.34 + raw_air * 0.24).min(1.2);

                sm_bass = sm_bass * 0.62 + raw_bass * 0.38;
                sm_mid = sm_mid * 0.65 + raw_mid * 0.35;
                sm_treble = sm_treble * 0.60 + raw_treble * 0.40;
                sm_rms = sm_rms * 0.68 + raw_rms * 0.32;
                sm_inst = if raw_inst > sm_inst {
                    sm_inst * 0.50 + raw_inst * 0.50
                } else {
                    sm_inst * 0.78 + raw_inst * 0.22
                };

                bass_avg = bass_avg * 0.94 + raw_bass * 0.06;
                if raw_bass > bass_avg * 1.42 && raw_bass > 0.14 {
                    beat_env = 1.0;
                } else {
                    beat_env *= 0.80;
                }

                // Isolated kick transient: <110 Hz 2-pole sub + positive flux + 130ms refractory window
                let sub_flux = (raw_sub - prev_sub).max(0.0);
                prev_sub = prev_sub * 0.35 + raw_sub * 0.65;
                sub_avg = sub_avg * 0.93 + raw_sub * 0.07;
                let kick_ready = last_kick_at.elapsed() >= Duration::from_millis(130);
                if kick_ready
                    && raw_sub > 0.14
                    && (raw_sub > sub_avg * 1.48 || (sub_flux > 0.07 && raw_sub > sub_avg * 1.25))
                {
                    kick_env = 1.0;
                    last_kick_at = Instant::now();
                } else {
                    kick_env *= 0.72;
                }
                sm_kick = if kick_env > sm_kick {
                    kick_env
                } else {
                    sm_kick * 0.74 + kick_env * 0.26
                };
                silent_polls = 0;
            } else {
                sm_bass *= 0.84;
                sm_mid *= 0.84;
                sm_treble *= 0.84;
                sm_rms *= 0.84;
                sm_inst *= 0.80;
                sm_kick *= 0.74;
                prev_sub *= 0.80;
                beat_env *= 0.78;
                kick_env *= 0.70;
                silent_polls = silent_polls.saturating_add(1);
            }

            let is_silent = sm_rms < 0.004 && beat_env < 0.01 && kick_env < 0.01;
            if last_emit.elapsed() >= Duration::from_millis(22) && (!is_silent || !was_silent) {
                let levels = if is_silent {
                    AudioLevels::default()
                } else {
                    AudioLevels {
                        bass: sm_bass.clamp(0.0, 1.0),
                        mid: sm_mid.clamp(0.0, 1.0),
                        treble: sm_treble.clamp(0.0, 1.0),
                        rms: sm_rms.clamp(0.0, 1.0),
                        beat: beat_env.clamp(0.0, 1.0),
                        kick: sm_kick.clamp(0.0, 1.0),
                        instrumental: sm_inst.clamp(0.0, 1.0),
                    }
                };
                let _ = app.emit("audio-levels", levels);
                last_emit = Instant::now();
                was_silent = is_silent;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn eval_inst_energy(samples_lr: &[(f32, f32)], sample_rate: f32) -> (f32, f32, f32) {
        let alphas = DspAlphas::new(sample_rate);
        let mut st = DspFilterState::default();
        let mut acc = BlockAccum::default();
        for &(l, r) in samples_lr {
            accumulate_stereo_sample(l, r, &alphas, &mut st, &mut acc);
        }
        let inv_n = 1.0 / (samples_lr.len() as f32);
        let raw_sub = ((acc.sub * inv_n).sqrt() * 3.8).min(1.2);
        let raw_side = ((acc.side_inst * inv_n).sqrt() * 6.5).min(1.2);
        let raw_air = ((acc.air * inv_n).sqrt() * 6.0).min(1.2);
        let raw_inst = (raw_side * 0.68 + raw_sub * 0.34 + raw_air * 0.24).min(1.2);
        (raw_sub, raw_side, raw_inst)
    }

    #[test]
    fn stereo_side_cancels_center_vocals_and_keeps_stereo_instruments() {
        let sr = 48_000.0f32;
        let n = 4800usize;
        let center_vocal: Vec<(f32, f32)> = (0..n)
            .map(|i| {
                let s = 0.45 * (TAU * 550.0 * (i as f32) / sr).sin();
                (s, s)
            })
            .collect();
        let stereo_inst: Vec<(f32, f32)> = (0..n)
            .map(|i| {
                let t = (i as f32) / sr;
                let l = 0.45 * (TAU * 550.0 * t).sin();
                let r = 0.45 * (TAU * 550.0 * t + 1.4).sin();
                (l, r)
            })
            .collect();

        let (_, vocal_side, vocal_inst) = eval_inst_energy(&center_vocal, sr);
        let (_, widen_side, widen_inst) = eval_inst_energy(&stereo_inst, sr);

        assert!(vocal_side < 1e-5, "expected zero side energy for center vocal, got {vocal_side}");
        assert!(vocal_inst < 0.05, "expected low instrumental bleed for center vocal, got {vocal_inst}");
        assert!(widen_side > 0.5, "expected strong stereo side energy, got {widen_side}");
        assert!(widen_inst > vocal_inst * 8.0, "expected stereo instrument >> center vocal: {widen_inst} vs {vocal_inst}");
    }

    #[test]
    fn kick_lowpass_isolates_sub_from_vocal_mid() {
        let sr = 48_000.0f32;
        let n = 4800usize;
        let kick_tone: Vec<(f32, f32)> = (0..n)
            .map(|i| {
                let s = 0.55 * (TAU * 60.0 * (i as f32) / sr).sin();
                (s, s)
            })
            .collect();
        let mid_vocal: Vec<(f32, f32)> = (0..n)
            .map(|i| {
                let s = 0.55 * (TAU * 600.0 * (i as f32) / sr).sin();
                (s, s)
            })
            .collect();

        let (kick_sub, _, _) = eval_inst_energy(&kick_tone, sr);
        let (vocal_sub, _, _) = eval_inst_energy(&mid_vocal, sr);
        assert!(kick_sub > 0.8, "expected strong 60Hz sub response, got {kick_sub}");
        assert!(vocal_sub < 0.12, "expected 600Hz mid rejected by 2-pole 110Hz sub LP, got {vocal_sub}");
    }
}
