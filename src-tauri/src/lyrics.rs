use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::Mutex;

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct LyricWord {
    pub text: String,
    pub offset_ratio: f64,
    pub duration_ratio: f64,
}

#[derive(Clone, Debug, Serialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct LyricLine {
    pub time_sec: f64,
    pub end_sec: f64,
    pub text: String,
    pub words: Vec<LyricWord>,
}

#[derive(Clone, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct LyricsPayload {
    pub track_key: String,
    pub found: bool,
    pub synced: bool,
    pub word_synced: bool,
    pub lines: Vec<LyricLine>,
    pub plain_text: Option<String>,
    pub source: String,
}

impl LyricsPayload {
    pub fn empty(track_key: String) -> Self {
        Self {
            track_key,
            found: false,
            synced: false,
            word_synced: false,
            lines: Vec::new(),
            plain_text: None,
            source: "none".to_string(),
        }
    }
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct LrclibRecord {
    duration: Option<f64>,
    plain_lyrics: Option<String>,
    synced_lyrics: Option<String>,
}

#[derive(Debug, Deserialize)]
struct BoiduResponse {
    ttml: Option<String>,
}

#[derive(Debug, Deserialize)]
struct LyricsPlusResponse {
    #[serde(rename = "type")]
    kind: Option<String>,
    lyrics: Option<Vec<LyricsPlusLine>>,
}

#[derive(Debug, Deserialize)]
struct LyricsPlusLine {
    time: Option<i64>,
    duration: Option<i64>,
    text: Option<String>,
    syllabus: Option<Vec<LyricsPlusSyllabus>>,
}

#[derive(Debug, Deserialize)]
struct LyricsPlusSyllabus {
    time: Option<i64>,
    duration: Option<i64>,
    text: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
#[serde(default)]
pub struct LyricProviderPrefs {
    pub preferred: String,
    pub enable_limusic: bool,
    pub enable_boidu: bool,
    pub enable_unison: bool,
    pub enable_lyricsplus: bool,
    pub enable_lrclib: bool,
    pub enable_ytmusic: bool,
    pub enable_netease: bool,
    pub enable_qqmusic: bool,
    pub enable_kugou: bool,
}

impl Default for LyricProviderPrefs {
    fn default() -> Self {
        Self {
            preferred: "auto".to_string(),
            enable_limusic: true,
            enable_boidu: true,
            enable_unison: true,
            enable_lyricsplus: true,
            enable_lrclib: true,
            enable_ytmusic: true,
            enable_netease: true,
            enable_qqmusic: true,
            enable_kugou: true,
        }
    }
}

impl LyricProviderPrefs {
    fn is_enabled(&self, id: &str) -> bool {
        match id {
            "limusic" => self.enable_limusic,
            "boidu" => self.enable_boidu,
            "unison" => self.enable_unison,
            "lyricsplus" => self.enable_lyricsplus,
            "lrclib" => self.enable_lrclib,
            "ytmusic" => self.enable_ytmusic,
            "netease" => self.enable_netease,
            "qqmusic" => self.enable_qqmusic,
            "kugou" => self.enable_kugou,
            _ => false,
        }
    }
}

pub struct LyricsService {
    client: Client,
    cache: Arc<Mutex<HashMap<String, LyricsPayload>>>,
    prefs: Arc<Mutex<LyricProviderPrefs>>,
    prefs_gen: AtomicU64,
}

impl LyricsService {
    pub fn new() -> Self {
        let client = Client::builder()
            .user_agent("StarlightVisualizer/1.0")
            .tcp_nodelay(true)
            .pool_max_idle_per_host(4)
            .timeout(Duration::from_secs(6))
            .build()
            .unwrap_or_else(|_| Client::new());

        Self {
            client,
            cache: Arc::new(Mutex::new(HashMap::with_capacity(64))),
            prefs: Arc::new(Mutex::new(LyricProviderPrefs::default())),
            prefs_gen: AtomicU64::new(0),
        }
    }

    pub async fn set_prefs(&self, next: LyricProviderPrefs) {
        self.prefs_gen.fetch_add(1, Ordering::SeqCst);
        *self.prefs.lock().await = next;
        self.cache.lock().await.clear();
    }

    pub async fn invalidate(&self, track_key: &str) {
        let mut cache = self.cache.lock().await;
        cache.remove(track_key);
    }

    pub async fn fetch_lyrics(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if track_key.is_empty() || title.trim().is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let start_gen = self.prefs_gen.load(Ordering::SeqCst);
        {
            let cache = self.cache.lock().await;
            if let Some(cached) = cache.get(track_key) {
                return cached.clone();
            }
        }

        let result = self
            .lookup_all_providers(track_key, title, artist, album, duration_sec)
            .await;

        let mut cache = self.cache.lock().await;
        if result.found && self.prefs_gen.load(Ordering::SeqCst) == start_gen {
            if cache.len() >= 128 {
                if let Some(evict_key) = cache.keys().next().cloned() {
                    cache.remove(&evict_key);
                }
            }
            cache.insert(track_key.to_string(), result.clone());
        }
        result
    }

    #[allow(clippy::too_many_arguments)]
    async fn fetch_by_id(
        &self,
        id: &str,
        track_key: &str,
        derived_title: &str,
        derived_artist: &str,
        clean_title: &str,
        clean_artist: &str,
        raw_album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        match id {
            "limusic" => {
                self.fetch_limusic(track_key, clean_title, clean_artist, raw_album, duration_sec)
                    .await
            }
            "boidu" => {
                self.fetch_boidu(track_key, clean_title, clean_artist, raw_album, duration_sec)
                    .await
            }
            "unison" => {
                self.fetch_unison(track_key, clean_title, clean_artist, raw_album, duration_sec)
                    .await
            }
            "lyricsplus" => {
                self.fetch_lyricsplus(track_key, clean_title, clean_artist, raw_album, duration_sec)
                    .await
            }
            "lrclib" => {
                self.fetch_lrclib(
                    track_key,
                    derived_title,
                    derived_artist,
                    clean_title,
                    clean_artist,
                    raw_album,
                    duration_sec,
                )
                .await
            }
            "ytmusic" => self.fetch_ytmusic(track_key, clean_title, clean_artist).await,
            "netease" => {
                self.fetch_netease(track_key, clean_title, clean_artist, duration_sec)
                    .await
            }
            "qqmusic" => {
                self.fetch_qqmusic(track_key, clean_title, clean_artist, duration_sec)
                    .await
            }
            "kugou" => {
                self.fetch_kugou(track_key, clean_title, clean_artist, duration_sec)
                    .await
            }
            _ => LyricsPayload::empty(track_key.to_string()),
        }
    }

