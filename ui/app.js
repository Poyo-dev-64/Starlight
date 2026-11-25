import { CONSTELLATIONS } from './constellations.js';
import { COLOR_THEMES, StarVisualizer } from './visualizer.js';
import { fetchLyricsInBrowser } from './we-lyrics.js';

const SETTINGS_KEY = 'starlight:settings:v1';
const CUSTOM_FONT_KEY = 'starlight:custom-font:v1';
const FONT_PRESETS = {
  system: {
    family: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    style: 'normal',
  },
  serif: {
    family: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
    style: 'normal',
  },
  italic: {
    family: '"Palatino Linotype", Georgia, serif',
    style: 'italic',
  },
  geometric: {
    family: '"Segoe UI Variable", Inter, "Trebuchet MS", system-ui, sans-serif',
    style: 'normal',
  },
  mono: {
    family: '"Cascadia Mono", Consolas, ui-monospace, monospace',
    style: 'normal',
  },
  cinematic: {
    family: '"Cinzel", "Trajan Pro", "Copperplate Gothic Light", "Sitka Display", Georgia, serif',
    style: 'normal',
  },
  editorial: {
    family: '"Garamond", "EB Garamond", "Baskerville", "Sitka Text", Georgia, serif',
    style: 'normal',
  },
  highcontrast: {
    family: '"Bodoni MT", "Didot", "Playfair Display", "Cambria", serif',
    style: 'normal',
  },
  book: {
    family: '"Cambria", "Constantia", "Bookman Old Style", Georgia, serif',
    style: 'normal',
  },
  humanist: {
    family: '"Candara", "Optima", "Avenir Next", "Segoe UI", sans-serif',
    style: 'normal',
  },
  futuristic: {
    family: '"Century Gothic", "Futura", "Avenir", "Tw Cen MT", sans-serif',
    style: 'normal',
  },
  condensed: {
    family: '"Bahnschrift Condensed", "Bahnschrift", "DIN Alternate", "Arial Narrow", sans-serif',
    style: 'normal',
  },
  wide: {
    family: '"Bahnschrift Light", "Segoe UI Light", "Helvetica Neue", sans-serif',
    style: 'normal',
  },
  italicSans: {
    family: '"Segoe UI Variable", "Avenir Next", "Helvetica Neue", system-ui, sans-serif',
    style: 'italic',
  },
  script: {
    family: '"Gabriola", "Segoe Script", "Snell Roundhand", "Brush Script MT", cursive',
    style: 'normal',
  },
  handwritten: {
    family: '"Segoe Print", "Ink Free", "Bradley Hand", cursive',
    style: 'normal',
  },
  code: {
    family: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace',
    style: 'normal',
  },
};

const DEFAULT_SETTINGS = {
  colorTheme: 'starlight',
  starBrightness: 1.15,
  effectsIntensity: 1.0,
  lineOpacity: 1.0,
  audioReactivity: 1.0,
  zoom: 1.0,
  softWordLimit: 16,
  rotationSpeed: 1.0,
  wordFontSize: 20,
  lyricDecaySec: 2.5,
  syncOffsetSec: 0.0,
  wordEffect: 'rise',
  showLabels: true,
  showFactCard: true,
  showBottomLine: false,
  showDeepSky: true,
  showSatellites: true,
  instrumentalMode: true,
  hoverInspector: true,
  proportionalSizes: false,
  freeExplore: false,
  showPlayerControls: true,
  lyricPreferred: 'auto',
  enableLimusic: true,
  enableBoidu: true,
  enableUnison: true,
  enableLyricsplus: true,
  enableLrclib: true,
  enableYtmusic: true,
  enableNetease: true,
  enableQqmusic: true,
  enableKugou: true,
  alwaysOnTop: false,
  fontPreset: 'system',
  customFontName: '',
};

const tauri = window.__TAURI__ || null;
const invoke = tauri?.core?.invoke;
const listen = tauri?.event?.listen;
const appWindow = tauri?.window?.getCurrentWindow?.() || null;

const canvas = document.getElementById('sky');
const visualizer = new StarVisualizer(canvas);

const elStatusDot = document.getElementById('status-dot');
const elTrackTitle = document.getElementById('track-title');
const elTrackArtist = document.getElementById('track-artist');
const elLyricBadge = document.getElementById('lyric-badge');
const elBottomLineWrap = document.getElementById('bottom-line-wrap');
const elBottomLine = document.getElementById('bottom-line');
const elBottomLineNext = document.getElementById('bottom-line-next');
const elToast = document.getElementById('toast');

const btnConstellation = document.getElementById('btn-constellation');
const btnExplore = document.getElementById('btn-explore');
const btnDemo = document.getElementById('btn-demo');
const btnMediaPrev = document.getElementById('btn-media-prev');
const btnMediaPlay = document.getElementById('btn-media-play');
const btnMediaNext = document.getElementById('btn-media-next');
const elPlayerArt = document.getElementById('player-art');
const elPlayerStatusDot = document.getElementById('player-status-dot');
const elPlayerTitle = document.getElementById('player-title');
const elPlayerArtist = document.getElementById('player-artist');
const elPlayerSourceBadge = document.getElementById('player-source-badge');
const elPlayerBar = document.getElementById('player-bar');
const elPlayerTimeCur = document.getElementById('player-time-cur');
const elPlayerTimeDur = document.getElementById('player-time-dur');
const elPlayerSeek = document.getElementById('player-seek');
const btnFact = document.getElementById('btn-fact');
const btnSettings = document.getElementById('btn-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnMin = document.getElementById('btn-min');
const btnMax = document.getElementById('btn-max');
const btnClose = document.getElementById('btn-close');
const settingsDrawer = document.getElementById('settings-drawer');

const factCard = document.getElementById('fact-card');
const factTitle = document.getElementById('fact-title');
const factText = document.getElementById('fact-text');
const btnCloseFact = document.getElementById('btn-close-fact');

const optColorTheme = document.getElementById('opt-color-theme');
const optBrightness = document.getElementById('opt-brightness');
const valBrightness = document.getElementById('val-brightness');
const optEffects = document.getElementById('opt-effects');
const valEffects = document.getElementById('val-effects');
const optLines = document.getElementById('opt-lines');
const valLines = document.getElementById('val-lines');
const optAudio = document.getElementById('opt-audio');
const valAudio = document.getElementById('val-audio');
const optWordSize = document.getElementById('opt-word-size');
const valWordSize = document.getElementById('val-word-size');
const optLyricDecay = document.getElementById('opt-lyric-decay');
const valLyricDecay = document.getElementById('val-lyric-decay');
const optWordEffect = document.getElementById('opt-word-effect');
const optWordLimit = document.getElementById('opt-word-limit');
const valWordLimit = document.getElementById('val-word-limit');
const optRotSpeed = document.getElementById('opt-rot-speed');
const valRotSpeed = document.getElementById('val-rot-speed');
const optZoom = document.getElementById('opt-zoom');
const valZoom = document.getElementById('val-zoom');
const optConstellation = document.getElementById('opt-constellation');
const btnPrevConst = document.getElementById('btn-prev-const');
const btnNextConst = document.getElementById('btn-next-const');

const optAlwaysOnTop = document.getElementById('opt-always-on-top');
const optShowNames = document.getElementById('opt-show-names');
const optFactCard = document.getElementById('opt-fact-card');
const optBottomLine = document.getElementById('opt-bottom-line');
const optDeepSky = document.getElementById('opt-deep-sky');
const optSatellites = document.getElementById('opt-satellites');
const optInstrumental = document.getElementById('opt-instrumental');
const optHoverInspector = document.getElementById('opt-hover-inspector');
const optProportionalSizes = document.getElementById('opt-proportional-sizes');
const optFreeExplore = document.getElementById('opt-free-explore');
const optPlayerControls = document.getElementById('opt-player-controls');
const optLyricPreferred = document.getElementById('opt-lyric-preferred');
const optProvLimusic = document.getElementById('opt-prov-limusic');
const optProvBoidu = document.getElementById('opt-prov-boidu');
const optProvUnison = document.getElementById('opt-prov-unison');
const optProvLyricsplus = document.getElementById('opt-prov-lyricsplus');
const optProvLrclib = document.getElementById('opt-prov-lrclib');
const optProvYtmusic = document.getElementById('opt-prov-ytmusic');
const optProvNetease = document.getElementById('opt-prov-netease');
const optProvQqmusic = document.getElementById('opt-prov-qqmusic');
const optProvKugou = document.getElementById('opt-prov-kugou');
const btnRefreshLyrics = document.getElementById('btn-refresh-lyrics');
const optDemoMode = document.getElementById('opt-demo-mode');

const elInspector = document.getElementById('star-inspector');
const elInspDot = document.getElementById('insp-dot');
const elInspName = document.getElementById('insp-name');
const elInspKind = document.getElementById('insp-kind');
const elInspMeta = document.getElementById('insp-meta');
const elInspNote = document.getElementById('insp-note');
const optSyncOffset = document.getElementById('opt-sync-offset');
const valOffset = document.getElementById('val-offset');
const btnOffsetMinus = document.getElementById('btn-offset-minus');
const btnOffsetReset = document.getElementById('btn-offset-reset');
const btnOffsetPlus = document.getElementById('btn-offset-plus');
const optFontPreset = document.getElementById('opt-font-preset');
const optCustomFontName = document.getElementById('opt-custom-font-name');
const optFontFile = document.getElementById('opt-font-file');
const valFontFile = document.getElementById('val-font-file');
const btnClearFont = document.getElementById('btn-clear-font');
const btnResetDefaults = document.getElementById('btn-reset-defaults');

const DEMO_LINES = [
  { timeSec: 0.2, endSec: 4.0, text: 'Stars ignite across the midnight sky' },
  { timeSec: 4.1, endSec: 8.2, text: 'Tracing constellations in the dark' },
  { timeSec: 8.3, endSec: 12.6, text: 'Every single word becomes a light' },
  { timeSec: 12.7, endSec: 17.0, text: 'Drifting through the silence of the night' },
].map((line) => ({
  ...line,
  words: buildWords(line.text),
}));

function buildWords(text) {
  const tokens = text.split(/\s+/).filter(Boolean);
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

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota errors
  }
}

const initialSettings = loadSettings();

