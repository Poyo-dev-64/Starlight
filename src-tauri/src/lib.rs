mod audio;
mod lyrics;
mod smtc;
mod wallpaper;

use lyrics::{LyricProviderPrefs, LyricsPayload, LyricsService};
use serde::Serialize;
use smtc::{create_session_manager, MediaState, SmtcPoller};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant};
use tauri::{AppHandle, Emitter, Manager, State};
use windows::core::PCWSTR;
use windows::Win32::UI::Shell::ShellExecuteW;
use windows::Win32::UI::WindowsAndMessaging::SW_SHOWNORMAL;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct InitialState {
    pub media: MediaState,
    pub lyrics: LyricsPayload,
    pub lyrics_loading: bool,
    pub wallpaper_mode: bool,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct LyricsLoadingEvent {
    track_key: String,
    title: String,
    artist: String,
}

struct SharedState {
    media: MediaState,
    lyrics: LyricsPayload,
    lyrics_loading: bool,
    current_track_key: String,
    lookup_gen: u64,
}

struct AppContext {
    shared: Arc<Mutex<SharedState>>,
    lyrics_service: Arc<LyricsService>,
    wallpaper_mode: bool,
}

#[tauri::command]
fn get_initial_state(ctx: State<'_, AppContext>) -> InitialState {
    let guard = ctx.shared.lock().unwrap();
    InitialState {
        media: guard.media.clone(),
        lyrics: guard.lyrics.clone(),
        lyrics_loading: guard.lyrics_loading,
        wallpaper_mode: ctx.wallpaper_mode,
    }
}

#[tauri::command]
async fn refresh_lyrics(app: AppHandle, ctx: State<'_, AppContext>) -> Result<(), String> {
    let media = {
        let mut guard = ctx.shared.lock().unwrap();
        if guard.media.track_key().is_empty() {
            return Ok(());
        }
        guard.lyrics_loading = true;
        guard.media.clone()
    };

    let track_key = media.track_key();
    ctx.lyrics_service.invalidate(&track_key).await;
    spawn_lyrics_lookup(
        app,
        ctx.shared.clone(),
        ctx.lyrics_service.clone(),
        media,
    );
    Ok(())
}

#[tauri::command]
async fn set_lyric_prefs(
    app: AppHandle,
    ctx: State<'_, AppContext>,
    prefs: LyricProviderPrefs,
) -> Result<(), String> {
    let pref_target = prefs.preferred.trim().to_string();
    let changed = ctx.lyrics_service.set_prefs(prefs).await;

    let media_opt = {
        let mut guard = ctx.shared.lock().unwrap();
        let tk = guard.media.track_key();
        if tk.is_empty() {
            None
        } else {
            let source_mismatch = !pref_target.is_empty()
                && pref_target != "auto"
                && !guard.lyrics.source.starts_with(&pref_target);
            if changed || source_mismatch {
                guard.lyrics = LyricsPayload::empty(tk);
                guard.lyrics_loading = true;
                Some(guard.media.clone())
            } else {
                None
            }
        }
    };

    if let Some(media) = media_opt {
        ctx.lyrics_service.invalidate(&media.track_key()).await;
        spawn_lyrics_lookup(app, ctx.shared.clone(), ctx.lyrics_service.clone(), media);
    }
    Ok(())
}

#[tauri::command]
async fn media_control(action: String) -> Result<bool, String> {
    tauri::async_runtime::spawn_blocking(move || smtc::control_playback(&action))
        .await
        .map_err(|e| e.to_string())?
}

#[tauri::command]
async fn media_seek(position_sec: f64) -> Result<bool, String> {
    tauri::async_runtime::spawn_blocking(move || smtc::seek_playback(position_sec))
        .await
        .map_err(|e| e.to_string())?
}

#[tauri::command]
fn open_external_url(url: String) -> Result<(), String> {
    let trimmed = url.trim();
    let allowed = trimmed.starts_with("https://en.wikipedia.org/wiki/")
        || trimmed.starts_with("https://simbad.cds.unistra.fr/")
        || trimmed.starts_with("https://science.nasa.gov/");
    if !allowed
        || trimmed.len() > 512
        || trimmed.chars().any(|c| c.is_control() || c.is_whitespace())
    {
        return Err("Blocked untrusted external URL".to_string());
    }

    let verb: Vec<u16> = "open\0".encode_utf16().collect();
    let mut target: Vec<u16> = trimmed.encode_utf16().collect();
    target.push(0);

    let res = unsafe {
        ShellExecuteW(
            None,
            PCWSTR(verb.as_ptr()),
            PCWSTR(target.as_ptr()),
            None,
            None,
            SW_SHOWNORMAL,
        )
    };
    if (res.0 as isize) <= 32 {
        return Err(format!("ShellExecuteW failed with code {}", res.0 as isize));
    }
    Ok(())
}

fn spawn_lyrics_lookup(
    app: AppHandle,
    shared: Arc<Mutex<SharedState>>,
    lyrics_service: Arc<LyricsService>,
    media: MediaState,
) {
    let track_key = media.track_key();
    if track_key.is_empty() {
        return;
    }

    eprintln!(
        "[starlight] lyrics lookup started: '{}' by '{}' (dur={:.1}s)",
        media.title, media.artist, media.end_sec
    );

    let my_gen = {
        let mut guard = shared.lock().unwrap();
        guard.lookup_gen = guard.lookup_gen.wrapping_add(1);
        guard.lyrics_loading = true;
        guard.lookup_gen
    };

    let loading_evt = LyricsLoadingEvent {
        track_key: track_key.clone(),
        title: media.title.clone(),
        artist: media.artist.clone(),
    };
    let _ = app.emit("lyrics-loading", &loading_evt);

    tauri::async_runtime::spawn(async move {
        let payload = lyrics_service
            .fetch_lyrics(
                &track_key,
                &media.title,
                &media.artist,
                &media.album,
                media.end_sec,
            )
            .await;

        eprintln!(
            "[starlight] lyrics lookup finished: key='{}' found={} synced={} word_synced={} lines={} source={} gen={}",
            track_key,
            payload.found,
            payload.synced,
            payload.word_synced,
            payload.lines.len(),
            payload.source,
            my_gen
        );

        let should_emit = {
            let mut guard = shared.lock().unwrap();
            if guard.current_track_key == track_key && guard.lookup_gen == my_gen {
                guard.lyrics = payload.clone();
                guard.lyrics_loading = false;
                true
            } else {
                false
            }
        };

        if should_emit {
            let _ = app.emit("lyrics-update", &payload);
        }
    });
}

fn start_smtc_thread(
    app: AppHandle,
    shared: Arc<Mutex<SharedState>>,
    lyrics_service: Arc<LyricsService>,
) {
    std::thread::spawn(move || {
        let mut manager = None;
        let mut poller = SmtcPoller::new();
        let mut last_emitted = MediaState::empty(0);
        let mut last_heartbeat = Instant::now();
        let mut last_lookup_dur_sec = 0.0f64;

        loop {
            if manager.is_none() {
                match create_session_manager() {
                    Ok(mgr) => manager = Some(mgr),
                    Err(_) => {
                        std::thread::sleep(Duration::from_millis(1200));
                        continue;
                    }
                }
            }

            let state = match manager.as_ref() {
                Some(mgr) => poller.poll(mgr),
                None => MediaState::empty(smtc::now_unix_ms()),
            };

            let track_key = state.track_key();
            let mut track_changed = false;
            let mut should_retry_with_duration = false;

            {
                let mut guard = shared.lock().unwrap();
                guard.media = state.clone();
                if guard.current_track_key != track_key {
                    guard.current_track_key = track_key.clone();
                    guard.lyrics = LyricsPayload::empty(track_key.clone());
                    guard.lyrics_loading = !track_key.is_empty();
                    guard.lookup_gen = guard.lookup_gen.wrapping_add(1);
                    last_lookup_dur_sec = state.end_sec;
                    track_changed = true;
                } else if !track_key.is_empty()
                    && last_lookup_dur_sec < 5.0
                    && state.end_sec >= 10.0
                    && !guard.lyrics_loading
                {
                    let src = guard.lyrics.source.as_str();
                    let top_hit = src.starts_with("limusic:") || src.starts_with("boidu:");
                    if !guard.lyrics.synced || !top_hit {
                        last_lookup_dur_sec = state.end_sec;
                        should_retry_with_duration = true;
                    }
                }
            }

            let heartbeat_due =
                state.status == "Playing" && last_heartbeat.elapsed() >= Duration::from_millis(1200);

            if state.changed_from(&last_emitted) || heartbeat_due {
                let _ = app.emit("media-update", &state);
                last_emitted = state.clone();
                last_heartbeat = Instant::now();
            }

            let has_active_session = state.has_session;
            if track_changed {
                if track_key.is_empty() {
                    let empty = LyricsPayload::empty(String::new());
                    let _ = app.emit("lyrics-update", &empty);
                } else {
                    spawn_lyrics_lookup(
                        app.clone(),
                        shared.clone(),
                        lyrics_service.clone(),
                        state,
                    );
                }
            } else if should_retry_with_duration {
                let ls = lyrics_service.clone();
                let tk = track_key.clone();
                let app_clone = app.clone();
                let shared_clone = shared.clone();
                let media_clone = state;
                tauri::async_runtime::spawn(async move {
                    let pref = ls.preferred_source().await;
                    let already_matches_pref = {
                        let guard = shared_clone.lock().unwrap();
                        pref != "auto" && guard.lyrics.synced && guard.lyrics.source.starts_with(&pref)
                    };
                    if !already_matches_pref {
                        ls.invalidate(&tk).await;
                        spawn_lyrics_lookup(app_clone, shared_clone, ls, media_clone);
                    }
                });
            }

            std::thread::sleep(Duration::from_millis(if has_active_session { 250 } else { 500 }));
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let args: Vec<String> = std::env::args().collect();
    let wallpaper_mode = args.iter().any(|a| a == "--wallpaper" || a == "-w");

    let shared = Arc::new(Mutex::new(SharedState {
        media: MediaState::empty(0),
        lyrics: LyricsPayload::empty(String::new()),
        lyrics_loading: false,
        current_track_key: String::new(),
        lookup_gen: 0,
    }));
    let lyrics_service = Arc::new(LyricsService::new());

    let ctx = AppContext {
        shared: shared.clone(),
        lyrics_service: lyrics_service.clone(),
        wallpaper_mode,
    };

    tauri::Builder::default()
        .manage(ctx)
        .invoke_handler(tauri::generate_handler![
            get_initial_state,
            refresh_lyrics,
            set_lyric_prefs,
            media_control,
            media_seek,
            open_external_url
        ])
        .setup(move |app| {
            let handle = app.handle().clone();

            if let Some(window) = app.get_webview_window("main") {
                if wallpaper_mode {
                    let _ = window.set_skip_taskbar(true);
                    let _ = window.set_decorations(false);
                    let _ = window.show();
                    if let Ok(hwnd) = window.hwnd() {
                        wallpaper::attach_to_desktop(hwnd.0 as isize);
                    }
                } else {
                    let _ = window.show();
                }
            }

            start_smtc_thread(handle.clone(), shared.clone(), lyrics_service.clone());
            audio::start_wasapi_thread(handle);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Starlight");
}
