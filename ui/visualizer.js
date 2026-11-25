import { CONSTELLATIONS } from './constellations.js';
import {
  DEEP_SKY_OBJECTS,
  computeLiveSolarSystem,
  computeOrbitingSatellites,
  computeSpacecraft,
  raDecToVec3,
} from './celestial.js';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t) {
  const x = clamp(t, 0, 1);
  return 1 - (1 - x) * (1 - x) * (1 - x);
}

function easeInOutQuart(t) {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function expSmoothing(dt, rate) {
  return 1 - Math.exp(-dt * rate);
}

function normalize3(x, y, z) {
  const len = Math.hypot(x, y, z) || 1;
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
  const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
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

function quatFromAxisAngle(axis, angle) {
  const half = angle * 0.5;
  const s = Math.sin(half);
  return [axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(half)];
}

/**
 * Builds a camera quaternion that maps world basis `(U, V, C)` -> screen `(X, Y, Z)`.
 * Matrix rows are U, V, C (transpose of world-from-cam columns [U, V, C]).
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
  const [vx, vy, vz] = v;
  const [qx, qy, qz, qw] = q;
  const tx = 2 * (qy * vz - qz * vy);
  const ty = 2 * (qz * vx - qx * vz);
  const tz = 2 * (qx * vy - qy * vx);
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ];
}

const CONSTELLATION_ANGULAR_RADIUS = 0.29; // ~16.6 deg half-width on the real celestial sphere

export class StarVisualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;

    this.settings = {
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
    this.currentZoom = 1.0;
    this.pausedIdleSec = 0;
    this.lastDomeRadius = 400;
    this.isDragging = false;
    this.dragVelocity = { x: 0, y: 0 };

    // Precompute permanent 3D sky placements for all 88 constellations and deep-sky objects
    this.skyConstellations = this._buildSkyConstellations();
    this.skyDeepSky = DEEP_SKY_OBJECTS.map((obj) => ({
      ...obj,
      dir: raDecToVec3(obj.ra, obj.dec),
    }));
    this.starSprites = this._buildStarSprites();

    // Cached real-time planetary & spacecraft ephemeris (refreshed every 30s)
    const nowDate = new Date();
    this.solarSystem = computeLiveSolarSystem(nowDate);
    this.spacecraft = computeSpacecraft(nowDate, this.solarSystem);
    this.lastEphemerisAt = typeof performance !== 'undefined' ? performance.now() / 1000 : 0;

    // Persistent 3D background stars + subtle Milky Way galactic band
    this.bgStars = this._createSphereStars(420, 180);

    this.shootingStars = [];
    this.nextShootingStarAt = 3.5;
    this.lastBeatShootingStarAt = 0;
    this.audioEnergy = { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0 };

    this.heroIndex = 0;
    this.qCamera = [...this.skyConstellations[0].qTarget];
    this.transition = null;
    this.transitionStep = 0;

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

    // Hover Star Inspector hit targets (populated each frame)
    this.hitTargets = [];
    this.hoveredTarget = null;

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
      // Right-handed sky tangent basis: U = West (C × pole), V = South (C × U) => U × V = +C
      const U = normalize3(...cross3(C, pole));
      const V = normalize3(...cross3(C, U));
      const qTarget = quatFromWorldToScreenRows(U, V, C);

      const starDirs = c.stars.map((s) => {
        const px = C[0] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[0] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[0];
        const py = C[1] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[1] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[1];
        const pz = C[2] + s.x * CONSTELLATION_ANGULAR_RADIUS * U[2] + s.y * CONSTELLATION_ANGULAR_RADIUS * V[2];
        return normalize3(px, py, pz);
      });

      return {
        constellation: c,
        centerDir: C,
        uDir: U,
        vDir: V,
        qTarget,
        starDirs,
      };
    });
  }

  _buildStarSprites() {
    if (typeof document === 'undefined') return new Map();
    const colors = ['#ffffff', '#cfe4ff', '#b9d4ff', '#edf4ff', '#fff3d6', '#ffd6a3', '#ffb98a'];
    const map = new Map();
    const size = 128;
    const half = size / 2;

    for (const hex of colors) {
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;
      const octx = off.getContext('2d');
      const grad = octx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.12, this._hexToRgba(hex, 0.92));
      grad.addColorStop(0.32, this._hexToRgba(hex, 0.38));
      grad.addColorStop(0.65, this._hexToRgba(hex, 0.08));
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      octx.fillStyle = grad;
      octx.fillRect(0, 0, size, size);
      map.set(hex, off);
    }
    return map;
  }

  _createSphereStars(fieldCount, milkyWayCount) {
    const stars = [];
    const tints = ['#ffffff', '#cfe4ff', '#fff3d6', '#b9d4ff', '#ffd6a3'];

    // Uniform celestial sphere field
    for (let i = 0; i < fieldCount; i++) {
      const z = Math.random() * 2 - 1;
      const phi = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.max(0, 1 - z * z));
      const brightness = Math.pow(Math.random(), 2.4);
      stars.push({
        dir: [r * Math.cos(phi), r * Math.sin(phi), z],
        size: 0.45 + brightness * 1.45,
        alpha: 0.16 + brightness * 0.66,
        phase: Math.random() * Math.PI * 2,
        speed: 0.75 + Math.random() * 2.0,
        color: tints[i % tints.length],
      });
    }

    // Subtle Milky Way galactic band (tilted ~62.6 deg from celestial equator, passing through Cygnus/Sagittarius/Carina/Orion)
    const galPole = normalize3(0.45, -0.78, 0.43);
    const galU = normalize3(...cross3([0, 0, 1], galPole));
    const galV = normalize3(...cross3(galPole, galU));

    for (let i = 0; i < milkyWayCount; i++) {
      const lon = Math.random() * Math.PI * 2;
      // Gaussian-like concentration near galactic plane
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
      stars.push({
        dir,
        size: 0.4 + brightness * 1.0,
        alpha: 0.10 + brightness * 0.34,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.5,
        color: i % 3 === 0 ? '#fff3d6' : '#cfe4ff',
      });
    }

    return stars;
  }

  applySettings(next) {
    this.settings = { ...this.settings, ...next };
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  /**
   * Picks the nearest unvisited constellation on the 3D hemisphere within a scenic angular sweep.
   */
  getNextTourConstellation(currentIndex, visitedSet) {
    const cur = this.skyConstellations[currentIndex];
    if (!cur) return (currentIndex + 1) % CONSTELLATIONS.length;

    let bestIdx = -1;
    let bestScore = Infinity;

    for (let i = 0; i < this.skyConstellations.length; i++) {
      if (i === currentIndex || visitedSet.has(i)) continue;
      const ang = Math.acos(clamp(dot3(cur.centerDir, this.skyConstellations[i].centerDir), -1, 1));
      // Prefer nearby-to-mid neighbors (~25 deg to ~95 deg) for natural hemisphere pans
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

  /**
   * Immediately snaps the camera to a constellation (used on initial track load).
   */
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

  /**
   * Smoothly slews the 3D celestial hemisphere camera to center `index`, placing 2–3 bridge stars
   * along the spherical great-circle arc between the two real constellation coordinates.
   */
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

    // Perpendicular tangent axis for gentle natural arc scatter
    let arcPerp = cross3(exitDir, entryDir);
    if (Math.hypot(...arcPerp) < 1e-4) {
      arcPerp = fromSky.uDir;
    } else {
      arcPerp = normalize3(...arcPerp);
    }

    // Dynamically decide whether to use intermediary bridge stars based on spherical distance
    const sepRad = Math.acos(clamp(dot3(fromSky.centerDir, toSky.centerDir), -1, 1));
    let bridgeCount = 0;
    if (sepRad >= 2.05) bridgeCount = 4;
    else if (sepRad >= 1.35) bridgeCount = 3;
    else if (sepRad >= 0.90) bridgeCount = 2;
    else if (sepRad >= 0.55) bridgeCount = 1;

    const tints = ['#cfe4ff', '#fff3d6', '#b9d4ff'];
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
      });
    }

    // Scale transition duration gracefully with angular distance on the sky
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
    let bestIdx = 0;
    let bestZ = -Infinity;
    for (let i = 0; i < this.skyConstellations.length; i++) {
      const [, , z] = rotateVecByQuat(this.skyConstellations[i].centerDir, this.qCamera);
      if (z > bestZ) {
        bestZ = z;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  /**
   * Projects a unit 3D camera-space vector `(vx, vy, vz)` onto the curved sky dome.
   */
  _projectDomePoint(vx, vy, vz, cx, cy, domeRadius) {
    const denom = 1 + Math.max(-0.22, 1 - vz) * 0.28;
    return {
      sx: cx + (vx / denom) * domeRadius,
      sy: cy + (vy / denom) * domeRadius,
      z: vz,
    };
  }

  _projectSkyConstellation(sky, qCam, cx, cy, domeRadius) {
    const pts = [];
    for (let i = 0; i < sky.starDirs.length; i++) {
      const s = sky.constellation.stars[i];
      const [vx, vy, vz] = rotateVecByQuat(sky.starDirs[i], qCam);
      const proj = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      pts.push({
        ...s,
        sx: proj.sx,
        sy: proj.sy,
        z: proj.z,
      });
    }
    return pts;
  }

  _drawStarSprite(ctx, x, y, radius, color, alpha) {
    if (alpha <= 0.005 || radius <= 0.2) return;
    const sprite = this.starSprites.get(color) || this.starSprites.get('#ffffff');
    if (!sprite) return;
    const d = radius * 2;
    ctx.globalAlpha = clamp(alpha, 0, 1);
    ctx.drawImage(sprite, x - radius, y - radius, d, d);
    ctx.globalAlpha = 1;
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
    if (fx <= 0.05) return;
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
    const nowMs = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (nowMs - this.lastFrameTime) / 1000));
    this.lastFrameTime = nowMs;
    const nowSec = nowMs / 1000;

    if (frameState.isPlaying) {
      this.pausedIdleSec = 0;
    } else {
      this.pausedIdleSec += dt;
    }

    // Reset hit targets each frame for Hover Star Inspector
    this.hitTargets.length = 0;

    // Refresh real-time planetary & spacecraft ephemeris every 30s
    if (nowSec - this.lastEphemerisAt >= 30) {
      this.lastEphemerisAt = nowSec;
      const nowDate = new Date();
      this.solarSystem = computeLiveSolarSystem(nowDate);
      this.spacecraft = computeSpacecraft(nowDate, this.solarSystem);
    }

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.48;
    const minDim = Math.min(w, h);
    const targetZoom = clamp(this.settings.zoom ?? 1.0, 0.45, 2.4);
    this.currentZoom += (targetZoom - this.currentZoom) * expSmoothing(dt, 10);
    // Match domeRadius to CONSTELLATION_ANGULAR_RADIUS so active constellation fits comfortably
    const domeRadius = ((minDim * 0.30) / CONSTELLATION_ANGULAR_RADIUS) * this.currentZoom;
    this.lastDomeRadius = domeRadius;

    // 1. Pitch-black sky
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);

    // Smooth WASAPI / Wallpaper Engine audio energy envelope
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

    // Gentle celestial breathing motion around zenith (paused while actively dragging)
    const breathAmt = this.isDragging ? 0 : (frameState.isPlaying ? 0.018 : 0.007);
    const qBreathZ = quatFromAxisAngle([0, 0, 1], Math.sin(nowSec * 0.21) * breathAmt);
    const qBreathX = quatFromAxisAngle([1, 0, 0], Math.cos(nowSec * 0.16) * (breathAmt * 0.6));
    const qRender = quatMul(quatMul(qBreathZ, qBreathX), this.qCamera);

    // 3. Draw 3D hemisphere starfield + Milky Way band using fast offscreen sprites
    this._drawSphereBackgroundStars(ctx, nowSec, cx, cy, domeRadius, qRender);

    // 3b. Deep-sky objects (Messier / NGC nebulae, galaxies, clusters) beneath constellation lines
    if (this.settings.showDeepSky) {
      this._drawDeepSkyObjects(ctx, qRender, cx, cy, domeRadius, nowSec);
    }

    // 4. Shooting stars
    if (nowSec >= this.nextShootingStarAt) {
      this._spawnShootingStar(nowSec);
    }
    this._drawShootingStars(ctx, dt);

    // 5. Draw ALL other constellations at their real astronomical positions on the visible hemisphere
    const activeIdx = this.transition ? this.transition.toIndex : this.heroIndex;
    const outgoingIdx = this.transition ? this.transition.fromIndex : -1;

    const nameThreshold = this.settings.freeExplore ? 0.28 : (this.currentZoom < 0.85 ? 0.32 : 0.45);
    for (let i = 0; i < this.skyConstellations.length; i++) {
      if (i === activeIdx || i === outgoingIdx) continue;
      const sky = this.skyConstellations[i];
      const [, , cz] = rotateVecByQuat(sky.centerDir, qRender);
      if (cz <= -0.14) continue;

      const proj = this._projectSkyConstellation(sky, qRender, cx, cy, domeRadius);
      const limbFade = clamp((cz + 0.12) * 1.45, 0, 1);
      this._drawAmbientSkyConstellation(ctx, sky.constellation, proj, limbFade, nowSec, cz > nameThreshold);
    }

    // 5b. Live Solar System bodies (Moon phase + planets) and spacecraft / orbiting satellites
    if (this.settings.showDeepSky) {
      this._drawSolarSystem(ctx, qRender, cx, cy, domeRadius);
    }
    if (this.settings.showSatellites) {
      this._drawSpacecraftAndSatellites(ctx, qRender, cx, cy, domeRadius, nowSec);
    }

    // 6. Active & transitioning hero constellations + bridge stars
    if (this.transition) {
      const fromSky = this.skyConstellations[this.transition.fromIndex];
      const toSky = this.skyConstellations[this.transition.toIndex];
      const outProj = this._projectSkyConstellation(fromSky, qRender, cx, cy, domeRadius);
      const inProj = this._projectSkyConstellation(toSky, qRender, cx, cy, domeRadius);

      const [, , outZ] = rotateVecByQuat(fromSky.centerDir, qRender);
      const [, , inZ] = rotateVecByQuat(toSky.centerDir, qRender);

      const outAlpha = clamp((1 - this.transition.progress * 0.92) * clamp((outZ + 0.1) * 1.5, 0, 1), 0, 1);
      const inAlpha = clamp(easeOutCubic(this.transition.progress) * clamp((inZ + 0.15) * 1.5, 0, 1), 0, 1);

      if (outAlpha > 0.02) {
        this._drawAmbientSkyConstellation(ctx, fromSky.constellation, outProj, outAlpha * 1.35, nowSec, false);
      }

      const bridgeProj = this._projectBridgeStars(this.transition, qRender, cx, cy, domeRadius);
      this._updateTransitionIgnition(dt, nowSec, outProj, bridgeProj, toSky.constellation, inProj, cx, cy, frameState);
      this._drawBridgeConstellation(ctx, this.transition, outProj, bridgeProj, inProj, outAlpha, inAlpha, nowSec);
      this._drawHeroConstellation(ctx, toSky.constellation, inProj, Math.max(inAlpha, 0.25), nowSec, frameState);
      this._drawComets(ctx, dt);
      this._drawEmbers(ctx, dt);
      this._drawRipples(ctx, dt);
      this._drawWordBubbles(ctx, dt, Math.max(inAlpha, 0.88), frameState);

      if (this.showLabels && inAlpha > 0.28) {
        const labelY = cy + minDim * 0.30 * clamp(this.currentZoom, 0.65, 1.28) + 36;
        this._drawConstellationTitle(ctx, toSky.constellation, cx, labelY, inAlpha);
      }
    } else {
      const heroSky = this.skyConstellations[this.heroIndex];
      const [, , heroZ] = rotateVecByQuat(heroSky.centerDir, qRender);
      const projected = this._projectSkyConstellation(heroSky, qRender, cx, cy, domeRadius);

      this._updateLyricIgnition(dt, nowSec, heroSky.constellation, projected, cx, cy, frameState);
      if (heroZ > -0.14) {
        const heroLimb = clamp((heroZ + 0.12) * 1.45, 0, 1);
        this._drawHeroConstellation(ctx, heroSky.constellation, projected, heroLimb, nowSec, frameState);
      }
      this._drawComets(ctx, dt);
      this._drawEmbers(ctx, dt);
      this._drawRipples(ctx, dt);
      this._drawWordBubbles(ctx, dt, heroZ > 0.05 ? 1 : 0, frameState);

      if (this.showLabels) {
        const titleConst = this.settings.freeExplore
          ? this.skyConstellations[this.getNearestConstellationIndex()].constellation
          : heroSky.constellation;
        if (this.settings.freeExplore || heroZ > 0.25) {
          const labelY = cy + minDim * 0.30 * clamp(this.currentZoom, 0.65, 1.28) + 36;
          this._drawConstellationTitle(ctx, titleConst, cx, labelY, 1);
        }
      }
    }

    // 7. Subtle Hover Star Inspector reticle
    if (this.settings.hoverInspector && this.hoveredTarget) {
      this._drawHoverReticle(ctx, this.hoveredTarget, nowSec);
    }
  }

  _drawSphereBackgroundStars(ctx, nowSec, cx, cy, domeRadius, qRender) {
    const bright = this.settings.starBrightness;
    const trebleBoost = 1 + clamp(this.audioEnergy.treble * 0.45, 0, 0.7);
    const bassBoost = 1 + clamp(this.audioEnergy.bass * 0.18, 0, 0.35);
    for (const s of this.bgStars) {
      const [vx, vy, vz] = rotateVecByQuat(s.dir, qRender);
      if (vz <= 0.02) continue;

      const proj = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      if (proj.sx < -12 || proj.sx > this.width + 12 || proj.sy < -12 || proj.sy > this.height + 12) {
        continue;
      }

      const limbFade = clamp((vz - 0.02) * 2.8, 0, 1);
      const twinkle = 0.58 + 0.42 * Math.sin(nowSec * s.speed + s.phase);
      const alpha = clamp(s.alpha * twinkle * limbFade * (0.55 + bright * 0.42) * trebleBoost, 0, 1);
      const r = s.size * (0.85 + bright * 0.15) * bassBoost;

      if (r > 1.15) {
        this._drawStarSprite(ctx, proj.sx, proj.sy, r * 3.2, s.color, alpha * 0.55);
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  _drawShootingStars(ctx, dt) {
    const fx = this.settings.effectsIntensity;
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const st = this.shootingStars[i];
      st.life += dt;
      if (st.life >= st.maxLife) {
        this.shootingStars.splice(i, 1);
        continue;
      }
      st.x += st.vx * dt;
      st.y += st.vy * dt;
      const p = st.life / st.maxLife;
      const alpha = Math.sin(p * Math.PI) * 0.72 * clamp(fx, 0.25, 1.4);
      const mag = Math.hypot(st.vx, st.vy) || 1;
      const tailX = st.x - (st.vx / mag) * st.length;
      const tailY = st.y - (st.vy / mag) * st.length;

      const grad = ctx.createLinearGradient(tailX, tailY, st.x, st.y);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(1, `rgba(225,240,255,${clamp(alpha, 0, 1).toFixed(3)})`);

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

  _drawAmbientSkyConstellation(ctx, constellation, proj, limbFade, nowSec, showSubtleName) {
    const bright = this.settings.starBrightness;
    const lineMult = this.settings.lineOpacity;

    ctx.save();
    ctx.strokeStyle = `rgba(160, 196, 248, ${(0.09 * limbFade * lineMult).toFixed(3)})`;
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    for (const [a, b] of constellation.edges) {
      if (proj[a].z <= -0.15 && proj[b].z <= -0.15) continue;
      ctx.moveTo(proj[a].sx, proj[a].sy);
      ctx.lineTo(proj[b].sx, proj[b].sy);
    }
    ctx.stroke();

    let sumX = 0;
    let sumY = 0;
    let visibleCount = 0;

    for (let i = 0; i < proj.length; i++) {
      const s = proj[i];
      if (s.z <= 0.01) continue;
      const starLimb = clamp((s.z - 0.01) * 2.5, 0, 1) * limbFade;
      const twinkle = 0.76 + 0.24 * Math.sin(nowSec * 1.4 + i * 1.7);
      const r = this._computeStarRadius(s.mag, false, bright);
      const alpha = clamp(0.36 * twinkle * starLimb * (0.6 + bright * 0.36), 0, 0.92);

      this._drawStarSprite(ctx, s.sx, s.sy, r * 3.4, s.color, alpha * 0.45);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.sx, s.sy, r, 0, Math.PI * 2);
      ctx.fill();

      if (s.z > 0.08 && (s.name || s.mag < 2.2) && s.sx > -20 && s.sx < this.width + 20 && s.sy > -20 && s.sy < this.height + 20) {
        this.hitTargets.push({
          x: s.sx,
          y: s.sy,
          hitRadius: 12,
          priority: s.name ? 1.5 : 0.8,
          kind: constellation.name,
          name: s.name || `${constellation.name} Star`,
          meta: `Mag ${s.mag.toFixed(1)} · ${constellation.title}`,
          note: constellation.fact,
          color: s.color || '#cfe4ff',
        });
      }

      sumX += s.sx;
      sumY += s.sy;
      visibleCount += 1;
    }

    if (this.showLabels && showSubtleName && visibleCount > 0) {
      const avgX = sumX / visibleCount;
      const avgY = sumY / visibleCount;
      if (avgX > 80 && avgX < this.width - 80 && avgY > 60 && avgY < this.height - 60) {
        ctx.globalAlpha = clamp(0.14 * limbFade, 0, 0.22);
        ctx.font = `500 9px ${this.settings.fontFamily}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '2.5px';
        ctx.fillStyle = '#9dbce8';
        ctx.textAlign = 'center';
        ctx.fillText(constellation.name, avgX, avgY + 24);
      }
    }

    ctx.restore();
  }

  _drawDeepSkyObjects(ctx, qRender, cx, cy, domeRadius, nowSec) {
    const bright = clamp(this.settings.starBrightness, 0.4, 2.0);
    const zoomBoost = clamp(this.currentZoom, 0.65, 2.0);

    for (let i = 0; i < this.skyDeepSky.length; i++) {
      const obj = this.skyDeepSky[i];
      const [vx, vy, vz] = rotateVecByQuat(obj.dir, qRender);
      if (vz <= 0.04) continue;

      const { sx, sy } = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      if (sx < -40 || sx > this.width + 40 || sy < -40 || sy > this.height + 40) continue;

      const limbFade = clamp((vz - 0.04) * 2.2, 0, 1);
      const pulse = 0.92 + 0.08 * Math.sin(nowSec * 0.9 + i * 1.4);
      let radius;
      if (this.settings.proportionalSizes) {
        const truePx = domeRadius * (((obj.angularDeg || 0.5) * Math.PI) / 180) * 0.5;
        radius = clamp(Math.pow(Math.max(0.5, truePx), 0.78) * 1.45, 5.5, Math.min(this.width, this.height) * 0.24);
      } else {
        radius = obj.size * 15 * zoomBoost * (0.85 + bright * 0.15);
      }

      ctx.save();
      ctx.translate(sx, sy);

      if (obj.kind === 'Galaxy' || obj.kind === 'Satellite Galaxy') {
        ctx.save();
        ctx.rotate(obj.angle || 0.4);
        ctx.scale(1.45, 0.62);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        grad.addColorStop(0, this._hexToRgba('#ffffff', 0.34 * limbFade * pulse));
        grad.addColorStop(0.28, this._hexToRgba(obj.color, 0.20 * limbFade * pulse));
        grad.addColorStop(0.65, this._hexToRgba(obj.color, 0.06 * limbFade));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (obj.kind === 'Nebula' || obj.kind === 'Supernova Remnant' || obj.kind === 'Planetary Nebula') {
        const grad = ctx.createRadialGradient(0, 0, radius * 0.12, 0, 0, radius * 1.15);
        const isRing = obj.kind === 'Planetary Nebula';
        grad.addColorStop(0, this._hexToRgba(obj.color, (isRing ? 0.08 : 0.25) * limbFade * pulse));
        grad.addColorStop(0.45, this._hexToRgba(obj.color, 0.18 * limbFade * pulse));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
        ctx.fill();

        if (isRing) {
          ctx.strokeStyle = this._hexToRgba(obj.color, 0.32 * limbFade);
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(0, 0, radius * 0.46, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        // Open or Globular Cluster: delicate dashed reticle + tiny cluster specks
        const cr = radius * 0.65;
        ctx.strokeStyle = this._hexToRgba(obj.color, 0.24 * limbFade);
        ctx.setLineDash([2, 3]);
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(0, 0, cr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = obj.color;
        for (let k = 0; k < 6; k++) {
          const ang = k * 1.05 + i;
          const dist = cr * (0.22 + (k % 3) * 0.22);
          ctx.globalAlpha = 0.48 * limbFade * pulse;
          ctx.beginPath();
          ctx.arc(Math.cos(ang) * dist, Math.sin(ang) * dist, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (this.showLabels && (vz > 0.60 || this.currentZoom > 1.25)) {
        ctx.font = `500 8.5px ${this.settings.fontFamily}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '1.4px';
        ctx.fillStyle = this._hexToRgba(obj.color, 0.36 * limbFade);
        ctx.textAlign = 'center';
        ctx.fillText(obj.id, 0, radius * 0.72 + 12);
      }

      ctx.restore();

      this.hitTargets.push({
        x: sx,
        y: sy,
        hitRadius: Math.max(15, radius * 0.65),
        priority: 2.4,
        kind: obj.kind,
        name: `${obj.id} · ${obj.name}`,
        meta: `Mag ${obj.mag.toFixed(1)} · ${obj.distance} · ${obj.constellation}`,
        note: obj.note,
        color: obj.color,
      });
    }
  }

  _drawSolarSystem(ctx, qRender, cx, cy, domeRadius) {
    if (!this.solarSystem?.bodies) return;
    const bright = clamp(this.settings.starBrightness, 0.4, 2.0);

    for (const body of this.solarSystem.bodies) {
      const [vx, vy, vz] = rotateVecByQuat(body.dir, qRender);
      if (vz <= 0.02) continue;

      const { sx, sy } = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      if (sx < -30 || sx > this.width + 30 || sy < -30 || sy > this.height + 30) continue;

      const limbFade = clamp((vz - 0.02) * 2.4, 0, 1);

      ctx.save();
      ctx.translate(sx, sy);

      if (body.id === 'moon') {
        const moonR = this.settings.proportionalSizes
          ? clamp(domeRadius * ((0.518 * Math.PI) / 180) * 0.65, 7.5, 22)
          : 7.4 * clamp(this.currentZoom, 0.8, 1.35);
        // Subtle lunar aura
        const grad = ctx.createRadialGradient(0, 0, moonR * 0.6, 0, 0, moonR * 3.8);
        grad.addColorStop(0, `rgba(235, 244, 255, ${(0.28 * limbFade).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, moonR * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // Dark limb circle
        ctx.fillStyle = `rgba(18, 22, 30, ${(0.92 * limbFade).toFixed(3)})`;
        ctx.strokeStyle = `rgba(215, 232, 255, ${(0.42 * limbFade).toFixed(3)})`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.arc(0, 0, moonR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Lit phase crescent/gibbous approximation via clipped ellipse + semicircle
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, moonR, 0, Math.PI * 2);
        ctx.clip();
        const litDir = body.waxing ? 1 : -1;
        const p = clamp(body.phaseFrac ?? 0.5, 0.02, 0.99);
        ctx.fillStyle = `rgba(242, 246, 255, ${(0.95 * limbFade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(0, 0, moonR, -Math.PI / 2, Math.PI / 2, litDir < 0);
        const rx = moonR * Math.abs(1 - 2 * p);
        ctx.ellipse(0, 0, rx, moonR, 0, Math.PI / 2, -Math.PI / 2, p > 0.5 ? litDir < 0 : litDir > 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        const r = this.settings.proportionalSizes
          ? clamp(1.35 + Math.sqrt(Math.max(1, body.angularArcsec || 5)) * 0.68, 1.8, 6.2) * (0.8 + bright * 0.2)
          : clamp(3.3 - body.mag * 0.24, 2.2, 4.8) * (0.78 + bright * 0.22);
        this._drawStarSprite(ctx, 0, 0, r * 3.8, body.color, 0.52 * limbFade);

        if (body.hasRing) {
          ctx.save();
          ctx.rotate(-0.34);
          ctx.strokeStyle = this._hexToRgba(body.color, 0.72 * limbFade);
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 2.45, r * 0.78, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.globalAlpha = 0.95 * limbFade;
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (this.showLabels && vz > 0.16) {
        ctx.font = `500 9px ${this.settings.fontFamily}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '1.8px';
        ctx.fillStyle = this._hexToRgba(body.color, 0.62 * limbFade);
        ctx.textAlign = 'center';
        const labelOffset = body.id === 'moon' ? 18 : 14;
        ctx.fillText(body.name.toUpperCase(), 0, labelOffset);
      }

      ctx.restore();

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
      });
    }
  }

  _drawSpacecraftAndSatellites(ctx, qRender, cx, cy, domeRadius, nowSec) {
    // Deep-space probes (Voyager 1 & 2, New Horizons, Pioneer 10 & 11, JWST)
    if (this.spacecraft) {
      for (let i = 0; i < this.spacecraft.length; i++) {
        const probe = this.spacecraft[i];
        const [vx, vy, vz] = rotateVecByQuat(probe.dir, qRender);
        if (vz <= 0.02) continue;

        const { sx, sy } = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
        if (sx < -30 || sx > this.width + 30 || sy < -30 || sy > this.height + 30) continue;

        const limbFade = clamp((vz - 0.02) * 2.4, 0, 1);
        const pingPhase = (nowSec * (probe.featured ? 0.55 : 0.35) + i * 0.4) % 1;
        const pingR = (probe.featured ? 5 : 4) + pingPhase * (probe.featured ? 15 : 10);
        const pingAlpha = (1 - pingPhase) * (probe.featured ? 0.55 : 0.32) * limbFade;

        ctx.save();
        ctx.translate(sx, sy);

        // Telemetry ping ring
        ctx.strokeStyle = this._hexToRgba(probe.color, pingAlpha);
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.arc(0, 0, pingR, 0, Math.PI * 2);
        ctx.stroke();

        // Spacecraft diamond reticle
        const d = this.settings.proportionalSizes
          ? (probe.featured ? 3.2 : 2.5)
          : (probe.featured ? 4.4 : 3.4);
        ctx.strokeStyle = this._hexToRgba(probe.color, 0.92 * limbFade);
        ctx.fillStyle = this._hexToRgba(probe.color, 0.22 * limbFade);
        ctx.lineWidth = probe.featured ? 1.35 : 1.05;
        ctx.beginPath();
        ctx.moveTo(0, -d);
        ctx.lineTo(d, 0);
        ctx.lineTo(0, d);
        ctx.lineTo(-d, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crisp center beacon
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95 * limbFade;
        ctx.beginPath();
        ctx.arc(0, 0, this.settings.proportionalSizes ? 1.0 : 1.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (this.showLabels && (probe.featured || vz > 0.25)) {
          ctx.font = `600 9px ${this.settings.fontFamily}`;
          if ('letterSpacing' in ctx) ctx.letterSpacing = '1.6px';
          ctx.fillStyle = this._hexToRgba(probe.color, (probe.featured ? 0.85 : 0.58) * limbFade);
          ctx.textAlign = 'left';
          const tag = probe.featured
            ? `${probe.name.toUpperCase()} · ${probe.distanceAu.toFixed(0)} AU`
            : probe.id;
          ctx.fillText(tag, d + 7, 3);
        }

        ctx.restore();

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
        });
      }
    }

    // Smoothly orbiting LEO satellites (ISS, Hubble)
    const sats = computeOrbitingSatellites(nowSec);
    for (const sat of sats) {
      const [vx, vy, vz] = rotateVecByQuat(sat.dir, qRender);
      if (vz <= 0.04) continue;

      const { sx, sy } = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      if (sx < -30 || sx > this.width + 30 || sy < -30 || sy > this.height + 30) continue;

      const limbFade = clamp((vz - 0.04) * 2.5, 0, 1);

      // Trailing orbital arc
      ctx.save();
      for (let k = 0; k < sat.trailDirs.length; k++) {
        const [tx, ty, tz] = rotateVecByQuat(sat.trailDirs[k], qRender);
        if (tz <= 0.02) continue;
        const tp = this._projectDomePoint(tx, ty, tz, cx, cy, domeRadius);
        const tAlpha = (1 - k / sat.trailDirs.length) * 0.42 * limbFade;
        ctx.fillStyle = this._hexToRgba(sat.color, tAlpha);
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Satellite glint & crossbars
      this._drawStarSprite(ctx, sx, sy, 10, sat.color, 0.72 * limbFade);
      ctx.strokeStyle = this._hexToRgba(sat.color, 0.85 * limbFade);
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
        ctx.font = `600 8.5px ${this.settings.fontFamily}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '1.5px';
        ctx.fillStyle = this._hexToRgba(sat.color, 0.74 * limbFade);
        ctx.textAlign = 'left';
        ctx.fillText(sat.id, sx + 8, sy + 3);
      }
      ctx.restore();

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
      });
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
      const dist = Math.hypot(t.x - x, t.y - y);
      if (dist <= t.hitRadius) {
        const score = dist - (t.priority || 1) * 3.5;
        if (score < bestScore) {
          bestScore = score;
          best = t;
        }
      }
    }
    this.hoveredTarget = best;
    return best;
  }

  _drawHoverReticle(ctx, target, nowSec) {
    const r = 12 + Math.sin(nowSec * 3.5) * 1.2;
    const arm = 4.5;
    const color = target.color || '#cfe4ff';

    ctx.save();
    ctx.strokeStyle = this._hexToRgba(color, 0.85);
    ctx.lineWidth = 1.25;
    const x = target.x;
    const y = target.y;

    ctx.beginPath();
    // Top-left bracket
    ctx.moveTo(x - r, y - r + arm);
    ctx.lineTo(x - r, y - r);
    ctx.lineTo(x - r + arm, y - r);
    // Top-right bracket
    ctx.moveTo(x + r - arm, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y - r + arm);
    // Bottom-right bracket
    ctx.moveTo(x + r, y + r - arm);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x + r - arm, y + r);
    // Bottom-left bracket
    ctx.moveTo(x - r + arm, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.lineTo(x - r, y + r - arm);
    ctx.stroke();
    ctx.restore();
  }

  _projectBridgeStars(transition, qRender, cx, cy, domeRadius) {
    return transition.bridgeStars.map((bs) => {
      const [vx, vy, vz] = rotateVecByQuat(bs.dir, qRender);
      const proj = this._projectDomePoint(vx, vy, vz, cx, cy, domeRadius);
      return {
        ...bs,
        sx: proj.sx,
        sy: proj.sy,
        z: proj.z,
      };
    });
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
      if (lineKey && isPlaying && Math.random() < 0.38) {
        this._spawnShootingStar(nowSec);
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

    const chain = [
      { pt: outProj[tr.fromExitStarIdx], glow: outAlpha * 0.45, alpha: outAlpha },
      ...bridgeProj.map((pt, i) => ({
        pt,
        glow: tr.bridgeGlow[i] || 0,
        alpha: clamp((pt.z - 0.02) * 2.4, 0, 1),
      })),
      { pt: inProj[tr.toEntryStarIdx], glow: (this.starGlow[tr.toEntryStarIdx] || 0) + inAlpha * 0.35, alpha: inAlpha },
    ];

    ctx.save();
    for (let i = 0; i < chain.length - 1; i++) {
      const a = chain[i];
      const b = chain[i + 1];
      if (!a.pt || !b.pt) continue;
      const segAlpha = clamp(Math.min(Math.max(a.alpha, 0.2), Math.max(b.alpha, 0.2)) * lineMult, 0, 1);
      const segGlow = Math.max(a.glow, b.glow);

      ctx.save();
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = `rgba(180, 214, 255, ${(0.24 * segAlpha + segGlow * 0.48).toFixed(3)})`;
      ctx.lineWidth = 1.0 + segGlow * 1.4;
      if (segGlow > 0.08) {
        ctx.shadowColor = 'rgba(185, 224, 255, 0.85)';
        ctx.shadowBlur = 9 * segGlow;
      }
      ctx.beginPath();
      ctx.moveTo(a.pt.sx, a.pt.sy);
      ctx.lineTo(b.pt.sx, b.pt.sy);
      ctx.stroke();
      ctx.restore();
    }

    for (let i = 0; i < bridgeProj.length; i++) {
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
      ctx.strokeStyle = `rgba(255, 255, 255, ${clamp(0.86 * spikeStrength, 0, 0.95).toFixed(3)})`;
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
    ctx.restore();
  }

  _emitIgnitionEffects(star, prevPt) {
    const fx = this.settings.effectsIntensity;
    if (fx > 0.05) {
      this.ripples.push({
        x: star.sx,
        y: star.sy,
        radius: 4,
        maxRadius: 48 * (0.7 + fx * 0.35),
        alpha: 0.82 * Math.min(1.2, fx),
        speed: 82,
        color: star.color,
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
    this._spawnEmberBurst(star.sx, star.sy, star.color);
    if (fx > 0.05 && prevPt) {
      this.comets.push({
        x1: prevPt.sx,
        y1: prevPt.sy,
        x2: star.sx,
        y2: star.sy,
        t: 0,
        duration: 0.28,
        color: star.color,
      });
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
      // Instrumental Solo Mode: cascade beat/bass/mid pulses through constellation stars
      this.isInstrumentalActive = true;
      const seq = hero.sequence && hero.sequence.length ? hero.sequence : hero.stars.map((_, idx) => idx);
      const energy = Math.max(this.audioEnergy.beat, this.audioEnergy.bass * 0.85, this.audioEnergy.mid * 0.75);
      const elapsedSincePulse = nowSec - this.lastInstrumentalPulseSec;

      if ((energy > 0.34 && elapsedSincePulse > 0.38) || elapsedSincePulse > 1.35) {
        this.lastInstrumentalPulseSec = nowSec;
        this.instrumentalStep = (this.instrumentalStep + 1) % seq.length;
        const starIdx = seq[this.instrumentalStep];
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
    const len = Math.hypot(vx, vy);
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
      const tx = star.sx + dx;
      const ty = star.sy + dy;
      if (Math.hypot(tx - existing.x, ty - existing.y) < 46) {
        dy += vy >= 0 ? 28 : -28;
      }
    }

    const align = dx > 10 ? 'left' : dx < -10 ? 'right' : 'center';
    return { dx, dy, align, starIdx };
  }

  _drawHeroConstellation(ctx, hero, proj, fadeIn, nowSec, frameState) {
    const bright = this.settings.starBrightness;
    const fx = this.settings.effectsIntensity;
    const lineMult = this.settings.lineOpacity;
    const bass = clamp(this.audioEnergy.bass, 0, 1.4);
    const mid = clamp(this.audioEnergy.mid, 0, 1.4);
    const beat = clamp(this.audioEnergy.beat, 0, 1.2);

    ctx.save();

    for (const [a, b] of hero.edges) {
      const sa = proj[a];
      const sb = proj[b];
      if (sa.z <= -0.15 && sb.z <= -0.15) continue;
      const edgeGlow =
        Math.max(this.starGlow[a], this.starGlow[b]) * 0.72 +
        Math.min(this.starGlow[a], this.starGlow[b]) * 0.28 +
        mid * 0.22;

      ctx.strokeStyle = `rgba(170, 206, 255, ${(clamp(0.18 + mid * 0.12, 0.1, 0.5) * fadeIn * lineMult).toFixed(3)})`;
      ctx.lineWidth = 1.1 + mid * 0.45;
      ctx.beginPath();
      ctx.moveTo(sa.sx, sa.sy);
      ctx.lineTo(sb.sx, sb.sy);
      ctx.stroke();

      if (edgeGlow > 0.03) {
        const grad = ctx.createLinearGradient(sa.sx, sa.sy, sb.sx, sb.sy);
        const aAlpha = clamp((0.18 + this.starGlow[a] * 0.75 + mid * 0.16) * fadeIn * lineMult, 0, 0.98);
        const bAlpha = clamp((0.18 + this.starGlow[b] * 0.75 + mid * 0.16) * fadeIn * lineMult, 0, 0.98);
        grad.addColorStop(0, `rgba(225, 242, 255, ${aAlpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(225, 242, 255, ${bAlpha.toFixed(3)})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.45 + edgeGlow * (1.7 + fx * 0.6);
        ctx.shadowColor = 'rgba(185, 224, 255, 0.9)';
        ctx.shadowBlur = 11 * edgeGlow * Math.max(0.3, fx);
        ctx.beginPath();
        ctx.moveTo(sa.sx, sa.sy);
        ctx.lineTo(sb.sx, sb.sy);
        ctx.stroke();
        ctx.restore();
      }
    }

    const activeStarIdx =
      frameState.hasSyncedLyrics && frameState.activeWordIndex >= 0
        ? hero.sequence[frameState.activeWordIndex % hero.sequence.length]
        : -1;

    for (let i = 0; i < proj.length; i++) {
      const s = proj[i];
      if (s.z <= 0.01) continue;
      const starLimb = clamp((s.z - 0.01) * 2.5, 0, 1);
      const glow = clamp((this.starGlow[i] || 0) + bass * 0.22 + beat * 0.12, 0, 1.35);
      const isActiveStar = i === activeStarIdx;
      const twinkle = 0.85 + 0.15 * Math.sin(nowSec * 2.6 + i * 1.9);
      const baseR = this._computeStarRadius(s.mag, true, bright) * (1 + bass * 0.24);
      const starR = baseR * (1 + glow * (0.95 + fx * 0.25)) * fadeIn * starLimb;

      const haloR = starR * (4.4 + glow * (6.2 + fx * 2.5) + beat * 1.8);
      const bloomAlpha = clamp((0.26 + glow * 0.72) * fadeIn * twinkle * (0.65 + bright * 0.35), 0, 0.98);
      this._drawStarSprite(ctx, s.sx, s.sy, haloR, s.color, bloomAlpha);

      if (glow > 0.1 || s.mag < 1.4) {
        const spikeStrength = Math.max(glow, s.mag < 1.4 ? 0.38 : 0) * fadeIn * clamp(0.45 + fx * 0.65, 0.25, 1.5);
        const spikeLen = starR * (3.8 + glow * (5.6 + fx * 1.8));
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${clamp(0.88 * spikeStrength, 0, 0.95).toFixed(3)})`;
        ctx.lineWidth = isActiveStar ? 1.6 : 1.0;
        ctx.beginPath();
        ctx.moveTo(s.sx - spikeLen, s.sy);
        ctx.lineTo(s.sx + spikeLen, s.sy);
        ctx.moveTo(s.sx, s.sy - spikeLen);
        ctx.lineTo(s.sx, s.sy + spikeLen);
        ctx.stroke();

        if (glow > 0.45 && fx > 0.25) {
          const diagLen = spikeLen * 0.56;
          ctx.strokeStyle = this._hexToRgba(s.color, clamp(0.55 * glow * fx * fadeIn, 0, 0.78));
          ctx.lineWidth = 0.95;
          ctx.beginPath();
          ctx.moveTo(s.sx - diagLen, s.sy - diagLen);
          ctx.lineTo(s.sx + diagLen, s.sy + diagLen);
          ctx.moveTo(s.sx - diagLen, s.sy + diagLen);
          ctx.lineTo(s.sx + diagLen, s.sy - diagLen);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.globalAlpha = clamp((0.66 + glow * 0.34) * fadeIn * twinkle * (0.7 + bright * 0.3), 0, 1);
      ctx.fillStyle = glow > 0.32 ? '#ffffff' : s.color;
      ctx.beginPath();
      ctx.arc(s.sx, s.sy, starR, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (this.showLabels && s.name && isActiveStar && glow > 0.55) {
        ctx.save();
        ctx.font = `500 10px ${this.settings.fontFamily}`;
        if ('letterSpacing' in ctx) ctx.letterSpacing = '1.6px';
        ctx.fillStyle = `rgba(180, 210, 255, ${(0.48 * glow * fadeIn).toFixed(3)})`;
        ctx.textAlign = 'center';
        ctx.fillText(s.name.toUpperCase(), s.sx, s.sy + starR + 15);
        ctx.restore();
      }

      if (s.z > 0.05 && s.sx > -20 && s.sx < this.width + 20 && s.sy > -20 && s.sy < this.height + 20) {
        this.hitTargets.push({
          x: s.sx,
          y: s.sy,
          hitRadius: 15,
          priority: s.name ? 3.2 : 2.2,
          kind: hero.name,
          name: s.name || `${hero.name} Star #${i + 1}`,
          meta: `Mag ${s.mag.toFixed(1)} · ${hero.title}`,
          note: hero.fact,
          color: s.color || '#cfe4ff',
        });
      }
    }

    ctx.restore();
  }

  _drawComets(ctx, dt) {
    for (let i = this.comets.length - 1; i >= 0; i--) {
      const c = this.comets[i];
      c.t += dt / c.duration;
      if (c.t >= 1) {
        this.comets.splice(i, 1);
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
      grad.addColorStop(1, this._hexToRgba(c.color, alpha));

      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(205, 232, 255, 0.9)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 2.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  _drawEmbers(ctx, dt) {
    const damp = Math.exp(-dt * 2.5);
    for (let i = this.embers.length - 1; i >= 0; i--) {
      const e = this.embers[i];
      e.life += dt;
      if (e.life >= e.maxLife) {
        this.embers.splice(i, 1);
        continue;
      }
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.vx *= damp;
      e.vy *= damp;
      const alpha = (1 - e.life / e.maxLife) * 0.85;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  _drawRipples(ctx, dt) {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += dt * (r.speed || 78);
      r.alpha -= dt * 1.15;
      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.strokeStyle = this._hexToRgba(r.color, r.alpha);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  _drawWordBubbles(ctx, dt, fadeIn, frameState = {}) {
    const baseSize = clamp(this.settings.wordFontSize || 20, 14, 28);
    const decaySec = clamp(this.settings.lyricDecaySec ?? 2.5, 0.5, 10.0);
    const effect = this.settings.wordEffect || 'rise';
    const pauseExpired = !frameState.isPlaying && this.pausedIdleSec >= decaySec;
    const inLerp = expSmoothing(dt, 14);
    for (const [key, b] of this.wordBubbles.entries()) {
      b.age += dt;
      if (pauseExpired) {
        b.isCurrent = false;
        b.fastFade = true;
      }
      if (b.isCurrent) {
        b.alpha += (1 - b.alpha) * inLerp;
      } else {
        const speedMult = 2.5 / decaySec;
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
      let glowBoost = 1;

      if (effect === 'rise') {
        offsetY = (1 - easeOutCubic(Math.min(1, b.age * 4.5))) * 8;
      } else if (effect === 'drift') {
        const dist = Math.hypot(b.dx || 0, b.dy || 0) || 1;
        const outAmt = (1 - b.alpha) * 14 + (1 - easeOutCubic(Math.min(1, b.age * 4.2))) * -4;
        offsetX = ((b.dx || 0) / dist) * outAmt;
        offsetY = ((b.dy || 0) / dist) * outAmt;
      } else if (effect === 'pulse') {
        const pop = Math.sin(Math.min(1, b.age * 5.2) * Math.PI);
        scale = 1 + (b.isCurrent ? pop * 0.16 : 0);
      } else if (effect === 'glow') {
        offsetY = Math.sin(b.age * 2.4) * 1.6;
        glowBoost = b.isCurrent ? 1.25 + 0.35 * Math.sin(b.age * 5.0) : 1.1;
      }

      const finalAlpha = clamp(b.alpha * fadeIn, 0, 1);
      const fontSize = b.isCurrent ? baseSize : Math.round(baseSize * 0.82);
      const stylePrefix = this.settings.fontStyle === 'italic' ? 'italic ' : '';

      ctx.save();
      ctx.translate(b.x + offsetX, b.y + offsetY);
      if (scale !== 1) ctx.scale(scale, scale);

      ctx.textAlign = b.align;
      ctx.textBaseline = 'middle';
      ctx.font = `${stylePrefix}${b.isCurrent ? 600 : 400} ${fontSize}px ${this.settings.fontFamily}`;

      // Contrast halo so lyrics stay sharp right next to bright stars and nebula/line glow
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.lineWidth = b.isCurrent ? 5.2 : 3.8;
      ctx.strokeStyle = `rgba(0, 0, 0, ${(finalAlpha * (b.isCurrent ? 0.92 : 0.78)).toFixed(3)})`;
      ctx.shadowColor = `rgba(0, 0, 0, ${(finalAlpha * 0.95).toFixed(3)})`;
      ctx.shadowBlur = b.isCurrent ? 10 : 6;
      ctx.strokeText(b.text, 0, 0);

      if (b.isCurrent) {
        ctx.shadowColor = `rgba(175, 218, 255, ${(0.95 * finalAlpha).toFixed(3)})`;
        ctx.shadowBlur = 14 * glowBoost;
        ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha.toFixed(3)})`;
      } else {
        ctx.shadowColor = `rgba(140, 188, 255, ${(0.55 * finalAlpha).toFixed(3)})`;
        ctx.shadowBlur = 7 * glowBoost;
        ctx.fillStyle = `rgba(214, 232, 255, ${(finalAlpha * 0.74).toFixed(3)})`;
      }

      ctx.fillText(b.text, 0, 0);
      ctx.restore();
    }
  }

  _drawConstellationTitle(ctx, hero, x, y, fadeIn) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = `500 11px ${this.settings.fontFamily}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    ctx.fillStyle = `rgba(175, 202, 240, ${(0.36 * fadeIn).toFixed(3)})`;
    ctx.fillText(`${hero.name}  ·  ${hero.title.toUpperCase()}`, x, Math.min(this.height - 62, y));
    ctx.restore();
  }

  _hexToRgba(hex, alpha) {
    const clean = hex.replace('#', '');
    const n = parseInt(clean, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1).toFixed(3)})`;
  }
}

export const __MATH_DEBUG__ = { rotateVecByQuat, quatSlerp };