// Reusable frame objects to eliminate per-frame object allocations in 60-240Hz rAF loop
const EMPTY_WORDS = Object.freeze([]);
const EMPTY_LYRIC_FRAME = Object.freeze({
  lineIndex: -1,
  lineKey: '',
  activeWordIndex: -1,
  words: EMPTY_WORDS,
  lineProgress: 0,
  text: '',
  nextText: '',
});
const ACTIVE_LYRIC_FRAME = {
  lineIndex: -1,
  lineKey: '',
  activeWordIndex: -1,
  words: EMPTY_WORDS,
  lineProgress: 0,
  text: '',
  nextText: '',
};
const RENDER_FRAME_STATE = {
  isPlaying: false,
  hasSyncedLyrics: false,
  lineIndex: -1,
  lineKey: '',
  activeWordIndex: -1,
  words: EMPTY_WORDS,
  lineProgress: 0,
  text: '',
  nextText: '',
  audio: null,
  bottomClearY: 0,
};

const state = {
  settings: initialSettings,
  appliedThemeId: '',
  settingsOpen: false,
  media: {
    hasSession: false,
    title: '',
    artist: '',
    album: '',
    status: 'Closed',
    positionSec: 0,
    endSec: 0,
    lastUpdatedMs: 0,
    sampledAtMs: 0,
  },
  lyrics: {
    trackKey: '',
    found: false,
    synced: false,
    wordSynced: false,
    lines: [],
    plainText: null,
    source: 'none',
  },
  lyricsLoading: false,
  currentTrackKey: '',
  clockPosSec: 0,
  lastTickMs: performance.now(),
  syncOffsetSec: Math.max(-5, Math.min(5, Math.round((Number(initialSettings.syncOffsetSec) || 0) * 10) / 10)),
  demoMode: false,
  demoStartMs: 0,
  browserLookupGen: 0,
  lyricHintIdx: 0,
  lastLineIndex: -1,
  currentConstellationIndex: 0,
  wordsShownOnConstellation: 0,
  lastCountedWordKey: '',
  pendingRotation: false,
  customFontLoadedName: '',
  customFontFace: null,
  lastBottomKey: '',
  bottomWrapHidden: true,
  bottomWordSpans: [],
  bottomSpanStates: new Uint8Array(0),
  bottomSpanFillSteps: new Int16Array(0),
  playerBarHeight: 78,
  bottomWrapHeight: 54,
  cachedBottomClearY: (window.innerHeight || 900) - 48,
  lastCurSecInt: -1,
  lastDurSecInt: -1,
  lastSeekMax: -1,
  lastSeekDisabled: null,
  lastSeekUpdateMs: 0,
  visitedConstellations: new Set(),
  instrumentalTourTimer: 0,
  wasInstrumentalSolo: false,
  drag: { active: false, pointerId: null, lastX: 0, lastY: 0, lastMs: 0 },
  lastExploreNearestIdx: -1,
  pointer: { x: -1, y: -1, inside: false },
  lastInspectedKey: '',
  inspectorHidden: true,
  inspectorWidth: 240,
  inspectorHeight: 88,
  lastHudWakeMs: 0,
  playerSeeking: false,
  pausedBottomSec: 0,
  wallpaperModeActive: false,
  weEnv: false,
  wePaused: false,
  docHiddenPaused: false,
  rafScheduled: false,
  weTargetFps: 0,
  weBassAvg: 0.01,
  weBeatEnv: 0,
  weLyricsCache: new Map(),
  audioLevels: { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0 },
};

let hudTimer = null;
let toastTimer = null;

function scheduleTick() {
  if (state.rafScheduled || state.wePaused || state.docHiddenPaused) return;
  state.rafScheduled = true;
  requestAnimationFrame(tick);
}

function recomputeBottomClearY() {
  const vh = window.innerHeight || 900;
  let clearY = vh - 48;
  const playerVisible =
    Boolean(state.settings.showPlayerControls) &&
    (!state.wallpaperModeActive || state.weEnv);

  if (playerVisible) {
    const ph = state.playerBarHeight > 0 ? state.playerBarHeight : 78;
    clearY = Math.min(clearY, vh - 44 - ph - 16);
  }

  if (state.settings.showBottomLine) {
    const bottomCssOffset = playerVisible ? 138 : 34;
    if (!state.bottomWrapHidden && state.bottomWrapHeight > 0) {
      clearY = Math.min(clearY, vh - bottomCssOffset - state.bottomWrapHeight - 20);
    } else {
      clearY = Math.min(clearY, playerVisible ? vh - 216 : vh - 116);
    }
  }
  state.cachedBottomClearY = clearY;
}

function showHud(forceResetTimer = true) {
  if (state.wallpaperModeActive) return;
  const now = performance.now();
  if (!forceResetTimer && now - state.lastHudWakeMs < 250) {
    return;
  }
  state.lastHudWakeMs = now;
  document.body.classList.add('hud-visible');
  document.body.classList.remove('hud-idle');
  clearTimeout(hudTimer);
  if (!state.settingsOpen) {
    hudTimer = setTimeout(() => {
      document.body.classList.remove('hud-visible');
      document.body.classList.add('hud-idle');
    }, 2600);
  }
}

function showToast(msg) {
  elToast.textContent = msg;
  elToast.classList.add('show');
  showHud(true);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elToast.classList.remove('show');
  }, 1900);
}

