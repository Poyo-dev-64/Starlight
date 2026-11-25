use serde::Serialize;
use std::sync::{Mutex, OnceLock};
use std::time::{SystemTime, UNIX_EPOCH};
use windows::Media::Control::{
    GlobalSystemMediaTransportControlsSession, GlobalSystemMediaTransportControlsSessionManager,
    GlobalSystemMediaTransportControlsSessionPlaybackStatus,
};

/// Snapshot of the active Windows media session from GlobalSystemMediaTransportControls (SMTC).
#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct MediaState {
    pub has_session: bool,
    pub title: String,
    pub artist: String,
    pub album: String,
    pub status: String,
    pub position_sec: f64,
    pub end_sec: f64,
    pub last_updated_ms: i64,
    pub sampled_at_ms: i64,
    pub app_id: String,
}

impl MediaState {
    pub fn empty(sampled_at_ms: i64) -> Self {
        Self {
            has_session: false,
            title: String::new(),
            artist: String::new(),
            album: String::new(),
            status: "Closed".to_string(),
            position_sec: 0.0,
            end_sec: 0.0,
            last_updated_ms: 0,
            sampled_at_ms,
            app_id: String::new(),
        }
    }

    pub fn track_key(&self) -> String {
        if !self.has_session || self.title.trim().is_empty() {
            return String::new();
        }
        format!(
            "{}|{}",
            self.artist.trim().to_lowercase(),
            self.title.trim().to_lowercase()
        )
    }

    /// True if meaningful playback metadata or timeline state changed compared to `other`.
    pub fn changed_from(&self, other: &Self) -> bool {
        self.has_session != other.has_session
            || self.title != other.title
            || self.artist != other.artist
            || self.album != other.album
            || self.status != other.status
            || self.app_id != other.app_id
            || (self.position_sec - other.position_sec).abs() > 0.05
            || (self.end_sec - other.end_sec).abs() > 0.2
            || self.last_updated_ms != other.last_updated_ms
    }
}

pub fn now_unix_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_millis() as i64)
        .unwrap_or(0)
}

/// Converts Windows FILETIME (100ns ticks since 1601-01-01) to Unix epoch milliseconds.
#[inline]
fn filetime_to_unix_ms(universal_time: i64) -> i64 {
    const WINDOWS_TO_UNIX_EPOCH_TICKS: i64 = 116_444_736_000_000_000;
    if universal_time > WINDOWS_TO_UNIX_EPOCH_TICKS {
        (universal_time - WINDOWS_TO_UNIX_EPOCH_TICKS) / 10_000
    } else {
        0
    }
}

#[inline]
fn status_to_string(status: GlobalSystemMediaTransportControlsSessionPlaybackStatus) -> &'static str {
    match status {
        GlobalSystemMediaTransportControlsSessionPlaybackStatus::Playing => "Playing",
        GlobalSystemMediaTransportControlsSessionPlaybackStatus::Paused => "Paused",
        GlobalSystemMediaTransportControlsSessionPlaybackStatus::Stopped => "Stopped",
        GlobalSystemMediaTransportControlsSessionPlaybackStatus::Changing => "Changing",
        GlobalSystemMediaTransportControlsSessionPlaybackStatus::Opened => "Opened",
        _ => "Closed",
    }
}

fn pick_best_session(
    mgr: &GlobalSystemMediaTransportControlsSessionManager,
) -> Option<GlobalSystemMediaTransportControlsSession> {
    if let Ok(sessions) = mgr.GetSessions() {
        if let Ok(count) = sessions.Size() {
            for i in 0..count {
                if let Ok(session) = sessions.GetAt(i) {
                    if let Ok(pb) = session.GetPlaybackInfo() {
                        if pb.PlaybackStatus().ok()
                            == Some(GlobalSystemMediaTransportControlsSessionPlaybackStatus::Playing)
                        {
                            return Some(session);
                        }
                    }
                }
            }
        }
    }
    mgr.GetCurrentSession().ok()
}

pub fn create_session_manager() -> windows::core::Result<GlobalSystemMediaTransportControlsSessionManager> {
    GlobalSystemMediaTransportControlsSessionManager::RequestAsync()?.get()
}

/// Stateful SMTC poller that reads fast local timeline/status properties every 250ms
/// and caches cross-process `TryGetMediaPropertiesAsync` metadata (~83% fewer WinRT RPCs).
#[derive(Default)]
pub struct SmtcPoller {
    cached_app_id: String,
    cached_title: String,
    cached_artist: String,
    cached_album: String,
    cached_status: &'static str,
    cached_end_sec: f64,
    cached_pos_sec: f64,
    polls_since_props: u32,
}

impl SmtcPoller {
    pub fn new() -> Self {
        Self {
            cached_status: "Closed",
            ..Self::default()
        }
    }

