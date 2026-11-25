// Lightweight client-side lyrics engine for standalone browser / Wallpaper Engine Web CEF mode.
// Strict provider hierarchy: Preferred Source -> Tier 1 (Limusic, Boidu) -> Tier 2 (LyricsPlus) -> Tier 3 (Unison, LRCLIB, Netease, YT Music, QQ Music, Kugou).

function splitWordsTimed(text) {
  const tokens = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const weights = tokens.map((w) => 1.4 + Math.max(1, w.replace(/[^a-z0-9]/gi, '').length) * 0.65);
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let cursor = 0;
  return tokens.map((word, idx) => {
    const ratio = (weights[idx] / total) * 0.92;
    const item = { text: word, offsetRatio: cursor, durationRatio: ratio };
    cursor += ratio;
    return item;
  });
}

function cleanTrackMeta(rawArtist, rawTitle) {
  let derivedArtist = String(rawArtist || '').trim();
  let derivedTitle = String(rawTitle || '').trim();
  if (!derivedArtist && derivedTitle.includes(' - ')) {
    const idx = derivedTitle.indexOf(' - ');
    derivedArtist = derivedTitle.slice(0, idx).trim();
    derivedTitle = derivedTitle.slice(idx + 3).trim();
  }
  const title = derivedTitle
    .replace(/\s*[\(\[][^)\]]*(official|lyric|lyrics|audio|video|visualizer|remaster|explicit|clean|version|edit|hd|4k|live|feat\.|ft\.)[^)\]]*[\)\]]/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const artist = derivedArtist
    .split(/\s*(?:,|&|feat\.|ft\.)\s*/i)[0]
    .replace(/\s*-\s*Topic$/i, '')
    .trim();
  return { artist, title, derivedArtist, derivedTitle };
}

function parseTtmlTime(str) {
  const s = String(str || '').trim();
  if (!s) return null;
  if (/^\d+(\.\d+)?s?$/.test(s)) return parseFloat(s);
  const parts = s.split(':').map((p) => parseFloat(p));
  if (parts.some((n) => !Number.isFinite(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return null;
}

function parseTtmlLyrics(trackKey, xmlText, durationSec) {
  if (typeof DOMParser === 'undefined' || !xmlText) return null;
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) return null;

  const ps = [...doc.querySelectorAll('p')];
  const lines = [];
  let hasWordTiming = false;

  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    const begin = parseTtmlTime(p.getAttribute('begin'));
    const endAttr = parseTtmlTime(p.getAttribute('end'));
    if (begin === null) continue;

    const wordsRaw = [];
    let curText = '';
    let curStart = null;
    let curEnd = null;
    const flushWord = () => {
      if (curText) {
        wordsRaw.push({ text: curText, begin: curStart, end: curEnd });
        curText = '';
        curStart = null;
        curEnd = null;
      }
    };
    const walkTtmlNodes = (node, activeBegin, activeEnd) => {
      if (node.nodeType === 3) {
        const val = node.nodeValue || '';
        if (!val) return;
        if (activeBegin === null) {
          if (/\s/.test(val)) flushWord();
          return;
        }
        const parts = val.split(/(\s+)/);
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            flushWord();
          } else {
            curText += part;
            if (curStart === null) curStart = activeBegin;
            curEnd = activeEnd !== null ? activeEnd : activeBegin + 0.25;
          }
        }
        return;
      }
      if (node.nodeType !== 1) return;
      const role = node.getAttribute('ttm:role') || node.getAttribute('role') || '';
      if (role === 'x-bg') return;
      const ownBegin = parseTtmlTime(node.getAttribute('begin'));
      const ownEnd = parseTtmlTime(node.getAttribute('end'));
      const b = ownBegin !== null ? ownBegin : activeBegin;
      const e = ownEnd !== null ? ownEnd : activeEnd;
      for (const child of node.childNodes) {
        walkTtmlNodes(child, b, e);
      }
    };

    for (const child of p.childNodes) {
      walkTtmlNodes(child, null, null);
    }
    flushWord();

    const lineText = wordsRaw.length > 0
      ? wordsRaw.map((w) => w.text).join(' ')
      : (p.textContent || '').replace(/\s+/g, ' ').trim();
    if (!lineText) continue;

    const nextBegin = ps[i + 1] ? parseTtmlTime(ps[i + 1].getAttribute('begin')) : null;
    const end = endAttr !== null
      ? Math.max(begin + 0.4, endAttr)
      : Math.max(begin + 0.4, nextBegin !== null ? nextBegin : (durationSec > begin ? durationSec : begin + 4.5));
    const lineDur = Math.max(0.35, end - begin);

    let words;
    if (wordsRaw.length > 0) {
      hasWordTiming = true;
      words = wordsRaw.map((w) => ({
        text: w.text,
        offsetRatio: Math.max(0, Math.min(0.96, (w.begin - begin) / lineDur)),
        durationRatio: Math.max(0.03, Math.min(0.96, ((w.end - w.begin) || 0.25) / lineDur)),
      }));
    } else {
      words = splitWordsTimed(lineText);
    }

    lines.push({ timeSec: begin, endSec: end, text: lineText, words });
  }

  if (lines.length === 0) return null;
  return {
    trackKey,
    found: true,
    synced: true,
    wordSynced: hasWordTiming,
    lines,
    plainText: null,
    source: hasWordTiming ? 'boidu:word' : 'boidu:line',
  };
}