function hashTrackKey(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function resetConstellationWordBudget() {
  state.wordsShownOnConstellation = 0;
  state.lastCountedWordKey = '';
  state.pendingRotation = false;
}

function updateFactCard(index = state.currentConstellationIndex) {
  const c = CONSTELLATIONS[index] || CONSTELLATIONS[0];
  if (c) {
    factTitle.textContent = `${c.name} · ${c.title}`;
    factText.textContent = c.fact || '';
  }
  const show = Boolean(state.settings.showFactCard);
  factCard.classList.toggle('hidden', !show);
  btnFact.classList.toggle('active', show);
}

function setFreeExplore(enabled, announce = true) {
  const next = Boolean(enabled);
  state.settings.freeExplore = next;
  state.lastExploreNearestIdx = -1;
  if (!next) {
    state.drag.active = false;
    document.body.classList.remove('is-dragging');
  }
  visualizer.setFreeExplore(next);
  applySettingsToApp(true);
  if (announce) {
    showToast(next ? 'Free Explore mode on — drag sky freely' : 'Free Explore mode off — following music');
  }
}

function switchConstellation(nextIndex, direction = 1, useRotation = true, announce = false, isManual = false) {
  if (state.settings.freeExplore && !isManual) {
    return;
  }
  const normalized = ((nextIndex % CONSTELLATIONS.length) + CONSTELLATIONS.length) % CONSTELLATIONS.length;
  state.currentConstellationIndex = normalized;
  state.lastExploreNearestIdx = normalized;
  state.visitedConstellations.add(normalized);
  resetConstellationWordBudget();

  if (useRotation) {
    visualizer.rotateToConstellation(normalized, direction);
  } else {
    visualizer.setConstellation(normalized);
  }

  optConstellation.value = String(normalized);
  updateFactCard(normalized);
  if (announce) {
    const c = CONSTELLATIONS[normalized];
    showToast(`${c.name} · ${c.title}`);
  }
}

function switchToNextTourConstellation() {
  const next = visualizer.getNextTourConstellation(
    state.currentConstellationIndex,
    state.visitedConstellations
  );
  switchConstellation(next, 1, true, false);
}

function resolveFontSpec(s) {
  if (s.fontPreset === 'custom') {
    const parts = [];
    if (state.customFontFace) {
      parts.push('"StarlightCustomFont"');
    }
    const typed = (s.customFontName || '').trim().replace(/["']/g, '');
    if (typed) {
      parts.push(`"${typed}"`);
    }
    if (parts.length > 0) {
      parts.push('system-ui, -apple-system, "Segoe UI", Roboto, sans-serif');
      return { fontFamily: parts.join(', '), fontStyle: 'normal' };
    }
  }
  const preset = FONT_PRESETS[s.fontPreset] || FONT_PRESETS.system;
  return { fontFamily: preset.family, fontStyle: preset.style };
}

function applyThemeCssVariables(themeId) {
  const theme = COLOR_THEMES[themeId] || COLOR_THEMES.starlight;
  if (state.appliedThemeId === theme.id) return;
  state.appliedThemeId = theme.id;

  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--bg', theme.bg);
  rootStyle.setProperty('--brand-color', theme.brand);
  rootStyle.setProperty('--text', theme.text);
  rootStyle.setProperty('--text-muted', theme.textMuted);
  rootStyle.setProperty('--hud-border', theme.hudBorder);
  rootStyle.setProperty('--hud-border-strong', theme.hudBorderStrong);
  rootStyle.setProperty('--hud-hover', theme.hudHover);
  rootStyle.setProperty('--hud-active', theme.hudActive);
  rootStyle.setProperty('--panel-bg', theme.panelBg);
  rootStyle.setProperty('--panel-solid', theme.panelSolid);
  rootStyle.setProperty('--input-bg', theme.inputBg);
  rootStyle.setProperty('--word-idle', theme.wordIdle);
  rootStyle.setProperty('--word-glow', theme.wordGlow);
  rootStyle.setProperty('--word-past-glow', theme.wordPastGlow);
}

async function registerCustomFontBuffer(buffer, fileName, persistDataUrl = true) {
  if (typeof FontFace === 'undefined' || !document.fonts) {
    showToast('Custom font files unsupported in this browser');
    return;
  }
  if (state.customFontFace) {
    document.fonts.delete(state.customFontFace);
    state.customFontFace = null;
  }
  const face = new FontFace('StarlightCustomFont', buffer);
  await face.load();
  document.fonts.add(face);
  state.customFontFace = face;
  state.customFontLoadedName = fileName;
  state.settings.fontPreset = 'custom';
  valFontFile.textContent = fileName;
  applySettingsToApp(true);

  if (persistDataUrl && buffer.byteLength <= 3_500_000) {
    try {
      const bytes = new Uint8Array(buffer);
      let bin = '';
      for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      localStorage.setItem(CUSTOM_FONT_KEY, JSON.stringify({ fileName, base64: btoa(bin) }));
    } catch {
      // Ignore storage quota limits
    }
  }
}

async function restoreSavedCustomFont() {
  try {
    const raw = localStorage.getItem(CUSTOM_FONT_KEY);
    if (!raw) return;
    const { fileName, base64 } = JSON.parse(raw);
    if (!base64) return;
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    await registerCustomFontBuffer(bytes.buffer, fileName || 'Custom Font', false);
  } catch {
    // Ignore corrupted cached font
  }
}

function clearCustomFont(resetPreset = true) {
  if (state.customFontFace && document.fonts) {
    document.fonts.delete(state.customFontFace);
    state.customFontFace = null;
  }
  state.customFontLoadedName = '';
  valFontFile.textContent = 'None';
  try {
    localStorage.removeItem(CUSTOM_FONT_KEY);
  } catch {
    // Ignore
  }
  if (resetPreset && !state.settings.customFontName.trim()) {
    state.settings.fontPreset = 'system';
  }
  applySettingsToApp(true);
}

function formatOffsetLabel(sec) {
  const clean = Math.abs(sec) < 0.04 ? 0 : sec;
  return `${clean >= 0 ? '+' : ''}${clean.toFixed(1)}s`;
}

function setSyncOffset(nextSec, announce = false, persist = true) {
  const clamped = Math.max(-5.0, Math.min(5.0, Math.round((Number(nextSec) || 0) * 10) / 10));
  state.syncOffsetSec = clamped;
  state.settings.syncOffsetSec = clamped;
  if (optSyncOffset) optSyncOffset.value = String(clamped);
  valOffset.textContent = formatOffsetLabel(clamped);
  if (persist) saveSettings(state.settings);
  if (announce) showToast(`Lyric offset: ${valOffset.textContent}`);
}

function applySettingsToApp(persist = true) {
  const s = state.settings;
  const themeId = COLOR_THEMES[s.colorTheme] ? s.colorTheme : 'starlight';
  s.colorTheme = themeId;
  const { fontFamily, fontStyle } = resolveFontSpec(s);

  applyThemeCssVariables(themeId);
  document.documentElement.style.setProperty('--font-family', fontFamily);
  document.documentElement.style.setProperty('--font-style', fontStyle);

  visualizer.applySettings({
    colorTheme: themeId,
    starBrightness: s.starBrightness,
    effectsIntensity: s.effectsIntensity,
    lineOpacity: s.lineOpacity,
    audioReactivity: s.audioReactivity,
    zoom: s.zoom,
    rotationSpeed: s.rotationSpeed,
    wordFontSize: s.wordFontSize,
    lyricDecaySec: s.lyricDecaySec,
    wordEffect: s.wordEffect || 'rise',
    fontFamily,
    fontStyle,
    showDeepSky: s.showDeepSky,
    showSatellites: s.showSatellites,
    instrumentalMode: s.instrumentalMode,
    hoverInspector: s.hoverInspector,
    proportionalSizes: s.proportionalSizes,
    freeExplore: s.freeExplore,
  });
  visualizer.showLabels = s.showLabels;
  document.body.classList.toggle('free-explore', Boolean(s.freeExplore));
  document.body.classList.toggle('show-player-controls', Boolean(s.showPlayerControls));
  document.body.classList.toggle('we-allow-player', Boolean(state.weEnv && s.showPlayerControls));
  btnExplore.classList.toggle('active', Boolean(s.freeExplore));

  if (optColorTheme) optColorTheme.value = themeId;
  optBrightness.value = String(s.starBrightness);
  valBrightness.textContent = `${s.starBrightness.toFixed(2)}×`;
  optEffects.value = String(s.effectsIntensity);
  valEffects.textContent = `${s.effectsIntensity.toFixed(2)}×`;
  optLines.value = String(s.lineOpacity);
  valLines.textContent = `${s.lineOpacity.toFixed(2)}×`;
  optAudio.value = String(s.audioReactivity);
  valAudio.textContent = `${s.audioReactivity.toFixed(2)}×`;
  optWordSize.value = String(s.wordFontSize);
  valWordSize.textContent = `${s.wordFontSize}px`;
  optLyricDecay.value = String(s.lyricDecaySec ?? 2.5);
  valLyricDecay.textContent = `${Number(s.lyricDecaySec ?? 2.5).toFixed(2)}s`;
  if (optWordEffect) {
    optWordEffect.value = s.wordEffect || 'rise';
  }
  optWordLimit.value = String(s.softWordLimit);
  valWordLimit.textContent = `${s.softWordLimit} words`;
  optRotSpeed.value = String(s.rotationSpeed);
  valRotSpeed.textContent = `${s.rotationSpeed.toFixed(2)}×`;
  optZoom.value = String(s.zoom);
  valZoom.textContent = `${Number(s.zoom).toFixed(2)}×`;

  optAlwaysOnTop.checked = Boolean(s.alwaysOnTop);
  optShowNames.checked = Boolean(s.showLabels);
  optFactCard.checked = Boolean(s.showFactCard);
  optBottomLine.checked = Boolean(s.showBottomLine);
  optDeepSky.checked = Boolean(s.showDeepSky);
  optSatellites.checked = Boolean(s.showSatellites);
  optInstrumental.checked = Boolean(s.instrumentalMode);
  optHoverInspector.checked = Boolean(s.hoverInspector);
  optProportionalSizes.checked = Boolean(s.proportionalSizes);
  optFreeExplore.checked = Boolean(s.freeExplore);
  optPlayerControls.checked = Boolean(s.showPlayerControls);
  optLyricPreferred.value = s.lyricPreferred || 'auto';
  if (optProvLimusic) optProvLimusic.checked = Boolean(s.enableLimusic);
  optProvBoidu.checked = Boolean(s.enableBoidu);
  if (optProvUnison) optProvUnison.checked = Boolean(s.enableUnison);
  optProvLyricsplus.checked = Boolean(s.enableLyricsplus);
  optProvLrclib.checked = Boolean(s.enableLrclib);
  optProvYtmusic.checked = Boolean(s.enableYtmusic);
  if (optProvNetease) optProvNetease.checked = Boolean(s.enableNetease);
  if (optProvQqmusic) optProvQqmusic.checked = Boolean(s.enableQqmusic);
  if (optProvKugou) optProvKugou.checked = Boolean(s.enableKugou);
  optDemoMode.checked = Boolean(state.demoMode);
  optFontPreset.value = s.fontPreset || 'system';
  if (document.activeElement !== optCustomFontName) {
    optCustomFontName.value = s.customFontName || '';
  }
  valFontFile.textContent = state.customFontLoadedName || 'None';
  if (optSyncOffset) optSyncOffset.value = String(state.syncOffsetSec);
  valOffset.textContent = formatOffsetLabel(state.syncOffsetSec);

  if (s.freeExplore) {
    const nearest = state.lastExploreNearestIdx >= 0 ? state.lastExploreNearestIdx : state.currentConstellationIndex;
    updateFactCard(nearest);
  } else {
    updateFactCard();
  }
  recomputeBottomClearY();
  appWindow?.setAlwaysOnTop?.(Boolean(s.alwaysOnTop)).catch(() => {});

  if (persist) {
    saveSettings(s);
  }
}

function syncLyricPrefsToBackend() {
  state.weLyricsCache.clear();
  if (!invoke) {
    if (state.media.hasSession) {
      lookupBrowserLyrics(true);
    }
    return;
  }
  invoke('set_lyric_prefs', {
    prefs: {
      preferred: state.settings.lyricPreferred || 'auto',
      enableLimusic: Boolean(state.settings.enableLimusic),
      enableBoidu: Boolean(state.settings.enableBoidu),
      enableUnison: Boolean(state.settings.enableUnison),
      enableLyricsplus: Boolean(state.settings.enableLyricsplus),
      enableLrclib: Boolean(state.settings.enableLrclib),
      enableYtmusic: Boolean(state.settings.enableYtmusic),
      enableNetease: Boolean(state.settings.enableNetease),
      enableQqmusic: Boolean(state.settings.enableQqmusic),
      enableKugou: Boolean(state.settings.enableKugou),
    },
  }).catch(() => {});
}

function setSettingsOpen(open) {
  state.settingsOpen = open;
  document.body.classList.toggle('settings-open', open);
  btnSettings.classList.toggle('active', open);
  settingsDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  showHud(true);
}

function hideBottomLyricLine(clearContents = false) {
  if (!state.bottomWrapHidden) {
    state.bottomWrapHidden = true;
    elBottomLineWrap.classList.add('hidden');
    recomputeBottomClearY();
  }
  if (clearContents) {
    state.lastBottomKey = '';
    state.bottomWordSpans = [];
    state.bottomSpanStates = new Uint8Array(0);
    state.bottomSpanFillSteps = new Int16Array(0);
    elBottomLine.textContent = '';
    elBottomLineNext.textContent = '';
  }
}

function applyMediaUpdate(media) {
  state.media = media;
  const trackKey = media.hasSession && media.title
    ? `${(media.artist || '').trim().toLowerCase()}|${media.title.trim().toLowerCase()}`
    : '';

  if (media.status === 'Playing' && state.demoMode) {
    state.demoMode = false;
    btnDemo.classList.remove('active');
    optDemoMode.checked = false;
    showToast('Live playback detected');
  }

  const isNewTrack = trackKey !== state.currentTrackKey;
  if (isNewTrack) {
    state.browserLookupGen += 1;
    state.currentTrackKey = trackKey;
    state.lyrics = { trackKey, found: false, synced: false, wordSynced: false, lines: [], plainText: null, source: 'none' };
    state.lyricsLoading = Boolean(trackKey);
    state.lyricHintIdx = 0;
    state.lastLineIndex = -1;
    state.clockPosSec = media.positionSec || 0;
    visualizer.lastActiveWordKey = '';
    for (const b of visualizer.wordBubbles.values()) {
      b.isCurrent = false;
      b.fastFade = true;
    }
    hideBottomLyricLine(true);
    resetConstellationWordBudget();
    if (trackKey) {
      const startIdx = hashTrackKey(trackKey) % CONSTELLATIONS.length;
      switchConstellation(startIdx, 1, false, false);
    }
  }

  const nowEpochMs = Date.now();
  let expectedPos = media.positionSec || 0;
  if (media.status === 'Playing') {
    const validUpdated =
      media.lastUpdatedMs > 946684800000 &&
      Math.abs(media.sampledAtMs - media.lastUpdatedMs) < 120000;
    const refMs = validUpdated ? media.lastUpdatedMs : (media.sampledAtMs || nowEpochMs);
    const elapsed = Math.max(0, (nowEpochMs - refMs) / 1000);
    expectedPos += elapsed;
  }

  const drift = Math.abs(expectedPos - state.clockPosSec);
  if (isNewTrack || media.status !== 'Playing' || drift >= 0.85) {
    state.clockPosSec = expectedPos;
  } else {
    state.clockPosSec = state.clockPosSec * 0.72 + expectedPos * 0.28;
  }

  updateHudText();
}

function applyLyricsLoading(info) {
  if (info?.trackKey && info.trackKey !== state.currentTrackKey) return;
  state.lyricsLoading = true;
  state.lyrics = {
    trackKey: state.currentTrackKey,
    found: false,
    synced: false,
    wordSynced: false,
    lines: [],
    plainText: null,
    source: 'none',
  };
  state.lyricHintIdx = 0;
  state.lastLineIndex = -1;
  visualizer.lastActiveWordKey = '';
  hideBottomLyricLine(true);
  updateHudText();
}

function applyLyricsUpdate(payload, keepLoadingIfEmpty = false) {
  if (payload?.trackKey && state.currentTrackKey && payload.trackKey !== state.currentTrackKey) {
    return;
  }
  if (!keepLoadingIfEmpty || payload?.found) {
    state.lyricsLoading = false;
  }
  state.lyrics = payload || { found: false, synced: false, wordSynced: false, lines: [], source: 'none' };
  state.lyricHintIdx = 0;
  state.lastLineIndex = -1;
  state.lastBottomKey = '';
  resetConstellationWordBudget();
  updateHudText();
}

function formatProviderBadge(lyrics) {
  const src = (lyrics.source || '').toLowerCase();
  let provider = '';
  if (src.startsWith('limusic')) provider = 'LIMUSIC';
  else if (src.startsWith('boidu')) provider = 'BOIDU';
  else if (src.startsWith('unison')) provider = 'UNISON';
  else if (src.startsWith('lyricsplus')) provider = 'LYRICSPLUS';
  else if (src.startsWith('lrclib')) provider = 'LRCLIB';
  else if (src.startsWith('ytmusic')) provider = 'YT MUSIC';
  else if (src.startsWith('netease')) provider = 'NETEASE';
  else if (src.startsWith('qqmusic')) provider = 'QQ MUSIC';
  else if (src.startsWith('kugou')) provider = 'KUGOU';

  if (lyrics.synced && lyrics.lines?.length > 0) {
    const mode = lyrics.wordSynced ? 'WORD' : 'SYNCED';
    return provider ? `${mode} · ${provider}` : mode;
  }
  if (lyrics.found) {
    return provider ? `PLAIN · ${provider}` : 'PLAIN';
  }
  return 'NO LYRICS';
}

function formatTimeFromInt(secInt) {
  const s = secInt > 0 ? secInt : 0;
  const mins = (s / 60) | 0;
  const rem = s % 60;
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

function updatePlayerProgress(posSec, durSec, nowMs = 0) {
  if (state.playerSeeking) return;
  if (!state.settings.showPlayerControls || (state.wallpaperModeActive && !state.weEnv)) {
    return;
  }

  const safeDur = durSec > 0 ? durSec : 0;
  const rawPos = posSec > 0 ? posSec : 0;
  const safePos = safeDur > 0 && rawPos > safeDur ? safeDur : rawPos;

  const curInt = safePos | 0;
  const durInt = safeDur | 0;
  if (curInt !== state.lastCurSecInt) {
    state.lastCurSecInt = curInt;
    elPlayerTimeCur.textContent = formatTimeFromInt(curInt);
  }
  if (durInt !== state.lastDurSecInt) {
    state.lastDurSecInt = durInt;
    elPlayerTimeDur.textContent = formatTimeFromInt(durInt);
  }

  if (safeDur > 0) {
    const wantDisabled = !state.demoMode && !invoke;
    if (state.lastSeekDisabled !== wantDisabled) {
      state.lastSeekDisabled = wantDisabled;
      elPlayerSeek.disabled = wantDisabled;
    }
    if (state.lastSeekMax !== safeDur) {
      state.lastSeekMax = safeDur;
      elPlayerSeek.max = String(safeDur);
    }
    if (!nowMs || nowMs - state.lastSeekUpdateMs >= 65) {
      state.lastSeekUpdateMs = nowMs;
      elPlayerSeek.value = String(Math.round(safePos * 10) * 0.1);
    }
  } else if (state.lastSeekMax !== 0) {
    state.lastSeekMax = 0;
    state.lastSeekDisabled = true;
    elPlayerSeek.max = '100';
    elPlayerSeek.value = '0';
    elPlayerSeek.disabled = true;
  }
}

function updatePlayerControls() {
  const hasSession = Boolean(state.media.hasSession);
  const playing = state.demoMode || (hasSession && state.media.status === 'Playing');
  btnMediaPlay.classList.toggle('is-playing', playing);
  btnMediaPlay.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  btnMediaPlay.title = playing ? 'Pause' : 'Play';
  const canControl = Boolean(invoke && hasSession);
  btnMediaPrev.disabled = !canControl;
  btnMediaNext.disabled = !canControl;
  elPlayerStatusDot.classList.toggle('playing', playing);
}

async function sendMediaControl(action) {
  if (!state.media.hasSession) {
    if (action === 'toggle') {
      toggleDemo();
    } else {
      showToast('No active media session');
    }
    return;
  }
  if (!invoke) {
    showToast('Playback buttons require Tauri desktop mode');
    return;
  }
  try {
    await invoke('media_control', { action });
  } catch {
    showToast('Media control unavailable');
  }
}

async function seekMedia(targetSec) {
  const clamped = Math.max(0, Number(targetSec) || 0);
  if (state.demoMode) {
    state.demoStartMs = performance.now() - clamped * 1000;
    return;
  }
  if (!state.media.hasSession || !invoke) return;
  state.clockPosSec = clamped;
  try {
    await invoke('media_seek', { positionSec: clamped });
  } catch {
    showToast('Seek unavailable for this player');
  }
}

function updateHudText() {
  if (state.demoMode) {
    elStatusDot.classList.add('playing');
    elTrackTitle.textContent = 'Starlight Demo';
    elTrackArtist.textContent = 'Press D to exit demo mode';
    elLyricBadge.textContent = 'DEMO';
    elPlayerTitle.textContent = 'Starlight Demo';
    elPlayerArtist.textContent = 'Built-in Showcase Loop';
    elPlayerSourceBadge.textContent = 'DEMO';
    updatePlayerControls();
    return;
  }

  const m = state.media;
  const playing = m.hasSession && m.status === 'Playing';
  elStatusDot.classList.toggle('playing', playing);
  updatePlayerControls();

  if (!m.hasSession || !m.title) {
    elTrackTitle.textContent = 'Waiting for music…';
    elTrackArtist.textContent = 'Play any song on Windows, or press D for demo';
    elLyricBadge.textContent = 'IDLE';
    elPlayerTitle.textContent = 'Waiting for music…';
    elPlayerArtist.textContent = 'Play any song on Windows, or press D for demo';
    elPlayerSourceBadge.textContent = 'IDLE';
    elPlayerArt.classList.add('hidden');
    updatePlayerProgress(0, 0, 0);
    return;
  }

  elTrackTitle.textContent = m.title;
  elTrackArtist.textContent = m.artist || 'Unknown Artist';
  elPlayerTitle.textContent = m.title;
  elPlayerArtist.textContent = m.artist || 'Unknown Artist';

  let badge;
  if (state.lyricsLoading) {
    badge = 'SEARCHING';
  } else {
    const base = formatProviderBadge(state.lyrics);
    badge = state.wasInstrumentalSolo && playing ? `${base} · SOLO` : base;
  }
  elLyricBadge.textContent = badge;
  elPlayerSourceBadge.textContent = badge;
}

/**
 * O(1) sequential cursor hit + O(log N) binary search fallback, mutating `ACTIVE_LYRIC_FRAME`
 * in place so zero objects are allocated per frame.
 */
function getActiveLyricFrame(lines, timeSec) {
  const len = lines ? lines.length : 0;
  if (len === 0) return EMPTY_LYRIC_FRAME;

  let foundIdx = -1;
  const hint = state.lyricHintIdx;

  // Fast O(1) path for sequential playback (same line or immediate next line)
  if (hint >= 0 && hint < len) {
    const hLine = lines[hint];
    if (timeSec >= hLine.timeSec && timeSec < hLine.endSec) {
      foundIdx = hint;
    } else if (hint + 1 < len) {
      const nextCand = lines[hint + 1];
      if (timeSec >= nextCand.timeSec && timeSec < nextCand.endSec) {
        foundIdx = hint + 1;
      }
    }
  }

  // O(log N) binary search fallback on seeks or instrumental gaps
  if (foundIdx === -1) {
    let lo = 0;
    let hi = len - 1;
    let cand = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      if (lines[mid].timeSec <= timeSec) {
        cand = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    if (cand >= 0 && timeSec < lines[cand].endSec) {
      foundIdx = cand;
    }
  }

  if (foundIdx === -1) return EMPTY_LYRIC_FRAME;
  state.lyricHintIdx = foundIdx;

  const line = lines[foundIdx];
  const nextLine = lines[foundIdx + 1] || (state.demoMode ? lines[0] : null);
  const duration = Math.max(0.35, line.endSec - line.timeSec);
  const progress = Math.max(0, Math.min(1, (timeSec - line.timeSec) / duration));

  const words = line.words || EMPTY_WORDS;
  let activeWordIndex = -1;
  for (let wi = 0, wLen = words.length; wi < wLen; wi++) {
    if (progress >= words[wi].offsetRatio) {
      activeWordIndex = wi;
    } else {
      break;
    }
  }

  const out = ACTIVE_LYRIC_FRAME;
  out.lineIndex = foundIdx;
  if (out.lineIndex !== state.lastLineIndex || !out.lineKey) {
    out.lineKey = `${state.demoMode ? 'demo' : state.currentTrackKey}#${foundIdx}`;
  }
  out.activeWordIndex = activeWordIndex;
  out.words = words;
  out.lineProgress = progress;
  out.text = line.text;
  out.nextText = nextLine ? nextLine.text : '';
  return out;
}

function renderBottomLyric(frame, pauseExpired = false) {
  if (!state.settings.showBottomLine || !frame.text || pauseExpired) {
    hideBottomLyricLine(false);
    return;
  }

  if (state.bottomWrapHidden) {
    state.bottomWrapHidden = false;
    elBottomLineWrap.classList.remove('hidden');
    recomputeBottomClearY();
  }

  if (frame.lineKey !== state.lastBottomKey) {
    state.lastBottomKey = frame.lineKey;
    const words = frame.words || EMPTY_WORDS;
    const wLen = words.length;
    const frag = document.createDocumentFragment();
    const spans = new Array(wLen);

    for (let i = 0; i < wLen; i++) {
      const sp = document.createElement('span');
      sp.className = 'am-word';
      sp.textContent = words[i].text;
      frag.appendChild(sp);
      spans[i] = sp;
    }

    elBottomLine.textContent = '';
    elBottomLine.appendChild(frag);
    state.bottomWordSpans = spans;
    state.bottomSpanStates = new Uint8Array(wLen); // 0 = idle, 1 = active, 2 = past
    state.bottomSpanFillSteps = new Int16Array(wLen).fill(-1);
    elBottomLineNext.textContent = frame.nextText || '';
  }

  const spans = state.bottomWordSpans;
  const spanStates = state.bottomSpanStates;
  const fillSteps = state.bottomSpanFillSteps;
  const words = frame.words || EMPTY_WORDS;
  const p = frame.lineProgress || 0;

  for (let i = 0, sLen = spans.length; i < sLen; i++) {
    const w = words[i];
    if (!w) continue;
    const wStart = w.offsetRatio;
    const wDur = w.durationRatio > 0.03 ? w.durationRatio : 0.08;
    const wEnd = wStart + wDur;

    if (p >= wEnd) {
      if (spanStates[i] !== 2) {
        const sp = spans[i];
        if (spanStates[i] === 1) sp.classList.remove('is-active');
        sp.classList.add('is-past');
        spanStates[i] = 2;
      }
    } else if (p >= wStart) {
      const sp = spans[i];
      if (spanStates[i] !== 1) {
        if (spanStates[i] === 2) sp.classList.remove('is-past');
        sp.classList.add('is-active');
        spanStates[i] = 1;
      }
      const fillPct = Math.max(0, Math.min(100, ((p - wStart) / wDur) * 100));
      const step = (fillPct * 2 + 0.5) | 0; // 0.5% quantization step
      if (fillSteps[i] !== step) {
        fillSteps[i] = step;
        sp.style.setProperty('--fill', `${(step * 0.5).toFixed(1)}%`);
      }
    } else if (spanStates[i] !== 0) {
      spans[i].classList.remove('is-active', 'is-past');
      spanStates[i] = 0;
      fillSteps[i] = -1;
    }
  }
}

function handleSoftWordLimit(lyric) {
  if (lyric.lineIndex !== state.lastLineIndex) {
    state.lastLineIndex = lyric.lineIndex;
    if (state.pendingRotation && lyric.lineIndex >= 0) {
      switchToNextTourConstellation();
    }
  }

  if (lyric.activeWordIndex >= 0) {
    const wordKey = `${lyric.lineKey}:${lyric.activeWordIndex}`;
    if (wordKey !== state.lastCountedWordKey) {
      state.lastCountedWordKey = wordKey;
      state.wordsShownOnConstellation += 1;

      const limit = state.settings.softWordLimit;
      if (state.wordsShownOnConstellation >= limit + 6) {
        switchToNextTourConstellation();
      } else if (state.wordsShownOnConstellation >= limit) {
        state.pendingRotation = true;
      }
    }
  }
}

function hideInspector() {
  if (!state.inspectorHidden) {
    state.inspectorHidden = true;
    elInspector.classList.add('hidden');
    state.lastInspectedKey = '';
  }
}

function updateStarInspector() {
  if (!state.settings.hoverInspector || !state.pointer.inside || state.settingsOpen || state.drag.active) {
    if (visualizer.hoveredTarget) visualizer.hitTest(-9999, -9999);
    hideInspector();
    return;
  }

  const hit = visualizer.hitTest(state.pointer.x, state.pointer.y);
  if (!hit) {
    hideInspector();
    return;
  }

  const key = `${hit.kind}:${hit.name}:${hit.meta || ''}`;
  let needsMeasure = false;
  if (key !== state.lastInspectedKey) {
    state.lastInspectedKey = key;
    const dotCol = hit.color || visualizer.theme.brand;
    elInspDot.style.background = dotCol;
    elInspDot.style.boxShadow = `0 0 8px ${dotCol}`;
    elInspName.textContent = hit.name;
    elInspKind.textContent = hit.kind;
    elInspMeta.textContent = hit.meta || '';
    elInspNote.textContent = hit.note || '';
    needsMeasure = true;
  }

  if (state.inspectorHidden) {
    state.inspectorHidden = false;
    elInspector.classList.remove('hidden');
    needsMeasure = true;
  }

  if (needsMeasure) {
    state.inspectorWidth = elInspector.offsetWidth || 240;
    state.inspectorHeight = elInspector.offsetHeight || 88;
  }

  const margin = 12;
  const tx = Math.max(margin, Math.min(window.innerWidth - state.inspectorWidth - margin, state.pointer.x + 16));
  const ty = Math.max(margin, Math.min(window.innerHeight - state.inspectorHeight - margin, state.pointer.y + 16));
  elInspector.style.transform = `translate(${Math.round(tx)}px, ${Math.round(ty)}px)`;
}

function tick() {
  state.rafScheduled = false;
  if (state.wePaused || state.docHiddenPaused) {
    return;
  }

  const nowMs = performance.now();
  // Lock frame cadence to display refresh rate (VSync via requestAnimationFrame),
  // and keep song playback clock uncapped across slow frames so lyrics never drift behind.
  const rawDt = Math.min(2.0, Math.max(0, (nowMs - state.lastTickMs) / 1000));
  state.lastTickMs = nowMs;

  if (!state.demoMode && state.media.hasSession && state.media.status === 'Playing') {
    state.clockPosSec += rawDt;
  }

  const rf = RENDER_FRAME_STATE;
  let lyric;
  if (state.demoMode) {
    const demoTime = ((nowMs - state.demoStartMs) / 1000) % 17.5;
    lyric = getActiveLyricFrame(DEMO_LINES, demoTime);
    handleSoftWordLimit(lyric);
    updatePlayerProgress(demoTime, 17.5, nowMs);
    rf.isPlaying = true;
    rf.hasSyncedLyrics = true;
  } else {
    const isPlaying = state.media.hasSession && state.media.status === 'Playing';
    const hasSynced = Boolean(state.lyrics.synced && state.lyrics.lines?.length);
    lyric = hasSynced
      ? getActiveLyricFrame(state.lyrics.lines, state.clockPosSec + state.syncOffsetSec)
      : EMPTY_LYRIC_FRAME;

    if (hasSynced) {
      handleSoftWordLimit(lyric);
    }
    if (state.media.hasSession) {
      updatePlayerProgress(state.clockPosSec, state.media.endSec || 0, nowMs);
    }
    rf.isPlaying = isPlaying;
    rf.hasSyncedLyrics = hasSynced;
  }

  rf.lineIndex = lyric.lineIndex;
  rf.lineKey = lyric.lineKey;
  rf.activeWordIndex = lyric.activeWordIndex;
  rf.words = lyric.words;
  rf.lineProgress = lyric.lineProgress;
  rf.text = lyric.text;
  rf.nextText = lyric.nextText;
  rf.audio = state.audioLevels;

  const animDt = rawDt < 0.05 ? rawDt : 0.05;
  if (rf.isPlaying) {
    state.pausedBottomSec = 0;
  } else {
    state.pausedBottomSec += animDt;
  }
  const bottomExpired = !rf.isPlaying && state.pausedBottomSec >= (state.settings.lyricDecaySec ?? 2.5);
  renderBottomLyric(rf, bottomExpired);

  rf.bottomClearY = state.cachedBottomClearY;
  visualizer.render(rf);

  // Free Explore: keep Fact Card and dropdown synced with whichever constellation is centered
  if (state.settings.freeExplore) {
    const nearest = visualizer.getNearestConstellationIndex();
    if (nearest !== state.lastExploreNearestIdx) {
      state.lastExploreNearestIdx = nearest;
      optConstellation.value = String(nearest);
      updateFactCard(nearest);
    }
  }

  // Instrumental Solo Mode: update badge and gently tour sky every 16s during solos/instrumentals
  const soloActive = Boolean(visualizer.isInstrumentalActive && rf.isPlaying);
  if (soloActive !== state.wasInstrumentalSolo) {
    state.wasInstrumentalSolo = soloActive;
    updateHudText();
  }
  if (soloActive && !visualizer.transition && !state.settings.freeExplore) {
    state.instrumentalTourTimer += animDt;
    if (state.instrumentalTourTimer >= 16) {
      state.instrumentalTourTimer = 0;
      switchToNextTourConstellation();
    }
  } else {
    state.instrumentalTourTimer = 0;
  }

  updateStarInspector();
  scheduleTick();
}

function toggleDemo() {
  state.demoMode = !state.demoMode;
  btnDemo.classList.toggle('active', state.demoMode);
  optDemoMode.checked = state.demoMode;
  state.lyricHintIdx = 0;
  state.lastLineIndex = -1;
  resetConstellationWordBudget();
  if (state.demoMode) {
    state.demoStartMs = performance.now();
    showToast('Demo mode active');
  } else {
    showToast('Demo mode off');
  }
  updateHudText();
}

function adjustOffset(delta) {
  const next = delta === 0 ? 0 : state.syncOffsetSec + delta;
  setSyncOffset(next, true, true);
}

async function toggleFullscreen() {
  if (!appWindow) return;
  try {
    const fs = await appWindow.isFullscreen();
    await appWindow.setFullscreen(!fs);
  } catch {
    // Ignore if unavailable
  }
}

function populateConstellationSelect() {
  const frag = document.createDocumentFragment();
  CONSTELLATIONS.forEach((c, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = `${c.name} — ${c.title}`;
    frag.appendChild(opt);
  });
  optConstellation.textContent = '';
  optConstellation.appendChild(frag);
  optConstellation.value = String(state.currentConstellationIndex);
}

function adjustZoom(delta, showMsg = true) {
  const next = delta === null
    ? 1.0
    : Math.max(0.45, Math.min(2.4, Math.round(((state.settings.zoom ?? 1.0) + delta) * 100) / 100));
  state.settings.zoom = next;
  applySettingsToApp(true);
  if (showMsg) {
    showToast(`Zoom: ${next.toFixed(2)}×`);
  }
}

function setupLayoutObservers() {
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const borderH = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        if (entry.target === elPlayerBar) {
          state.playerBarHeight = borderH;
        } else if (entry.target === elBottomLineWrap) {
          state.bottomWrapHeight = borderH;
        }
      }
      recomputeBottomClearY();
    });
    if (elPlayerBar) ro.observe(elPlayerBar);
    if (elBottomLineWrap) ro.observe(elBottomLineWrap);
  }
  recomputeBottomClearY();
}

function wireControls() {
  populateConstellationSelect();
  setupLayoutObservers();
  applySettingsToApp(false);

  window.addEventListener('resize', () => {
    visualizer.resize();
    recomputeBottomClearY();
  });

  document.addEventListener('visibilitychange', () => {
    if (state.weEnv) return;
    const shouldPause = Boolean(document.hidden);
    if (state.docHiddenPaused === shouldPause) return;
    state.docHiddenPaused = shouldPause;
    if (!shouldPause) {
      state.lastTickMs = performance.now();
      scheduleTick();
    }
  });

  window.addEventListener('mousemove', (e) => {
    showHud(false);
    if (e.target === canvas) {
      state.pointer.x = e.clientX;
      state.pointer.y = e.clientY;
      state.pointer.inside = true;
      visualizer.pointerActiveUntil = performance.now() + 400;
    } else {
      state.pointer.inside = false;
    }
  });
  document.addEventListener('mouseleave', () => {
    state.pointer.inside = false;
  });
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const step = e.deltaY < 0 ? 0.1 : -0.1;
    adjustZoom(step, true);
  }, { passive: false });

  canvas.addEventListener('pointerdown', (e) => {
    if (!state.settings.freeExplore || e.button !== 0) return;
    canvas.setPointerCapture?.(e.pointerId);
    state.drag = {
      active: true,
      pointerId: e.pointerId,
      lastX: e.clientX,
      lastY: e.clientY,
      lastMs: performance.now(),
    };
    state.pointer.inside = false;
    visualizer.setDragging(true);
    document.body.classList.add('is-dragging');
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!state.drag.active || e.pointerId !== state.drag.pointerId) return;
    const now = performance.now();
    const dx = e.clientX - state.drag.lastX;
    const dy = e.clientY - state.drag.lastY;
    const dtSec = Math.max(0.008, (now - state.drag.lastMs) / 1000);
    visualizer.panBy(dx, dy, dtSec);
    state.drag.lastX = e.clientX;
    state.drag.lastY = e.clientY;
    state.drag.lastMs = now;
  });

  const endDrag = (e) => {
    if (!state.drag.active || e.pointerId !== state.drag.pointerId) return;
    if (canvas.hasPointerCapture?.(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    state.drag.active = false;
    state.drag.pointerId = null;
    visualizer.setDragging(false);
    document.body.classList.remove('is-dragging');
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  window.addEventListener('mousedown', (e) => {
    showHud(true);
    if (
      state.settingsOpen &&
      !e.target.closest('#settings-drawer') &&
      !e.target.closest('#btn-settings')
    ) {
      setSettingsOpen(false);
    }
  });

  document.getElementById('hud-top').addEventListener('dblclick', (e) => {
    if (e.target.closest('button')) return;
    appWindow?.toggleMaximize?.();
  });

  btnConstellation.addEventListener('click', (e) => {
    e.stopPropagation();
    const base = state.settings.freeExplore ? visualizer.getNearestConstellationIndex() : state.currentConstellationIndex;
    switchConstellation(base + 1, 1, true, true, true);
  });

  btnExplore.addEventListener('click', (e) => {
    e.stopPropagation();
    setFreeExplore(!state.settings.freeExplore, true);
  });

  btnDemo.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDemo();
  });

  btnMediaPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    sendMediaControl('prev');
  });

  btnMediaPlay.addEventListener('click', (e) => {
    e.stopPropagation();
    sendMediaControl('toggle');
  });

  btnMediaNext.addEventListener('click', (e) => {
    e.stopPropagation();
    sendMediaControl('next');
  });

  elPlayerSeek.addEventListener('input', () => {
    state.playerSeeking = true;
    const secInt = (parseFloat(elPlayerSeek.value) || 0) | 0;
    state.lastCurSecInt = secInt;
    elPlayerTimeCur.textContent = formatTimeFromInt(secInt);
  });

  elPlayerSeek.addEventListener('change', () => {
    const target = parseFloat(elPlayerSeek.value) || 0;
    state.playerSeeking = false;
    seekMedia(target);
  });

  btnFact.addEventListener('click', (e) => {
    e.stopPropagation();
    state.settings.showFactCard = !state.settings.showFactCard;
    applySettingsToApp(true);
  });

  btnCloseFact.addEventListener('click', (e) => {
    e.stopPropagation();
    state.settings.showFactCard = false;
    applySettingsToApp(true);
  });

  btnSettings.addEventListener('click', (e) => {
    e.stopPropagation();
    setSettingsOpen(!state.settingsOpen);
  });

  btnCloseSettings.addEventListener('click', (e) => {
    e.stopPropagation();
    setSettingsOpen(false);
  });

  btnFullscreen.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFullscreen();
  });

  btnMin.addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow?.minimize?.();
  });

  btnMax.addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow?.toggleMaximize?.();
  });

  btnClose.addEventListener('click', (e) => {
    e.stopPropagation();
    appWindow?.close?.();
  });

  // Sliders & selects inside QoL drawer
  if (optColorTheme) {
    optColorTheme.addEventListener('change', () => {
      state.settings.colorTheme = optColorTheme.value;
      applySettingsToApp(true);
      const label = COLOR_THEMES[optColorTheme.value]?.label || optColorTheme.value;
      showToast(`Theme: ${label}`);
    });
  }
  optBrightness.addEventListener('input', () => {
    state.settings.starBrightness = parseFloat(optBrightness.value);
    applySettingsToApp(true);
  });
  optEffects.addEventListener('input', () => {
    state.settings.effectsIntensity = parseFloat(optEffects.value);
    applySettingsToApp(true);
  });
  optLines.addEventListener('input', () => {
    state.settings.lineOpacity = parseFloat(optLines.value);
    applySettingsToApp(true);
  });
  optAudio.addEventListener('input', () => {
    state.settings.audioReactivity = parseFloat(optAudio.value);
    applySettingsToApp(true);
  });
  optWordSize.addEventListener('input', () => {
    state.settings.wordFontSize = parseInt(optWordSize.value, 10);
    applySettingsToApp(true);
  });
  optLyricDecay.addEventListener('input', () => {
    state.settings.lyricDecaySec = parseFloat(optLyricDecay.value);
    applySettingsToApp(true);
  });
  if (optWordEffect) {
    optWordEffect.addEventListener('change', () => {
      state.settings.wordEffect = optWordEffect.value;
      applySettingsToApp(true);
    });
  }
  optWordLimit.addEventListener('input', () => {
    state.settings.softWordLimit = parseInt(optWordLimit.value, 10);
    applySettingsToApp(true);
  });
  optRotSpeed.addEventListener('input', () => {
    state.settings.rotationSpeed = parseFloat(optRotSpeed.value);
    applySettingsToApp(true);
  });
  optZoom.addEventListener('input', () => {
    state.settings.zoom = parseFloat(optZoom.value);
    applySettingsToApp(true);
  });

  optConstellation.addEventListener('change', () => {
    const target = parseInt(optConstellation.value, 10);
    const dir = target >= state.currentConstellationIndex ? 1 : -1;
    switchConstellation(target, dir, true, true, true);
  });

  btnPrevConst.addEventListener('click', () => {
    const base = state.settings.freeExplore ? visualizer.getNearestConstellationIndex() : state.currentConstellationIndex;
    switchConstellation(base - 1, -1, true, true, true);
  });
  btnNextConst.addEventListener('click', () => {
    const base = state.settings.freeExplore ? visualizer.getNearestConstellationIndex() : state.currentConstellationIndex;
    switchConstellation(base + 1, 1, true, true, true);
  });

  optAlwaysOnTop.addEventListener('change', () => {
    state.settings.alwaysOnTop = optAlwaysOnTop.checked;
    applySettingsToApp(true);
    showToast(state.settings.alwaysOnTop ? 'Always on top enabled' : 'Always on top disabled');
  });

  optShowNames.addEventListener('change', () => {
    state.settings.showLabels = optShowNames.checked;
    applySettingsToApp(true);
    showToast(state.settings.showLabels ? 'Constellation names shown' : 'Constellation names hidden');
  });

  optFactCard.addEventListener('change', () => {
    state.settings.showFactCard = optFactCard.checked;
    applySettingsToApp(true);
  });

  optBottomLine.addEventListener('change', () => {
    state.settings.showBottomLine = optBottomLine.checked;
    applySettingsToApp(true);
    showToast(state.settings.showBottomLine ? 'Bottom lyric line shown' : 'Bottom lyric line hidden');
  });

  optDeepSky.addEventListener('change', () => {
    state.settings.showDeepSky = optDeepSky.checked;
    applySettingsToApp(true);
    showToast(state.settings.showDeepSky ? 'Deep-sky & live planets shown' : 'Deep-sky & live planets hidden');
  });

  optSatellites.addEventListener('change', () => {
    state.settings.showSatellites = optSatellites.checked;
    applySettingsToApp(true);
    showToast(state.settings.showSatellites ? 'Satellites & Voyagers shown' : 'Satellites & Voyagers hidden');
  });

  optInstrumental.addEventListener('change', () => {
    state.settings.instrumentalMode = optInstrumental.checked;
    applySettingsToApp(true);
    showToast(state.settings.instrumentalMode ? 'Instrumental solo mode on' : 'Instrumental solo mode off');
  });

  optHoverInspector.addEventListener('change', () => {
    state.settings.hoverInspector = optHoverInspector.checked;
    applySettingsToApp(true);
    showToast(state.settings.hoverInspector ? 'Hover star inspector on' : 'Hover star inspector off');
  });

  optProportionalSizes.addEventListener('change', () => {
    state.settings.proportionalSizes = optProportionalSizes.checked;
    applySettingsToApp(true);
    showToast(state.settings.proportionalSizes ? 'Proportional celestial sizes enabled' : 'Stylized celestial sizes enabled');
  });

  optFreeExplore.addEventListener('change', () => {
    setFreeExplore(optFreeExplore.checked, true);
  });

  optPlayerControls.addEventListener('change', () => {
    state.settings.showPlayerControls = optPlayerControls.checked;
    applySettingsToApp(true);
    showToast(state.settings.showPlayerControls ? 'Player controls shown' : 'Player controls hidden');
  });

  optLyricPreferred.addEventListener('change', () => {
    const val = optLyricPreferred.value;
    state.settings.lyricPreferred = val;
    const enableKeyMap = {
      limusic: 'enableLimusic',
      boidu: 'enableBoidu',
      unison: 'enableUnison',
      lyricsplus: 'enableLyricsplus',
      lrclib: 'enableLrclib',
      ytmusic: 'enableYtmusic',
      netease: 'enableNetease',
      qqmusic: 'enableQqmusic',
      kugou: 'enableKugou',
    };
    if (val !== 'auto' && enableKeyMap[val]) {
      state.settings[enableKeyMap[val]] = true;
    }
    applySettingsToApp(true);
    syncLyricPrefsToBackend();
    showToast(`Preferred lyrics: ${optLyricPreferred.options[optLyricPreferred.selectedIndex]?.text || val}`);
  });

  const providerChecks = [
    [optProvLimusic, 'enableLimusic', 'Limusic'],
    [optProvBoidu, 'enableBoidu', 'Boidu'],
    [optProvUnison, 'enableUnison', 'Unison'],
    [optProvLyricsplus, 'enableLyricsplus', 'LyricsPlus'],
    [optProvLrclib, 'enableLrclib', 'LRCLIB'],
    [optProvYtmusic, 'enableYtmusic', 'YouTube Music'],
    [optProvNetease, 'enableNetease', 'Netease Cloud Music'],
    [optProvQqmusic, 'enableQqmusic', 'QQ Music'],
    [optProvKugou, 'enableKugou', 'Kugou'],
  ];
  for (const [el, key, label] of providerChecks) {
    if (!el) continue;
    el.addEventListener('change', () => {
      state.settings[key] = el.checked;
      applySettingsToApp(true);
      syncLyricPrefsToBackend();
      showToast(`${label} ${el.checked ? 'enabled' : 'disabled'}`);
    });
  }

  btnRefreshLyrics.addEventListener('click', () => {
    if (invoke) {
      showToast('Re-searching lyrics…');
      invoke('refresh_lyrics').catch(() => {});
    } else if (state.media.hasSession) {
      showToast('Re-searching lyrics…');
      lookupBrowserLyrics(true);
    }
  });

  optDemoMode.addEventListener('change', () => {
    if (optDemoMode.checked !== state.demoMode) toggleDemo();
  });

  if (optSyncOffset) {
    optSyncOffset.addEventListener('input', () => {
      setSyncOffset(parseFloat(optSyncOffset.value) || 0, false, true);
    });
    optSyncOffset.addEventListener('change', () => {
      setSyncOffset(parseFloat(optSyncOffset.value) || 0, true, true);
    });
  }
  btnOffsetMinus.addEventListener('click', () => adjustOffset(-0.2));
  btnOffsetReset.addEventListener('click', () => adjustOffset(0));
  btnOffsetPlus.addEventListener('click', () => adjustOffset(0.2));

  optFontPreset.addEventListener('change', () => {
    state.settings.fontPreset = optFontPreset.value;
    applySettingsToApp(true);
  });

  optCustomFontName.addEventListener('input', () => {
    state.settings.customFontName = optCustomFontName.value;
    if (optCustomFontName.value.trim()) {
      state.settings.fontPreset = 'custom';
    } else if (!state.customFontFace) {
      state.settings.fontPreset = 'system';
    }
    applySettingsToApp(true);
  });

  optFontFile.addEventListener('change', async () => {
    const file = optFontFile.files?.[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      await registerCustomFontBuffer(buffer, file.name, true);
      showToast(`Loaded font: ${file.name}`);
    } catch {
      showToast('Failed to load font file');
    } finally {
      optFontFile.value = '';
    }
  });

  btnClearFont.addEventListener('click', () => {
    state.settings.customFontName = '';
    clearCustomFont(true);
    showToast('Custom font cleared');
  });

  btnResetDefaults.addEventListener('click', () => {
    const wasExplore = state.settings.freeExplore;
    state.settings = { ...DEFAULT_SETTINGS };
    state.syncOffsetSec = 0;
    if (wasExplore) visualizer.setFreeExplore(false);
    clearCustomFont(false);
    applySettingsToApp(true);
    syncLyricPrefsToBackend();
    showToast('Settings reset to defaults');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
      e.preventDefault();
      toggleFullscreen();
      return;
    }
    if (e.key === 'Escape') {
      if (state.settingsOpen) {
        setSettingsOpen(false);
      } else {
        appWindow?.isFullscreen?.().then((fs) => {
          if (fs) appWindow.setFullscreen(false);
        });
      }
      return;
    }
    if (e.target && e.target.closest('input, select, textarea')) {
      return;
    }
    if (e.key === 's' || e.key === 'S' || e.key === ',') {
      setSettingsOpen(!state.settingsOpen);
    } else if (e.key === 'f' || e.key === 'F') {
      state.settings.showFactCard = !state.settings.showFactCard;
      applySettingsToApp(true);
      showToast(state.settings.showFactCard ? 'Constellation fact shown' : 'Constellation fact hidden');
    } else if (e.key === 'e' || e.key === 'E') {
      setFreeExplore(!state.settings.freeExplore, true);
    } else if (e.key === 'm' || e.key === 'M') {
      state.settings.showPlayerControls = !state.settings.showPlayerControls;
      applySettingsToApp(true);
      showToast(state.settings.showPlayerControls ? 'Player controls shown' : 'Player controls hidden');
    } else if (e.key === 'n' || e.key === 'N') {
      const base = state.settings.freeExplore ? visualizer.getNearestConstellationIndex() : state.currentConstellationIndex;
      switchConstellation(base + 1, 1, true, true, true);
    } else if (e.key === 'p' || e.key === 'P') {
      const base = state.settings.freeExplore ? visualizer.getNearestConstellationIndex() : state.currentConstellationIndex;
      switchConstellation(base - 1, -1, true, true, true);
    } else if (e.key === 'c' || e.key === 'C') {
      state.settings.showLabels = !state.settings.showLabels;
      applySettingsToApp(true);
      showToast(state.settings.showLabels ? 'Constellation names shown' : 'Constellation names hidden');
    } else if (e.key === 'l' || e.key === 'L') {
      state.settings.showBottomLine = !state.settings.showBottomLine;
      applySettingsToApp(true);
      showToast(state.settings.showBottomLine ? 'Bottom lyric line shown' : 'Bottom lyric line hidden');
    } else if (e.key === 't' || e.key === 'T') {
      state.settings.alwaysOnTop = !state.settings.alwaysOnTop;
      applySettingsToApp(true);
      showToast(state.settings.alwaysOnTop ? 'Always on top enabled' : 'Always on top disabled');
    } else if (e.key === 'd' || e.key === 'D') {
      toggleDemo();
    } else if (e.key === 'w' || e.key === 'W') {
      const next = !state.wallpaperModeActive;
      applyWallpaperMode(next);
      if (!next) showToast('HUD restored (press W for clean wallpaper mode)');
    } else if (e.key === 'r' || e.key === 'R') {
      if (invoke) {
        showToast('Re-searching lyrics…');
        invoke('refresh_lyrics').catch(() => {});
      } else if (state.media.hasSession) {
        showToast('Re-searching lyrics…');
        lookupBrowserLyrics(true);
      }
    } else if (e.key === '0') {
      adjustOffset(0);
    } else if (e.key === '+' || e.key === '=') {
      adjustZoom(0.12, true);
    } else if (e.key === '-' || e.key === '_') {
      adjustZoom(-0.12, true);
    } else if (e.key === 'Backspace') {
      adjustZoom(null, true);
    } else if (e.key === 'ArrowRight') {
      adjustOffset(0.2);
    } else if (e.key === 'ArrowLeft') {
      adjustOffset(-0.2);
    }
  });
}