    pub fn poll(&mut self, mgr: &GlobalSystemMediaTransportControlsSessionManager) -> MediaState {
        let sampled_at_ms = now_unix_ms();
        let Some(session) = pick_best_session(mgr) else {
            self.cached_app_id.clear();
            self.cached_title.clear();
            self.cached_artist.clear();
            self.cached_album.clear();
            self.cached_status = "Closed";
            self.cached_end_sec = 0.0;
            self.cached_pos_sec = 0.0;
            self.polls_since_props = 0;
            return MediaState::empty(sampled_at_ms);
        };

        let app_id = session
            .SourceAppUserModelId()
            .map(|s| s.to_string())
            .unwrap_or_default();

        let status_str = session
            .GetPlaybackInfo()
            .and_then(|pb| pb.PlaybackStatus())
            .map(status_to_string)
            .unwrap_or("Paused");

        let (position_sec, end_sec, last_updated_ms) = match session.GetTimelineProperties() {
            Ok(tl) => {
                let pos = tl
                    .Position()
                    .map(|t| (t.Duration as f64) / 10_000_000.0)
                    .unwrap_or(0.0)
                    .max(0.0);
                let end = tl
                    .EndTime()
                    .map(|t| (t.Duration as f64) / 10_000_000.0)
                    .unwrap_or(0.0)
                    .max(0.0);
                let updated = tl
                    .LastUpdatedTime()
                    .map(|dt| filetime_to_unix_ms(dt.UniversalTime))
                    .unwrap_or(0);
                (pos, end, updated)
            }
            Err(_) => (0.0, 0.0, 0),
        };

        let jumped_to_start = position_sec + 1.5 < self.cached_pos_sec && position_sec < 3.5;
        let need_props_refresh = self.cached_title.is_empty()
            || app_id != self.cached_app_id
            || status_str != self.cached_status
            || (end_sec - self.cached_end_sec).abs() > 0.4
            || jumped_to_start
            || self.polls_since_props >= 6;

        if need_props_refresh {
            if let Ok(props) = session.TryGetMediaPropertiesAsync().and_then(|op| op.get()) {
                self.cached_title = props.Title().map(|s| s.to_string()).unwrap_or_default();
                self.cached_artist = props.Artist().map(|s| s.to_string()).unwrap_or_default();
                self.cached_album = props.AlbumTitle().map(|s| s.to_string()).unwrap_or_default();
                self.polls_since_props = 0;
            } else if self.cached_title.is_empty() {
                return MediaState::empty(sampled_at_ms);
            }
        } else {
            self.polls_since_props += 1;
        }

        self.cached_app_id = app_id.clone();
        self.cached_status = status_str;
        self.cached_end_sec = end_sec;
        self.cached_pos_sec = position_sec;

        MediaState {
            has_session: !self.cached_title.trim().is_empty(),
            title: self.cached_title.clone(),
            artist: self.cached_artist.clone(),
            album: self.cached_album.clone(),
            status: status_str.to_string(),
            position_sec,
            end_sec,
            last_updated_ms,
            sampled_at_ms,
            app_id,
        }
    }
}

fn with_shared_manager<F, R>(mut f: F) -> Result<R, String>
where
    F: FnMut(&GlobalSystemMediaTransportControlsSessionManager) -> Result<R, String>,
{
    static SHARED_MGR: OnceLock<Mutex<Option<GlobalSystemMediaTransportControlsSessionManager>>> =
        OnceLock::new();
    let lock = SHARED_MGR.get_or_init(|| Mutex::new(None));
    let mut guard = lock.lock().map_err(|_| "SMTC mutex poisoned".to_string())?;
    if guard.is_none() {
        *guard = Some(create_session_manager().map_err(|e| e.to_string())?);
    }
    match f(guard.as_ref().unwrap()) {
        Ok(val) => Ok(val),
        Err(_) => {
            *guard = Some(create_session_manager().map_err(|e| e.to_string())?);
            f(guard.as_ref().unwrap())
        }
    }
}

pub fn control_playback(action: &str) -> Result<bool, String> {
    with_shared_manager(|mgr| {
        let Some(session) = pick_best_session(mgr) else {
            return Ok(false);
        };

        let op = match action {
            "toggle" => session.TryTogglePlayPauseAsync(),
            "prev" => session.TrySkipPreviousAsync(),
            "next" => session.TrySkipNextAsync(),
            _ => return Err(format!("Unknown media action: {action}")),
        };

        op.map_err(|e| e.to_string())?
            .get()
            .map_err(|e| e.to_string())
    })
}

pub fn seek_playback(position_sec: f64) -> Result<bool, String> {
    with_shared_manager(|mgr| {
        let Some(session) = pick_best_session(mgr) else {
            return Ok(false);
        };

        let ticks = (position_sec.max(0.0) * 10_000_000.0).round() as i64;
        session
            .TryChangePlaybackPositionAsync(ticks)
            .map_err(|e| e.to_string())?
            .get()
            .map_err(|e| e.to_string())
    })
}