function parseLrcLyrics(trackKey, lrc, durationSec, sourceLabel) {
  const entries = [];
  for (const rawLine of String(lrc || '').split(/\r?\n/)) {
    const matches = [...rawLine.matchAll(/\[(\d{1,3}):(\d{2}(?:\.\d{1,3})?)\]/g)];
    if (matches.length === 0) continue;
    const text = rawLine.replace(/\[(\d{1,3}):(\d{2}(?:\.\d{1,3})?)\]/g, '').trim();
    for (const m of matches) {
      const t = parseInt(m[1], 10) * 60 + parseFloat(m[2]);
      if (Number.isFinite(t)) entries.push({ t, text });
    }
  }
  entries.sort((a, b) => a.t - b.t);
  const lines = [];
  for (let i = 0; i < entries.length; i++) {
    if (!entries[i].text) continue;
    const nextT = entries[i + 1]?.t;
    const fallbackEnd = durationSec > entries[i].t + 0.5 ? durationSec : entries[i].t + 5;
    const endSec = Math.min(entries[i].t + 8.5, Math.max(entries[i].t + 0.4, nextT ?? fallbackEnd));
    lines.push({
      timeSec: entries[i].t,
      endSec,
      text: entries[i].text,
      words: splitWordsTimed(entries[i].text),
    });
  }
  if (lines.length === 0) return null;
  return {
    trackKey,
    found: true,
    synced: true,
    wordSynced: false,
    lines,
    plainText: null,
    source: sourceLabel,
  };
}

function parseLyricsPlus(trackKey, data) {
  if (!data || !Array.isArray(data.lyrics) || data.lyrics.length === 0) return null;
  const isWordType = String(data.type || '').toLowerCase() === 'word';
  let hasWordTimings = false;
  const lines = [];
  for (let i = 0; i < data.lyrics.length; i++) {
    const item = data.lyrics[i];
    const begin = (item.time || 0) / 1000;
    const dur = Math.max(0.4, (item.duration || 3500) / 1000);
    const endSec = begin + dur;
    const text = String(item.text || '').trim();
    if (!text) continue;

    let words;
    if (isWordType && Array.isArray(item.syllabus) && item.syllabus.length > 0) {
      const anyHasSpace = item.syllabus.some((s) => /\s/.test(String(s.text || '')));
      const textWordCount = text.split(/\s+/).filter(Boolean).length;
      const eachSylIsWord = !anyHasSpace && item.syllabus.length >= textWordCount && textWordCount > 1;
      const merged = [];
      let curText = '';
      let curStart = null;
      let curEnd = null;
      for (const syl of item.syllabus) {
        const st = String(syl.text || '');
        const sb = (syl.time || 0) / 1000;
        const se = sb + Math.max(0.05, (syl.duration || 200) / 1000);
        if ((eachSylIsWord || /^\s/.test(st)) && curText) {
          merged.push({ text: curText, begin: curStart, end: curEnd });
          curText = '';
          curStart = null;
        }
        const trimmed = st.trim();
        if (trimmed) {
          curText += trimmed;
          if (curStart === null) curStart = sb;
          curEnd = se;
        }
        if ((eachSylIsWord || /\s$/.test(st)) && curText) {
          merged.push({ text: curText, begin: curStart, end: curEnd });
          curText = '';
          curStart = null;
        }
      }
      if (curText) merged.push({ text: curText, begin: curStart, end: curEnd });
      const stillClumped = merged.length <= 1 && textWordCount > 1;
      if (!stillClumped && merged.length > 0) {
        hasWordTimings = true;
        words = merged.map((w) => ({
          text: w.text,
          offsetRatio: Math.max(0, Math.min(0.96, (w.begin - begin) / dur)),
          durationRatio: Math.max(0.03, Math.min(0.96, ((w.end - w.begin) || 0.25) / dur)),
        }));
      } else {
        words = splitWordsTimed(text);
      }
    } else {
      words = splitWordsTimed(text);
    }
    lines.push({ timeSec: begin, endSec, text, words });
  }
  if (lines.length === 0) return null;
  return {
    trackKey,
    found: true,
    synced: true,
    wordSynced: hasWordTimings,
    lines,
    plainText: null,
    source: hasWordTimings ? 'lyricsplus:word' : 'lyricsplus:line',
  };
}