function applyWallpaperMode(enabled) {
  const next = Boolean(enabled);
  state.wallpaperModeActive = next;
  document.body.classList.toggle('wallpaper-mode', next);
  visualizer.resize();
  recomputeBottomClearY();
}

async function lookupBrowserLyrics(force = false) {
  const m = state.media;
  if (!m.hasSession || !m.title) return;
  const trackKey = `${(m.artist || '').trim().toLowerCase()}|${m.title.trim().toLowerCase()}`;
  const myGen = ++state.browserLookupGen;
  if (!force && state.weLyricsCache.has(trackKey)) {
    applyLyricsUpdate(state.weLyricsCache.get(trackKey));
    return;
  }

  applyLyricsLoading({ trackKey });
  const result = await fetchLyricsInBrowser(
    trackKey,
    m.title,
    m.artist,
    m.album,
    m.endSec || 0,
    {
      preferred: state.settings.lyricPreferred || 'auto',
      enableLimusic: state.settings.enableLimusic,
      enableBoidu: state.settings.enableBoidu,
      enableUnison: state.settings.enableUnison,
      enableLyricsplus: state.settings.enableLyricsplus,
      enableLrclib: state.settings.enableLrclib,
      enableYtmusic: state.settings.enableYtmusic,
      enableNetease: state.settings.enableNetease,
      enableQqmusic: state.settings.enableQqmusic,
      enableKugou: state.settings.enableKugou,
    }
  );
  if (myGen !== state.browserLookupGen) return;
  if (result.found) {
    if (state.weLyricsCache.size >= 64) {
      const oldestKey = state.weLyricsCache.keys().next().value;
      state.weLyricsCache.delete(oldestKey);
    }
    state.weLyricsCache.set(trackKey, result);
  }
  applyLyricsUpdate(result);
}

