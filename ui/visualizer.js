import { CONSTELLATIONS } from './constellations.js';
import {
  DEEP_SKY_OBJECTS,
  computeLiveSolarSystem,
  computeOrbitingSatellites,
  computeSpacecraft,
  raDecToVec3,
  resolveConstellationWikiUrl,
  resolveDeepSkyWikiUrl,
  resolveObjectWikiUrl,
  resolveStarWikiUrl,
} from './celestial.js';

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

function easeOutCubic(t) {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  const inv = 1 - x;
  return 1 - inv * inv * inv;
}

function easeInOutQuart(t) {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  if (x < 0.5) {
    const x2 = x * x;
    return 8 * x2 * x2;
  }
  const u = -2 * x + 2;
  const u2 = u * u;
  return 1 - (u2 * u2) * 0.5;
}

function expSmoothing(dt, rate) {
  return 1 - Math.exp(-dt * rate);
}

function normalize3(x, y, z) {
  const len = Math.sqrt(x * x + y * y + z * z) || 1;
  return [x / len, y / len, z / len];
}

function cross3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function slerpVec3(a, b, t) {
  const d = clamp(dot3(a, b), -1, 1);
  if (d > 0.9995) {
    return normalize3(
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t
    );
  }
  const theta = Math.acos(d);
  const sinT = Math.sin(theta) || 1;
  const w1 = Math.sin((1 - t) * theta) / sinT;
  const w2 = Math.sin(t * theta) / sinT;
  return normalize3(
    a[0] * w1 + b[0] * w2,
    a[1] * w1 + b[1] * w2,
    a[2] * w1 + b[2] * w2
  );
}

// Quaternion utilities: [x, y, z, w]
function quatNormalize(q) {
  const len = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]) || 1;
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

function quatMul(a, b) {
  return [
    a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
    a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
    a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
    a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
  ];
}

function quatMulInto(out, a, b) {
  const ax = a[0], ay = a[1], az = a[2], aw = a[3];
  const bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = aw * bx + ax * bw + ay * bz - az * by;
  out[1] = aw * by - ax * bz + ay * bw + az * bx;
  out[2] = aw * bz + ax * by - ay * bx + az * bw;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

function quatFromAxisAngle(axis, angle) {
  const half = angle * 0.5;
  const s = Math.sin(half);
  return [axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(half)];
}

/**
 * Builds a camera quaternion that maps world basis `(U, V, C)` -> screen `(X, Y, Z)`.
 */
function quatFromWorldToScreenRows(U, V, C) {
  const m00 = U[0], m01 = U[1], m02 = U[2];
  const m10 = V[0], m11 = V[1], m12 = V[2];
  const m20 = C[0], m21 = C[1], m22 = C[2];
  const trace = m00 + m11 + m22;
  let x, y, z, w;

  if (trace > 0) {
    const s = 0.5 / Math.sqrt(trace + 1.0);
    w = 0.25 / s;
    x = (m21 - m12) * s;
    y = (m02 - m20) * s;
    z = (m10 - m01) * s;
  } else if (m00 > m11 && m00 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
    w = (m21 - m12) / s;
    x = 0.25 * s;
    y = (m01 + m10) / s;
    z = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
    w = (m02 - m20) / s;
    x = (m01 + m10) / s;
    y = 0.25 * s;
    z = (m12 + m21) / s;
  } else {
    const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
    w = (m10 - m01) / s;
    x = (m02 + m20) / s;
    y = (m12 + m21) / s;
    z = 0.25 * s;
  }
  return quatNormalize([x, y, z, w]);
}

function quatSlerp(a, b, t) {
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];
  let dot = a[0] * bx + a[1] * by + a[2] * bz + a[3] * bw;
  if (dot < 0) {
    dot = -dot;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (dot > 0.9995) {
    return quatNormalize([
      a[0] + (bx - a[0]) * t,
      a[1] + (by - a[1]) * t,
      a[2] + (bz - a[2]) * t,
      a[3] + (bw - a[3]) * t,
    ]);
  }
  const theta0 = Math.acos(clamp(dot, -1, 1));
  const theta = theta0 * t;
  const sinTheta = Math.sin(theta);
  const sinTheta0 = Math.sin(theta0);
  const s0 = Math.cos(theta) - (dot * sinTheta) / sinTheta0;
  const s1 = sinTheta / sinTheta0;
  return quatNormalize([
    s0 * a[0] + s1 * bx,
    s0 * a[1] + s1 * by,
    s0 * a[2] + s1 * bz,
    s0 * a[3] + s1 * bw,
  ]);
}

function rotateVecByQuat(v, q) {
  const vx = v[0], vy = v[1], vz = v[2];
  const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  const tx = 2 * (qy * vz - qz * vy);
  const ty = 2 * (qz * vx - qx * vz);
  const tz = 2 * (qx * vy - qy * vx);
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ];
}

/**
 * Converts unit quaternion `[x, y, z, w]` into a 3x3 row-major rotation matrix `out` (length 9)
 * algebraically identical to `rotateVecByQuat`. Eliminates ~1,400 array allocations per frame.
 */
function quatToMat3(q, out) {
  const x = q[0], y = q[1], z = q[2], w = q[3];
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2;
  const yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy - wz;
  out[2] = xz + wy;
  out[3] = xy + wz;
  out[4] = 1 - (xx + zz);
  out[5] = yz - wx;
  out[6] = xz - wy;
  out[7] = yz + wx;
  out[8] = 1 - (xx + yy);
  return out;
}

// Pre-allocated RGBA lookup tables: eliminates string formatting & parseInt in 60-144 FPS loops
const ALPHA_STEPS = 250;
const ALPHA_SUFFIX = new Array(ALPHA_STEPS + 1);
const WHITE_RGBA = new Array(ALPHA_STEPS + 1);
const BLACK_RGBA = new Array(ALPHA_STEPS + 1);

for (let i = 0; i <= ALPHA_STEPS; i++) {
  const a = (i / ALPHA_STEPS).toFixed(3);
  ALPHA_SUFFIX[i] = `${a})`;
  WHITE_RGBA[i] = `rgba(255,255,255,${a})`;
  BLACK_RGBA[i] = `rgba(0,0,0,${a})`;
}

function buildRgbaLut(r, g, b) {
  const lut = new Array(ALPHA_STEPS + 1);
  const prefix = `rgba(${r},${g},${b},`;
  for (let i = 0; i <= ALPHA_STEPS; i++) {
    lut[i] = prefix + ALPHA_SUFFIX[i];
  }
  return lut;
}

function alphaIdx(a) {
  if (a <= 0) return 0;
  if (a >= 1) return ALPHA_STEPS;
  return (a * ALPHA_STEPS + 0.5) | 0;
}

const HEX_PREFIX_MAP = new Map();
function fastHexRgba(hex, alpha) {
  let prefix = HEX_PREFIX_MAP.get(hex);
  if (prefix === undefined) {
    const clean = hex.charCodeAt(0) === 35 ? hex.slice(1) : hex;
    const n = parseInt(clean, 16) || 0xffffff;
    prefix = `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},`;
    HEX_PREFIX_MAP.set(hex, prefix);
  }
  return prefix + ALPHA_SUFFIX[alphaIdx(alpha)];
}

const DEFAULT_PALETTE = ['#ffffff', '#cfe4ff', '#fff3d6', '#b9d4ff', '#ffd6a3'];
const BG_ALPHA_MULTS = [0.22, 0.45, 0.70, 0.94];
const BG_BUCKET_COUNT = DEFAULT_PALETTE.length * 4;

export const COLOR_THEMES = {
  starlight: {
    id: 'starlight',
    label: 'Starlight (Pure Black & Ice Blue)',
    bg: '#000000',
    brand: '#cfe4ff',
    text: '#eef4ff',
    textMuted: '#9aa9c4',
    hudBorder: 'rgba(207, 228, 255, 0.22)',
    hudBorderStrong: 'rgba(207, 228, 255, 0.58)',
    hudHover: 'rgba(207, 228, 255, 0.14)',
    hudActive: 'rgba(207, 228, 255, 0.20)',
    panelBg: 'rgba(10, 15, 24, 0.85)',
    panelSolid: 'rgba(8, 13, 22, 0.93)',
    inputBg: '#070a10',
    wordIdle: 'rgba(220, 234, 255, 0.28)',
    wordGlow: 'rgba(195, 226, 255, 0.72)',
    wordPastGlow: 'rgba(175, 210, 255, 0.30)',
    ambLineRgb: [160, 196, 248],
    heroLineRgb: [170, 206, 255],
    bridgeLineRgb: [180, 214, 255],
    heroGlowRgb: [225, 242, 255],
    starLabelRgb: [180, 210, 255],
    ambLabelHex: '#9dbce8',
    titleFill: 'rgba(175, 202, 240, 0.44)',
    wordStroke: 'rgba(175, 218, 255, 0.26)',
    wordPastFill: 'rgba(214, 232, 255, 0.78)',
    palette: DEFAULT_PALETTE,
    bridgeTints: ['#cfe4ff', '#fff3d6', '#b9d4ff'],
    starMap: null,
    _luts: null,
  },
  nebula: {
    id: 'nebula',
    label: 'Cosmic Nebula (Deep Violet & Orchid)',
    bg: '#04010a',
    brand: '#dfb8ff',
    text: '#f6eeff',
    textMuted: '#b49cc9',
    hudBorder: 'rgba(223, 184, 255, 0.24)',
    hudBorderStrong: 'rgba(223, 184, 255, 0.58)',
    hudHover: 'rgba(223, 184, 255, 0.15)',
    hudActive: 'rgba(223, 184, 255, 0.22)',
    panelBg: 'rgba(16, 9, 26, 0.86)',
    panelSolid: 'rgba(13, 7, 22, 0.93)',
    inputBg: '#0b0612',
    wordIdle: 'rgba(232, 208, 255, 0.28)',
    wordGlow: 'rgba(218, 170, 255, 0.74)',
    wordPastGlow: 'rgba(198, 148, 255, 0.32)',
    ambLineRgb: [188, 146, 246],
    heroLineRgb: [205, 164, 255],
    bridgeLineRgb: [224, 180, 255],
    heroGlowRgb: [244, 220, 255],
    starLabelRgb: [216, 180, 255],
    ambLabelHex: '#bfa0e8',
    titleFill: 'rgba(210, 176, 248, 0.45)',
    wordStroke: 'rgba(214, 162, 255, 0.28)',
    wordPastFill: 'rgba(235, 214, 255, 0.78)',
    palette: ['#ffffff', '#e2bfff', '#ffc8ec', '#c59bff', '#ffe3c8'],
    bridgeTints: ['#e2bfff', '#ffc8ec', '#c59bff'],
    starMap: {
      '#cfe4ff': '#e2bfff',
      '#b9d4ff': '#c59bff',
      '#edf4ff': '#f5e8ff',
      '#fff3d6': '#ffd6f0',
      '#ffd6a3': '#ffc2e2',
      '#ffb98a': '#ffa8d8',
    },
    _luts: null,
  },
  aurora: {
    id: 'aurora',
    label: 'Aurora Borealis (Emerald & Cyan)',
    bg: '#010807',
    brand: '#9ef5d8',
    text: '#ecfff8',
    textMuted: '#8fbdb0',
    hudBorder: 'rgba(158, 245, 216, 0.23)',
    hudBorderStrong: 'rgba(158, 245, 216, 0.56)',
    hudHover: 'rgba(158, 245, 216, 0.14)',
    hudActive: 'rgba(158, 245, 216, 0.20)',
    panelBg: 'rgba(7, 20, 18, 0.86)',
    panelSolid: 'rgba(6, 17, 15, 0.93)',
    inputBg: '#040e0c',
    wordIdle: 'rgba(195, 248, 232, 0.28)',
    wordGlow: 'rgba(138, 245, 212, 0.72)',
    wordPastGlow: 'rgba(120, 228, 198, 0.30)',
    ambLineRgb: [112, 218, 190],
    heroLineRgb: [130, 238, 208],
    bridgeLineRgb: [156, 246, 222],
    heroGlowRgb: [216, 255, 244],
    starLabelRgb: [158, 240, 216],
    ambLabelHex: '#86d6bf',
    titleFill: 'rgba(152, 232, 208, 0.44)',
    wordStroke: 'rgba(130, 242, 208, 0.26)',
    wordPastFill: 'rgba(206, 250, 236, 0.78)',
    palette: ['#ffffff', '#a6f7dc', '#b8f0ff', '#7ce8c8', '#d8ffea'],
    bridgeTints: ['#a6f7dc', '#b8f0ff', '#7ce8c8'],
    starMap: {
      '#cfe4ff': '#a6f7dc',
      '#b9d4ff': '#7ce8c8',
      '#edf4ff': '#e2fff5',
      '#fff3d6': '#c4f5ff',
      '#ffd6a3': '#9ee8ff',
      '#ffb98a': '#88dfd2',
    },
    _luts: null,
  },
  amber: {
    id: 'amber',
    label: 'Solar Amber (Warm Gold & Champagne)',
    bg: '#080400',
    brand: '#ffd89b',
    text: '#fff7eb',
    textMuted: '#c4ad8c',
    hudBorder: 'rgba(255, 216, 155, 0.24)',
    hudBorderStrong: 'rgba(255, 216, 155, 0.58)',
    hudHover: 'rgba(255, 216, 155, 0.14)',
    hudActive: 'rgba(255, 216, 155, 0.20)',
    panelBg: 'rgba(22, 14, 7, 0.86)',
    panelSolid: 'rgba(18, 12, 6, 0.93)',
    inputBg: '#100a04',
    wordIdle: 'rgba(255, 232, 196, 0.28)',
    wordGlow: 'rgba(255, 208, 138, 0.72)',
    wordPastGlow: 'rgba(255, 194, 118, 0.30)',
    ambLineRgb: [232, 182, 116],
    heroLineRgb: [250, 200, 132],
    bridgeLineRgb: [255, 214, 154],
    heroGlowRgb: [255, 242, 216],
    starLabelRgb: [255, 214, 158],
    ambLabelHex: '#dfb47c',
    titleFill: 'rgba(242, 202, 146, 0.44)',
    wordStroke: 'rgba(255, 204, 132, 0.27)',
    wordPastFill: 'rgba(255, 236, 206, 0.78)',
    palette: ['#ffffff', '#ffe0ad', '#fff2d6', '#ffc778', '#ffad75'],
    bridgeTints: ['#ffe0ad', '#fff2d6', '#ffc778'],
    starMap: {
      '#cfe4ff': '#ffe0ad',
      '#b9d4ff': '#ffc778',
      '#edf4ff': '#fff5e4',
      '#fff3d6': '#fff0cc',
      '#ffd6a3': '#ffbe78',
      '#ffb98a': '#ffa463',
    },
    _luts: null,
  },
  crimson: {
    id: 'crimson',
    label: 'Crimson Nova (Rose Giant & Ruby)',
    bg: '#090103',
    brand: '#ffb3c6',
    text: '#fff0f4',
    textMuted: '#c496a3',
    hudBorder: 'rgba(255, 179, 198, 0.24)',
    hudBorderStrong: 'rgba(255, 179, 198, 0.58)',
    hudHover: 'rgba(255, 179, 198, 0.14)',
    hudActive: 'rgba(255, 179, 198, 0.20)',
    panelBg: 'rgba(24, 8, 13, 0.86)',
    panelSolid: 'rgba(20, 7, 11, 0.93)',
    inputBg: '#110508',
    wordIdle: 'rgba(255, 210, 222, 0.28)',
    wordGlow: 'rgba(255, 158, 184, 0.74)',
    wordPastGlow: 'rgba(245, 138, 168, 0.30)',
    ambLineRgb: [232, 136, 162],
    heroLineRgb: [252, 158, 184],
    bridgeLineRgb: [255, 180, 200],
    heroGlowRgb: [255, 228, 236],
    starLabelRgb: [255, 182, 202],
    ambLabelHex: '#e094aa',
    titleFill: 'rgba(245, 172, 192, 0.44)',
    wordStroke: 'rgba(255, 152, 180, 0.28)',
    wordPastFill: 'rgba(255, 218, 228, 0.78)',
    palette: ['#ffffff', '#ffbfd0', '#ffe0cc', '#ff94b2', '#ffb899'],
    bridgeTints: ['#ffbfd0', '#ffe0cc', '#ff94b2'],
    starMap: {
      '#cfe4ff': '#ffbfd0',
      '#b9d4ff': '#ff94b2',
      '#edf4ff': '#ffeef3',
      '#fff3d6': '#ffe0d4',
      '#ffd6a3': '#ffb89e',
      '#ffb98a': '#ff9685',
    },
    _luts: null,
  },
  ocean: {
    id: 'ocean',
    label: 'Abyssal Sapphire (Deep Navy & Cyan)',
    bg: '#00050d',
    brand: '#8ee8ff',
    text: '#ebfbff',
    textMuted: '#8cb4c7',
    hudBorder: 'rgba(142, 232, 255, 0.23)',
    hudBorderStrong: 'rgba(142, 232, 255, 0.56)',
    hudHover: 'rgba(142, 232, 255, 0.14)',
    hudActive: 'rgba(142, 232, 255, 0.20)',
    panelBg: 'rgba(6, 16, 28, 0.86)',
    panelSolid: 'rgba(5, 13, 24, 0.93)',
    inputBg: '#040b14',
    wordIdle: 'rgba(192, 240, 255, 0.28)',
    wordGlow: 'rgba(124, 228, 255, 0.74)',
    wordPastGlow: 'rgba(104, 206, 248, 0.30)',
    ambLineRgb: [98, 196, 242],
    heroLineRgb: [118, 216, 255],
    bridgeLineRgb: [148, 230, 255],
    heroGlowRgb: [214, 248, 255],
    starLabelRgb: [150, 228, 255],
    ambLabelHex: '#7cc8eb',
    titleFill: 'rgba(144, 218, 248, 0.44)',
    wordStroke: 'rgba(116, 224, 255, 0.27)',
    wordPastFill: 'rgba(204, 244, 255, 0.78)',
    palette: ['#ffffff', '#9cecff', '#cce8ff', '#6bd4ff', '#b8fff4'],
    bridgeTints: ['#9cecff', '#cce8ff', '#6bd4ff'],
    starMap: {
      '#cfe4ff': '#9cecff',
      '#b9d4ff': '#6bd4ff',
      '#edf4ff': '#e4faff',
      '#fff3d6': '#d4f2ff',
      '#ffd6a3': '#a8e6ff',
      '#ffb98a': '#8ad8ff',
    },
    _luts: null,
  },
  monochrome: {
    id: 'monochrome',
    label: 'Silver Monochrome (Pure Black & Crisp White)',
    bg: '#000000',
    brand: '#ffffff',
    text: '#f5f5f7',
    textMuted: '#a0a0a8',
    hudBorder: 'rgba(255, 255, 255, 0.22)',
    hudBorderStrong: 'rgba(255, 255, 255, 0.58)',
    hudHover: 'rgba(255, 255, 255, 0.13)',
    hudActive: 'rgba(255, 255, 255, 0.20)',
    panelBg: 'rgba(12, 12, 14, 0.86)',
    panelSolid: 'rgba(10, 10, 12, 0.93)',
    inputBg: '#08080a',
    wordIdle: 'rgba(255, 255, 255, 0.26)',
    wordGlow: 'rgba(255, 255, 255, 0.68)',
    wordPastGlow: 'rgba(255, 255, 255, 0.26)',
    ambLineRgb: [196, 198, 204],
    heroLineRgb: [220, 222, 228],
    bridgeLineRgb: [232, 234, 240],
    heroGlowRgb: [255, 255, 255],
    starLabelRgb: [224, 226, 232],
    ambLabelHex: '#bcbec6',
    titleFill: 'rgba(220, 222, 228, 0.42)',
    wordStroke: 'rgba(255, 255, 255, 0.24)',
    wordPastFill: 'rgba(235, 236, 240, 0.78)',
    palette: ['#ffffff', '#e8e9ed', '#f4f4f6', '#cfd1d8', '#dcdde2'],
    bridgeTints: ['#ffffff', '#e8e9ed', '#cfd1d8'],
    starMap: {
      '#cfe4ff': '#eceef2',
      '#b9d4ff': '#d8dae0',
      '#edf4ff': '#f7f8fa',
      '#fff3d6': '#f0f0f2',
      '#ffd6a3': '#e2e3e8',
      '#ffb98a': '#d2d4dc',
    },
    _luts: null,
  },
};