function parseNeteaseYrc(trackKey, yrcText, durationSec) {
  const lines = [];
  const lineRe = /^\[(\d+),(\d+)\](.*)$/;
  for (const rawLine of String(yrcText || '').split(/\r?\n/)) {
    const line = rawLine.trim();
    const lm = lineRe.exec(line);
    if (!lm) continue;
    const lineStartMs = parseFloat(lm[1]);
    const lineDurMs = parseFloat(lm[2]);
    const timeSec = Math.max(0, lineStartMs / 1000);
    const fallbackDur = lineDurMs > 100
      ? lineDurMs / 1000
      : durationSec > timeSec + 0.5
        ? durationSec - timeSec
        : 4.0;
    const lineDur = Math.max(0.35, fallbackDur);
    const endSec = timeSec + lineDur;

    const rest = lm[3];
    const tokenRe = /\((\d+),(\d+),(\d+)\)([^(]*)/g;
    const wordsRaw = [];
    let curText = '';
    let curStart = null;
    let curEnd = timeSec;
    const flush = () => {
      if (curText) {
        wordsRaw.push({ text: curText, begin: curStart ?? timeSec, end: curEnd });
        curText = '';
        curStart = null;
      }
    };

    let m;
    while ((m = tokenRe.exec(rest)) !== null) {
      const wStart = Math.max(timeSec, parseFloat(m[1]) / 1000);
      const wDur = Math.max(0.04, parseFloat(m[2]) / 1000);
      const tok = m[4] || '';
      if (!tok) continue;
      const trimmed = tok.trim();
      if (!trimmed) {
        flush();
        continue;
      }
      const startsWs = /^\s/.test(tok);
      const endsWs = /\s$/.test(tok);
      const curCjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]$/.test(curText);
      const tokCjk = /^[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(trimmed);
      if (startsWs || curCjk || tokCjk) flush();
      curText += trimmed;
      if (curStart === null) curStart = wStart;
      curEnd = wStart + wDur;
      if (endsWs) flush();
    }
    flush();

    if (wordsRaw.length > 0) {
      lines.push({
        timeSec,
        endSec,
        text: wordsRaw.map((w) => w.text).join(' '),
        words: wordsRaw.map((w) => ({
          text: w.text,
          offsetRatio: Math.max(0, Math.min(0.96, (w.begin - timeSec) / lineDur)),
          durationRatio: Math.max(0.03, Math.min(0.96, ((w.end - w.begin) || 0.2) / lineDur)),
        })),
      });
    }
  }
  if (lines.length === 0) return null;
  return {
    trackKey,
    found: true,
    synced: true,
    wordSynced: true,
    lines,
    plainText: null,
    source: 'netease:word',
  };
}

function decodeBase64Utf8(b64) {
  try {
    const bin = atob(String(b64 || '').replace(/\s+/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return '';
  }
}

function findFirstJsonKey(obj, key, prefix = '') {
  if (!obj || typeof obj !== 'object') return null;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const hit = findFirstJsonKey(obj[i], key, prefix);
      if (hit) return hit;
    }
    return null;
  }
  if (typeof obj[key] === 'string' && obj[key] && (!prefix || obj[key].startsWith(prefix))) {
    return obj[key];
  }
  for (const v of Object.values(obj)) {
    const hit = findFirstJsonKey(v, key, prefix);
    if (hit) return hit;
  }
  return null;
}

function findFirstJsonArray(obj, key) {
  if (!obj || typeof obj !== 'object') return null;
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const hit = findFirstJsonArray(obj[i], key);
      if (hit) return hit;
    }
    return null;
  }
  if (Array.isArray(obj[key])) return obj[key];
  for (const v of Object.values(obj)) {
    const hit = findFirstJsonArray(v, key);
    if (hit) return hit;
  }
  return null;
}