function handleWallpaperAudioArray(audioArray) {
  if (!audioArray || audioArray.length === 0) return;
  // Wallpaper Engine delivers 128 floats: 0..63 left channel, 64..127 right channel
  const len = audioArray.length;
  const half = Math.min(64, (len >> 1) || len);
  const hasStereo = len >= half * 2;
  let bass = 0;
  let mid = 0;
  let treble = 0;
  let total = 0;

  for (let i = 0; i < half; i++) {
    let l = audioArray[i] || 0;
    if (l < 0) l = 0;
    else if (l > 1.5) l = 1.5;

    let v = l;
    if (hasStereo) {
      let r = audioArray[i + half] || 0;
      if (r < 0) r = 0;
      else if (r > 1.5) r = 1.5;
      v = (l + r) * 0.5;
    }

    total += v;
    if (i < 6) bass += v;
    else if (i < 28) mid += v;
    else treble += v;
  }

  const nBass = Math.min(1, (bass / 6) * 1.8);
  const nMid = Math.min(1, (mid / 22) * 2.2);
  const nTreble = Math.min(1, (treble / Math.max(1, half - 28)) * 2.6);
  const nRms = Math.min(1, (total / half) * 2.0);

  state.weBassAvg = state.weBassAvg * 0.92 + nBass * 0.08;
  if (nBass > state.weBassAvg * 1.38 && nBass > 0.14) {
    state.weBeatEnv = 1.0;
  } else {
    state.weBeatEnv *= 0.82;
  }

  const al = state.audioLevels;
  al.bass = nBass;
  al.mid = nMid;
  al.treble = nTreble;
  al.rms = nRms;
  al.beat = state.weBeatEnv;
}