    async fn lookup_all_providers(
        &self,
        track_key: &str,
        raw_title: &str,
        raw_artist: &str,
        raw_album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        let (derived_artist, derived_title) = split_artist_title(raw_artist, raw_title);
        let clean_title = clean_track_title(&derived_title);
        let clean_artist = clean_artist_name(&derived_artist);

        let prefs = self.prefs.lock().await.clone();
        let pref_id = prefs.preferred.as_str();
        let mut plain_candidates: Vec<LyricsPayload> = Vec::new();

        // 1. If a specific Preferred Source is set and enabled, fetch ONLY from it FIRST.
        if pref_id != "auto" && prefs.is_enabled(pref_id) {
            let pref_res = self
                .fetch_by_id(
                    pref_id,
                    track_key,
                    &derived_title,
                    &derived_artist,
                    &clean_title,
                    &clean_artist,
                    raw_album,
                    duration_sec,
                )
                .await;
            if pref_res.synced {
                return pref_res;
            }
            if pref_res.found {
                plain_candidates.push(pref_res);
            }
        }

        // 2. Fallback Stage A: high-precision word-by-word + fast synced databases
        let limusic_ok = "limusic" != pref_id && prefs.is_enabled("limusic");
        let boidu_ok = "boidu" != pref_id && prefs.is_enabled("boidu");
        let unison_ok = "unison" != pref_id && prefs.is_enabled("unison");
        let lp_ok = "lyricsplus" != pref_id && prefs.is_enabled("lyricsplus");
        let lrclib_ok = "lrclib" != pref_id && prefs.is_enabled("lrclib");

        let (limusic_opt, boidu_opt, unison_opt, lp_opt, lrclib_opt) = tokio::join!(
            async { if limusic_ok { Some(self.fetch_by_id("limusic", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if boidu_ok { Some(self.fetch_by_id("boidu", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if unison_ok { Some(self.fetch_by_id("unison", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if lp_ok { Some(self.fetch_by_id("lyricsplus", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if lrclib_ok { Some(self.fetch_by_id("lrclib", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } }
        );

        let stage_a = [
            ("limusic", limusic_opt),
            ("boidu", boidu_opt),
            ("unison", unison_opt),
            ("lyricsplus", lp_opt),
            ("lrclib", lrclib_opt),
        ];
        if let Some(best) = select_stage_result(&stage_a, &mut plain_candidates) {
            return best;
        }

        // 3. Fallback Stage B: YouTube Music + Netease + QQ Music + Kugou
        let ytm_ok = "ytmusic" != pref_id && prefs.is_enabled("ytmusic");
        let netease_ok = "netease" != pref_id && prefs.is_enabled("netease");
        let qq_ok = "qqmusic" != pref_id && prefs.is_enabled("qqmusic");
        let kugou_ok = "kugou" != pref_id && prefs.is_enabled("kugou");

        let (ytm_opt, netease_opt, qq_opt, kugou_opt) = tokio::join!(
            async { if ytm_ok { Some(self.fetch_by_id("ytmusic", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if netease_ok { Some(self.fetch_by_id("netease", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if qq_ok { Some(self.fetch_by_id("qqmusic", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } },
            async { if kugou_ok { Some(self.fetch_by_id("kugou", track_key, &derived_title, &derived_artist, &clean_title, &clean_artist, raw_album, duration_sec).await) } else { None } }
        );

        let stage_b = [
            ("netease", netease_opt),
            ("ytmusic", ytm_opt),
            ("qqmusic", qq_opt),
            ("kugou", kugou_opt),
        ];
        if let Some(best) = select_stage_result(&stage_b, &mut plain_candidates) {
            return best;
        }

        // 4. Plain-text fallback (preferred plain first because it was pushed first)
        for cand in plain_candidates {
            if cand.found {
                return cand;
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn fetch_limusic(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if title.trim().is_empty() || artist.trim().is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        // Limusic via Boidu unified endpoint + artist/title fallback
        let mut params: Vec<(&str, String)> = vec![
            ("s", title.trim().to_string()),
            ("a", artist.trim().to_string()),
        ];
        if !album.trim().is_empty() {
            params.push(("al", album.trim().to_string()));
        }
        if duration_sec >= 1.0 {
            params.push(("d", format!("{}", duration_sec.round() as i64)));
        }

        if let Ok(resp) = self
            .client
            .get("https://lyrics-api.boidu.dev/getLyrics")
            .query(&params)
            .send()
            .await
        {
            if resp.status().is_success() {
                if let Ok(parsed) = resp.json::<BoiduResponse>().await {
                    if let Some(ttml) = parsed.ttml.filter(|s| !s.trim().is_empty()) {
                        if let Some(mut payload) = parse_ttml(track_key, &ttml, duration_sec) {
                            payload.source = payload.source.replace("boidu:", "limusic:");
                            return payload;
                        }
                    }
                }
            }
        }

        // Secondary Limusic resolver via YouTube videoId on Unison (crowdsourced richsync)
        if let Some(video_id) = self.find_ytmusic_video_id(title, artist).await {
            if let Some(mut payload) = self
                .query_unison_endpoint(track_key, &[("v", video_id)], duration_sec)
                .await
            {
                if payload.synced {
                    payload.source = if payload.word_synced {
                        "limusic:word".to_string()
                    } else {
                        "limusic:line".to_string()
                    };
                    return payload;
                }
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn fetch_unison(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if title.trim().is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        if !artist.trim().is_empty() {
            let mut params: Vec<(&str, String)> = vec![
                ("song", title.trim().to_string()),
                ("artist", artist.trim().to_string()),
            ];
            if !album.trim().is_empty() {
                params.push(("album", album.trim().to_string()));
            }
            if duration_sec >= 1.0 {
                params.push(("duration", format!("{}", duration_sec.round() as i64)));
            }
            if let Some(payload) = self
                .query_unison_endpoint(track_key, &params, duration_sec)
                .await
            {
                return payload;
            }
        }

        if let Some(video_id) = self.find_ytmusic_video_id(title, artist).await {
            if let Some(payload) = self
                .query_unison_endpoint(track_key, &[("v", video_id)], duration_sec)
                .await
            {
                return payload;
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn query_unison_endpoint(
        &self,
        track_key: &str,
        params: &[(&str, String)],
        duration_sec: f64,
    ) -> Option<LyricsPayload> {
        let mirrors = [
            "https://unison.boidu.dev/lyrics",
            "https://unison.betterlyrics.org/lyrics",
        ];

        for url in mirrors {
            let Ok(resp) = self.client.get(url).query(params).send().await else {
                continue;
            };
            if !resp.status().is_success() {
                continue;
            }
            let Ok(json) = resp.json::<Value>().await else {
                continue;
            };
            let data = json.get("data").unwrap_or(&json);
            let raw = data
                .get("lyrics")
                .and_then(Value::as_str)
                .map(str::trim)
                .filter(|s| !s.is_empty())?;
            let fmt = data
                .get("format")
                .and_then(Value::as_str)
                .unwrap_or("")
                .to_lowercase();

            if fmt == "ttml" || raw.starts_with("<tt") || raw.contains("<p ") {
                if let Some(mut payload) = parse_ttml(track_key, raw, duration_sec) {
                    payload.source = payload.source.replace("boidu:", "unison:");
                    return Some(payload);
                }
            }
            let lrc_lines = parse_lrc(raw, duration_sec);
            if !lrc_lines.is_empty() {
                return Some(LyricsPayload {
                    track_key: track_key.to_string(),
                    found: true,
                    synced: true,
                    word_synced: false,
                    lines: lrc_lines,
                    plain_text: None,
                    source: "unison:synced".to_string(),
                });
            }
            return Some(LyricsPayload {
                track_key: track_key.to_string(),
                found: true,
                synced: false,
                word_synced: false,
                lines: Vec::new(),
                plain_text: Some(raw.to_string()),
                source: "unison:plain".to_string(),
            });
        }
        None
    }

    async fn find_ytmusic_video_id(&self, title: &str, artist: &str) -> Option<String> {
        let query = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} {}", artist.trim(), title.trim())
        };
        if query.is_empty() {
            return None;
        }
        let web_ctx = json!({
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20241101.01.00",
                "hl": "en",
                "gl": "US"
            }
        });
        let search_body = json!({
            "context": web_ctx,
            "query": query,
            "params": "EgWKAQIIAWoKEAkQBRAKEAMQBA%3D%3D"
        });
        let search_resp = self
            .client
            .post("https://music.youtube.com/youtubei/v1/search?prettyPrint=false")
            .json(&search_body)
            .send()
            .await
            .ok()?;
        if !search_resp.status().is_success() {
            return None;
        }
        let search_json = search_resp.json::<Value>().await.ok()?;
        find_first_string_for_key(&search_json, "videoId")
    }

    async fn fetch_boidu(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if title.trim().is_empty() || artist.trim().is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        // Always send s, a, al, and d when available as recommended by Better Lyrics API docs
        let mut params: Vec<(&str, String)> = vec![
            ("s", title.trim().to_string()),
            ("a", artist.trim().to_string()),
        ];
        if !album.trim().is_empty() {
            params.push(("al", album.trim().to_string()));
        }
        if duration_sec >= 1.0 {
            params.push(("d", format!("{}", duration_sec.round() as i64)));
        }

        let Ok(resp) = self
            .client
            .get("https://api.betterlyrics.org/getLyrics")
            .query(&params)
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(parsed) = resp.json::<BoiduResponse>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(ttml) = parsed.ttml.filter(|s| !s.trim().is_empty()) else {
            return LyricsPayload::empty(track_key.to_string());
        };

        parse_ttml(track_key, &ttml, duration_sec)
            .unwrap_or_else(|| LyricsPayload::empty(track_key.to_string()))
    }

    async fn fetch_lyricsplus(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if title.trim().is_empty() || artist.trim().is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let mirrors = [
            "https://lyricsplus.prjktla.my.id/v2/lyrics/get",
            "https://lyricsplus.prjktla.workers.dev/v2/lyrics/get",
        ];

        let mut params: Vec<(&str, String)> = vec![
            ("title", title.to_string()),
            ("artist", artist.to_string()),
        ];
        if !album.trim().is_empty() {
            params.push(("album", album.trim().to_string()));
        }
        if duration_sec >= 10.0 {
            params.push(("duration", format!("{}", duration_sec.round() as i64)));
        }

        for base_url in mirrors {
            let Ok(resp) = self.client.get(base_url).query(&params).send().await else {
                continue;
            };
            if !resp.status().is_success() {
                continue;
            }
            let Ok(body) = resp.text().await else {
                continue;
            };
            if let Some(payload) = parse_lyricsplus_json(track_key, &body, duration_sec) {
                if payload.found {
                    return payload;
                }
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    #[allow(clippy::too_many_arguments)]
    async fn fetch_lrclib(
        &self,
        track_key: &str,
        derived_title: &str,
        derived_artist: &str,
        clean_title: &str,
        clean_artist: &str,
        raw_album: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        if !clean_artist.is_empty() {
            if let Some(rec) = self
                .query_lrclib_get(derived_title, derived_artist, raw_album, duration_sec)
                .await
            {
                if has_usable_lyrics(&rec) {
                    return record_to_payload(track_key, rec, duration_sec, "lrclib:get");
                }
            }
            if clean_title != derived_title || clean_artist != derived_artist {
                if let Some(rec) = self
                    .query_lrclib_get(clean_title, clean_artist, "", duration_sec)
                    .await
                {
                    if has_usable_lyrics(&rec) {
                        return record_to_payload(track_key, rec, duration_sec, "lrclib:get-clean");
                    }
                }
            }

            let candidates = self
                .query_lrclib_search(&[("track_name", clean_title), ("artist_name", clean_artist)])
                .await;
            if let Some(best) = pick_best_candidate(candidates, duration_sec) {
                return record_to_payload(track_key, best, duration_sec, "lrclib:search");
            }
        }

        let q = if clean_artist.is_empty() {
            clean_title.to_string()
        } else {
            format!("{clean_artist} {clean_title}")
        };
        if !q.trim().is_empty() {
            let candidates = self.query_lrclib_search(&[("q", &q)]).await;
            if let Some(best) = pick_best_candidate(candidates, duration_sec) {
                return record_to_payload(track_key, best, duration_sec, "lrclib:q");
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn query_lrclib_get(
        &self,
        title: &str,
        artist: &str,
        album: &str,
        duration_sec: f64,
    ) -> Option<LrclibRecord> {
        let mut params: Vec<(&str, String)> = vec![
            ("track_name", title.to_string()),
            ("artist_name", artist.to_string()),
        ];
        if !album.trim().is_empty() {
            params.push(("album_name", album.trim().to_string()));
        }
        if duration_sec >= 10.0 {
            params.push(("duration", format!("{}", duration_sec.round() as i64)));
        }

        let resp = self
            .client
            .get("https://lrclib.net/api/get")
            .query(&params)
            .send()
            .await
            .ok()?;
        if !resp.status().is_success() {
            return None;
        }
        resp.json::<LrclibRecord>().await.ok()
    }

    async fn query_lrclib_search(&self, params: &[(&str, &str)]) -> Vec<LrclibRecord> {
        let Ok(resp) = self
            .client
            .get("https://lrclib.net/api/search")
            .query(params)
            .send()
            .await
        else {
            return Vec::new();
        };
        if !resp.status().is_success() {
            return Vec::new();
        }
        resp.json::<Vec<LrclibRecord>>().await.unwrap_or_default()
    }

    async fn fetch_ytmusic(&self, track_key: &str, title: &str, artist: &str) -> LyricsPayload {
        let query = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} {}", artist.trim(), title.trim())
        };
        if query.is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let web_ctx = json!({
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20241101.01.00",
                "hl": "en",
                "gl": "US"
            }
        });

        let search_body = json!({
            "context": web_ctx,
            "query": query,
            "params": "EgWKAQIIAWoKEAkQBRAKEAMQBA%3D%3D"
        });

        let Ok(search_resp) = self
            .client
            .post("https://music.youtube.com/youtubei/v1/search?prettyPrint=false")
            .json(&search_body)
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !search_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(search_json) = search_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(video_id) = find_first_string_for_key(&search_json, "videoId") else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let next_body = json!({
            "context": web_ctx,
            "videoId": video_id
        });
        let Ok(next_resp) = self
            .client
            .post("https://music.youtube.com/youtubei/v1/next?prettyPrint=false")
            .json(&next_body)
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !next_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(next_json) = next_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(browse_id) = find_string_with_prefix(&next_json, "browseId", "MPLYt_") else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let android_ctx = json!({
            "client": {
                "clientName": "ANDROID_MUSIC",
                "clientVersion": "7.27.52",
                "hl": "en",
                "gl": "US"
            }
        });
        if let Ok(br_resp) = self
            .client
            .post("https://music.youtube.com/youtubei/v1/browse?prettyPrint=false")
            .json(&json!({ "context": android_ctx, "browseId": browse_id }))
            .send()
            .await
        {
            if br_resp.status().is_success() {
                if let Ok(br_json) = br_resp.json::<Value>().await {
                    if let Some(lines) = extract_ytmusic_timed_lyrics(&br_json) {
                        if !lines.is_empty() {
                            return LyricsPayload {
                                track_key: track_key.to_string(),
                                found: true,
                                synced: true,
                                word_synced: false,
                                lines,
                                plain_text: None,
                                source: "ytmusic:synced".to_string(),
                            };
                        }
                    }
                    if let Some(plain) = extract_ytmusic_plain_lyrics(&br_json) {
                        return LyricsPayload {
                            track_key: track_key.to_string(),
                            found: true,
                            synced: false,
                            word_synced: false,
                            lines: Vec::new(),
                            plain_text: Some(plain),
                            source: "ytmusic:plain".to_string(),
                        };
                    }
                }
            }
        }

        if let Ok(br_resp) = self
            .client
            .post("https://music.youtube.com/youtubei/v1/browse?prettyPrint=false")
            .json(&json!({ "context": web_ctx, "browseId": browse_id }))
            .send()
            .await
        {
            if br_resp.status().is_success() {
                if let Ok(br_json) = br_resp.json::<Value>().await {
                    if let Some(plain) = extract_ytmusic_plain_lyrics(&br_json) {
                        return LyricsPayload {
                            track_key: track_key.to_string(),
                            found: true,
                            synced: false,
                            word_synced: false,
                            lines: Vec::new(),
                            plain_text: Some(plain),
                            source: "ytmusic:plain".to_string(),
                        };
                    }
                }
            }
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn fetch_netease(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        let query = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} {}", artist.trim(), title.trim())
        };
        if query.is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let Ok(search_resp) = self
            .client
            .get("https://music.163.com/api/search/get")
            .header("Referer", "https://music.163.com/")
            .query(&[
                ("s", query.as_str()),
                ("type", "1"),
                ("limit", "5"),
                ("offset", "0"),
            ])
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !search_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(search_json) = search_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(songs) = search_json
            .get("result")
            .and_then(|r| r.get("songs"))
            .and_then(Value::as_array)
        else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let target_ms = if duration_sec >= 10.0 {
            Some(duration_sec * 1000.0)
        } else {
            None
        };
        let best_song = songs.iter().min_by(|a, b| {
            let da = target_ms
                .and_then(|t| a.get("duration").and_then(Value::as_f64).map(|d| (d - t).abs()))
                .unwrap_or(0.0);
            let db = target_ms
                .and_then(|t| b.get("duration").and_then(Value::as_f64).map(|d| (d - t).abs()))
                .unwrap_or(0.0);
            da.partial_cmp(&db).unwrap_or(std::cmp::Ordering::Equal)
        });
        let Some(song_id) = best_song.and_then(|s| s.get("id")).and_then(Value::as_i64) else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let id_str = song_id.to_string();
        let Ok(lyric_resp) = self
            .client
            .get("https://music.163.com/api/song/lyric")
            .header("Referer", "https://music.163.com/")
            .query(&[
                ("id", id_str.as_str()),
                ("lv", "-1"),
                ("tv", "-1"),
                ("kv", "-1"),
                ("yv", "-1"),
            ])
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !lyric_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(lyric_json) = lyric_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };

        if let Some(yrc_raw) = lyric_json
            .get("yrc")
            .and_then(|y| y.get("lyric"))
            .and_then(Value::as_str)
            .filter(|s| !s.trim().is_empty())
        {
            let lines = parse_netease_yrc(yrc_raw, duration_sec);
            if !lines.is_empty() {
                return LyricsPayload {
                    track_key: track_key.to_string(),
                    found: true,
                    synced: true,
                    word_synced: true,
                    lines,
                    plain_text: None,
                    source: "netease:word".to_string(),
                };
            }
        }

        if let Some(lrc_raw) = lyric_json
            .get("lrc")
            .and_then(|l| l.get("lyric"))
            .and_then(Value::as_str)
            .filter(|s| !s.trim().is_empty())
        {
            let lines = parse_lrc(lrc_raw, duration_sec);
            if !lines.is_empty() {
                return LyricsPayload {
                    track_key: track_key.to_string(),
                    found: true,
                    synced: true,
                    word_synced: false,
                    lines,
                    plain_text: None,
                    source: "netease:synced".to_string(),
                };
            }
            return LyricsPayload {
                track_key: track_key.to_string(),
                found: true,
                synced: false,
                word_synced: false,
                lines: Vec::new(),
                plain_text: Some(lrc_raw.trim().to_string()),
                source: "netease:plain".to_string(),
            };
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn fetch_qqmusic(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        let query = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} {}", artist.trim(), title.trim())
        };
        if query.is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let Ok(search_resp) = self
            .client
            .get("https://c.y.qq.com/soso/fcgi-bin/client_search_cp")
            .header("Referer", "https://y.qq.com/")
            .query(&[
                ("w", query.as_str()),
                ("format", "json"),
                ("p", "1"),
                ("n", "5"),
                ("cr", "1"),
                ("aggr", "1"),
            ])
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !search_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(search_text) = search_resp.text().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let search_json_slice = strip_jsonp_wrapper(&search_text);
        let Ok(search_json) = serde_json::from_str::<Value>(search_json_slice) else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(list) = search_json
            .get("data")
            .and_then(|d| d.get("song"))
            .and_then(|s| s.get("list"))
            .and_then(Value::as_array)
        else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let best_song = list.iter().min_by(|a, b| {
            if duration_sec < 10.0 {
                return std::cmp::Ordering::Equal;
            }
            let da = a
                .get("interval")
                .and_then(Value::as_f64)
                .map(|d| (d - duration_sec).abs())
                .unwrap_or(9999.0);
            let db = b
                .get("interval")
                .and_then(Value::as_f64)
                .map(|d| (d - duration_sec).abs())
                .unwrap_or(9999.0);
            da.partial_cmp(&db).unwrap_or(std::cmp::Ordering::Equal)
        });
        let Some(songmid) = best_song
            .and_then(|s| s.get("songmid"))
            .and_then(Value::as_str)
            .filter(|s| !s.is_empty())
        else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let Ok(lyric_resp) = self
            .client
            .get("https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg")
            .header("Referer", "https://y.qq.com/portal/player.html")
            .query(&[
                ("songmid", songmid),
                ("format", "json"),
                ("nobase64", "1"),
            ])
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !lyric_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(lyric_text) = lyric_resp.text().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Ok(lyric_json) = serde_json::from_str::<Value>(strip_jsonp_wrapper(&lyric_text)) else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(raw_lyric) = lyric_json
            .get("lyric")
            .and_then(Value::as_str)
            .map(str::trim)
            .filter(|s| !s.is_empty())
        else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let decoded_str = if !raw_lyric.contains('[') {
            decode_base64(raw_lyric)
                .and_then(|bytes| String::from_utf8(bytes).ok())
                .unwrap_or_else(|| raw_lyric.to_string())
        } else {
            raw_lyric.to_string()
        };
        let clean_lrc = decode_xml_entities(&decoded_str);
        let lines = parse_lrc(&clean_lrc, duration_sec);
        if !lines.is_empty() {
            return LyricsPayload {
                track_key: track_key.to_string(),
                found: true,
                synced: true,
                word_synced: false,
                lines,
                plain_text: None,
                source: "qqmusic:synced".to_string(),
            };
        }

        LyricsPayload::empty(track_key.to_string())
    }

    async fn fetch_kugou(
        &self,
        track_key: &str,
        title: &str,
        artist: &str,
        duration_sec: f64,
    ) -> LyricsPayload {
        let query = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} {}", artist.trim(), title.trim())
        };
        if query.is_empty() {
            return LyricsPayload::empty(track_key.to_string());
        }

        let mut song_hash = String::new();
        let mut song_dur_ms = if duration_sec >= 1.0 {
            (duration_sec * 1000.0).round() as i64
        } else {
            0
        };

        if let Ok(search_resp) = self
            .client
            .get("https://mobileservice.kugou.com/api/v3/search/song")
            .query(&[
                ("version", "9108"),
                ("plat", "0"),
                ("pagesize", "5"),
                ("showtype", "0"),
                ("keyword", query.as_str()),
            ])
            .send()
            .await
        {
            if search_resp.status().is_success() {
                if let Ok(search_json) = search_resp.json::<Value>().await {
                    if let Some(info) = search_json
                        .get("data")
                        .and_then(|d| d.get("info"))
                        .and_then(Value::as_array)
                        .and_then(|arr| arr.first())
                    {
                        if let Some(h) = info.get("hash").and_then(Value::as_str) {
                            song_hash = h.to_string();
                        }
                        if song_dur_ms == 0 {
                            if let Some(d) = info.get("duration").and_then(Value::as_i64) {
                                song_dur_ms = d * 1000;
                            }
                        }
                    }
                }
            }
        }

        let keyword = if artist.trim().is_empty() {
            title.trim().to_string()
        } else {
            format!("{} - {}", artist.trim(), title.trim())
        };
        let dur_str = song_dur_ms.to_string();
        let mut params: Vec<(&str, &str)> = vec![
            ("ver", "1"),
            ("man", "yes"),
            ("client", "pc"),
            ("keyword", keyword.as_str()),
        ];
        if song_dur_ms > 0 {
            params.push(("duration", dur_str.as_str()));
        }
        if !song_hash.is_empty() {
            params.push(("hash", song_hash.as_str()));
        }

        let Ok(cand_resp) = self
            .client
            .get("https://lyrics.kugou.com/search")
            .query(&params)
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !cand_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(cand_json) = cand_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(first_cand) = cand_json
            .get("candidates")
            .and_then(Value::as_array)
            .and_then(|arr| arr.first())
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(id_str) = first_cand
            .get("id")
            .and_then(Value::as_str)
            .map(str::to_string)
            .or_else(|| first_cand.get("id").and_then(Value::as_i64).map(|v| v.to_string()))
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(accesskey) = first_cand
            .get("accesskey")
            .and_then(Value::as_str)
            .filter(|s| !s.is_empty())
        else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let Ok(dl_resp) = self
            .client
            .get("https://lyrics.kugou.com/download")
            .query(&[
                ("ver", "1"),
                ("client", "pc"),
                ("id", id_str.as_str()),
                ("accesskey", accesskey),
                ("fmt", "lrc"),
                ("charset", "utf8"),
            ])
            .send()
            .await
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        if !dl_resp.status().is_success() {
            return LyricsPayload::empty(track_key.to_string());
        }
        let Ok(dl_json) = dl_resp.json::<Value>().await else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(content_b64) = dl_json
            .get("content")
            .and_then(Value::as_str)
            .filter(|s| !s.trim().is_empty())
        else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Some(bytes) = decode_base64(content_b64) else {
            return LyricsPayload::empty(track_key.to_string());
        };
        let Ok(lrc_str) = String::from_utf8(bytes) else {
            return LyricsPayload::empty(track_key.to_string());
        };

        let lines = parse_lrc(&lrc_str, duration_sec);
        if !lines.is_empty() {
            return LyricsPayload {
                track_key: track_key.to_string(),
                found: true,
                synced: true,
                word_synced: false,
                lines,
                plain_text: None,
                source: "kugou:synced".to_string(),
            };
        }

        LyricsPayload::empty(track_key.to_string())
    }
}

/// Parses Apple/Better Lyrics TTML XML into line-synced or syllable/word-synced `LyricsPayload`.
pub fn parse_ttml(track_key: &str, ttml: &str, song_end_sec: f64) -> Option<LyricsPayload> {
    let mut lines: Vec<LyricLine> = Vec::new();
    let mut any_word_synced = false;
    let mut rest = ttml;

    while let Some(p_start) = rest.find("<p") {
        let after_p = &rest[p_start + 2..];
        let Some(tag_end) = after_p.find('>') else {
            break;
        };
        let attrs = &after_p[..tag_end];
        let body_and_rest = &after_p[tag_end + 1..];
        let Some(p_close) = body_and_rest.find("</p>") else {
            break;
        };
        let inner = &body_and_rest[..p_close];
        rest = &body_and_rest[p_close + 4..];

        let Some(begin_str) = extract_xml_attr(attrs, "begin") else {
            continue;
        };
        let Some(time_sec) = parse_ttml_time(&begin_str) else {
            continue;
        };
        let end_sec = extract_xml_attr(attrs, "end")
            .and_then(|s| parse_ttml_time(&s))
            .unwrap_or_else(|| {
                if song_end_sec > time_sec + 0.5 {
                    song_end_sec
                } else {
                    time_sec + 4.0
                }
            })
            .max(time_sec + 0.35);

        let line_dur_sec = (end_sec - time_sec).max(0.35);

        let (line_text, words, line_has_spans) =
            parse_ttml_p_inner(inner, time_sec, line_dur_sec);
        if line_text.is_empty() {
            continue;
        }
        if line_has_spans {
            any_word_synced = true;
        }

        lines.push(LyricLine {
            time_sec,
            end_sec,
            text: line_text,
            words,
        });
    }

    if lines.is_empty() {
        return None;
    }

    lines.sort_by(|a, b| {
        a.time_sec
            .partial_cmp(&b.time_sec)
            .unwrap_or(std::cmp::Ordering::Equal)
    });

    Some(LyricsPayload {
        track_key: track_key.to_string(),
        found: true,
        synced: true,
        word_synced: any_word_synced,
        lines,
        plain_text: None,
        source: if any_word_synced {
            "boidu:word".to_string()
        } else {
            "boidu:line".to_string()
        },
    })
}

fn parse_ttml_p_inner(
    inner: &str,
    line_start_sec: f64,
    line_dur_sec: f64,
) -> (String, Vec<LyricWord>, bool) {
    let mut cursor = inner;
    let mut spans: Vec<(f64, f64, String, bool)> = Vec::new();

    while let Some(span_start) = cursor.find("<span") {
        let gap_before = &cursor[..span_start];
        let had_gap_space = gap_before.chars().any(char::is_whitespace);

        let after_span = &cursor[span_start + 5..];
        let Some(tag_end) = after_span.find('>') else {
            break;
        };
        let attrs = &after_span[..tag_end];
        let content_start = &after_span[tag_end + 1..];

        // Find matching </span> accounting for any nested <span> tags (e.g. ttm:role="x-bg")
        let mut depth = 1usize;
        let mut search_pos = 0usize;
        let mut close_idx = None;
        while search_pos < content_start.len() {
            let next_open = content_start[search_pos..].find("<span");
            let next_close = content_start[search_pos..].find("</span>");
            match (next_open, next_close) {
                (Some(o), Some(c)) if o < c => {
                    depth += 1;
                    search_pos += o + 5;
                }
                (_, Some(c)) => {
                    depth -= 1;
                    if depth == 0 {
                        close_idx = Some(search_pos + c);
                        break;
                    }
                    search_pos += c + 7;
                }
                _ => break,
            }
        }

        let Some(c_idx) = close_idx else {
            break;
        };
        let span_inner = &content_start[..c_idx];
        cursor = &content_start[c_idx + 7..];

        // Skip background-vocal container spans so main lyric word flow stays clean
        if attrs.contains("x-bg") {
            continue;
        }

        if let (Some(b_str), Some(e_str)) = (
            extract_xml_attr(attrs, "begin"),
            extract_xml_attr(attrs, "end"),
        ) {
            if let (Some(b), Some(e)) = (parse_ttml_time(&b_str), parse_ttml_time(&e_str)) {
                let text = decode_xml_entities(&strip_xml_tags(span_inner));
                if !text.is_empty() {
                    spans.push((b, e.max(b + 0.04), text, had_gap_space));
                }
            }
        }
    }

    if !spans.is_empty() {
        let mut words: Vec<LyricWord> = Vec::new();
        let mut full_line = String::new();
        let mut cur_text = String::new();
        let mut cur_start: Option<f64> = None;
        let mut cur_end = line_start_sec;

        let flush = |words: &mut Vec<LyricWord>,
                     full_line: &mut String,
                     cur_text: &mut String,
                     cur_start: &mut Option<f64>,
                     cur_end: f64| {
            let trimmed = cur_text.trim();
            if !trimmed.is_empty() {
                if !full_line.is_empty() {
                    full_line.push(' ');
                }
                full_line.push_str(trimmed);
                if let Some(s) = *cur_start {
                    let offset_ratio = ((s - line_start_sec) / line_dur_sec).clamp(0.0, 0.98);
                    let dur_ratio =
                        ((cur_end - s) / line_dur_sec).clamp(0.02, 1.0 - offset_ratio);
                    words.push(LyricWord {
                        text: trimmed.to_string(),
                        offset_ratio,
                        duration_ratio: dur_ratio,
                    });
                }
            }
            cur_text.clear();
            *cur_start = None;
        };

        for (b, e, text, had_gap_space) in spans {
            if had_gap_space && !cur_text.is_empty() {
                flush(
                    &mut words,
                    &mut full_line,
                    &mut cur_text,
                    &mut cur_start,
                    cur_end,
                );
            }
            if cur_start.is_none() {
                cur_start = Some(b);
            }
            cur_text.push_str(&text);
            cur_end = e;

            if text.ends_with(char::is_whitespace) {
                flush(
                    &mut words,
                    &mut full_line,
                    &mut cur_text,
                    &mut cur_start,
                    cur_end,
                );
            }
        }

        flush(
            &mut words,
            &mut full_line,
            &mut cur_text,
            &mut cur_start,
            cur_end,
        );

        if !words.is_empty() && !full_line.is_empty() {
            return (full_line, words, true);
        }
    }

    let plain = decode_xml_entities(&strip_xml_tags(inner))
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ");
    let words = split_words_with_timing(&plain);
    (plain, words, false)
}

fn extract_xml_attr(attrs: &str, name: &str) -> Option<String> {
    let patterns = [format!("{name}=\""), format!("{name}='")];
    for pat in patterns {
        if let Some(idx) = attrs.find(&pat) {
            // Ensure attribute boundary (start of string or whitespace before attribute name)
            if idx == 0 || attrs[..idx].ends_with(char::is_whitespace) {
                let quote = pat.chars().last().unwrap();
                let val_start = idx + pat.len();
                if let Some(val_end) = attrs[val_start..].find(quote) {
                    return Some(attrs[val_start..val_start + val_end].to_string());
                }
            }
        }
    }
    None
}

fn parse_ttml_time(raw: &str) -> Option<f64> {
    let s = raw.trim().trim_end_matches('s');
    let parts: Vec<&str> = s.split(':').collect();
    match parts.len() {
        1 => parts[0].parse::<f64>().ok(),
        2 => {
            let m = parts[0].parse::<f64>().ok()?;
            let sec = parts[1].parse::<f64>().ok()?;
            Some(m * 60.0 + sec)
        }
        3 => {
            let h = parts[0].parse::<f64>().ok()?;
            let m = parts[1].parse::<f64>().ok()?;
            let sec = parts[2].parse::<f64>().ok()?;
            Some(h * 3600.0 + m * 60.0 + sec)
        }
        _ => None,
    }
}

fn strip_xml_tags(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut in_tag = false;
    for ch in input.chars() {
        if ch == '<' {
            in_tag = true;
        } else if ch == '>' {
            in_tag = false;
        } else if !in_tag {
            out.push(ch);
        }
    }
    out
}

fn decode_xml_entities(input: &str) -> String {
    input
        .replace("&amp;", "&")
        .replace("&apos;", "'")
        .replace("&#39;", "'")
        .replace("&quot;", "\"")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
}

pub fn parse_lyricsplus_json(
    track_key: &str,
    raw_json: &str,
    song_end_sec: f64,
) -> Option<LyricsPayload> {
    let parsed: LyricsPlusResponse = serde_json::from_str(raw_json).ok()?;
    let raw_lines = parsed.lyrics?;
    if raw_lines.is_empty() {
        return None;
    }

    let is_word_type = parsed
        .kind
        .as_deref()
        .is_some_and(|k| k.eq_ignore_ascii_case("word"));

    let mut lines: Vec<LyricLine> = Vec::new();
    let mut has_word_timings = false;

    for (idx, item) in raw_lines.iter().enumerate() {
        let Some(start_ms) = item.time else {
            continue;
        };
        let text = item.text.as_deref().unwrap_or("").trim().to_string();
        if text.is_empty() {
            continue;
        }

        let time_sec = (start_ms as f64 / 1000.0).max(0.0);
        let raw_dur_ms = item.duration.unwrap_or(0);
        let next_start_sec = raw_lines
            .get(idx + 1)
            .and_then(|n| n.time)
            .map(|t| t as f64 / 1000.0);

        let mut end_sec = if raw_dur_ms > 200 {
            time_sec + (raw_dur_ms as f64 / 1000.0)
        } else if let Some(next_t) = next_start_sec {
            next_t
        } else if song_end_sec > time_sec + 0.5 {
            song_end_sec
        } else {
            time_sec + 4.5
        };

        if let Some(next_t) = next_start_sec {
            if next_t > time_sec + 0.35 {
                end_sec = end_sec.min(next_t);
            }
        }
        end_sec = end_sec.max(time_sec + 0.35);

        let line_dur_sec = (end_sec - time_sec).max(0.35);
        let words = if is_word_type {
            if let Some(syllables) = item.syllabus.as_deref().filter(|s| !s.is_empty()) {
                let merged = merge_lyricsplus_syllables(syllables, time_sec, line_dur_sec);
                if !merged.is_empty() {
                    has_word_timings = true;
                    merged
                } else {
                    split_words_with_timing(&text)
                }
            } else {
                split_words_with_timing(&text)
            }
        } else {
            split_words_with_timing(&text)
        };

        lines.push(LyricLine {
            time_sec,
            end_sec,
            text,
            words,
        });
    }

    if lines.is_empty() {
        return None;
    }

    Some(LyricsPayload {
        track_key: track_key.to_string(),
        found: true,
        synced: true,
        word_synced: has_word_timings,
        lines,
        plain_text: None,
        source: if has_word_timings {
            "lyricsplus:word".to_string()
        } else {
            "lyricsplus:line".to_string()
        },
    })
}

/// Merges syllable timing entries (like `["e", "nough"]`) into full word tokens with exact start/duration ratios.
fn merge_lyricsplus_syllables(
    syllables: &[LyricsPlusSyllabus],
    line_start_sec: f64,
    line_dur_sec: f64,
) -> Vec<LyricWord> {
    let mut words: Vec<LyricWord> = Vec::new();
    let mut current_text = String::new();
    let mut current_start_sec: Option<f64> = None;
    let mut current_end_sec: f64 = line_start_sec;

    let flush = |words: &mut Vec<LyricWord>,
                 text: &mut String,
                 start_opt: &mut Option<f64>,
                 end_sec: f64| {
        let trimmed = text.trim();
        if !trimmed.is_empty() {
            if let Some(s) = *start_opt {
                let offset_ratio = ((s - line_start_sec) / line_dur_sec).clamp(0.0, 0.98);
                let dur_ratio = ((end_sec - s) / line_dur_sec).clamp(0.02, 1.0 - offset_ratio);
                words.push(LyricWord {
                    text: trimmed.to_string(),
                    offset_ratio,
                    duration_ratio: dur_ratio,
                });
            }
        }
        text.clear();
        *start_opt = None;
    };

    for syl in syllables {
        let raw_text = syl.text.as_deref().unwrap_or("");
        if raw_text.is_empty() {
            continue;
        }
        let syl_start = syl
            .time
            .map(|t| (t as f64) / 1000.0)
            .unwrap_or(current_end_sec);
        let syl_dur = (syl.duration.unwrap_or(150).max(40) as f64) / 1000.0;
        let syl_end = syl_start + syl_dur;

        if current_start_sec.is_none() {
            current_start_sec = Some(syl_start);
        }
        current_text.push_str(raw_text);
        current_end_sec = syl_end;

        if raw_text.ends_with(char::is_whitespace) {
            flush(
                &mut words,
                &mut current_text,
                &mut current_start_sec,
                current_end_sec,
            );
        }
    }

    flush(
        &mut words,
        &mut current_text,
        &mut current_start_sec,
        current_end_sec,
    );
    words
}

fn find_first_string_for_key(value: &Value, target_key: &str) -> Option<String> {
    match value {
        Value::Object(map) => {
            if let Some(Value::String(s)) = map.get(target_key) {
                if !s.is_empty() {
                    return Some(s.clone());
                }
            }
            for v in map.values() {
                if let Some(found) = find_first_string_for_key(v, target_key) {
                    return Some(found);
                }
            }
            None
        }
        Value::Array(arr) => arr
            .iter()
            .find_map(|v| find_first_string_for_key(v, target_key)),
        _ => None,
    }
}

fn find_string_with_prefix(value: &Value, target_key: &str, prefix: &str) -> Option<String> {
    match value {
        Value::Object(map) => {
            if let Some(Value::String(s)) = map.get(target_key) {
                if s.starts_with(prefix) {
                    return Some(s.clone());
                }
            }
            for v in map.values() {
                if let Some(found) = find_string_with_prefix(v, target_key, prefix) {
                    return Some(found);
                }
            }
            None
        }
        Value::Array(arr) => arr
            .iter()
            .find_map(|v| find_string_with_prefix(v, target_key, prefix)),
        _ => None,
    }
}

fn find_array_for_key<'a>(value: &'a Value, target_key: &str) -> Option<&'a Vec<Value>> {
    match value {
        Value::Object(map) => {
            if let Some(Value::Array(arr)) = map.get(target_key) {
                return Some(arr);
            }
            for v in map.values() {
                if let Some(found) = find_array_for_key(v, target_key) {
                    return Some(found);
                }
            }
            None
        }
        Value::Array(arr) => arr.iter().find_map(|v| find_array_for_key(v, target_key)),
        _ => None,
    }
}

fn find_object_for_key<'a>(
    value: &'a Value,
    target_key: &str,
) -> Option<&'a serde_json::Map<String, Value>> {
    match value {
        Value::Object(map) => {
            if let Some(Value::Object(obj)) = map.get(target_key) {
                return Some(obj);
            }
            for v in map.values() {
                if let Some(found) = find_object_for_key(v, target_key) {
                    return Some(found);
                }
            }
            None
        }
        Value::Array(arr) => arr.iter().find_map(|v| find_object_for_key(v, target_key)),
        _ => None,
    }
}

fn extract_ytmusic_timed_lyrics(root: &Value) -> Option<Vec<LyricLine>> {
    let items = find_array_for_key(root, "timedLyricsData")?;
    let mut lines: Vec<LyricLine> = Vec::new();

    for item in items {
        let text = item
            .get("lyricLine")
            .and_then(Value::as_str)
            .unwrap_or("")
            .trim()
            .to_string();
        if text.is_empty() {
            continue;
        }
        let cue = item.get("cueRange")?;
        let start_ms = cue
            .get("startTimeMilliseconds")
            .and_then(|v| {
                v.as_str()
                    .and_then(|s| s.parse::<f64>().ok())
                    .or_else(|| v.as_f64())
            })?;
        let end_ms = cue
            .get("endTimeMilliseconds")
            .and_then(|v| {
                v.as_str()
                    .and_then(|s| s.parse::<f64>().ok())
                    .or_else(|| v.as_f64())
            })
            .unwrap_or(start_ms + 4000.0);

        let time_sec = (start_ms / 1000.0).max(0.0);
        let end_sec = (end_ms / 1000.0).max(time_sec + 0.4);
        let words = split_words_with_timing(&text);

        lines.push(LyricLine {
            time_sec,
            end_sec,
            text,
            words,
        });
    }

    if lines.is_empty() {
        None
    } else {
        Some(lines)
    }
}

fn extract_ytmusic_plain_lyrics(root: &Value) -> Option<String> {
    let shelf = find_object_for_key(root, "musicDescriptionShelfRenderer")?;
    let desc = shelf.get("description")?;
    let runs = desc.get("runs")?.as_array()?;
    let mut text = String::new();
    for run in runs {
        if let Some(part) = run.get("text").and_then(Value::as_str) {
            text.push_str(part);
        }
    }
    let trimmed = text.trim().to_string();
    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed)
    }
}

fn has_usable_lyrics(rec: &LrclibRecord) -> bool {
    rec.synced_lyrics
        .as_deref()
        .is_some_and(|s| !s.trim().is_empty())
        || rec
            .plain_lyrics
            .as_deref()
            .is_some_and(|s| !s.trim().is_empty())
}

fn pick_best_candidate(candidates: Vec<LrclibRecord>, target_duration: f64) -> Option<LrclibRecord> {
    let mut synced: Vec<LrclibRecord> = Vec::new();
    let mut plain: Vec<LrclibRecord> = Vec::new();

    for rec in candidates {
        if rec
            .synced_lyrics
            .as_deref()
            .is_some_and(|s| !s.trim().is_empty())
        {
            synced.push(rec);
        } else if rec
            .plain_lyrics
            .as_deref()
            .is_some_and(|s| !s.trim().is_empty())
        {
            plain.push(rec);
        }
    }

    let choose = |mut list: Vec<LrclibRecord>| -> Option<LrclibRecord> {
        if list.is_empty() {
            return None;
        }
        if target_duration >= 10.0 {
            list.sort_by(|a, b| {
                let da = a
                    .duration
                    .map(|d| (d - target_duration).abs())
                    .unwrap_or(9999.0);
                let db = b
                    .duration
                    .map(|d| (d - target_duration).abs())
                    .unwrap_or(9999.0);
                da.partial_cmp(&db).unwrap_or(std::cmp::Ordering::Equal)
            });
        }
        list.into_iter().next()
    };

    choose(synced).or_else(|| choose(plain))
}

fn record_to_payload(
    track_key: &str,
    rec: LrclibRecord,
    duration_sec: f64,
    source: &str,
) -> LyricsPayload {
    if let Some(synced) = rec.synced_lyrics.filter(|s| !s.trim().is_empty()) {
        let effective_duration = rec.duration.unwrap_or(duration_sec);
        let lines = parse_lrc(&synced, effective_duration);
        if !lines.is_empty() {
            return LyricsPayload {
                track_key: track_key.to_string(),
                found: true,
                synced: true,
                word_synced: false,
                lines,
                plain_text: rec.plain_lyrics,
                source: source.to_string(),
            };
        }
    }

    if let Some(plain) = rec.plain_lyrics.filter(|s| !s.trim().is_empty()) {
        return LyricsPayload {
            track_key: track_key.to_string(),
            found: true,
            synced: false,
            word_synced: false,
            lines: Vec::new(),
            plain_text: Some(plain),
            source: source.to_string(),
        };
    }

    LyricsPayload::empty(track_key.to_string())
}

pub fn split_artist_title(artist: &str, title: &str) -> (String, String) {
    let a = artist.trim();
    let t = title.trim();
    if a.is_empty() {
        if let Some((left, right)) = t.split_once(" - ") {
            return (left.trim().to_string(), right.trim().to_string());
        }
    }
    (a.to_string(), t.to_string())
}

pub fn clean_track_title(title: &str) -> String {
    let stripped = strip_bracket_noise(title, '(', ')');
    let stripped = strip_bracket_noise(&stripped, '[', ']');
    stripped.split_whitespace().collect::<Vec<_>>().join(" ")
}

pub fn clean_artist_name(artist: &str) -> String {
    let first = artist.split([',', '&']).next().unwrap_or(artist).trim();
    first.trim_end_matches(" - Topic").trim().to_string()
}

fn strip_bracket_noise(input: &str, open: char, close: char) -> String {
    const NOISE_KEYWORDS: &[&str] = &[
        "official",
        "video",
        "audio",
        "lyric",
        "lyrics",
        "remaster",
        "feat",
        "ft.",
        "visualizer",
        "hd",
        "4k",
        "live",
        "explicit",
        "clean",
        "version",
        "edit",
        "mono",
        "stereo",
    ];

    let mut out = String::with_capacity(input.len());
    let mut rest = input;
    while let Some(start) = rest.find(open) {
        out.push_str(&rest[..start]);
        let after_open = &rest[start + open.len_utf8()..];
        if let Some(end) = after_open.find(close) {
            let inside = &after_open[..end];
            let lower = inside.to_lowercase();
            let is_noise = NOISE_KEYWORDS.iter().any(|kw| lower.contains(kw));
            if !is_noise {
                out.push(open);
                out.push_str(inside);
                out.push(close);
            }
            rest = &after_open[end + close.len_utf8()..];
        } else {
            out.push(open);
            out.push_str(after_open);
            rest = "";
            break;
        }
    }
    out.push_str(rest);
    out
}

/// Parses standard LRC text into sorted `LyricLine` items with weighted word timing ratios.
pub fn parse_lrc(lrc: &str, song_end_sec: f64) -> Vec<LyricLine> {
    let mut raw_entries: Vec<(f64, String)> = Vec::new();

    for raw_line in lrc.lines() {
        let mut cursor = raw_line.trim();
        let mut timestamps: Vec<f64> = Vec::new();

        while cursor.starts_with('[') {
            let Some(close_idx) = cursor.find(']') else {
                break;
            };
            let tag = &cursor[1..close_idx];
            if let Some(ts) = parse_timestamp(tag) {
                timestamps.push(ts);
                cursor = cursor[close_idx + 1..].trim_start();
            } else {
                break;
            }
        }

        if timestamps.is_empty() {
            continue;
        }

        let text = cursor.trim().to_string();
        for ts in timestamps {
            raw_entries.push((ts, text.clone()));
        }
    }

    raw_entries.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap_or(std::cmp::Ordering::Equal));

    let mut lines: Vec<LyricLine> = Vec::new();
    for i in 0..raw_entries.len() {
        let (time_sec, ref text) = raw_entries[i];
        if text.is_empty() {
            continue;
        }

        let next_ts = raw_entries
            .get(i + 1)
            .map(|(t, _)| *t)
            .unwrap_or_else(|| {
                if song_end_sec > time_sec + 0.5 {
                    song_end_sec
                } else {
                    time_sec + 5.0
                }
            });

        let end_sec = next_ts.max(time_sec + 0.4).min(time_sec + 8.5);
        let words = split_words_with_timing(text);

        lines.push(LyricLine {
            time_sec,
            end_sec,
            text: text.clone(),
            words,
        });
    }

    lines
}

fn parse_timestamp(tag: &str) -> Option<f64> {
    let (min_str, sec_part) = tag.trim().split_once(':')?;
    let minutes: f64 = min_str.parse().ok()?;
    let seconds: f64 = sec_part.parse().ok()?;
    if minutes < 0.0 || seconds < 0.0 || seconds >= 60.0 {
        return None;
    }
    Some(minutes * 60.0 + seconds)
}

fn split_words_with_timing(text: &str) -> Vec<LyricWord> {
    let tokens: Vec<&str> = text.split_whitespace().collect();
    if tokens.is_empty() {
        return Vec::new();
    }

    let weights: Vec<f64> = tokens
        .iter()
        .map(|w| {
            let char_count = w.chars().filter(|c| c.is_alphanumeric()).count().max(1);
            1.4 + (char_count as f64) * 0.65
        })
        .collect();

    let total_weight: f64 = weights.iter().sum();
    let span = 0.92;
    let mut cursor = 0.0;
    let mut words = Vec::with_capacity(tokens.len());

    for (token, weight) in tokens.into_iter().zip(weights.into_iter()) {
        let ratio = (weight / total_weight) * span;
        words.push(LyricWord {
            text: token.to_string(),
            offset_ratio: cursor,
            duration_ratio: ratio,
        });
        cursor += ratio;
    }

    words
}

fn select_stage_result(
    stage: &[(&str, Option<LyricsPayload>)],
    plain_candidates: &mut Vec<LyricsPayload>,
) -> Option<LyricsPayload> {
    for (_, item) in stage {
        if let Some(p) = item {
            if p.synced && p.word_synced {
                return Some(p.clone());
            }
        }
    }
    for (_, item) in stage {
        if let Some(p) = item {
            if p.synced {
                return Some(p.clone());
            }
        }
    }
    for (_, item) in stage {
        if let Some(p) = item {
            if p.found {
                plain_candidates.push(p.clone());
            }
        }
    }
    None
}

fn strip_jsonp_wrapper(text: &str) -> &str {
    let t = text.trim();
    if t.starts_with('{') || t.starts_with('[') {
        return t;
    }
    if let (Some(open), Some(close)) = (t.find('('), t.rfind(')')) {
        if close > open {
            return t[open + 1..close].trim();
        }
    }
    t
}

fn decode_base64(input: &str) -> Option<Vec<u8>> {
    let mut out = Vec::with_capacity((input.len() * 3) / 4);
    let mut buf: u32 = 0;
    let mut bits: u8 = 0;
    for b in input.bytes() {
        let val = match b {
            b'A'..=b'Z' => b - b'A',
            b'a'..=b'z' => b - b'a' + 26,
            b'0'..=b'9' => b - b'0' + 52,
            b'+' => 62,
            b'/' => 63,
            b'=' | b'\r' | b'\n' | b' ' | b'\t' => continue,
            _ => return None,
        };
        buf = (buf << 6) | (val as u32);
        bits += 6;
        if bits >= 8 {
            bits -= 8;
            out.push(((buf >> bits) & 0xff) as u8);
        }
    }
    Some(out)
}

fn is_cjk_char(ch: char) -> bool {
    matches!(
        ch,
        '\u{3040}'..='\u{30FF}'
            | '\u{3400}'..='\u{4DBF}'
            | '\u{4E00}'..='\u{9FFF}'
            | '\u{AC00}'..='\u{D7AF}'
    )
}

/// Parses NetEase YRC word-synced lyrics (`[lineStartMs,lineDurMs](wordStartMs,wordDurMs,flag)token...`).
pub fn parse_netease_yrc(yrc: &str, song_end_sec: f64) -> Vec<LyricLine> {
    let mut lines: Vec<LyricLine> = Vec::new();
    for raw_line in yrc.lines() {
        let line = raw_line.trim();
        if !line.starts_with('[') {
            continue;
        }
        let Some(close_bracket) = line.find(']') else {
            continue;
        };
        let header = &line[1..close_bracket];
        let Some((ls_str, ld_str)) = header.split_once(',') else {
            continue;
        };
        let Ok(line_start_ms) = ls_str.trim().parse::<f64>() else {
            continue;
        };
        let Ok(line_dur_ms) = ld_str.trim().parse::<f64>() else {
            continue;
        };
        let time_sec = (line_start_ms / 1000.0).max(0.0);
        let fallback_dur = if line_dur_ms > 100.0 {
            line_dur_ms / 1000.0
        } else if song_end_sec > time_sec + 0.5 {
            song_end_sec - time_sec
        } else {
            4.0
        };
        let line_dur_sec = fallback_dur.max(0.35);
        let end_sec = time_sec + line_dur_sec;

        let mut rest = &line[close_bracket + 1..];
        let mut words: Vec<LyricWord> = Vec::new();
        let mut full_line = String::new();
        let mut cur_text = String::new();
        let mut cur_start_sec: Option<f64> = None;
        let mut cur_end_sec: f64 = time_sec;

        let flush = |words: &mut Vec<LyricWord>,
                     full_line: &mut String,
                     cur_text: &mut String,
                     cur_start_sec: &mut Option<f64>,
                     cur_end_sec: f64| {
            let trimmed = cur_text.trim().to_string();
            if trimmed.is_empty() {
                cur_text.clear();
                *cur_start_sec = None;
                return;
            }
            if !full_line.is_empty() {
                full_line.push(' ');
            }
            full_line.push_str(&trimmed);
            let s = cur_start_sec.unwrap_or(time_sec);
            let offset_ratio = ((s - time_sec) / line_dur_sec).clamp(0.0, 0.96);
            let duration_ratio = ((cur_end_sec - s).max(0.05) / line_dur_sec).clamp(0.03, 0.96);
            words.push(LyricWord {
                text: trimmed,
                offset_ratio,
                duration_ratio,
            });
            cur_text.clear();
            *cur_start_sec = None;
        };

        while let Some(open_paren) = rest.find('(') {
            let after_open = &rest[open_paren + 1..];
            let Some(close_paren) = after_open.find(')') else {
                break;
            };
            let tuple = &after_open[..close_paren];
            let after_tuple = &after_open[close_paren + 1..];
            let next_paren = after_tuple.find('(').unwrap_or(after_tuple.len());
            let tok = &after_tuple[..next_paren];
            rest = &after_tuple[next_paren..];

            let mut parts = tuple.split(',');
            let w_start_ms = parts
                .next()
                .and_then(|s| s.trim().parse::<f64>().ok())
                .unwrap_or(line_start_ms);
            let w_dur_ms = parts
                .next()
                .and_then(|s| s.trim().parse::<f64>().ok())
                .unwrap_or(220.0);
            if tok.is_empty() {
                continue;
            }
            let sb = (w_start_ms / 1000.0).max(time_sec);
            let se = sb + (w_dur_ms.max(40.0) / 1000.0);

            let trimmed_tok = tok.trim();
            if trimmed_tok.is_empty() {
                flush(&mut words, &mut full_line, &mut cur_text, &mut cur_start_sec, cur_end_sec);
                continue;
            }

            let starts_ws = tok.starts_with(char::is_whitespace);
            let ends_ws = tok.ends_with(char::is_whitespace);
            let cur_is_cjk = cur_text.chars().last().is_some_and(is_cjk_char);
            let tok_is_cjk = trimmed_tok.chars().next().is_some_and(is_cjk_char);

            if starts_ws || cur_is_cjk || tok_is_cjk {
                flush(&mut words, &mut full_line, &mut cur_text, &mut cur_start_sec, cur_end_sec);
            }
            cur_text.push_str(trimmed_tok);
            if cur_start_sec.is_none() {
                cur_start_sec = Some(sb);
            }
            cur_end_sec = se;
            if ends_ws {
                flush(&mut words, &mut full_line, &mut cur_text, &mut cur_start_sec, cur_end_sec);
            }
        }
        flush(&mut words, &mut full_line, &mut cur_text, &mut cur_start_sec, cur_end_sec);

        if !full_line.is_empty() && !words.is_empty() {
            lines.push(LyricLine {
                time_sec,
                end_sec,
                text: full_line,
                words,
            });
        }
    }
    lines.sort_by(|a, b| a.time_sec.partial_cmp(&b.time_sec).unwrap_or(std::cmp::Ordering::Equal));
    lines
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_multi_timestamp_and_sorts() {
        let lrc = "\
[ar:Ghost]
[00:10.50][00:30.00] Chorus stars ignite
[00:05.25] First line here
[00:08.00]
";
        let lines = parse_lrc(lrc, 60.0);
        assert_eq!(lines.len(), 3);
        assert!((lines[0].time_sec - 5.25).abs() < 1e-6);
        assert!((lines[0].end_sec - 8.00).abs() < 1e-6);
        assert_eq!(lines[0].words.len(), 3);
        assert!((lines[1].time_sec - 10.50).abs() < 1e-6);
        assert!((lines[2].time_sec - 30.00).abs() < 1e-6);
        assert!(lines[1].words[0].offset_ratio == 0.0);
        assert!(lines[1].words[2].offset_ratio > lines[1].words[1].offset_ratio);
    }

    #[test]
    fn cleans_title_and_splits_fallback() {
        let (artist, title) = split_artist_title("", "Ghost - Spillways (Official Music Video)");
        assert_eq!(artist, "Ghost");
        assert_eq!(clean_track_title(&title), "Spillways");
        assert_eq!(
            clean_track_title("Starlight (2024 Remaster) [Lyrics] (Acoustic)"),
            "Starlight (Acoustic)"
        );
    }

    #[test]
    fn parses_lyricsplus_word_and_merges_syllables() {
        let sample = r#"{
            "type": "Word",
            "lyrics": [
                {
                    "time": 10000,
                    "duration": 2000,
                    "text": "long enough",
                    "syllabus": [
                        { "time": 10000, "duration": 600, "text": "long " },
                        { "time": 10600, "duration": 400, "text": "e" },
                        { "time": 11000, "duration": 1000, "text": "nough" }
                    ]
                }
            ]
        }"#;
        let payload = parse_lyricsplus_json("artist|song", sample, 180.0).unwrap();
        assert!(payload.found);
        assert!(payload.synced);
        assert!(payload.word_synced);
        assert_eq!(payload.source, "lyricsplus:word");
        assert_eq!(payload.lines.len(), 1);
        assert_eq!(payload.lines[0].words.len(), 2);
        assert_eq!(payload.lines[0].words[0].text, "long");
        assert_eq!(payload.lines[0].words[1].text, "enough");
        assert!((payload.lines[0].words[1].offset_ratio - 0.3).abs() < 1e-6);
    }

    #[test]
    fn parses_ttml_line_and_word_formats() {
        let line_ttml = r#"<tt xmlns="http://www.w3.org/ns/ttml" itunes:timing="Line"><body><div><p begin="7.924" end="9.262">Through benediction</p><p begin="1:09.686" end="1:11.623">You tried &amp; won</p></div></body></tt>"#;
        let p1 = parse_ttml("ghost|spillways", line_ttml, 197.0).unwrap();
        assert!(p1.found && p1.synced && !p1.word_synced);
        assert_eq!(p1.source, "boidu:line");
        assert_eq!(p1.lines.len(), 2);
        assert!((p1.lines[0].time_sec - 7.924).abs() < 1e-6);
        assert_eq!(p1.lines[1].text, "You tried & won");
        assert!((p1.lines[1].time_sec - 69.686).abs() < 1e-6);

        let word_ttml = r#"<tt xmlns="http://www.w3.org/ns/ttml" itunes:timing="Word"><body><div><p begin="10.000" end="12.000"><span begin="10.000" end="10.600">Star</span><span begin="10.600" end="11.000">light</span> <span begin="11.100" end="11.900">shines</span><span ttm:role="x-bg"><span begin="11.200" end="11.800">oh</span></span></p></div></body></tt>"#;
        let p2 = parse_ttml("a|b", word_ttml, 120.0).unwrap();
        assert!(p2.found && p2.synced && p2.word_synced);
        assert_eq!(p2.source, "boidu:word");
        assert_eq!(p2.lines[0].text, "Starlight shines");
        assert_eq!(p2.lines[0].words.len(), 2);
        assert_eq!(p2.lines[0].words[0].text, "Starlight");
        assert_eq!(p2.lines[0].words[1].text, "shines");
        assert!((p2.lines[0].words[1].offset_ratio - 0.55).abs() < 1e-6);
    }

    fn make_mock_payload(source: &str, synced: bool, word_synced: bool, found: bool) -> LyricsPayload {
        LyricsPayload {
            track_key: "a|b".to_string(),
            found,
            synced,
            word_synced,
            lines: Vec::new(),
            plain_text: found.then(|| format!("plain:{source}")),
            source: source.to_string(),
        }
    }

    #[test]
    fn parses_netease_yrc_word_tokens_and_base64() {
        let b64 = "WzAwOjA1LjAwXSBIZWxsbyBXb3JsZA==";
        let decoded = String::from_utf8(decode_base64(b64).unwrap()).unwrap();
        assert_eq!(decoded, "[00:05.00] Hello World");

        let yrc = "[10000,2000](10000,500,0)Star(10500,400,0)light (10900,800,0)shines";
        let lines = parse_netease_yrc(yrc, 120.0);
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0].text, "Starlight shines");
        assert_eq!(lines[0].words.len(), 2);
        assert_eq!(lines[0].words[0].text, "Starlight");
        assert_eq!(lines[0].words[1].text, "shines");
    }

    #[test]
    fn stage_selection_prefers_word_synced_then_synced_then_plain() {
        let limusic_word = make_mock_payload("limusic:word", true, true, true);
        let lrclib_line = make_mock_payload("lrclib:synced", true, false, true);
        let netease_plain = make_mock_payload("netease:plain", false, false, true);

        let mut plains = Vec::new();
        let stage_res = select_stage_result(
            &[
                ("lrclib", Some(lrclib_line.clone())),
                ("limusic", Some(limusic_word.clone())),
            ],
            &mut plains,
        )
        .unwrap();
        assert_eq!(stage_res.source, "limusic:word");

        let prefs = LyricProviderPrefs::default();
        assert!(prefs.is_enabled("limusic"));
        assert!(prefs.is_enabled("unison"));
        assert!(prefs.is_enabled("netease"));
        assert!(prefs.is_enabled("qqmusic"));
        assert!(prefs.is_enabled("kugou"));

        let mut plains_only = Vec::new();
        assert!(select_stage_result(&[("netease", Some(netease_plain))], &mut plains_only).is_none());
        assert_eq!(plains_only.len(), 1);
        assert_eq!(plains_only[0].source, "netease:plain");
    }
}
