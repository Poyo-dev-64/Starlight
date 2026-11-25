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

#[inline(always)]
fn accumulate_mono_sample(
    mono: f32,
    lp_bass_alpha: f32,
    lp_mid_alpha: f32,
    lp_bass: &mut f32,
    lp_mid: &mut f32,
    acc_bass: &mut f32,
    acc_mid: &mut f32,
    acc_treble: &mut f32,
    acc_sq: &mut f32,
) {
    *lp_bass += lp_bass_alpha * (mono - *lp_bass);
    *lp_mid += lp_mid_alpha * (mono - *lp_mid);
    let mid = *lp_mid - *lp_bass;
    let treble = mono - *lp_mid;

    *acc_bass += *lp_bass * *lp_bass;
    *acc_mid += mid * mid;
    *acc_treble += treble * treble;
    *acc_sq += mono * mono;
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

        // 1-pole IIR lowpass filters for bass (< 180 Hz) and low+mid (< 2200 Hz)
        let lp_bass_alpha = 1.0 - (-TAU * 180.0 / sample_rate).exp();
        let lp_mid_alpha = 1.0 - (-TAU * 2200.0 / sample_rate).exp();
        const INV_PCM16: f32 = 1.0 / 32768.0;

        let mut lp_bass = 0.0f32;
        let mut lp_mid = 0.0f32;

        let mut sm_bass = 0.0f32;
        let mut sm_mid = 0.0f32;
        let mut sm_treble = 0.0f32;
        let mut sm_rms = 0.0f32;
        let mut bass_avg = 0.01f32;
        let mut beat_env = 0.0f32;
        let mut last_emit = Instant::now();
        let mut was_silent = false;
        let mut silent_polls: u32 = 0;

        loop {
            let sleep_ms = if silent_polls >= 36 { 55 } else { 16 };
            std::thread::sleep(Duration::from_millis(sleep_ms));

            let mut acc_bass = 0.0f32;
            let mut acc_mid = 0.0f32;
            let mut acc_treble = 0.0f32;
            let mut acc_sq = 0.0f32;
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
                                let mono = (samples[idx] + samples[idx + 1]) * 0.5;
                                accumulate_mono_sample(
                                    mono,
                                    lp_bass_alpha,
                                    lp_mid_alpha,
                                    &mut lp_bass,
                                    &mut lp_mid,
                                    &mut acc_bass,
                                    &mut acc_mid,
                                    &mut acc_treble,
                                    &mut acc_sq,
                                );
                                idx += 2;
                            }
                        } else {
                            for frame in samples.chunks_exact(channels) {
                                let mut sum = 0.0f32;
                                for &s in frame {
                                    sum += s;
                                }
                                accumulate_mono_sample(
                                    sum * inv_channels,
                                    lp_bass_alpha,
                                    lp_mid_alpha,
                                    &mut lp_bass,
                                    &mut lp_mid,
                                    &mut acc_bass,
                                    &mut acc_mid,
                                    &mut acc_treble,
                                    &mut acc_sq,
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
                                let mono = ((samples[idx] as f32) + (samples[idx + 1] as f32))
                                    * (0.5 * INV_PCM16);
                                accumulate_mono_sample(
                                    mono,
                                    lp_bass_alpha,
                                    lp_mid_alpha,
                                    &mut lp_bass,
                                    &mut lp_mid,
                                    &mut acc_bass,
                                    &mut acc_mid,
                                    &mut acc_treble,
                                    &mut acc_sq,
                                );
                                idx += 2;
                            }
                        } else {
                            let scale = INV_PCM16 * inv_channels;
                            for frame in samples.chunks_exact(channels) {
                                let mut sum = 0.0f32;
                                for &s in frame {
                                    sum += s as f32;
                                }
                                accumulate_mono_sample(
                                    sum * scale,
                                    lp_bass_alpha,
                                    lp_mid_alpha,
                                    &mut lp_bass,
                                    &mut lp_mid,
                                    &mut acc_bass,
                                    &mut acc_mid,
                                    &mut acc_treble,
                                    &mut acc_sq,
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
                let raw_bass = ((acc_bass * inv_n).sqrt() * 3.4).min(1.2);
                let raw_mid = ((acc_mid * inv_n).sqrt() * 4.2).min(1.2);
                let raw_treble = ((acc_treble * inv_n).sqrt() * 5.4).min(1.2);
                let raw_rms = ((acc_sq * inv_n).sqrt() * 3.0).min(1.2);

                sm_bass = sm_bass * 0.62 + raw_bass * 0.38;
                sm_mid = sm_mid * 0.65 + raw_mid * 0.35;
                sm_treble = sm_treble * 0.60 + raw_treble * 0.40;
                sm_rms = sm_rms * 0.68 + raw_rms * 0.32;

                bass_avg = bass_avg * 0.94 + raw_bass * 0.06;
                if raw_bass > bass_avg * 1.42 && raw_bass > 0.14 {
                    beat_env = 1.0;
                } else {
                    beat_env *= 0.80;
                }
                silent_polls = 0;
            } else {
                sm_bass *= 0.84;
                sm_mid *= 0.84;
                sm_treble *= 0.84;
                sm_rms *= 0.84;
                beat_env *= 0.78;
                silent_polls = silent_polls.saturating_add(1);
            }

            let is_silent = sm_rms < 0.004 && beat_env < 0.01;
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
                    }
                };
                let _ = app.emit("audio-levels", levels);
                last_emit = Instant::now();
                was_silent = is_silent;
            }
        }
    }
}