function registerWallpaperEngineHooks() {
  const hasWeGlobals =
    typeof window.wallpaperRegisterAudioListener === 'function' ||
    typeof window.wallpaperRegisterMediaPropertiesListener === 'function' ||
    typeof window.wallpaperPropertyListener !== 'undefined';

  if (hasWeGlobals) {
    state.weEnv = true;
    state.docHiddenPaused = false;
    document.body.classList.add('we-env');
    applyWallpaperMode(true);
  }

  // Must be registered synchronously at top level per docs.wallpaperengine.io
  window.wallpaperPropertyListener = {
    applyUserProperties(props) {
      if (!props) return;
      state.weEnv = true;
      state.docHiddenPaused = false;
      document.body.classList.add('we-env');
      applyWallpaperMode(true);

      if (props.colortheme && props.colortheme.value !== undefined) {
        state.settings.colorTheme = String(props.colortheme.value);
      }
      if (props.starbrightness && props.starbrightness.value !== undefined) {
        state.settings.starBrightness = Number(props.starbrightness.value);
      }
      if (props.effectsintensity && props.effectsintensity.value !== undefined) {
        state.settings.effectsIntensity = Number(props.effectsintensity.value);
      }
      if (props.lineopacity && props.lineopacity.value !== undefined) {
        state.settings.lineOpacity = Number(props.lineopacity.value);
      }
      if (props.audioreactivity && props.audioreactivity.value !== undefined) {
        state.settings.audioReactivity = Number(props.audioreactivity.value);
      }
      if (props.softwordlimit && props.softwordlimit.value !== undefined) {
        state.settings.softWordLimit = Number(props.softwordlimit.value);
      }
      if (props.rotationspeed && props.rotationspeed.value !== undefined) {
        state.settings.rotationSpeed = Number(props.rotationspeed.value);
      }
      if (props.zoom && props.zoom.value !== undefined) {
        state.settings.zoom = Number(props.zoom.value);
      }
      if (props.wordfontsize && props.wordfontsize.value !== undefined) {
        state.settings.wordFontSize = Number(props.wordfontsize.value);
      }
      if (props.lyricdecay && props.lyricdecay.value !== undefined) {
        state.settings.lyricDecaySec = Number(props.lyricdecay.value);
      }
      if (props.syncoffset && props.syncoffset.value !== undefined) {
        const off = Math.max(-5.0, Math.min(5.0, Math.round((Number(props.syncoffset.value) || 0) * 10) / 10));
        state.syncOffsetSec = off;
        state.settings.syncOffsetSec = off;
      }
      if (props.wordeffect && props.wordeffect.value !== undefined) {
        state.settings.wordEffect = String(props.wordeffect.value);
      }
      if (props.showlabels && props.showlabels.value !== undefined) {
        state.settings.showLabels = Boolean(props.showlabels.value);
      }
      if (props.showfactcard && props.showfactcard.value !== undefined) {
        state.settings.showFactCard = Boolean(props.showfactcard.value);
      }
      if (props.showbottomline && props.showbottomline.value !== undefined) {
        state.settings.showBottomLine = Boolean(props.showbottomline.value);
      }
      if (props.showplayercontrols && props.showplayercontrols.value !== undefined) {
        state.settings.showPlayerControls = Boolean(props.showplayercontrols.value);
      }
      if (props.showdeepsky && props.showdeepsky.value !== undefined) {
        state.settings.showDeepSky = Boolean(props.showdeepsky.value);
      }
      if (props.showsatellites && props.showsatellites.value !== undefined) {
        state.settings.showSatellites = Boolean(props.showsatellites.value);
      }
      if (props.instrumentalmode && props.instrumentalmode.value !== undefined) {
        state.settings.instrumentalMode = Boolean(props.instrumentalmode.value);
      }
      if (props.hoverinspector && props.hoverinspector.value !== undefined) {
        state.settings.hoverInspector = Boolean(props.hoverinspector.value);
      }
      if (props.proportionalsizes && props.proportionalsizes.value !== undefined) {
        state.settings.proportionalSizes = Boolean(props.proportionalsizes.value);
      }
      if (props.freeexplore && props.freeexplore.value !== undefined) {
        setFreeExplore(Boolean(props.freeexplore.value), false);
      }
      if (props.fontpreset && props.fontpreset.value !== undefined) {
        state.settings.fontPreset = String(props.fontpreset.value);
      }
      if (props.lyricpreferred && props.lyricpreferred.value !== undefined) {
        state.settings.lyricPreferred = String(props.lyricpreferred.value);
        if (!invoke && state.media.hasSession) lookupBrowserLyrics(true);
      }
      if (props.demomode && props.demomode.value !== undefined) {
        const wantDemo = Boolean(props.demomode.value);
        if (wantDemo !== state.demoMode) toggleDemo();
      }
      applySettingsToApp(true);
    },
    applyGeneralProperties(props) {
      if (props && typeof props.fps === 'number') {
        state.weTargetFps = props.fps;
      }
    },
    setPaused(isPaused) {
      const next = Boolean(isPaused);
      if (state.wePaused === next) return;
      state.wePaused = next;
      if (!next) {
        state.lastTickMs = performance.now();
        scheduleTick();
      }
    },
  };

  if (typeof window.wallpaperRegisterAudioListener === 'function') {
    window.wallpaperRegisterAudioListener(handleWallpaperAudioArray);
  }

  // Native Windows Media Integration inside Wallpaper Engine CEF (zero external bridge needed)
  if (typeof window.wallpaperRegisterMediaStatusListener === 'function') {
    window.wallpaperRegisterMediaStatusListener((evt) => {
      if (evt && !evt.enabled && state.weEnv) {
        applyMediaUpdate({ ...state.media, hasSession: false, status: 'Closed' });
      }
    });
  }

  if (typeof window.wallpaperRegisterMediaPropertiesListener === 'function') {
    window.wallpaperRegisterMediaPropertiesListener((evt) => {
      if (!evt) return;
      const prevKey = state.currentTrackKey;
      const title = String(evt.title || '');
      const artist = String(evt.artist || '');
      const album = String(evt.albumTitle || '');
      const hasSession = Boolean(title.trim());
      const nextKey = hasSession ? `${artist.trim().toLowerCase()}|${title.trim().toLowerCase()}` : '';
      const nextMedia = {
        ...state.media,
        hasSession,
        title,
        artist,
        album,
        status: hasSession && state.media.status === 'Closed' ? 'Playing' : state.media.status,
        positionSec: nextKey !== prevKey ? 0 : state.media.positionSec,
        lastUpdatedMs: Date.now(),
        sampledAtMs: Date.now(),
      };
      applyMediaUpdate(nextMedia);
      if (hasSession && nextKey !== prevKey) {
        lookupBrowserLyrics(false);
      } else if (!hasSession) {
        applyLyricsUpdate({ trackKey: '', found: false, synced: false, wordSynced: false, lines: [], source: 'none' });
      }
    });
  }

  if (typeof window.wallpaperRegisterMediaPlaybackListener === 'function') {
    window.wallpaperRegisterMediaPlaybackListener((evt) => {
      if (!evt) return;
      const mi = window.wallpaperMediaIntegration || {};
      let status = 'Paused';
      if (evt.state === mi.PLAYBACK_PLAYING) status = 'Playing';
      else if (evt.state === mi.PLAYBACK_STOPPED) status = 'Stopped';
      applyMediaUpdate({
        ...state.media,
        status,
        lastUpdatedMs: Date.now(),
        sampledAtMs: Date.now(),
      });
    });
  }

  if (typeof window.wallpaperRegisterMediaTimelineListener === 'function') {
    window.wallpaperRegisterMediaTimelineListener((evt) => {
      if (!evt) return;
      applyMediaUpdate({
        ...state.media,
        positionSec: Number(evt.position) || 0,
        endSec: Number(evt.duration) || 0,
        lastUpdatedMs: Date.now(),
        sampledAtMs: Date.now(),
      });
    });
  }

  if (typeof window.wallpaperRegisterMediaThumbnailListener === 'function') {
    window.wallpaperRegisterMediaThumbnailListener((evt) => {
      if (evt?.thumbnail) {
        elPlayerArt.src = evt.thumbnail;
        elPlayerArt.classList.remove('hidden');
      } else {
        elPlayerArt.classList.add('hidden');
      }
    });
  }
}