function selectStageResult(results, plainCandidates) {
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r?.synced && r?.wordSynced) return r;
  }
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r?.synced) return r;
  }
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r?.found) plainCandidates.push(r);
  }
  return null;
}

export async function fetchLyricsInBrowser(trackKey, rawTitle, rawArtist, album, durationSec, prefs = {}) {
  const { artist, title, derivedArtist, derivedTitle } = cleanTrackMeta(rawArtist, rawTitle);
  const empty = { trackKey, found: false, synced: false, wordSynced: false, lines: [], plainText: null, source: 'none' };
  if (!title) return empty;

  const preferred = String(prefs.preferred || 'auto').trim() || 'auto';
  const isEnabled = {
    limusic: preferred === 'limusic' || prefs.enableLimusic !== false,
    boidu: preferred === 'boidu' || prefs.enableBoidu !== false,
    unison: preferred === 'unison' || prefs.enableUnison !== false,
    lyricsplus: preferred === 'lyricsplus' || prefs.enableLyricsplus !== false,
    lrclib: preferred === 'lrclib' || prefs.enableLrclib !== false,
    ytmusic: preferred === 'ytmusic' || prefs.enableYtmusic !== false,
    netease: preferred === 'netease' || prefs.enableNetease !== false,
    qqmusic: preferred === 'qqmusic' || prefs.enableQqmusic !== false,
    kugou: preferred === 'kugou' || prefs.enableKugou !== false,
  };

  const fetchJson = async (url, opts = {}) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(url, { ...opts, signal: ctrl.signal });
      if (!res.ok) return null;
      const text = await res.text();
      const cleaned = text.trim().startsWith('{') || text.trim().startsWith('[')
        ? text
        : text.replace(/^[^{[]*\(/, '').replace(/\);?\s*$/, '');
      return JSON.parse(cleaned);
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  };

  const queryTtmlEndpoint = async (endpoint, providerTag) => {
    if (!artist) return null;
    const attempts = [];
    const buildQuery = (s, a, al, d) => {
      const q = new URLSearchParams({ s, a });
      if (al) q.set('al', al);
      if (d >= 10) q.set('d', String(Math.round(d)));
      return q.toString();
    };
    const cleanAlb = String(album || '').trim();
    attempts.push(buildQuery(title, artist, cleanAlb, durationSec));
    if (cleanAlb && durationSec >= 10) {
      attempts.push(buildQuery(title, artist, '', durationSec));
    }
    if (cleanAlb || durationSec >= 10) {
      attempts.push(buildQuery(title, artist, '', 0));
    }
    if ((derivedTitle !== title || derivedArtist !== artist) && derivedTitle && derivedArtist) {
      attempts.push(buildQuery(derivedTitle, derivedArtist, '', 0));
    }

    for (let i = 0; i < attempts.length; i++) {
      const json = await fetchJson(`${endpoint}?${attempts[i]}`);
      if (!json?.ttml) continue;
      const parsed = parseTtmlLyrics(trackKey, json.ttml, durationSec);
      if (parsed) {
        if (providerTag !== 'boidu') {
          parsed.source = parsed.source.replace('boidu:', `${providerTag}:`);
        }
        return parsed;
      }
    }
    return null;
  };

  const fetchProvider = async (id) => {
    if (!isEnabled[id]) return null;
    if (id === 'limusic') {
      return queryTtmlEndpoint('https://lyrics-api.boidu.dev/getLyrics', 'limusic');
    }
    if (id === 'boidu') {
      return queryTtmlEndpoint('https://api.betterlyrics.org/getLyrics', 'boidu');
    }
    if (id === 'lyricsplus') {
      if (!artist) return null;
      const q = new URLSearchParams({ title, artist, source: 'apple,lyricsplus,musixmatch,spotify,deezer' });
      if (album) q.set('album', album);
      if (durationSec >= 10) q.set('duration', String(Math.round(durationSec)));
      for (const base of ['https://lyricsplus.prjktla.my.id/v2/lyrics/get', 'https://lyricsplus.prjktla.workers.dev/v2/lyrics/get']) {
        const json = await fetchJson(`${base}?${q.toString()}`);
        const parsed = json ? parseLyricsPlus(trackKey, json) : null;
        if (parsed) return parsed;
      }
      return null;
    }
    if (id === 'unison') {
      if (!artist) return null;
      const q = new URLSearchParams({ song: title, artist });
      if (album) q.set('album', album);
      if (durationSec >= 10) q.set('duration', String(Math.round(durationSec)));
      for (const base of ['https://unison.boidu.dev/lyrics', 'https://unison.betterlyrics.org/lyrics']) {
        const json = await fetchJson(`${base}?${q.toString()}`);
        const data = json?.data || json;
        const raw = data?.lyrics?.trim();
        if (!raw) continue;
        if (data.format === 'ttml' || raw.startsWith('<tt') || raw.includes('<p ')) {
          const parsed = parseTtmlLyrics(trackKey, raw, durationSec);
          if (parsed) {
            parsed.source = parsed.source.replace('boidu:', 'unison:');
            return parsed;
          }
        }
        const lrc = parseLrcLyrics(trackKey, raw, durationSec, 'unison:synced');
        if (lrc) return lrc;
        return { trackKey, found: true, synced: false, wordSynced: false, lines: [], plainText: raw, source: 'unison:plain' };
      }
      return null;
    }
    if (id === 'lrclib') {
      const q = new URLSearchParams({ track_name: title });
      if (artist) q.set('artist_name', artist);
      if (album) q.set('album_name', album);
      if (durationSec >= 10) q.set('duration', String(Math.round(durationSec)));
      const direct = await fetchJson(`https://lrclib.net/api/get?${q.toString()}`);
      if (direct?.syncedLyrics) return parseLrcLyrics(trackKey, direct.syncedLyrics, durationSec, 'lrclib:synced');
      if (direct?.plainLyrics) {
        return { trackKey, found: true, synced: false, wordSynced: false, lines: [], plainText: direct.plainLyrics, source: 'lrclib:plain' };
      }
      const sq = new URLSearchParams({ track_name: title });
      if (artist) sq.set('artist_name', artist);
      const list = await fetchJson(`https://lrclib.net/api/search?${sq.toString()}`);
      if (Array.isArray(list) && list[0]?.syncedLyrics) {
        return parseLrcLyrics(trackKey, list[0].syncedLyrics, durationSec, 'lrclib:synced');
      }
      if (Array.isArray(list) && list[0]?.plainLyrics) {
        return { trackKey, found: true, synced: false, wordSynced: false, lines: [], plainText: list[0].plainLyrics, source: 'lrclib:plain' };
      }
      return null;
    }
    if (id === 'ytmusic') {
      const query = artist ? `${artist} ${title}` : title;
      const webCtx = { client: { clientName: 'WEB_REMIX', clientVersion: '1.20241101.01.00', hl: 'en', gl: 'US' } };
      const searchJson = await fetchJson('https://music.youtube.com/youtubei/v1/search?prettyPrint=false', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: webCtx, query, params: 'EgWKAQIIAWoKEAkQBRAKEAMQBA%3D%3D' }),
      });
      const videoId = findFirstJsonKey(searchJson, 'videoId');
      if (!videoId) return null;
      const nextJson = await fetchJson('https://music.youtube.com/youtubei/v1/next?prettyPrint=false', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: webCtx, videoId }),
      });
      const browseId = findFirstJsonKey(nextJson, 'browseId', 'MPLYt_');
      if (!browseId) return null;
      const androidCtx = { client: { clientName: 'ANDROID_MUSIC', clientVersion: '7.27.52', hl: 'en', gl: 'US' } };
      const brJson = await fetchJson('https://music.youtube.com/youtubei/v1/browse?prettyPrint=false', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: androidCtx, browseId }),
      });
      const timed = findFirstJsonArray(brJson, 'timedLyricsData');
      if (Array.isArray(timed) && timed.length > 0) {
        const lines = [];
        for (const item of timed) {
          const txt = String(item?.lyricLine || '').trim();
          const startMs = parseFloat(item?.cueRange?.startTimeMilliseconds);
          const endMs = parseFloat(item?.cueRange?.endTimeMilliseconds);
          if (!txt || !Number.isFinite(startMs)) continue;
          const timeSec = Math.max(0, startMs / 1000);
          const endSec = Math.max(timeSec + 0.4, Number.isFinite(endMs) ? endMs / 1000 : timeSec + 4.0);
          lines.push({ timeSec, endSec, text: txt, words: splitWordsTimed(txt) });
        }
        if (lines.length > 0) {
          return { trackKey, found: true, synced: true, wordSynced: false, lines, plainText: null, source: 'ytmusic:synced' };
        }
      }
      return null;
    }
    if (id === 'netease') {
      const s = artist ? `${artist} ${title}` : title;
      const sq = new URLSearchParams({ s, type: '1', limit: '5', offset: '0' });
      const search = await fetchJson(`https://music.163.com/api/search/get?${sq.toString()}`);
      const song = search?.result?.songs?.[0];
      if (!song?.id) return null;
      const lyr = await fetchJson(`https://music.163.com/api/song/lyric?id=${song.id}&lv=-1&tv=-1&kv=-1&yv=-1`);
      if (lyr?.yrc?.lyric) {
        const yrc = parseNeteaseYrc(trackKey, lyr.yrc.lyric, durationSec);
        if (yrc) return yrc;
      }
      if (lyr?.lrc?.lyric) {
        return parseLrcLyrics(trackKey, lyr.lrc.lyric, durationSec, 'netease:synced');
      }
      return null;
    }
    if (id === 'qqmusic') {
      const w = artist ? `${artist} ${title}` : title;
      const sq = new URLSearchParams({ w, format: 'json', p: '1', n: '5', cr: '1', aggr: '1' });
      const search = await fetchJson(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?${sq.toString()}`);
      const songmid = search?.data?.song?.list?.[0]?.songmid;
      if (!songmid) return null;
      const lyr = await fetchJson(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${encodeURIComponent(songmid)}&format=json&nobase64=1`);
      const raw = lyr?.lyric?.trim();
      if (!raw) return null;
      const text = raw.includes('[') ? raw : decodeBase64Utf8(raw);
      return text ? parseLrcLyrics(trackKey, text, durationSec, 'qqmusic:synced') : null;
    }
    if (id === 'kugou') {
      const kw = artist ? `${artist} - ${title}` : title;
      const sq = new URLSearchParams({ ver: '1', man: 'yes', client: 'pc', keyword: kw });
      if (durationSec >= 10) sq.set('duration', String(Math.round(durationSec * 1000)));
      const search = await fetchJson(`https://lyrics.kugou.com/search?${sq.toString()}`);
      const cand = search?.candidates?.[0];
      if (!cand?.id || !cand?.accesskey) return null;
      const dq = new URLSearchParams({ ver: '1', client: 'pc', id: String(cand.id), accesskey: cand.accesskey, fmt: 'lrc', charset: 'utf8' });
      const dl = await fetchJson(`https://lyrics.kugou.com/download?${dq.toString()}`);
      if (!dl?.content) return null;
      const text = decodeBase64Utf8(dl.content);
      return text ? parseLrcLyrics(trackKey, text, durationSec, 'kugou:synced') : null;
    }
    return null;
  };

  const plainCandidates = [];

  // 0. Explicit Preferred Source: query ONLY it first before any fallback tier
  if (preferred !== 'auto' && isEnabled[preferred]) {
    const prefRes = await fetchProvider(preferred);
    if (prefRes?.synced) return prefRes;
    if (prefRes?.found) plainCandidates.push(prefRes);
  }

  // Tier 1 (Top of Hierarchy): Limusic & Boidu ONLY
  const tier1Ids = ['limusic', 'boidu'].filter((id) => id !== preferred && isEnabled[id]);
  if (tier1Ids.length > 0) {
    const res1 = await Promise.all(tier1Ids.map((id) => fetchProvider(id)));
    const best1 = selectStageResult(res1, plainCandidates);
    if (best1) return best1;
  }

  // Tier 2: LyricsPlus ONLY
  if (preferred !== 'lyricsplus' && isEnabled.lyricsplus) {
    const res2 = await fetchProvider('lyricsplus');
    const best2 = selectStageResult([res2], plainCandidates);
    if (best2) return best2;
  }

  // Tier 3: Remaining providers (Unison, LRCLIB, Netease, YT Music, QQ Music, Kugou)
  const tier3Ids = ['unison', 'lrclib', 'netease', 'ytmusic', 'qqmusic', 'kugou'].filter(
    (id) => id !== preferred && isEnabled[id]
  );
  if (tier3Ids.length > 0) {
    const res3 = await Promise.all(tier3Ids.map((id) => fetchProvider(id)));
    const best3 = selectStageResult(res3, plainCandidates);
    if (best3) return best3;
  }

  return plainCandidates[0] || empty;
}