function getThemeLuts(theme) {
  if (!theme._luts) {
    theme._luts = {
      ambLine: buildRgbaLut(theme.ambLineRgb[0], theme.ambLineRgb[1], theme.ambLineRgb[2]),
      heroLine: buildRgbaLut(theme.heroLineRgb[0], theme.heroLineRgb[1], theme.heroLineRgb[2]),
      bridgeLine: buildRgbaLut(theme.bridgeLineRgb[0], theme.bridgeLineRgb[1], theme.bridgeLineRgb[2]),
      heroGlow: buildRgbaLut(theme.heroGlowRgb[0], theme.heroGlowRgb[1], theme.heroGlowRgb[2]),
      starLabel: buildRgbaLut(theme.starLabelRgb[0], theme.starLabelRgb[1], theme.starLabelRgb[2]),
    };
  }
  return theme._luts;
}

const CONSTELLATION_ANGULAR_RADIUS = 0.29; // ~16.6 deg half-width on the real celestial sphere

export class StarVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
    this.width = 1;
    this.height = 1;
    this.dpr = 1;
    this.renderScale = 1;
    this.effectiveScale = 1;
    this.emaCostMs = 4.0;
    this.slowFrames = 0;
    this.fastFrames = 0;

    this.settings = {
      colorTheme: 'starlight',
      starBrightness: 1.15,
      effectsIntensity: 1.0,
      lineOpacity: 1.0,
      audioReactivity: 1.0,
      zoom: 1.0,
      rotationSpeed: 1.0,
      wordFontSize: 20,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontStyle: 'normal',
      showDeepSky: true,
      showSatellites: true,
      instrumentalMode: true,
      hoverInspector: true,
      proportionalSizes: false,
      freeExplore: false,
      lyricDecaySec: 2.5,
      wordEffect: 'rise',
    };
    this.theme = COLOR_THEMES.starlight;
    this.themeLuts = getThemeLuts(this.theme);
    this.currentZoom = 1.0;
    this.pausedIdleSec = 0;
    this.lastDomeRadius = 400;
    this.isDragging = false;
    this.dragVelocity = { x: 0, y: 0 };

    // Reusable math scratch buffers (zero per-frame allocations)
    this.rotMat = new Float64Array(9);
    this._qBreathZ = [0, 0, 0, 1];
    this._qBreathX = [0, 0, 0, 1];
    this._qTemp = [0, 0, 0, 1];
    this._qRender = [0, 0, 0, 1];

    // Precompute permanent 3D sky placements + flat typed buffers for all 88 constellations
    this.skyConstellations = this._buildSkyConstellations();
    this.skyDeepSky = DEEP_SKY_OBJECTS.map((obj) => ({
      ...obj,
      dir: raDecToVec3(obj.ra, obj.dec),
      metaStr: `Mag ${obj.mag.toFixed(1)} · ${obj.distance} · ${obj.constellation}`,
      titleName: `${obj.id} · ${obj.name}`,
      wikiUrl: resolveDeepSkyWikiUrl(obj),
    }));
    this.starSprites = this._buildStarSprites();

    // Offscreen caches for expensive software-Canvas2D text outlines & lunar phase clip
    this.wordBitmapCache = new Map();
    this.wordCacheSignature = '';
    this.titleBitmapCache = new Map();
    this.titleCacheFont = '';
    this.miniLabelCache = new Map();
    this.miniLabelSig = '';
    this.moonCache = { canvas: null, key: '', size: 0 };

    // Cached real-time planetary & spacecraft ephemeris (refreshed every 30s)
    const nowDate = new Date();
    this.solarSystem = computeLiveSolarSystem(nowDate);
    this.spacecraft = computeSpacecraft(nowDate, this.solarSystem);
    this.lastEphemerisAt = typeof performance !== 'undefined' ? performance.now() / 1000 : 0;

    // Flat SoA background starfield + reusable batch buckets
    this._initSphereStars(320, 120);
    this.bgBuckets = Array.from({ length: BG_BUCKET_COUNT }, () => new Float32Array(450 * 3));
    this.bgBucketCounts = new Int32Array(BG_BUCKET_COUNT);

    // 3 sky-wide ambient constellation line batch buffers (low / mid / high limbFade)
    this.ambLineSegs = [
      new Float32Array(800),
      new Float32Array(800),
      new Float32Array(800),
    ];
    this.ambLineCounts = new Int32Array(3);

    this.shootingStars = [];
    this.nextShootingStarAt = 3.5;
    this.lastBeatShootingStarAt = 0;
    this.audioEnergy = { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0 };

    this.heroIndex = 0;
    this.qCamera = [...this.skyConstellations[0].qTarget];
    this.transition = null;
    this.transitionStep = 0;
    this._bridgeProjPool = [];

    this.starGlow = new Float32Array(32);
    this.ripples = [];
    this.comets = [];
    this.embers = [];
    this.prevIgnitedStarIdx = -1;

    // Instrumental Solo Mode state
    this.lastLyricActivitySec = 0;
    this.lastInstrumentalPulseSec = 0;
    this.instrumentalStep = 0;
    this.isInstrumentalActive = false;

    // Hover Star Inspector hit targets (populated only when pointer active)
    this.hitTargets = [];
    this.hoveredTarget = null;
    this.pointerActiveUntil = 0;
    this.collectHitTargets = false;

    this.wordBubbles = new Map();
    this.lastActiveWordKey = '';
    this.lastLineKey = '';

    this.showLabels = true;
    this.lastFrameTime = typeof performance !== 'undefined' ? performance.now() : 0;

    if (this.canvas) {
      this.resize();
    }
  }

  _buildSkyConstellations() {
    return CONSTELLATIONS.map((c) => {
      const C = raDecToVec3(c.ra, c.dec);
      const pole = Math.abs(C[2]) < 0.94 ? [0, 0, 1] : [0, 1, 0];
      const U = normalize3(...cross3(C, pole));
      const V = normalize3(...cross3(C, U));
      const qTarget = quatFromWorldToScreenRows(U, V, C);

      const n = c.stars.length;
      const starDirs = new Array(n);
      const starDirsFlat = new Float32Array(n * 3);
      let maxAng = 0.12;

      for (let i = 0; i < n; i++) {
        const s = c.stars[i];
        const px = C[0] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[0] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[0];
        const py = C[1] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[1] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[1];
        const pz = C[2] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[2] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[2];
        const dir = normalize3(px, py, pz);
        starDirs[i] = dir;
        starDirsFlat[i * 3] = dir[0];
        starDirsFlat[i * 3 + 1] = dir[1];
        starDirsFlat[i * 3 + 2] = dir[2];
        const ang = Math.acos(clamp(dot3(C, dir), -1, 1));
        if (ang > maxAng) maxAng = ang;
      }

      const eCount = c.edges.length;
      const edgesFlat = new Uint16Array(eCount * 2);
      for (let e = 0; e < eCount; e++) {
        edgesFlat[e * 2] = c.edges[e][0];
        edgesFlat[e * 2 + 1] = c.edges[e][1];
      }

      const cWikiUrl = resolveConstellationWikiUrl(c.name);
      const projPool = c.stars.map((s, idx) => ({
        ...s,
        renderColor: s.color,
        sx: 0,
        sy: 0,
        z: 0,
        colorIdx: Math.max(0, DEFAULT_PALETTE.indexOf(s.color)),
        metaAmbient: `Mag ${s.mag.toFixed(1)} · ${c.title}`,
        fallbackHeroName: `${c.name} Star #${idx + 1}`,
        fallbackAmbName: s.name || `${c.name} Star`,
        wikiUrl: resolveStarWikiUrl(s.name, c.name),
      }));

      return {
        constellation: c,
        wikiUrl: cWikiUrl,
        centerDir: C,
        uDir: U,
        vDir: V,
        qTarget,
        starDirs,
        starDirsFlat,
        edgesFlat,
        projPool,
        boundScale: Math.sin(Math.min(Math.PI * 0.48, maxAng)) * 1.18,
      };
    });
  }

  _buildStarSprites() {
    if (typeof document === 'undefined') return new Map();
    const colors = ['#ffffff', '#cfe4ff', '#b9d4ff', '#edf4ff', '#fff3d6', '#ffd6a3', '#ffb98a'];
    const map = new Map();
    const size = 96;
    const half = size / 2;

    for (const hex of colors) {
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const octx = off.getContext('2d');
      const grad = octx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.12, fastHexRgba(hex, 0.92));
      grad.addColorStop(0.32, fastHexRgba(hex, 0.38));
      grad.addColorStop(0.65, fastHexRgba(hex, 0.08));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      octx.fillStyle = grad;
      octx.fillRect(0, 0, size, size);
      map.set(hex, off);
    }
    return map;
  }

  _initSphereStars(fieldCount, milkyWayCount) {
    const total = fieldCount + milkyWayCount;
    this.bgCount = total;
    this.bgDirX = new Float32Array(total);
    this.bgDirY = new Float32Array(total);
    this.bgDirZ = new Float32Array(total);
    this.bgSize = new Float32Array(total);
    this.bgAlpha = new Float32Array(total);
    this.bgPhase = new Float32Array(total);
    this.bgSpeed = new Float32Array(total);
    this.bgColorIdx = new Uint8Array(total);

    for (let i = 0; i < fieldCount; i++) {
      const z = Math.random() * 2 - 1;
      const phi = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.max(0, 1 - z * z));
      const brightness = Math.pow(Math.random(), 2.4);
      this.bgDirX[i] = r * Math.cos(phi);
      this.bgDirY[i] = r * Math.sin(phi);
      this.bgDirZ[i] = z;
      this.bgSize[i] = 0.45 + brightness * 1.45;
      this.bgAlpha[i] = 0.16 + brightness * 0.66;
      this.bgPhase[i] = Math.random() * Math.PI * 2;
      this.bgSpeed[i] = 0.75 + Math.random() * 2.0;
      this.bgColorIdx[i] = i % DEFAULT_PALETTE.length;
    }

    const galPole = normalize3(0.45, -0.78, 0.43);
    const galU = normalize3(...cross3([0, 0, 1], galPole));
    const galV = normalize3(...cross3(galPole, galU));

    for (let j = 0; j < milkyWayCount; j++) {
      const idx = fieldCount + j;
      const lon = Math.random() * Math.PI * 2;
      const lat = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 0.42;
      const cosL = Math.cos(lat);
      const lx = cosL * Math.cos(lon);
      const ly = cosL * Math.sin(lon);
      const lz = Math.sin(lat);
      const dir = normalize3(
        lx * galU[0] + ly * galV[0] + lz * galPole[0],
        lx * galU[1] + ly * galV[1] + lz * galPole[1],
        lx * galU[2] + ly * galV[2] + lz * galPole[2]
      );
      const brightness = Math.pow(Math.random(), 2.8);
      this.bgDirX[idx] = dir[0];
      this.bgDirY[idx] = dir[1];
      this.bgDirZ[idx] = dir[2];
      this.bgSize[idx] = 0.4 + brightness * 1.0;
      this.bgAlpha[idx] = 0.10 + brightness * 0.34;
      this.bgPhase[idx] = Math.random() * Math.PI * 2;
      this.bgSpeed[idx] = 0.6 + Math.random() * 1.5;
      this.bgColorIdx[idx] = j % 3 === 0 ? 2 : 1; // #fff3d6 or #cfe4ff
    }
  }

  _applyTheme(themeId) {
    const nextTheme = COLOR_THEMES[themeId] || COLOR_THEMES.starlight;
    this.theme = nextTheme;
    this.themeLuts = getThemeLuts(nextTheme);
    const starMap = nextTheme.starMap;
    for (let i = 0; i < this.skyConstellations.length; i++) {
      const pool = this.skyConstellations[i].projPool;
      for (let j = 0; j < pool.length; j++) {
        const s = pool[j];
        s.renderColor = (starMap && starMap[s.color]) || s.color;
      }
    }
    this.wordBitmapCache.clear();
    this.titleBitmapCache.clear();
    this.miniLabelCache.clear();
  }

  applySettings(next) {
    const fontChanged =
      (next.wordFontSize !== undefined && next.wordFontSize !== this.settings.wordFontSize) ||
      (next.fontFamily !== undefined && next.fontFamily !== this.settings.fontFamily) ||
      (next.fontStyle !== undefined && next.fontStyle !== this.settings.fontStyle);
    const themeChanged =
      next.colorTheme !== undefined && next.colorTheme !== this.settings.colorTheme;

    this.settings = { ...this.settings, ...next };
    if (themeChanged) {
      this._applyTheme(this.settings.colorTheme);
    } else if (fontChanged) {
      this.wordBitmapCache.clear();
      this.titleBitmapCache.clear();
      this.miniLabelCache.clear();
    }
  }

  resize() {
    if (!this.canvas || !this.ctx) return;
    const isWallpaper = typeof document !== 'undefined' && document.body?.classList.contains('wallpaper-mode');
    this.dpr = isWallpaper ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.max(1, window.innerWidth || 1);
    this.height = Math.max(1, window.innerHeight || 1);
    this._applyCanvasScale();
  }

  _applyCanvasScale() {
    if (!this.canvas || !this.ctx) return;
    const scale = this.dpr * this.renderScale;
    this.effectiveScale = scale;
    const cw = Math.max(1, Math.floor(this.width * scale));
    const ch = Math.max(1, Math.floor(this.height * scale));
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw;
      this.canvas.height = ch;
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    }
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  getNextTourConstellation(currentIndex, visitedSet) {
    const cur = this.skyConstellations[currentIndex];
    if (!cur) return (currentIndex + 1) % CONSTELLATIONS.length;

    let bestIdx = -1;
    let bestScore = Infinity;

    for (let i = 0; i < this.skyConstellations.length; i++) {
      if (i === currentIndex || visitedSet.has(i)) continue;
      const ang = Math.acos(clamp(dot3(cur.centerDir, this.skyConstellations[i].centerDir), -1, 1));
      const penalty = ang < 0.32 ? 0.8 : 0;
      const score = ang + penalty;
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }

    if (bestIdx === -1) {
      visitedSet.clear();
      visitedSet.add(currentIndex);
      return this.getNextTourConstellation(currentIndex, visitedSet);
    }
    return bestIdx;
  }

  setConstellation(index) {
    const next = ((index % CONSTELLATIONS.length) + CONSTELLATIONS.length) % CONSTELLATIONS.length;
    this.heroIndex = next;
    this.qCamera = [...this.skyConstellations[next].qTarget];
    this.transition = null;
    this.starGlow.fill(0);
    this.prevIgnitedStarIdx = -1;
    this.instrumentalStep = 0;
    this.wordBubbles.clear();
    this.lastActiveWordKey = '';
  }

  rotateToConstellation(index) {
    const next = ((index % CONSTELLATIONS.length) + CONSTELLATIONS.length) % CONSTELLATIONS.length;
    if (next === this.heroIndex && !this.transition) return CONSTELLATIONS[next];

    const fromIndex = this.transition ? this.transition.toIndex : this.heroIndex;
    const fromSky = this.skyConstellations[fromIndex];
    const toSky = this.skyConstellations[next];

    const qFrom = [...this.qCamera];
    const qTo = [...toSky.qTarget];

    this.transitionStep += 1;
    const fromConst = fromSky.constellation;
    const toConst = toSky.constellation;

    const fromExitStarIdx =
      this.prevIgnitedStarIdx >= 0 && this.prevIgnitedStarIdx < fromConst.stars.length
        ? this.prevIgnitedStarIdx
        : fromConst.sequence[fromConst.sequence.length - 1];
    const toEntryStarIdx = toConst.sequence[0];

    const exitDir = fromSky.starDirs[fromExitStarIdx] || fromSky.centerDir;
    const entryDir = toSky.starDirs[toEntryStarIdx] || toSky.centerDir;

    let arcPerp = cross3(exitDir, entryDir);
    if (Math.hypot(...arcPerp) < 1e-4) {
      arcPerp = fromSky.uDir;
    } else {
      arcPerp = normalize3(...arcPerp);
    }

    const sepRad = Math.acos(clamp(dot3(fromSky.centerDir, toSky.centerDir), -1, 1));
    let bridgeCount = 0;
    if (sepRad >= 2.05) bridgeCount = 4;
    else if (sepRad >= 1.35) bridgeCount = 3;
    else if (sepRad >= 0.90) bridgeCount = 2;
    else if (sepRad >= 0.55) bridgeCount = 1;

    const tints = this.theme.bridgeTints;
    const bridgeStars = [];
    for (let i = 0; i < bridgeCount; i++) {
      const frac = (i + 1) / (bridgeCount + 1);
      const arcPt = slerpVec3(exitDir, entryDir, frac);
      const scatter = (i % 2 === 0 ? 1 : -1) * (0.045 + i * 0.018);
      const dir = normalize3(
        arcPt[0] + arcPerp[0] * scatter,
        arcPt[1] + arcPerp[1] * scatter,
        arcPt[2] + arcPerp[2] * scatter
      );
      bridgeStars.push({
        dir,
        mag: 1.65 + (i % 2) * 0.42,
        color: tints[(this.transitionStep + i) % tints.length],
        sx: 0,
        sy: 0,
        z: 0,
      });
    }

    const baseDuration = bridgeCount === 0
      ? 0.95 + (sepRad / Math.PI) * 0.75
      : 1.35 + (sepRad / Math.PI) * 0.95;

    this.transition = {
      fromIndex,
      toIndex: next,
      qFrom,
      qTo,
      progress: 0,
      duration: baseDuration,
      bridgeStars,
      bridgeGlow: new Float32Array(bridgeCount),
      bridgeWordCount: 0,
      fromExitStarIdx,
      toEntryStarIdx,
      lastIgnitedScreenPt: null,
    };

    this.starGlow.fill(0);
    this.prevIgnitedStarIdx = -1;
    this.instrumentalStep = 0;
    this.lastActiveWordKey = '';
    this.comets.length = 0;

    return CONSTELLATIONS[next];
  }

  nextConstellation() {
    const base = this.transition ? this.transition.toIndex : this.heroIndex;
    return this.rotateToConstellation(base + 1);
  }

  prevConstellation() {
    const base = this.transition ? this.transition.toIndex : this.heroIndex;
    return this.rotateToConstellation(base - 1);
  }

  getCurrentConstellation() {
    const idx = this.transition ? this.transition.toIndex : this.heroIndex;
    return CONSTELLATIONS[idx];
  }

  toggleLabels() {
    this.showLabels = !this.showLabels;
    return this.showLabels;
  }

  setFreeExplore(enabled) {
    const next = Boolean(enabled);
    this.settings.freeExplore = next;
    this.dragVelocity.x = 0;
    this.dragVelocity.y = 0;
    this.isDragging = false;
    if (next) {
      this.transition = null;
    } else {
      this.rotateToConstellation(this.heroIndex);
    }
  }

  setDragging(dragging) {
    this.isDragging = Boolean(dragging);
    if (this.isDragging) {
      this.dragVelocity.x = 0;
      this.dragVelocity.y = 0;
    }
  }

  panBy(dx, dy, dtSec = 0.016) {
    const scale = 1.65 / Math.max(240, this.lastDomeRadius);
    const yawAngle = dx * scale;
    const pitchAngle = -dy * scale;
    const qYaw = quatFromAxisAngle([0, 1, 0], yawAngle);
    const qPitch = quatFromAxisAngle([1, 0, 0], pitchAngle);
    this.qCamera = quatNormalize(quatMul(quatMul(qYaw, qPitch), this.qCamera));
    this.transition = null;

    const invDt = 1 / Math.max(0.008, dtSec);
    const vx = clamp(yawAngle * invDt, -3.5, 3.5);
    const vy = clamp(pitchAngle * invDt, -3.5, 3.5);
    this.dragVelocity.x = this.dragVelocity.x * 0.55 + vx * 0.45;
    this.dragVelocity.y = this.dragVelocity.y * 0.55 + vy * 0.45;
  }

  getNearestConstellationIndex() {
    const m = quatToMat3(this.qCamera, this.rotMat);
    const m20 = m[6], m21 = m[7], m22 = m[8];
    let bestIdx = 0;
    let bestZ = -Infinity;
    for (let i = 0; i < this.skyConstellations.length; i++) {
      const c = this.skyConstellations[i].centerDir;
      const z = m20 * c[0] + m21 * c[1] + m22 * c[2];
      if (z > bestZ) {
        bestZ = z;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  _getGlowSprite(hex) {
    const key = hex || '#cfe4ff';
    const existing = this.starSprites.get(key);
    if (existing) return existing;
    if (typeof document === 'undefined') return null;

    const size = 96;
    const half = size / 2;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    const grad = octx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.16, fastHexRgba(key, 0.86));
    grad.addColorStop(0.45, fastHexRgba(key, 0.30));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    octx.fillStyle = grad;
    octx.fillRect(0, 0, size, size);
    this.starSprites.set(key, off);
    return off;
  }

  _drawStarSprite(ctx, x, y, radius, color, alpha) {
    if (alpha <= 0.005 || radius <= 0.2) return;
    const sprite = this._getGlowSprite(color);
    if (!sprite) return;
    const d = radius * 2;
    ctx.globalAlpha = alpha > 1 ? 1 : alpha;
    ctx.drawImage(sprite, x - radius, y - radius, d, d);
    ctx.globalAlpha = 1;
  }

  _projectSkyConstellation(sky, m, cx, cy, domeRadius) {
    const pts = sky.projPool;
    const flat = sky.starDirsFlat;
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];

    for (let i = 0, j = 0; i < pts.length; i++, j += 3) {
      const dx = flat[j], dy = flat[j + 1], dz = flat[j + 2];
      const vz = m20 * dx + m21 * dy + m22 * dz;
      const p = pts[i];
      p.z = vz;
      if (vz > -0.22) {
        const vx = m00 * dx + m01 * dy + m02 * dz;
        const vy = m10 * dx + m11 * dy + m12 * dz;
        const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
        p.sx = cx + vx * k;
        p.sy = cy + vy * k;
      }
    }
    return pts;
  }

  _spawnShootingStar(nowSec) {
    const startX = Math.random() * this.width * 0.8 + this.width * 0.1;
    const startY = Math.random() * this.height * 0.35 + this.height * 0.05;
    const angle = Math.PI * 0.15 + Math.random() * (Math.PI * 0.25);
    const speed = 540 + Math.random() * 400;
    this.shootingStars.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 0.65 + Math.random() * 0.35,
      length: 80 + Math.random() * 70,
    });
    this.nextShootingStarAt = nowSec + 6.5 + Math.random() * 10;
  }

  _spawnEmberBurst(x, y, color) {
    const fx = this.settings.effectsIntensity;
    if (fx <= 0.05 || this.embers.length >= 64) return;
    const count = Math.round(7 + fx * 4);
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
      const spd = (24 + Math.random() * 52) * (0.7 + fx * 0.35);
      this.embers.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        size: 0.8 + Math.random() * 1.4,
        life: 0,
        maxLife: 0.55 + Math.random() * 0.45,
        color,
      });
    }
  }

  render(frameState) {
    const tRenderStart = performance.now();
    const nowMs = tRenderStart;
    const dt = clamp((nowMs - this.lastFrameTime) / 1000, 0.001, 0.05);
    this.lastFrameTime = nowMs;
    const nowSec = nowMs * 0.001;

    if (frameState.isPlaying) {
      this.pausedIdleSec = 0;
    } else {
      this.pausedIdleSec += dt;
    }

    this.hitTargets.length = 0;
    this.collectHitTargets =
      Boolean(this.settings.hoverInspector) &&
      (nowMs <= this.pointerActiveUntil || Boolean(this.hoveredTarget));

    if (nowSec - this.lastEphemerisAt >= 30) {
      this.lastEphemerisAt = nowSec;
      const nowDate = new Date();
      this.solarSystem = computeLiveSolarSystem(nowDate);
      this.spacecraft = computeSpacecraft(nowDate, this.solarSystem);
    }

    const ctx = this.ctx;
    if (!ctx) return;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.48;
    const minDim = w < h ? w : h;
    const targetZoom = clamp(this.settings.zoom ?? 1.0, 0.45, 2.4);
    this.currentZoom += (targetZoom - this.currentZoom) * expSmoothing(dt, 10);
    const domeRadius = ((minDim * 0.30) / CONSTELLATION_ANGULAR_RADIUS) * this.currentZoom;
    this.lastDomeRadius = domeRadius;

    // 1. Sky void background (pure pitch-black or dark theme void)
    ctx.fillStyle = this.theme.bg;
    ctx.fillRect(0, 0, w, h);

    this.bottomClearY = frameState.bottomClearY;
    const react = clamp(this.settings.audioReactivity ?? 1.0, 0, 2);
    const rawAudio = frameState.audio || { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0 };
    const aLerp = expSmoothing(dt, 18);
    this.audioEnergy.bass += (rawAudio.bass * react - this.audioEnergy.bass) * aLerp;
    this.audioEnergy.mid += (rawAudio.mid * react - this.audioEnergy.mid) * aLerp;
    this.audioEnergy.treble += (rawAudio.treble * react - this.audioEnergy.treble) * aLerp;
    this.audioEnergy.rms += (rawAudio.rms * react - this.audioEnergy.rms) * aLerp;
    this.audioEnergy.beat += (rawAudio.beat * react - this.audioEnergy.beat) * expSmoothing(dt, 24);

    if (
      this.audioEnergy.beat > 0.65 &&
      nowSec - this.lastBeatShootingStarAt > 3.2 &&
      this.settings.effectsIntensity > 0.2
    ) {
      this.lastBeatShootingStarAt = nowSec;
      this._spawnShootingStar(nowSec);
    }

    // 2. Smooth Quaternion SLERP camera update
    if (this.transition) {
      const speed = clamp(this.settings.rotationSpeed, 0.4, 2.5);
      this.transition.progress = Math.min(1, this.transition.progress + (dt * speed) / this.transition.duration);
      const eased = easeInOutQuart(this.transition.progress);
      this.qCamera = quatSlerp(this.transition.qFrom, this.transition.qTo, eased);

      if (this.transition.progress >= 1) {
        this.heroIndex = this.transition.toIndex;
        this.qCamera = [...this.skyConstellations[this.heroIndex].qTarget];
        this.transition = null;
      }
    } else if (this.settings.freeExplore && !this.isDragging) {
      const speedMag = Math.hypot(this.dragVelocity.x, this.dragVelocity.y);
      if (speedMag > 0.002) {
        const qYaw = quatFromAxisAngle([0, 1, 0], this.dragVelocity.x * dt);
        const qPitch = quatFromAxisAngle([1, 0, 0], this.dragVelocity.y * dt);
        this.qCamera = quatNormalize(quatMul(quatMul(qYaw, qPitch), this.qCamera));
        const damp = Math.exp(-dt * 5.2);
        this.dragVelocity.x *= damp;
        this.dragVelocity.y *= damp;
      } else {
        this.dragVelocity.x = 0;
        this.dragVelocity.y = 0;
      }
    }

    // Build single 3x3 rotation matrix for this frame (replaces ~1,400 quaternion calls)
    const breathAmt = this.isDragging ? 0 : (frameState.isPlaying ? 0.018 : 0.007);
    const halfZ = Math.sin(nowSec * 0.21) * breathAmt * 0.5;
    const halfX = Math.cos(nowSec * 0.16) * (breathAmt * 0.6) * 0.5;
    this._qBreathZ[2] = Math.sin(halfZ);
    this._qBreathZ[3] = Math.cos(halfZ);
    this._qBreathX[0] = Math.sin(halfX);
    this._qBreathX[3] = Math.cos(halfX);
    quatMulInto(this._qTemp, this._qBreathZ, this._qBreathX);
    quatMulInto(this._qRender, this._qTemp, this.qCamera);
    const m = quatToMat3(this._qRender, this.rotMat);

    // 3. Batched 3D hemisphere starfield + Milky Way band
    this._drawSphereBackgroundStars(ctx, nowSec, cx, cy, domeRadius, m);

    // 3b. Deep-sky objects
    if (this.settings.showDeepSky) {
      this._drawDeepSkyObjects(ctx, m, cx, cy, domeRadius, nowSec);
    }

    // 4. Shooting stars
    if (nowSec >= this.nextShootingStarAt) {
      this._spawnShootingStar(nowSec);
    }
    if (this.shootingStars.length > 0) {
      this._drawShootingStars(ctx, dt);
    }

    // 5. Frustum-culled & batched ambient constellations
    this._drawAllAmbientConstellations(ctx, m, cx, cy, domeRadius, nowSec);

    // 5b. Live Solar System bodies & spacecraft
    if (this.settings.showDeepSky) {
      this._drawSolarSystem(ctx, m, cx, cy, domeRadius);
    }
    if (this.settings.showSatellites) {
      this._drawSpacecraftAndSatellites(ctx, m, cx, cy, domeRadius, nowSec);
    }

    // 6. Active & transitioning hero constellations + bridge stars
    if (this.transition) {
      const fromSky = this.skyConstellations[this.transition.fromIndex];
      const toSky = this.skyConstellations[this.transition.toIndex];
      const outProj = this._projectSkyConstellation(fromSky, m, cx, cy, domeRadius);
      const inProj = this._projectSkyConstellation(toSky, m, cx, cy, domeRadius);

      const fc = fromSky.centerDir;
      const tc = toSky.centerDir;
      const outZ = m[6] * fc[0] + m[7] * fc[1] + m[8] * fc[2];
      const inZ = m[6] * tc[0] + m[7] * tc[1] + m[8] * tc[2];

      const outAlpha = clamp((1 - this.transition.progress * 0.92) * clamp((outZ + 0.1) * 1.5, 0, 1), 0, 1);
      const inAlpha = clamp(easeOutCubic(this.transition.progress) * clamp((inZ + 0.15) * 1.5, 0, 1), 0, 1);

      if (outAlpha > 0.02) {
        this._drawSingleAmbientConstellation(ctx, fromSky, outProj, outAlpha * 1.35, nowSec);
      }

      const bridgeProj = this._projectBridgeStars(this.transition, m, cx, cy, domeRadius);
      this._updateTransitionIgnition(dt, nowSec, outProj, bridgeProj, toSky.constellation, inProj, cx, cy, frameState);
      this._drawBridgeConstellation(ctx, this.transition, outProj, bridgeProj, inProj, outAlpha, inAlpha, nowSec);
      this._drawHeroConstellation(ctx, toSky, inProj, Math.max(inAlpha, 0.25), nowSec, frameState);
      if (this.comets.length > 0) this._drawComets(ctx, dt);
      if (this.embers.length > 0) this._drawEmbers(ctx, dt);
      if (this.ripples.length > 0) this._drawRipples(ctx, dt);
      if (this.wordBubbles.size > 0) this._drawWordBubbles(ctx, dt, Math.max(inAlpha, 0.88), frameState);

      if (this.showLabels && inAlpha > 0.28) {
        const labelY = cy + minDim * 0.30 * clamp(this.currentZoom, 0.65, 1.28) + 34;
        this._drawConstellationTitle(ctx, toSky.constellation, cx, labelY, inAlpha, cy, minDim, frameState.bottomClearY);
      }
    } else {
      const heroSky = this.skyConstellations[this.heroIndex];
      const hc = heroSky.centerDir;
      const heroZ = m[6] * hc[0] + m[7] * hc[1] + m[8] * hc[2];
      const projected = this._projectSkyConstellation(heroSky, m, cx, cy, domeRadius);

      this._updateLyricIgnition(dt, nowSec, heroSky.constellation, projected, cx, cy, frameState);
      if (heroZ > -0.14) {
        const heroLimb = clamp((heroZ + 0.12) * 1.45, 0, 1);
        this._drawHeroConstellation(ctx, heroSky, projected, heroLimb, nowSec, frameState);
      }
      if (this.comets.length > 0) this._drawComets(ctx, dt);
      if (this.embers.length > 0) this._drawEmbers(ctx, dt);
      if (this.ripples.length > 0) this._drawRipples(ctx, dt);
      if (this.wordBubbles.size > 0) this._drawWordBubbles(ctx, dt, heroZ > 0.05 ? 1 : 0, frameState);

      if (this.showLabels) {
        const titleConst = this.settings.freeExplore
          ? this.skyConstellations[this.getNearestConstellationIndex()].constellation
          : heroSky.constellation;
        if (this.settings.freeExplore || heroZ > 0.25) {
          const labelY = cy + minDim * 0.30 * clamp(this.currentZoom, 0.65, 1.28) + 34;
          this._drawConstellationTitle(ctx, titleConst, cx, labelY, 1, cy, minDim, frameState.bottomClearY);
        }
      }
    }

    // 7. Subtle Hover Star Inspector reticle
    if (this.settings.hoverInspector && this.hoveredTarget) {
      this._drawHoverReticle(ctx, this.hoveredTarget, nowSec);
    }

    // 8. Adaptive resolution governor for software rasterizers / ultra-high-res screens
    const costMs = performance.now() - tRenderStart;
    this.emaCostMs = this.emaCostMs * 0.9 + costMs * 0.1;
    if (this.emaCostMs > 12.0 && this.renderScale > 0.72) {
      this.slowFrames += 1;
      this.fastFrames = 0;
      if (this.slowFrames >= 36) {
        this.slowFrames = 0;
        this.renderScale = Math.max(0.72, Math.round((this.renderScale - 0.14) * 100) / 100);
        this._applyCanvasScale();
      }
    } else if (this.emaCostMs < 4.5 && this.renderScale < 1.0) {
      this.fastFrames += 1;
      this.slowFrames = 0;
      if (this.fastFrames >= 120) {
        this.fastFrames = 0;
        this.renderScale = Math.min(1.0, Math.round((this.renderScale + 0.14) * 100) / 100);
        this._applyCanvasScale();
      }
    } else {
      this.slowFrames = 0;
      this.fastFrames = 0;
    }
  }

  _drawSphereBackgroundStars(ctx, nowSec, cx, cy, domeRadius, m) {
    const bright = this.settings.starBrightness;
    const trebleBoost = 1 + clamp(this.audioEnergy.treble * 0.45, 0, 0.7);
    const bassBoost = 1 + clamp(this.audioEnergy.bass * 0.18, 0, 0.35);
    const alphaMult = (0.55 + bright * 0.42) * trebleBoost;
    const sizeMult = (0.85 + bright * 0.15) * bassBoost;

    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];

    const w = this.width + 8;
    const h = this.height + 8;
    const dirX = this.bgDirX;
    const dirY = this.bgDirY;
    const dirZ = this.bgDirZ;
    const sizes = this.bgSize;
    const alphas = this.bgAlpha;
    const phases = this.bgPhase;
    const speeds = this.bgSpeed;
    const cIdxs = this.bgColorIdx;
    const buckets = this.bgBuckets;
    const counts = this.bgBucketCounts;
    counts.fill(0);

    for (let i = 0, n = this.bgCount; i < n; i++) {
      const dx = dirX[i], dy = dirY[i], dz = dirZ[i];
      const vz = m20 * dx + m21 * dy + m22 * dz;
      if (vz <= 0.02) continue;

      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      const sx = cx + (m00 * dx + m01 * dy + m02 * dz) * k;
      if (sx < -8 || sx > w) continue;
      const sy = cy + (m10 * dx + m11 * dy + m12 * dz) * k;
      if (sy < -8 || sy > h) continue;

      const limbFade = vz > 0.377 ? 1 : (vz - 0.02) * 2.8;
      const twinkle = 0.58 + 0.42 * Math.sin(nowSec * speeds[i] + phases[i]);
      const alpha = clamp(alphas[i] * twinkle * limbFade * alphaMult, 0, 1);
      if (alpha < 0.03) continue;

      const r = sizes[i] * sizeMult;
      const cIdx = cIdxs[i];

      if (r > 1.38) {
        this._drawStarSprite(ctx, sx, sy, r * 2.9, this.theme.palette[cIdx], alpha * 0.52);
      }

      const band = alpha < 0.32 ? 0 : alpha < 0.58 ? 1 : alpha < 0.82 ? 2 : 3;
      const bIdx = cIdx * 4 + band;
      const offset = counts[bIdx];
      const arr = buckets[bIdx];
      arr[offset] = sx - r;
      arr[offset + 1] = sy - r;
      arr[offset + 2] = r * 2;
      counts[bIdx] = offset + 3;
    }

    // Flush all 440 background stars in <= 20 batched Canvas path draws
    const palette = this.theme.palette;
    for (let cIdx = 0; cIdx < palette.length; cIdx++) {
      let styleSet = false;
      for (let band = 0; band < 4; band++) {
        const bIdx = cIdx * 4 + band;
        const len = counts[bIdx];
        if (len === 0) continue;
        if (!styleSet) {
          ctx.fillStyle = palette[cIdx];
          styleSet = true;
        }
        ctx.globalAlpha = BG_ALPHA_MULTS[band];
        const arr = buckets[bIdx];
        ctx.beginPath();
        for (let j = 0; j < len; j += 3) {
          ctx.rect(arr[j], arr[j + 1], arr[j + 2], arr[j + 2]);
        }
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  _drawAllAmbientConstellations(ctx, m, cx, cy, domeRadius, nowSec) {
    const activeIdx = this.transition ? this.transition.toIndex : this.heroIndex;
    const outgoingIdx = this.transition ? this.transition.fromIndex : -1;
    const nameThreshold = this.settings.freeExplore ? 0.28 : (this.currentZoom < 0.85 ? 0.32 : 0.45);
    const bright = this.settings.starBrightness;
    const lineMult = this.settings.lineOpacity;
    const starBrightMult = 0.6 + bright * 0.36;

    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];
    const w = this.width;
    const h = this.height;
    const bgClearY = Number.isFinite(this.bottomClearY) ? this.bottomClearY : h - 60;

    const lineSegs = this.ambLineSegs;
    const lineCounts = this.ambLineCounts;
    lineCounts[0] = 0;
    lineCounts[1] = 0;
    lineCounts[2] = 0;

    const starBuckets = this.bgBuckets;
    const starCounts = this.bgBucketCounts;
    starCounts.fill(0);

    const labelsToDraw = [];

    for (let i = 0; i < this.skyConstellations.length; i++) {
      if (i === activeIdx || i === outgoingIdx) continue;
      const sky = this.skyConstellations[i];
      const cd = sky.centerDir;
      const cz = m20 * cd[0] + m21 * cd[1] + m22 * cd[2];
      if (cz <= -0.14) continue;

      // Fast O(1) screen-space bounding-circle frustum cull before projecting stars
      const ck = domeRadius / (1 + (cz < 1.22 ? (1 - cz) * 0.28 : -0.0616));
      const csx = cx + (m00 * cd[0] + m01 * cd[1] + m02 * cd[2]) * ck;
      const csy = cy + (m10 * cd[0] + m11 * cd[1] + m12 * cd[2]) * ck;
      const boundPx = ck * sky.boundScale + 40;
      if (csx + boundPx < 0 || csx - boundPx > w || csy + boundPx < 0 || csy - boundPx > h) {
        continue;
      }

      const proj = this._projectSkyConstellation(sky, m, cx, cy, domeRadius);
      const limbFade = clamp((cz + 0.12) * 1.45, 0, 1);

      // Batch edges into 1 of 3 sky-wide opacity bands
      const lBand = limbFade < 0.38 ? 0 : limbFade < 0.72 ? 1 : 2;
      let lArr = lineSegs[lBand];
      let lOff = lineCounts[lBand];
      const edgesFlat = sky.edgesFlat;
      for (let e = 0; e < edgesFlat.length; e += 2) {
        const pa = proj[edgesFlat[e]];
        const pb = proj[edgesFlat[e + 1]];
        if (pa.z <= -0.15 && pb.z <= -0.15) continue;
        if (lOff + 4 > lArr.length) {
          const grown = new Float32Array(lArr.length * 2);
          grown.set(lArr);
          lineSegs[lBand] = grown;
          lArr = grown;
        }
        lArr[lOff] = pa.sx;
        lArr[lOff + 1] = pa.sy;
        lArr[lOff + 2] = pb.sx;
        lArr[lOff + 3] = pb.sy;
        lOff += 4;
      }
      lineCounts[lBand] = lOff;

      let sumX = 0;
      let sumY = 0;
      let visibleCount = 0;
      const cObj = sky.constellation;

      for (let si = 0; si < proj.length; si++) {
        const s = proj[si];
        if (s.z <= 0.01) continue;
        const starLimb = (s.z > 0.41 ? 1 : (s.z - 0.01) * 2.5) * limbFade;
        const twinkle = 0.76 + 0.24 * Math.sin(nowSec * 1.4 + si * 1.7);
        const r = this._computeStarRadius(s.mag, false, bright);
        const alpha = clamp(0.36 * twinkle * starLimb * starBrightMult, 0, 0.92);

        if (starLimb > 0.38 && r > 1.2) {
          this._drawStarSprite(ctx, s.sx, s.sy, r * 3.1, s.renderColor, alpha * 0.42);
        }

        const cIdx = s.colorIdx;
        const band = alpha < 0.32 ? 0 : alpha < 0.58 ? 1 : alpha < 0.82 ? 2 : 3;
        const bIdx = cIdx * 4 + band;
        const sOff = starCounts[bIdx];
        const sArr = starBuckets[bIdx];
        if (sOff + 3 <= sArr.length) {
          sArr[sOff] = s.sx - r;
          sArr[sOff + 1] = s.sy - r;
          sArr[sOff + 2] = r * 2;
          starCounts[bIdx] = sOff + 3;
        }

        if (this.collectHitTargets && s.z > 0.08 && s.sx > -20 && s.sx < w + 20 && s.sy > -20 && s.sy < h + 20) {
          this.hitTargets.push({
            x: s.sx,
            y: s.sy,
            hitRadius: 13,
            priority: s.name ? 1.5 : 0.85,
            kind: cObj.name,
            name: s.fallbackAmbName,
            meta: s.metaAmbient,
            note: cObj.fact,
            color: s.renderColor || this.theme.brand,
            url: s.wikiUrl,
          });
        }

        sumX += s.sx;
        sumY += s.sy;
        visibleCount += 1;
      }

      if (this.showLabels && cz > nameThreshold && visibleCount > 0) {
        const avgX = sumX / visibleCount;
        const avgY = sumY / visibleCount;
        if (avgX > 80 && avgX < w - 80 && avgY > 60 && avgY + 24 < bgClearY) {
          labelsToDraw.push({ name: cObj.name, x: avgX, y: avgY + 24, alpha: clamp(0.14 * limbFade, 0, 0.22) });
        }
      }
    }

    // Flush all ambient constellation lines in <= 3 stroke calls total
    const bandAlphas = [0.022 * lineMult, 0.052 * lineMult, 0.086 * lineMult];
    const ambLineLut = this.themeLuts.ambLine;
    ctx.lineWidth = 0.85;
    for (let b = 0; b < 3; b++) {
      const len = lineCounts[b];
      if (len === 0) continue;
      ctx.strokeStyle = ambLineLut[alphaIdx(clamp(bandAlphas[b], 0, 0.5))];
      const arr = lineSegs[b];
      ctx.beginPath();
      for (let j = 0; j < len; j += 4) {
        ctx.moveTo(arr[j], arr[j + 1]);
        ctx.lineTo(arr[j + 2], arr[j + 3]);
      }
      ctx.stroke();
    }

    // Flush all ambient constellation star cores in batched rects
    const palette = this.theme.palette;
    for (let cIdx = 0; cIdx < palette.length; cIdx++) {
      let styleSet = false;
      for (let band = 0; band < 4; band++) {
        const bIdx = cIdx * 4 + band;
        const len = starCounts[bIdx];
        if (len === 0) continue;
        if (!styleSet) {
          ctx.fillStyle = palette[cIdx];
          styleSet = true;
        }
        ctx.globalAlpha = BG_ALPHA_MULTS[band];
        const arr = starBuckets[bIdx];
        ctx.beginPath();
        for (let j = 0; j < len; j += 3) {
          ctx.rect(arr[j], arr[j + 1], arr[j + 2], arr[j + 2]);
        }
        ctx.fill();
      }
    }

    if (labelsToDraw.length > 0) {
      const ambHex = this.theme.ambLabelHex;
      for (let i = 0; i < labelsToDraw.length; i++) {
        const lbl = labelsToDraw[i];
        this._drawMiniLabel(ctx, lbl.name, 9, 500, ambHex, lbl.x, lbl.y, lbl.alpha, true);
      }
    }
    ctx.globalAlpha = 1;
  }

  _drawSingleAmbientConstellation(ctx, sky, proj, limbFade, nowSec) {
    const bright = this.settings.starBrightness;
    const lineMult = this.settings.lineOpacity;
    const edgesFlat = sky.edgesFlat;

    ctx.strokeStyle = this.themeLuts.ambLine[alphaIdx(clamp(0.09 * limbFade * lineMult, 0, 0.6))];
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    for (let e = 0; e < edgesFlat.length; e += 2) {
      const pa = proj[edgesFlat[e]];
      const pb = proj[edgesFlat[e + 1]];
      if (pa.z <= -0.15 && pb.z <= -0.15) continue;
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);
    }
    ctx.stroke();

    for (let i = 0; i < proj.length; i++) {
      const s = proj[i];
      if (s.z <= 0.01) continue;
      const starLimb = clamp((s.z - 0.01) * 2.5, 0, 1) * limbFade;
      const twinkle = 0.76 + 0.24 * Math.sin(nowSec * 1.4 + i * 1.7);
      const r = this._computeStarRadius(s.mag, false, bright);
      const alpha = clamp(0.36 * twinkle * starLimb * (0.6 + bright * 0.36), 0, 0.92);

      if (r > 1.15) {
        this._drawStarSprite(ctx, s.sx, s.sy, r * 3.1, s.renderColor, alpha * 0.45);
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.renderColor;
      ctx.fillRect(s.sx - r, s.sy - r, r * 2, r * 2);
    }
    ctx.globalAlpha = 1;
  }

  _drawShootingStars(ctx, dt) {
    const fx = this.settings.effectsIntensity;
    const fxMult = clamp(fx, 0.25, 1.4);
    const arr = this.shootingStars;
    for (let i = arr.length - 1; i >= 0; i--) {
      const st = arr[i];
      st.life += dt;
      if (st.life >= st.maxLife) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
        continue;
      }
      st.x += st.vx * dt;
      st.y += st.vy * dt;
      const p = st.life / st.maxLife;
      const alpha = Math.sin(p * Math.PI) * 0.72 * fxMult;
      const mag = Math.sqrt(st.vx * st.vx + st.vy * st.vy) || 1;
      const tailX = st.x - (st.vx / mag) * st.length;
      const tailY = st.y - (st.vy / mag) * st.length;

      const grad = ctx.createLinearGradient(tailX, tailY, st.x, st.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, this.themeLuts.heroGlow[alphaIdx(alpha)]);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(st.x, st.y);
      ctx.stroke();
    }
  }

  _computeStarRadius(mag, isHero, bright) {
    if (!this.settings.proportionalSizes) {
      return isHero
        ? clamp(3.5 - mag * 0.48, 1.5, 4.5) * (0.72 + bright * 0.28)
        : clamp(2.4 - mag * 0.32, 1.0, 2.8);
    }
    const fluxScale = Math.pow(10, -0.145 * (mag - 1.4));
    if (isHero) {
      return clamp(2.6 * fluxScale, 0.95, 7.2) * (0.74 + bright * 0.26);
    }
    return clamp(1.75 * fluxScale, 0.65, 5.0);
  }

  _drawDeepSkyObjects(ctx, m, cx, cy, domeRadius, nowSec) {
    const bright = clamp(this.settings.starBrightness, 0.4, 2.0);
    const zoomBoost = clamp(this.currentZoom, 0.65, 2.0);
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];
    const minDim = Math.min(this.width, this.height);

    for (let i = 0; i < this.skyDeepSky.length; i++) {
      const obj = this.skyDeepSky[i];
      const d = obj.dir;
      const vz = m20 * d[0] + m21 * d[1] + m22 * d[2];
      if (vz <= 0.04) continue;

      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      const sx = cx + (m00 * d[0] + m01 * d[1] + m02 * d[2]) * k;
      if (sx < -40 || sx > this.width + 40) continue;
      const sy = cy + (m10 * d[0] + m11 * d[1] + m12 * d[2]) * k;
      if (sy < -40 || sy > this.height + 40) continue;

      const limbFade = clamp((vz - 0.04) * 2.2, 0, 1);
      const pulse = 0.92 + 0.08 * Math.sin(nowSec * 0.9 + i * 1.4);
      let radius;
      if (this.settings.proportionalSizes) {
        const truePx = domeRadius * (((obj.angularDeg || 0.5) * Math.PI) / 180) * 0.5;
        radius = clamp(Math.pow(Math.max(0.5, truePx), 0.78) * 1.45, 5.5, minDim * 0.24);
      } else {
        radius = obj.size * 15 * zoomBoost * (0.85 + bright * 0.15);
      }

      if (obj.kind === 'Galaxy' || obj.kind === 'Satellite Galaxy') {
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(obj.angle || 0.4);
        ctx.scale(1.45, 0.62);
        this._drawStarSprite(ctx, 0, 0, radius, obj.color, 0.36 * limbFade * pulse);
        ctx.restore();
      } else if (obj.kind === 'Nebula' || obj.kind === 'Supernova Remnant' || obj.kind === 'Planetary Nebula') {
        const isRing = obj.kind === 'Planetary Nebula';
        this._drawStarSprite(ctx, sx, sy, radius * 1.15, obj.color, (isRing ? 0.24 : 0.34) * limbFade * pulse);
        if (isRing) {
          ctx.strokeStyle = fastHexRgba(obj.color, 0.32 * limbFade);
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 0.46, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        const cr = radius * 0.65;
        ctx.strokeStyle = fastHexRgba(obj.color, 0.24 * limbFade);
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(sx, sy, cr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = obj.color;
        ctx.globalAlpha = 0.48 * limbFade * pulse;
        for (let kIdx = 0; kIdx < 6; kIdx++) {
          const ang = kIdx * 1.05 + i;
          const dist = cr * (0.22 + (kIdx % 3) * 0.22);
          ctx.fillRect(sx + Math.cos(ang) * dist - 0.9, sy + Math.sin(ang) * dist - 0.9, 1.8, 1.8);
        }
        ctx.globalAlpha = 1;
      }

      if (this.showLabels && (vz > 0.60 || this.currentZoom > 1.25)) {
        this._drawMiniLabel(ctx, obj.id, 8.5, 500, obj.color, sx, sy + radius * 0.72 + 12, 0.36 * limbFade, true);
      }

      if (this.collectHitTargets) {
        this.hitTargets.push({
          x: sx,
          y: sy,
          hitRadius: Math.max(15, radius * 0.65),
          priority: 2.4,
          kind: obj.kind,
          name: obj.titleName,
          meta: obj.metaStr,
          note: obj.note,
          color: obj.color,
          url: obj.wikiUrl,
        });
      }
    }
  }

  _getMoonBitmap(body, moonR) {
    if (typeof document === 'undefined') return null;
    const rPx = Math.max(6, Math.round(moonR * 2) / 2);
    const phaseStep = Math.round((body.phaseFrac ?? 0.5) * 100);
    const key = `${rPx}:${phaseStep}:${body.waxing ? 1 : 0}`;
    if (this.moonCache.canvas && this.moonCache.key === key) {
      return this.moonCache;
    }

    const auraR = Math.ceil(rPx * 3.8) + 2;
    const size = auraR * 2;
    const off = this.moonCache.canvas || document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    octx.clearRect(0, 0, size, size);
    octx.translate(auraR, auraR);

    const grad = octx.createRadialGradient(0, 0, rPx * 0.6, 0, 0, rPx * 3.8);
    grad.addColorStop(0, 'rgba(235, 244, 255, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    octx.fillStyle = grad;
    octx.beginPath();
    octx.arc(0, 0, rPx * 3.8, 0, Math.PI * 2);
    octx.fill();

    octx.fillStyle = 'rgba(18, 22, 30, 0.92)';
    octx.strokeStyle = 'rgba(215, 232, 255, 0.42)';
    octx.lineWidth = 0.85;
    octx.beginPath();
    octx.arc(0, 0, rPx, 0, Math.PI * 2);
    octx.fill();
    octx.stroke();

    octx.save();
    octx.beginPath();
    octx.arc(0, 0, rPx, 0, Math.PI * 2);
    octx.clip();
    const litDir = body.waxing ? 1 : -1;
    const p = clamp(body.phaseFrac ?? 0.5, 0.02, 0.99);
    octx.fillStyle = 'rgba(242, 246, 255, 0.95)';
    octx.beginPath();
    octx.arc(0, 0, rPx, -Math.PI / 2, Math.PI / 2, litDir < 0);
    const rx = rPx * Math.abs(1 - 2 * p);
    octx.ellipse(0, 0, rx, rPx, 0, Math.PI / 2, -Math.PI / 2, p > 0.5 ? litDir < 0 : litDir > 0);
    octx.closePath();
    octx.fill();
    octx.restore();

    this.moonCache = { canvas: off, key, half: auraR };
    return this.moonCache;
  }

  _drawSolarSystem(ctx, m, cx, cy, domeRadius) {
    if (!this.solarSystem?.bodies) return;
    const bright = clamp(this.settings.starBrightness, 0.4, 2.0);
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];

    for (const body of this.solarSystem.bodies) {
      const d = body.dir;
      const vz = m20 * d[0] + m21 * d[1] + m22 * d[2];
      if (vz <= 0.02) continue;

      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      const sx = cx + (m00 * d[0] + m01 * d[1] + m02 * d[2]) * k;
      if (sx < -30 || sx > this.width + 30) continue;
      const sy = cy + (m10 * d[0] + m11 * d[1] + m12 * d[2]) * k;
      if (sy < -30 || sy > this.height + 30) continue;

      const limbFade = clamp((vz - 0.02) * 2.4, 0, 1);

      if (body.id === 'moon') {
        const moonR = this.settings.proportionalSizes
          ? clamp(domeRadius * ((0.518 * Math.PI) / 180) * 0.65, 7.5, 22)
          : 7.4 * clamp(this.currentZoom, 0.8, 1.35);
        const bmp = this._getMoonBitmap(body, moonR);
        if (bmp) {
          ctx.globalAlpha = limbFade;
          ctx.drawImage(bmp.canvas, sx - bmp.half, sy - bmp.half);
          ctx.globalAlpha = 1;
        }
      } else {
        const r = this.settings.proportionalSizes
          ? clamp(1.35 + Math.sqrt(Math.max(1, body.angularArcsec || 5)) * 0.68, 1.8, 6.2) * (0.8 + bright * 0.2)
          : clamp(3.3 - body.mag * 0.24, 2.2, 4.8) * (0.78 + bright * 0.22);
        this._drawStarSprite(ctx, sx, sy, r * 3.8, body.color, 0.52 * limbFade);

        if (body.hasRing) {
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(-0.34);
          ctx.strokeStyle = fastHexRgba(body.color, 0.72 * limbFade);
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.45, r * 0.78, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.globalAlpha = 0.95 * limbFade;
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (this.showLabels && vz > 0.16) {
        this._drawMiniLabel(
          ctx,
          body.upperName || (body.upperName = body.name.toUpperCase()),
          9,
          500,
          body.color,
          sx,
          sy + (body.id === 'moon' ? 18 : 14),
          0.62 * limbFade,
          true
        );
      }

      if (this.collectHitTargets) {
        const meta =
          body.id === 'moon'
            ? `${body.phaseName} · ${Math.round((body.phaseFrac || 0) * 100)}% lit · 384,400 km`
            : `Mag ${body.mag.toFixed(1)} · ${body.distanceAu.toFixed(2)} AU`;
        this.hitTargets.push({
          x: sx,
          y: sy,
          hitRadius: 16,
          priority: 3.3,
          kind: body.kind,
          name: body.name,
          meta,
          note: body.note,
          color: body.color,
          url: body.wikiUrl || (body.wikiUrl = resolveObjectWikiUrl(body.id)),
        });
      }
    }
  }

  _drawSpacecraftAndSatellites(ctx, m, cx, cy, domeRadius, nowSec) {
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];

    if (this.spacecraft) {
      for (let i = 0; i < this.spacecraft.length; i++) {
        const probe = this.spacecraft[i];
        const pd = probe.dir;
        const vz = m20 * pd[0] + m21 * pd[1] + m22 * pd[2];
        if (vz <= 0.02) continue;

        const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
        const sx = cx + (m00 * pd[0] + m01 * pd[1] + m02 * pd[2]) * k;
        if (sx < -30 || sx > this.width + 30) continue;
        const sy = cy + (m10 * pd[0] + m11 * pd[1] + m12 * pd[2]) * k;
        if (sy < -30 || sy > this.height + 30) continue;

        const limbFade = clamp((vz - 0.02) * 2.4, 0, 1);
        const pingPhase = (nowSec * (probe.featured ? 0.55 : 0.35) + i * 0.4) % 1;
        const pingR = (probe.featured ? 5 : 4) + pingPhase * (probe.featured ? 15 : 10);
        const pingAlpha = (1 - pingPhase) * (probe.featured ? 0.55 : 0.32) * limbFade;

        ctx.strokeStyle = fastHexRgba(probe.color, pingAlpha);
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(sx, sy, pingR, 0, Math.PI * 2);
        ctx.stroke();

        const d = this.settings.proportionalSizes
          ? (probe.featured ? 3.2 : 2.5)
          : (probe.featured ? 4.4 : 3.4);
        ctx.strokeStyle = fastHexRgba(probe.color, 0.92 * limbFade);
        ctx.fillStyle = fastHexRgba(probe.color, 0.22 * limbFade);
        ctx.lineWidth = probe.featured ? 1.35 : 1.05;
        ctx.beginPath();
        ctx.moveTo(sx, sy - d);
        ctx.lineTo(sx + d, sy);
        ctx.lineTo(sx, sy + d);
        ctx.lineTo(sx - d, sy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        const br = this.settings.proportionalSizes ? 1.0 : 1.35;
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95 * limbFade;
        ctx.fillRect(sx - br, sy - br, br * 2, br * 2);
        ctx.globalAlpha = 1;

        if (this.showLabels && (probe.featured || vz > 0.25)) {
          const tag = probe.featured
            ? `${probe.name.toUpperCase()} · ${probe.distanceAu.toFixed(0)} AU`
            : probe.id;
          this._drawMiniLabel(ctx, tag, 9, 600, probe.color, sx + d + 7, sy + 3, (probe.featured ? 0.85 : 0.58) * limbFade, false);
        }

        if (this.collectHitTargets) {
          const meta =
            probe.id === 'JWST'
              ? `~1.5M km (L2) · Launched ${probe.launched}`
              : `${probe.distanceAu.toFixed(1)} AU · ${probe.lightHours.toFixed(1)} light-hrs · ${probe.constellation}`;
          this.hitTargets.push({
            x: sx,
            y: sy,
            hitRadius: 18,
            priority: probe.featured ? 4.4 : 3.8,
            kind: probe.kind,
            name: probe.name,
            meta,
            note: probe.note,
            color: probe.color,
            url: probe.wikiUrl || (probe.wikiUrl = resolveObjectWikiUrl(probe.id)),
          });
        }
      }
    }

    const sats = computeOrbitingSatellites(nowSec);
    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i];
      const sd = sat.dir;
      const vz = m20 * sd[0] + m21 * sd[1] + m22 * sd[2];
      if (vz <= 0.04) continue;

      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      const sx = cx + (m00 * sd[0] + m01 * sd[1] + m02 * sd[2]) * k;
      if (sx < -30 || sx > this.width + 30) continue;
      const sy = cy + (m10 * sd[0] + m11 * sd[1] + m12 * sd[2]) * k;
      if (sy < -30 || sy > this.height + 30) continue;

      const limbFade = clamp((vz - 0.04) * 2.5, 0, 1);

      ctx.fillStyle = sat.color;
      for (let t = 0; t < sat.trailDirs.length; t++) {
        const td = sat.trailDirs[t];
        const tz = m20 * td[0] + m21 * td[1] + m22 * td[2];
        if (tz <= 0.02) continue;
        const tk = domeRadius / (1 + (tz < 1.22 ? (1 - tz) * 0.28 : -0.0616));
        const tsx = cx + (m00 * td[0] + m01 * td[1] + m02 * td[2]) * tk;
        const tsy = cy + (m10 * td[0] + m11 * td[1] + m12 * td[2]) * tk;
        ctx.globalAlpha = (1 - t / sat.trailDirs.length) * 0.42 * limbFade;
        ctx.fillRect(tsx - 1, tsy - 1, 2, 2);
      }
      ctx.globalAlpha = 1;

      this._drawStarSprite(ctx, sx, sy, 10, sat.color, 0.72 * limbFade);
      ctx.strokeStyle = fastHexRgba(sat.color, 0.85 * limbFade);
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(sx - 5, sy);
      ctx.lineTo(sx + 5, sy);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = limbFade;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (this.showLabels) {
        this._drawMiniLabel(ctx, sat.id, 8.5, 600, sat.color, sx + 8, sy + 3, 0.74 * limbFade, false);
      }

      if (this.collectHitTargets) {
        this.hitTargets.push({
          x: sx,
          y: sy,
          hitRadius: 18,
          priority: 4.1,
          kind: sat.kind,
          name: sat.name,
          meta: `Alt ${sat.altitude} · ${sat.speed}`,
          note: sat.note,
          color: sat.color,
          url: sat.wikiUrl || (sat.wikiUrl = resolveObjectWikiUrl(sat.id)),
        });
      }
    }
  }

  hitTest(x, y) {
    if (!this.settings.hoverInspector || x < 0 || y < 0) {
      this.hoveredTarget = null;
      return null;
    }

    let best = null;
    let bestScore = Infinity;
    for (let i = 0; i < this.hitTargets.length; i++) {
      const t = this.hitTargets[i];
      const dx = t.x - x;
      const dy = t.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 <= t.hitRadius * t.hitRadius) {
        const score = Math.sqrt(d2) - (t.priority || 1) * 3.5;
        if (score < bestScore) {
          bestScore = score;
          best = t;
        }
      }
    }
    this.hoveredTarget = best;
    return best;
  }

  /**
   * Picks the closest visible star, deep-sky object, planet/Moon, probe, or satellite at `(x, y)`
   * on Ctrl+Click — works even when `hoverInspector` is disabled.
   */
  pickCelestialAt(x, y) {
    if (x < 0 || y < 0) return null;

    if (this.hitTargets.length > 0) {
      let best = null;
      let bestScore = Infinity;
      for (let i = 0; i < this.hitTargets.length; i++) {
        const t = this.hitTargets[i];
        if (!t.url) continue;
        const r = (t.hitRadius || 15) + 4;
        const dx = t.x - x;
        const dy = t.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 <= r * r) {
          const score = Math.sqrt(d2) - (t.priority || 1) * 3.5;
          if (score < bestScore) {
            bestScore = score;
            best = t;
          }
        }
      }
      if (best) return best;
    }

    // On-demand 3D projection fallback when hitTargets was skipped (e.g. hoverInspector off)
    const m = this.rotMat;
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];
    const cx = this.width * 0.5;
    const cy = this.height * 0.48;
    const domeRadius = this.lastDomeRadius || 400;
    const activeIdx = this.transition ? this.transition.toIndex : this.heroIndex;

    let best = null;
    let bestScore = Infinity;
    const consider = (sx, sy, radius, priority, name, kind, url, color) => {
      const dx = sx - x;
      const dy = sy - y;
      const d2 = dx * dx + dy * dy;
      if (d2 <= radius * radius) {
        const score = Math.sqrt(d2) - priority * 3.5;
        if (score < bestScore) {
          bestScore = score;
          best = { x: sx, y: sy, name, kind, url, color };
        }
      }
    };

    const projectDir = (d, minZ) => {
      const vz = m20 * d[0] + m21 * d[1] + m22 * d[2];
      if (vz <= minZ) return null;
      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      return [cx + (m00 * d[0] + m01 * d[1] + m02 * d[2]) * k, cy + (m10 * d[0] + m11 * d[1] + m12 * d[2]) * k];
    };

    for (let ci = 0; ci < this.skyConstellations.length; ci++) {
      const sky = this.skyConstellations[ci];
      const cd = sky.centerDir;
      const cz = m20 * cd[0] + m21 * cd[1] + m22 * cd[2];
      if (cz <= -0.14) continue;
      const isHero = ci === activeIdx;
      const flat = sky.starDirsFlat;
      const pool = sky.projPool;
      for (let si = 0, j = 0; si < pool.length; si++, j += 3) {
        const dx = flat[j], dy = flat[j + 1], dz = flat[j + 2];
        const vz = m20 * dx + m21 * dy + m22 * dz;
        if (vz <= (isHero ? 0.01 : 0.08)) continue;
        const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
        const sx = cx + (m00 * dx + m01 * dy + m02 * dz) * k;
        const sy = cy + (m10 * dx + m11 * dy + m12 * dz) * k;
        const s = pool[si];
        consider(
          sx,
          sy,
          isHero ? 19 : 16,
          isHero ? (s.name ? 3.2 : 2.2) : (s.name ? 1.5 : 0.85),
          s.name || (isHero ? s.fallbackHeroName : s.fallbackAmbName),
          sky.constellation.name,
          s.wikiUrl,
          s.renderColor || this.theme.brand
        );
      }
    }

    if (this.settings.showDeepSky) {
      for (let i = 0; i < this.skyDeepSky.length; i++) {
        const obj = this.skyDeepSky[i];
        const pt = projectDir(obj.dir, 0.04);
        if (pt) consider(pt[0], pt[1], 20, 2.4, obj.titleName, obj.kind, obj.wikiUrl, obj.color);
      }
      if (this.solarSystem?.bodies) {
        for (let i = 0; i < this.solarSystem.bodies.length; i++) {
          const b = this.solarSystem.bodies[i];
          const pt = projectDir(b.dir, 0.02);
          if (pt) {
            consider(pt[0], pt[1], 20, 3.3, b.name, b.kind, b.wikiUrl || resolveObjectWikiUrl(b.id), b.color);
          }
        }
      }
    }

    if (this.settings.showSatellites) {
      if (this.spacecraft) {
        for (let i = 0; i < this.spacecraft.length; i++) {
          const p = this.spacecraft[i];
          const pt = projectDir(p.dir, 0.02);
          if (pt) {
            consider(pt[0], pt[1], 22, p.featured ? 4.4 : 3.8, p.name, p.kind, p.wikiUrl || resolveObjectWikiUrl(p.id), p.color);
          }
        }
      }
      const sats = computeOrbitingSatellites(this.lastFrameTime * 0.001);
      for (let i = 0; i < sats.length; i++) {
        const sat = sats[i];
        const pt = projectDir(sat.dir, 0.04);
        if (pt) {
          consider(pt[0], pt[1], 22, 4.1, sat.name, sat.kind, sat.wikiUrl || resolveObjectWikiUrl(sat.id), sat.color);
        }
      }
    }

    return best;
  }

  triggerStarClickFeedback(x, y, color) {
    const col = color || this.theme.brand;
    this.ripples.push({
      x,
      y,
      radius: 4,
      maxRadius: 56,
      alpha: 0.92,
      speed: 96,
      color: col,
    });
    this.ripples.push({
      x,
      y,
      radius: 2,
      maxRadius: 32,
      alpha: 0.65,
      speed: 62,
      color: '#ffffff',
    });
    this._spawnEmberBurst(x, y, col);
  }

  _drawHoverReticle(ctx, target, nowSec) {
    const r = 12 + Math.sin(nowSec * 3.5) * 1.2;
    const arm = 4.5;
    const color = target.color || this.theme.brand;
    const x = target.x;
    const y = target.y;

    ctx.strokeStyle = fastHexRgba(color, 0.85);
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(x - r, y - r + arm);
    ctx.lineTo(x - r, y - r);
    ctx.lineTo(x - r + arm, y - r);
    ctx.moveTo(x + r - arm, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y - r + arm);
    ctx.moveTo(x + r, y + r - arm);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x + r - arm, y + r);
    ctx.moveTo(x - r + arm, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.lineTo(x - r, y + r - arm);
    ctx.stroke();
  }

  _projectBridgeStars(transition, m, cx, cy, domeRadius) {
    const bsList = transition.bridgeStars;
    const m00 = m[0], m01 = m[1], m02 = m[2];
    const m10 = m[3], m11 = m[4], m12 = m[5];
    const m20 = m[6], m21 = m[7], m22 = m[8];

    for (let i = 0; i < bsList.length; i++) {
      const bs = bsList[i];
      const d = bs.dir;
      const vz = m20 * d[0] + m21 * d[1] + m22 * d[2];
      const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
      bs.sx = cx + (m00 * d[0] + m01 * d[1] + m02 * d[2]) * k;
      bs.sy = cy + (m10 * d[0] + m11 * d[1] + m12 * d[2]) * k;
      bs.z = vz;
    }
    return bsList;
  }

  _updateTransitionIgnition(dt, nowSec, outProj, bridgeProj, inConst, inProj, cx, cy, frameState) {
    const tr = this.transition;
    const bridgeDecay = expSmoothing(dt, 1.5);
    const starDecay = expSmoothing(dt, 1.8);
    for (let i = 0; i < tr.bridgeGlow.length; i++) {
      tr.bridgeGlow[i] *= 1 - bridgeDecay;
    }
    for (let i = 0; i < inConst.stars.length; i++) {
      this.starGlow[i] *= 1 - starDecay;
    }

    const { lineKey, activeWordIndex, words, isPlaying, hasSyncedLyrics } = frameState;
    if (lineKey !== this.lastLineKey) {
      this.lastLineKey = lineKey;
      for (const bubble of this.wordBubbles.values()) {
        bubble.fastFade = true;
      }
    }

    if (hasSyncedLyrics && words && words.length > 0 && activeWordIndex >= 0) {
      this.lastLyricActivitySec = nowSec;
      this.isInstrumentalActive = false;
      const wordKey = `${lineKey}:${activeWordIndex}`;
      const activeWord = words[activeWordIndex];
      const useBridge = tr.bridgeStars.length > 0 && tr.progress < 0.82;

      if (useBridge) {
        const bridgeCount = tr.bridgeStars.length;
        const progressSlot = Math.min(
          bridgeCount - 1,
          Math.max(0, Math.floor(((tr.progress - 0.04) / 0.78) * bridgeCount))
        );
        const targetBridgeIdx = Math.max(progressSlot, tr.bridgeWordCount % bridgeCount);
        tr.bridgeGlow[targetBridgeIdx] = Math.max(tr.bridgeGlow[targetBridgeIdx], 0.92);

        if (activeWord && wordKey !== this.lastActiveWordKey) {
          this.lastActiveWordKey = wordKey;
          const bIdx = tr.bridgeWordCount % bridgeCount;
          tr.bridgeWordCount += 1;
          tr.bridgeGlow[bIdx] = 1.0;

          const star = bridgeProj[bIdx];
          this._emitIgnitionEffects(star, tr.lastIgnitedScreenPt || outProj[tr.fromExitStarIdx]);
          tr.lastIgnitedScreenPt = { sx: star.sx, sy: star.sy };

          const offset = this._computeWordPlacement(bIdx, star, bridgeProj, cx, cy);
          for (const b of this.wordBubbles.values()) {
            b.isCurrent = false;
          }
          this.wordBubbles.set(wordKey, {
            key: wordKey,
            target: 'bridge',
            starIdx: bIdx,
            text: activeWord.text,
            dx: offset.dx,
            dy: offset.dy,
            align: offset.align,
            x: star.sx + offset.dx,
            y: star.sy + offset.dy,
            starColor: star.color,
            age: 0,
            alpha: 0,
            isCurrent: true,
            fastFade: false,
          });
        }
      } else {
        const seq = inConst.sequence;
        const activeStarIdx = seq[activeWordIndex % seq.length];
        this.starGlow[activeStarIdx] = Math.max(this.starGlow[activeStarIdx], 1.0);

        if (activeWord && wordKey !== this.lastActiveWordKey) {
          this.lastActiveWordKey = wordKey;
          const star = inProj[activeStarIdx];
          const fromPt =
            tr.lastIgnitedScreenPt ||
            (bridgeProj.length > 0 ? bridgeProj[bridgeProj.length - 1] : outProj[tr.fromExitStarIdx]);
          this._emitIgnitionEffects(star, fromPt);
          tr.lastIgnitedScreenPt = { sx: star.sx, sy: star.sy };
          this.prevIgnitedStarIdx = activeStarIdx;

          const offset = this._computeWordPlacement(activeStarIdx, star, inProj, cx, cy);
          for (const b of this.wordBubbles.values()) {
            b.isCurrent = false;
          }
          this.wordBubbles.set(wordKey, {
            key: wordKey,
            target: 'hero',
            starIdx: activeStarIdx,
            text: activeWord.text,
            dx: offset.dx,
            dy: offset.dy,
            align: offset.align,
            x: star.sx + offset.dx,
            y: star.sy + offset.dy,
            starColor: star.color,
            age: 0,
            alpha: 0,
            isCurrent: true,
            fastFade: false,
          });
        }
      }
    } else if (isPlaying && tr.bridgeStars.length > 0) {
      const pulseBridge = Math.min(
        tr.bridgeStars.length - 1,
        Math.floor(tr.progress * tr.bridgeStars.length)
      );
      tr.bridgeGlow[pulseBridge] = Math.max(tr.bridgeGlow[pulseBridge], 0.65);
    }

    for (const bubble of this.wordBubbles.values()) {
      let star = null;
      if (bubble.target === 'bridge') star = bridgeProj[bubble.starIdx];
      else if (bubble.target === 'out') star = outProj[bubble.starIdx];
      else star = inProj[bubble.starIdx];
      if (star) {
        bubble.x = clamp(star.sx + bubble.dx, 76, this.width - 76);
        bubble.y = clamp(star.sy + bubble.dy, 64, this.height - 56);
      }
    }
  }

  _drawBridgeConstellation(ctx, tr, outProj, bridgeProj, inProj, outAlpha, inAlpha, nowSec) {
    const lineMult = this.settings.lineOpacity;
    const bright = this.settings.starBrightness;
    const fx = this.settings.effectsIntensity;

    const bLen = bridgeProj.length;
    const totalPts = bLen + 2;

    ctx.setLineDash([4, 6]);
    for (let i = 0; i < totalPts - 1; i++) {
      const aPt = i === 0 ? outProj[tr.fromExitStarIdx] : bridgeProj[i - 1];
      const bPt = i + 1 === totalPts - 1 ? inProj[tr.toEntryStarIdx] : bridgeProj[i];
      if (!aPt || !bPt) continue;

      const aGlow = i === 0 ? outAlpha * 0.45 : (tr.bridgeGlow[i - 1] || 0);
      const bGlow = i + 1 === totalPts - 1 ? (this.starGlow[tr.toEntryStarIdx] || 0) + inAlpha * 0.35 : (tr.bridgeGlow[i] || 0);
      const aAlpha = i === 0 ? outAlpha : clamp((aPt.z - 0.02) * 2.4, 0, 1);
      const bAlpha = i + 1 === totalPts - 1 ? inAlpha : clamp((bPt.z - 0.02) * 2.4, 0, 1);

      const segAlpha = clamp(Math.min(Math.max(aAlpha, 0.2), Math.max(bAlpha, 0.2)) * lineMult, 0, 1);
      const segGlow = aGlow > bGlow ? aGlow : bGlow;

      if (segGlow > 0.08) {
        ctx.strokeStyle = this.themeLuts.bridgeLine[alphaIdx(0.22 * segGlow)];
        ctx.lineWidth = 3.2 + segGlow * 2.8;
        ctx.beginPath();
        ctx.moveTo(aPt.sx, aPt.sy);
        ctx.lineTo(bPt.sx, bPt.sy);
        ctx.stroke();
      }
      ctx.strokeStyle = this.themeLuts.bridgeLine[alphaIdx(0.24 * segAlpha + segGlow * 0.48)];
      ctx.lineWidth = 1.0 + segGlow * 1.4;
      ctx.beginPath();
      ctx.moveTo(aPt.sx, aPt.sy);
      ctx.lineTo(bPt.sx, bPt.sy);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    for (let i = 0; i < bLen; i++) {
      const s = bridgeProj[i];
      if (s.z <= 0.02) continue;
      const limbFade = clamp((s.z - 0.02) * 2.5, 0, 1);
      const glow = tr.bridgeGlow[i] || 0;
      const twinkle = 0.86 + 0.14 * Math.sin(nowSec * 2.8 + i * 2.3);
      const baseR = clamp(3.4 - s.mag * 0.45, 1.8, 4.2) * (0.75 + bright * 0.28);
      const starR = baseR * (1 + glow * (0.95 + fx * 0.25)) * limbFade;
      const haloR = starR * (4.5 + glow * (6.0 + fx * 2.4));
      const bloomAlpha = clamp((0.30 + glow * 0.70) * limbFade * twinkle * (0.65 + bright * 0.35), 0, 0.98);

      this._drawStarSprite(ctx, s.sx, s.sy, haloR, s.color, bloomAlpha);

      const spikeStrength = Math.max(glow, 0.32) * limbFade * clamp(0.45 + fx * 0.65, 0.25, 1.5);
      const spikeLen = starR * (3.6 + glow * (5.2 + fx * 1.6));
      ctx.strokeStyle = WHITE_RGBA[alphaIdx(clamp(0.86 * spikeStrength, 0, 0.95))];
      ctx.lineWidth = glow > 0.5 ? 1.5 : 1.0;
      ctx.beginPath();
      ctx.moveTo(s.sx - spikeLen, s.sy);
      ctx.lineTo(s.sx + spikeLen, s.sy);
      ctx.moveTo(s.sx, s.sy - spikeLen);
      ctx.lineTo(s.sx, s.sy + spikeLen);
      ctx.stroke();

      ctx.globalAlpha = clamp((0.68 + glow * 0.32) * limbFade * twinkle * (0.72 + bright * 0.28), 0, 1);
      ctx.fillStyle = glow > 0.3 ? '#ffffff' : s.color;
      ctx.beginPath();
      ctx.arc(s.sx, s.sy, starR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  _emitIgnitionEffects(star, prevPt) {
    const fx = this.settings.effectsIntensity;
    const starCol = star.renderColor || star.color;
    if (fx > 0.05 && this.ripples.length < 28) {
      this.ripples.push({
        x: star.sx,
        y: star.sy,
        radius: 4,
        maxRadius: 48 * (0.7 + fx * 0.35),
        alpha: 0.82 * Math.min(1.2, fx),
        speed: 82,
        color: starCol,
      });
      this.ripples.push({
        x: star.sx,
        y: star.sy,
        radius: 2,
        maxRadius: 28 * (0.7 + fx * 0.35),
        alpha: 0.55 * Math.min(1.2, fx),
        speed: 52,
        color: '#ffffff',
      });
    }
    this._spawnEmberBurst(star.sx, star.sy, starCol);
    if (fx > 0.05 && prevPt && this.comets.length < 10) {
      this.comets.push({
        x1: prevPt.sx,
        y1: prevPt.sy,
        x2: star.sx,
        y2: star.sy,
        t: 0,
        duration: 0.28,
        color: starCol,
      });
    }
  }

  _releaseCurrentLyricBubbles() {
    for (const bubble of this.wordBubbles.values()) {
      if (bubble.isCurrent) {
        bubble.isCurrent = false;
        bubble.fastFade = true;
      }
    }
  }

  _updateLyricIgnition(dt, nowSec, hero, projected, cx, cy, frameState) {
    const starDecay = expSmoothing(dt, 1.8);
    for (let i = 0; i < hero.stars.length; i++) {
      this.starGlow[i] *= 1 - starDecay;
    }

    const { lineKey, activeWordIndex, words, isPlaying, hasSyncedLyrics } = frameState;

    if (lineKey !== this.lastLineKey) {
      this.lastLineKey = lineKey;
      for (const bubble of this.wordBubbles.values()) {
        bubble.fastFade = true;
      }
      if (lineKey && isPlaying && Math.random() < 0.38) {
        this._spawnShootingStar(nowSec);
      }
    }

    const decaySec = clamp(this.settings.lyricDecaySec ?? 2.5, 0.5, 10.0);
    const pauseExpired = !isPlaying && this.pausedIdleSec >= decaySec;
    const hasActiveWord = Boolean(hasSyncedLyrics && words && words.length > 0 && activeWordIndex >= 0);

    if (hasActiveWord && !pauseExpired) {
      this.lastLyricActivitySec = nowSec;
      this.isInstrumentalActive = false;

      const seq = hero.sequence;
      const count = Math.min(activeWordIndex + 1, words.length);
      for (let wi = 0; wi < count; wi++) {
        const starIdx = seq[wi % seq.length];
        const distFromCurrent = activeWordIndex - wi;
        const targetGlow = distFromCurrent === 0 ? 1.0 : Math.max(0.24, 0.74 - distFromCurrent * 0.15);
        this.starGlow[starIdx] = Math.max(this.starGlow[starIdx], targetGlow);
      }

      const activeStarIdx = seq[activeWordIndex % seq.length];
      const wordKey = `${lineKey}:${activeWordIndex}`;
      const activeWord = words[activeWordIndex];

      if (activeWord && (wordKey !== this.lastActiveWordKey || (isPlaying && !this.wordBubbles.has(wordKey)))) {
        this.lastActiveWordKey = wordKey;
        const star = projected[activeStarIdx];
        const prevStar =
          this.prevIgnitedStarIdx >= 0 && this.prevIgnitedStarIdx !== activeStarIdx
            ? projected[this.prevIgnitedStarIdx]
            : null;
        this._emitIgnitionEffects(star, prevStar);
        this.prevIgnitedStarIdx = activeStarIdx;

        const offset = this._computeWordPlacement(activeStarIdx, star, projected, cx, cy);
        for (const b of this.wordBubbles.values()) {
          b.isCurrent = false;
        }

        this.wordBubbles.set(wordKey, {
          key: wordKey,
          target: 'hero',
          starIdx: activeStarIdx,
          text: activeWord.text,
          dx: offset.dx,
          dy: offset.dy,
          align: offset.align,
          x: star.sx + offset.dx,
          y: star.sy + offset.dy,
          starColor: star.color,
          age: 0,
          alpha: 0,
          isCurrent: true,
          fastFade: false,
        });
      }

      for (const bubble of this.wordBubbles.values()) {
        if (bubble.target && bubble.target !== 'hero') continue;
        const star = projected[bubble.starIdx];
        if (star) {
          bubble.x = clamp(star.sx + bubble.dx, 76, this.width - 76);
          bubble.y = clamp(star.sy + bubble.dy, 64, this.height - 56);
        }
      }
    } else if (
      isPlaying &&
      this.settings.instrumentalMode &&
      (!hasSyncedLyrics || nowSec - this.lastLyricActivitySec > 4.5)
    ) {
      this.isInstrumentalActive = true;
      // A detected solo has no current word. Retire the previous lyric immediately
      // so it uses the normal fast-fade path instead of remaining on screen.
      this._releaseCurrentLyricBubbles();
      const seq = hero.sequence && hero.sequence.length ? hero.sequence : null;
      const seqLen = seq ? seq.length : hero.stars.length;
      const energy = Math.max(this.audioEnergy.beat, this.audioEnergy.bass * 0.85, this.audioEnergy.mid * 0.75);
      const elapsedSincePulse = nowSec - this.lastInstrumentalPulseSec;

      if ((energy > 0.34 && elapsedSincePulse > 0.38) || elapsedSincePulse > 1.35) {
        this.lastInstrumentalPulseSec = nowSec;
        this.instrumentalStep = (this.instrumentalStep + 1) % seqLen;
        const starIdx = seq ? seq[this.instrumentalStep] : this.instrumentalStep;
        const prevStar =
          this.prevIgnitedStarIdx >= 0 && this.prevIgnitedStarIdx !== starIdx
            ? projected[this.prevIgnitedStarIdx]
            : null;
        this.starGlow[starIdx] = clamp(0.78 + energy * 0.45, 0.78, 1.15);
        this._emitIgnitionEffects(projected[starIdx], prevStar);
        this.prevIgnitedStarIdx = starIdx;
      }
    } else if (!hasSyncedLyrics && isPlaying) {
      this.isInstrumentalActive = false;
      const pulseStar = Math.floor(nowSec * 1.4) % hero.stars.length;
      this.starGlow[pulseStar] = Math.max(this.starGlow[pulseStar], 0.58);
    } else {
      this.isInstrumentalActive = false;
    }
  }

  _computeWordPlacement(starIdx, star, projected, cx, cy) {
    let vx = star.sx - cx;
    let vy = star.sy - cy;
    const len = Math.sqrt(vx * vx + vy * vy);
    if (len < 12) {
      vx = 0;
      vy = -1;
    } else {
      vx /= len;
      vy /= len;
    }

    let dx = vx * 26;
    let dy = vy * 24;

    for (const existing of this.wordBubbles.values()) {
      if (existing.alpha < 0.15) continue;
      const ox = star.sx + dx - existing.x;
      const oy = star.sy + dy - existing.y;
      if (ox * ox + oy * oy < 2116) {
        dy += vy >= 0 ? 28 : -28;
      }
    }

    const align = dx > 10 ? 'left' : dx < -10 ? 'right' : 'center';
    return { dx, dy, align, starIdx };
  }

  _drawHeroConstellation(ctx, heroSky, proj, fadeIn, nowSec, frameState) {
    const hero = heroSky.constellation;
    const edgesFlat = heroSky.edgesFlat;
    const bright = this.settings.starBrightness;
    const fx = this.settings.effectsIntensity;
    const lineMult = this.settings.lineOpacity;
    const bass = clamp(this.audioEnergy.bass, 0, 1.4);
    const mid = clamp(this.audioEnergy.mid, 0, 1.4);
    const beat = clamp(this.audioEnergy.beat, 0, 1.2);

    const luts = this.themeLuts;

    // 1. Batch all base hero constellation lines into a single stroke
    ctx.strokeStyle = luts.heroLine[alphaIdx(clamp(0.18 + mid * 0.12, 0.1, 0.5) * fadeIn * lineMult)];
    ctx.lineWidth = 1.1 + mid * 0.45;
    ctx.beginPath();
    for (let e = 0; e < edgesFlat.length; e += 2) {
      const sa = proj[edgesFlat[e]];
      const sb = proj[edgesFlat[e + 1]];
      if (sa.z <= -0.15 && sb.z <= -0.15) continue;
      ctx.moveTo(sa.sx, sa.sy);
      ctx.lineTo(sb.sx, sb.sy);
    }
    ctx.stroke();

    // 2. Active glowing edges (skip createLinearGradient when endpoint alphas are uniform)
    for (let e = 0; e < edgesFlat.length; e += 2) {
      const a = edgesFlat[e];
      const b = edgesFlat[e + 1];
      const sa = proj[a];
      const sb = proj[b];
      if (sa.z <= -0.15 && sb.z <= -0.15) continue;
      const ga = this.starGlow[a];
      const gb = this.starGlow[b];
      const maxG = ga > gb ? ga : gb;
      const minG = ga < gb ? ga : gb;
      const edgeGlow = maxG * 0.72 + minG * 0.28 + mid * 0.22;

      if (edgeGlow > 0.03) {
        const coreWidth = 1.45 + edgeGlow * (1.7 + fx * 0.6);
        if (edgeGlow > 0.14 && fx > 0.1) {
          ctx.strokeStyle = luts.bridgeLine[alphaIdx(Math.min(0.32, edgeGlow * 0.24) * fadeIn * lineMult)];
          ctx.lineWidth = coreWidth * 2.5;
          ctx.beginPath();
          ctx.moveTo(sa.sx, sa.sy);
          ctx.lineTo(sb.sx, sb.sy);
          ctx.stroke();
        }

        const aAlpha = clamp((0.18 + ga * 0.75 + mid * 0.16) * fadeIn * lineMult, 0, 0.98);
        const bAlpha = clamp((0.18 + gb * 0.75 + mid * 0.16) * fadeIn * lineMult, 0, 0.98);
        if (Math.abs(aAlpha - bAlpha) < 0.08) {
          ctx.strokeStyle = luts.heroGlow[alphaIdx((aAlpha + bAlpha) * 0.5)];
        } else {
          const grad = ctx.createLinearGradient(sa.sx, sa.sy, sb.sx, sb.sy);
          grad.addColorStop(0, luts.heroGlow[alphaIdx(aAlpha)]);
          grad.addColorStop(1, luts.heroGlow[alphaIdx(bAlpha)]);
          ctx.strokeStyle = grad;
        }

        ctx.lineWidth = coreWidth;
        ctx.beginPath();
        ctx.moveTo(sa.sx, sa.sy);
        ctx.lineTo(sb.sx, sb.sy);
        ctx.stroke();
      }
    }

    const activeStarIdx =
      frameState.hasSyncedLyrics && frameState.activeWordIndex >= 0
        ? hero.sequence[frameState.activeWordIndex % hero.sequence.length]
        : -1;

    for (let i = 0; i < proj.length; i++) {
      const s = proj[i];
      if (s.z <= 0.01) continue;
      const sCol = s.renderColor;
      const starLimb = clamp((s.z - 0.01) * 2.5, 0, 1);
      const glow = clamp((this.starGlow[i] || 0) + bass * 0.22 + beat * 0.12, 0, 1.35);
      const isActiveStar = i === activeStarIdx;
      const twinkle = 0.85 + 0.15 * Math.sin(nowSec * 2.6 + i * 1.9);
      const baseR = this._computeStarRadius(s.mag, true, bright) * (1 + bass * 0.24);
      const starR = baseR * (1 + glow * (0.95 + fx * 0.25)) * fadeIn * starLimb;

      const haloR = starR * (4.4 + glow * (6.2 + fx * 2.5) + beat * 1.8);
      const bloomAlpha = clamp((0.26 + glow * 0.72) * fadeIn * twinkle * (0.65 + bright * 0.35), 0, 0.98);
      this._drawStarSprite(ctx, s.sx, s.sy, haloR, sCol, bloomAlpha);

      if (glow > 0.1 || s.mag < 1.4) {
        const spikeStrength = Math.max(glow, s.mag < 1.4 ? 0.38 : 0) * fadeIn * clamp(0.45 + fx * 0.65, 0.25, 1.5);
        const spikeLen = starR * (3.8 + glow * (5.6 + fx * 1.8));
        ctx.strokeStyle = WHITE_RGBA[alphaIdx(clamp(0.88 * spikeStrength, 0, 0.95))];
        ctx.lineWidth = isActiveStar ? 1.6 : 1.0;
        ctx.beginPath();
        ctx.moveTo(s.sx - spikeLen, s.sy);
        ctx.lineTo(s.sx + spikeLen, s.sy);
        ctx.moveTo(s.sx, s.sy - spikeLen);
        ctx.lineTo(s.sx, s.sy + spikeLen);
        ctx.stroke();

        if (glow > 0.45 && fx > 0.25) {
          const diagLen = spikeLen * 0.56;
          ctx.strokeStyle = fastHexRgba(sCol, clamp(0.55 * glow * fx * fadeIn, 0, 0.78));
          ctx.lineWidth = 0.95;
          ctx.beginPath();
          ctx.moveTo(s.sx - diagLen, s.sy - diagLen);
          ctx.lineTo(s.sx + diagLen, s.sy + diagLen);
          ctx.moveTo(s.sx - diagLen, s.sy + diagLen);
          ctx.lineTo(s.sx + diagLen, s.sy - diagLen);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = clamp((0.66 + glow * 0.34) * fadeIn * twinkle * (0.7 + bright * 0.3), 0, 1);
      ctx.fillStyle = glow > 0.32 ? '#ffffff' : sCol;
      ctx.beginPath();
      ctx.arc(s.sx, s.sy, starR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (this.showLabels && s.name && isActiveStar && glow > 0.55) {
        this._drawMiniLabel(
          ctx,
          s.upperName || (s.upperName = s.name.toUpperCase()),
          10,
          500,
          this.theme.brand,
          s.sx,
          s.sy + starR + 15,
          0.48 * glow * fadeIn,
          true
        );
      }

      if (this.collectHitTargets && s.z > 0.05 && s.sx > -20 && s.sx < this.width + 20 && s.sy > -20 && s.sy < this.height + 20) {
        this.hitTargets.push({
          x: s.sx,
          y: s.sy,
          hitRadius: 15,
          priority: s.name ? 3.2 : 2.2,
          kind: hero.name,
          name: s.name || s.fallbackHeroName,
          meta: s.metaAmbient,
          note: hero.fact,
          color: sCol || this.theme.brand,
          url: s.wikiUrl,
        });
      }
    }
  }

  _drawComets(ctx, dt) {
    const arr = this.comets;
    for (let i = arr.length - 1; i >= 0; i--) {
      const c = arr[i];
      c.t += dt / c.duration;
      if (c.t >= 1) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
        continue;
      }
      const p = easeOutCubic(c.t);
      const tailP = Math.max(0, p - 0.28);
      const hx = c.x1 + (c.x2 - c.x1) * p;
      const hy = c.y1 + (c.y2 - c.y1) * p;
      const tx = c.x1 + (c.x2 - c.x1) * tailP;
      const ty = c.y1 + (c.y2 - c.y1) * tailP;
      const alpha = (1 - c.t) * 0.9;

      const grad = ctx.createLinearGradient(tx, ty, hx, hy);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, fastHexRgba(c.color, alpha));

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      this._drawStarSprite(ctx, hx, hy, 8.5, c.color, alpha * 0.85);
      ctx.fillStyle = WHITE_RGBA[alphaIdx(alpha)];
      ctx.beginPath();
      ctx.arc(hx, hy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawEmbers(ctx, dt) {
    const damp = Math.exp(-dt * 2.5);
    const arr = this.embers;
    for (let i = arr.length - 1; i >= 0; i--) {
      const e = arr[i];
      e.life += dt;
      if (e.life >= e.maxLife) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
        continue;
      }
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.vx *= damp;
      e.vy *= damp;
      ctx.globalAlpha = (1 - e.life / e.maxLife) * 0.85;
      ctx.fillStyle = e.color;
      const d = e.size * 2;
      ctx.fillRect(e.x - e.size, e.y - e.size, d, d);
    }
    ctx.globalAlpha = 1;
  }

  _drawRipples(ctx, dt) {
    const arr = this.ripples;
    ctx.lineWidth = 1.2;
    for (let i = arr.length - 1; i >= 0; i--) {
      const r = arr[i];
      r.radius += dt * (r.speed || 78);
      r.alpha -= dt * 1.15;
      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
        continue;
      }
      ctx.strokeStyle = fastHexRgba(r.color, r.alpha);
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /**
   * Pre-renders each lyric word (active & past variants) onto a tight offscreen canvas ONCE.
   * Eliminates ~30 expensive CPU vector `strokeText`/`fillText` outline rasterizations every frame!
   */
  _getWordBitmap(text, isCurrent, baseSize) {
    if (typeof document === 'undefined') return null;
    const sig = `${this.theme.id}|${baseSize}|${this.settings.fontStyle}|${this.settings.fontFamily}|${this.effectiveScale}`;
    if (sig !== this.wordCacheSignature) {
      this.wordBitmapCache.clear();
      this.wordCacheSignature = sig;
    }

    const key = `${isCurrent ? 1 : 0}:${text}`;
    const hit = this.wordBitmapCache.get(key);
    if (hit) return hit;

    if (this.wordBitmapCache.size >= 140) {
      const oldestKey = this.wordBitmapCache.keys().next().value;
      this.wordBitmapCache.delete(oldestKey);
    }

    const fontSize = isCurrent ? baseSize : Math.round(baseSize * 0.82);
    const stylePrefix = this.settings.fontStyle === 'italic' ? 'italic ' : '';
    const fontSpec = `${stylePrefix}${isCurrent ? 600 : 400} ${fontSize}px ${this.settings.fontFamily}`;

    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    octx.font = fontSpec;
    const metrics = octx.measureText(text);
    const textW = Math.max(4, Math.ceil(metrics.width));
    const padX = 14;
    const padY = 12;
    const logicalW = textW + padX * 2;
    const logicalH = Math.ceil(fontSize * 1.45) + padY * 2;
    const scale = this.effectiveScale || 1;

    off.width = Math.max(1, Math.ceil(logicalW * scale));
    off.height = Math.max(1, Math.ceil(logicalH * scale));
    octx.setTransform(scale, 0, 0, scale, 0, 0);
    octx.font = fontSpec;
    octx.textAlign = 'left';
    octx.textBaseline = 'middle';
    octx.lineJoin = 'round';
    octx.miterLimit = 2;

    const cy = logicalH * 0.5;
    if (isCurrent) {
      octx.lineWidth = 7.4;
      octx.strokeStyle = this.theme.wordStroke;
      octx.strokeText(text, padX, cy);
    }
    octx.lineWidth = isCurrent ? 4.8 : 3.6;
    octx.strokeStyle = isCurrent ? 'rgba(0, 0, 0, 0.92)' : 'rgba(0, 0, 0, 0.78)';
    octx.strokeText(text, padX, cy);

    octx.fillStyle = isCurrent ? '#ffffff' : this.theme.wordPastFill;
    octx.fillText(text, padX, cy);

    const entry = {
      canvas: off,
      w: logicalW,
      h: logicalH,
      padX,
      textW,
      cy,
    };
    this.wordBitmapCache.set(key, entry);
    return entry;
  }

  _drawWordBubbles(ctx, dt, fadeIn, frameState = {}) {
    const baseSize = clamp(this.settings.wordFontSize || 20, 14, 28);
    const decaySec = clamp(this.settings.lyricDecaySec ?? 2.5, 0.5, 10.0);
    const effect = this.settings.wordEffect || 'rise';
    const pauseExpired = !frameState.isPlaying && this.pausedIdleSec >= decaySec;
    const inLerp = expSmoothing(dt, 14);
    const speedMult = 2.5 / decaySec;

    for (const [key, b] of this.wordBubbles.entries()) {
      b.age += dt;
      if (pauseExpired) {
        b.isCurrent = false;
        b.fastFade = true;
      }
      if (b.isCurrent) {
        b.alpha += (1 - b.alpha) * inLerp;
      } else {
        const decayRate = (b.fastFade ? 2.4 : 1.05) * speedMult;
        b.alpha *= Math.exp(-dt * decayRate);
      }

      if (b.alpha <= 0.015 && !b.isCurrent) {
        this.wordBubbles.delete(key);
        continue;
      }

      let offsetX = 0;
      let offsetY = 0;
      let scale = 1;

      if (effect === 'rise') {
        offsetY = (1 - easeOutCubic(Math.min(1, b.age * 4.5))) * 8;
      } else if (effect === 'drift') {
        const dx = b.dx || 0;
        const dy = b.dy || 0;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const outAmt = (1 - b.alpha) * 14 + (1 - easeOutCubic(Math.min(1, b.age * 4.2))) * -4;
        offsetX = (dx / dist) * outAmt;
        offsetY = (dy / dist) * outAmt;
      } else if (effect === 'pulse') {
        if (b.isCurrent && b.age < 0.2) {
          scale = 1 + Math.sin(b.age * 5.2 * Math.PI) * 0.16;
        }
      } else if (effect === 'glow') {
        offsetY = Math.sin(b.age * 2.4) * 1.6;
      }

      const finalAlpha = clamp(b.alpha * fadeIn, 0, 1);
      if (finalAlpha <= 0.005) continue;

      const bmp = this._getWordBitmap(b.text, b.isCurrent, baseSize);
      if (!bmp) continue;

      let anchorOffsetX = -bmp.padX;
      if (b.align === 'center') anchorOffsetX = -(bmp.padX + bmp.textW * 0.5);
      else if (b.align === 'right') anchorOffsetX = -(bmp.padX + bmp.textW);

      const drawX = b.x + offsetX;
      const drawY = b.y + offsetY;

      if (scale === 1) {
        ctx.globalAlpha = finalAlpha;
        ctx.drawImage(bmp.canvas, drawX + anchorOffsetX, drawY - bmp.cy, bmp.w, bmp.h);
        if (effect === 'glow' && b.isCurrent) {
          const shimmer = 0.12 + 0.14 * Math.sin(b.age * 5.0);
          if (shimmer > 0.02) {
            ctx.globalAlpha = finalAlpha * shimmer;
            ctx.drawImage(bmp.canvas, drawX + anchorOffsetX, drawY - bmp.cy, bmp.w, bmp.h);
          }
        }
      } else {
        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = finalAlpha;
        ctx.drawImage(bmp.canvas, anchorOffsetX, -bmp.cy, bmp.w, bmp.h);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }

  _drawMiniLabel(ctx, text, fontSize, weight, color, x, y, alpha, centered) {
    if (alpha <= 0.015 || typeof document === 'undefined') return;
    const sig = `${this.settings.fontFamily}|${this.effectiveScale}`;
    if (sig !== this.miniLabelSig) {
      this.miniLabelCache.clear();
      this.miniLabelSig = sig;
    }

    const key = `${fontSize}|${weight}|${color}|${text}`;
    let entry = this.miniLabelCache.get(key);
    if (!entry) {
      if (this.miniLabelCache.size >= 220) {
        const oldest = this.miniLabelCache.keys().next().value;
        this.miniLabelCache.delete(oldest);
      }
      const fontSpec = `${weight} ${fontSize}px ${this.settings.fontFamily}`;
      const off = document.createElement('canvas');
      const octx = off.getContext('2d');
      octx.font = fontSpec;
      const w = Math.max(4, Math.ceil(octx.measureText(text).width) + 6);
      const h = Math.ceil(fontSize * 1.5) + 4;
      const scale = this.effectiveScale || 1;
      off.width = Math.max(1, Math.ceil(w * scale));
      off.height = Math.max(1, Math.ceil(h * scale));
      octx.setTransform(scale, 0, 0, scale, 0, 0);
      octx.font = fontSpec;
      octx.textAlign = 'left';
      octx.textBaseline = 'alphabetic';
      octx.fillStyle = color;
      const baselineY = Math.ceil(fontSize * 1.15);
      octx.fillText(text, 3, baselineY);
      entry = { canvas: off, w, h, baselineY };
      this.miniLabelCache.set(key, entry);
    }

    ctx.globalAlpha = alpha > 1 ? 1 : alpha;
    const drawX = centered ? x - entry.w * 0.5 : x - 3;
    ctx.drawImage(entry.canvas, drawX, y - entry.baselineY, entry.w, entry.h);
    ctx.globalAlpha = 1;
  }

  _getTitleBitmap(hero) {
    if (typeof document === 'undefined') return null;
    const sig = `${this.theme.id}|${this.settings.fontFamily}|${this.effectiveScale}`;
    if (sig !== this.titleCacheFont) {
      this.titleBitmapCache.clear();
      this.titleCacheFont = sig;
    }
    const existing = this.titleBitmapCache.get(hero.name);
    if (existing) return existing;

    const label = `${hero.name.toUpperCase()}  ·  ${hero.title.toUpperCase()}`;
    const fontSpec = `500 11px ${this.settings.fontFamily}`;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    octx.font = fontSpec;
    const logicalW = Math.ceil(octx.measureText(label).width) + 16;
    const logicalH = 24;
    const scale = this.effectiveScale || 1;
    off.width = Math.max(1, Math.ceil(logicalW * scale));
    off.height = Math.max(1, Math.ceil(logicalH * scale));
    octx.setTransform(scale, 0, 0, scale, 0, 0);
    octx.font = fontSpec;
    octx.textAlign = 'center';
    octx.textBaseline = 'alphabetic';
    octx.fillStyle = this.theme.titleFill;
    octx.fillText(label, logicalW * 0.5, 16);

    const entry = { canvas: off, w: logicalW, h: logicalH };
    this.titleBitmapCache.set(hero.name, entry);
    return entry;
  }

  _drawConstellationTitle(ctx, hero, x, y, fadeIn, cy, minDim, bottomClearY) {
    const safeBottom = Number.isFinite(bottomClearY) ? bottomClearY : this.height - 62;
    let drawY = y;
    if (drawY > safeBottom) {
      const minBelowConst = cy + minDim * 0.21;
      if (safeBottom >= minBelowConst) {
        drawY = safeBottom;
      } else {
        drawY = Math.max(76, cy - minDim * 0.30 * clamp(this.currentZoom, 0.65, 1.15) - 24);
      }
    }

    const bmp = this._getTitleBitmap(hero);
    if (bmp) {
      ctx.globalAlpha = clamp(fadeIn, 0, 1);
      ctx.drawImage(bmp.canvas, x - bmp.w * 0.5, drawY - 16, bmp.w, bmp.h);
      ctx.globalAlpha = 1;
    }
  }

  _hexToRgba(hex, alpha) {
    return fastHexRgba(hex, alpha);
  }
}

export const __MATH_DEBUG__ = { rotateVecByQuat, quatSlerp, quatToMat3 };