async function init() {
  wireControls();
  await restoreSavedCustomFont();
  showHud(true);

  const hasWallpaperParam = new URLSearchParams(window.location.search).has('wallpaper');
  if (hasWallpaperParam) {
    applyWallpaperMode(true);
  }

  if (listen && invoke) {
    await listen('media-update', (event) => applyMediaUpdate(event.payload));
    await listen('lyrics-loading', (event) => applyLyricsLoading(event.payload));
    await listen('lyrics-update', (event) => applyLyricsUpdate(event.payload));
    await listen('audio-levels', (event) => {
      const p = event.payload;
      if (p) {
        const al = state.audioLevels;
        al.bass = p.bass || 0;
        al.mid = p.mid || 0;
        al.treble = p.treble || 0;
        al.rms = p.rms || 0;
        al.beat = p.beat || 0;
      }
    });
    await listen('wallpaper-mode', (event) => {
      applyWallpaperMode(Boolean(event.payload));
    });

    try {
      const initial = await invoke('get_initial_state');
      if (initial?.wallpaperMode) applyWallpaperMode(true);
      if (initial?.media) applyMediaUpdate(initial.media);
      state.lyricsLoading = Boolean(initial?.lyricsLoading);
      if (initial?.lyrics && (!initial.lyrics.trackKey || initial.lyrics.trackKey === state.currentTrackKey)) {
        applyLyricsUpdate(initial.lyrics, state.lyricsLoading);
      }

      const s = state.settings;
      if (
        (s.lyricPreferred && s.lyricPreferred !== 'auto') ||
        !s.enableLimusic ||
        !s.enableBoidu ||
        !s.enableUnison ||
        !s.enableLyricsplus ||
        !s.enableLrclib ||
        !s.enableYtmusic ||
        !s.enableNetease ||
        !s.enableQqmusic ||
        !s.enableKugou
      ) {
        syncLyricPrefsToBackend();
      }
    } catch {
      // Backend may still be warming up; events will populate
    }
  }

  scheduleTick();
}

registerWallpaperEngineHooks();
init();
