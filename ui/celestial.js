// Deep-sky Messier/NGC catalog, live Keplerian planetary ephemeris,
// real deep-space probes (Voyager 1 & 2, New Horizons, Pioneers, JWST),
// and smoothly orbiting LEO satellites (ISS, Hubble).

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const OBLIQUITY_RAD = 23.43928 * DEG2RAD;
const COS_OBLIQUITY = Math.cos(OBLIQUITY_RAD);
const SIN_OBLIQUITY = Math.sin(OBLIQUITY_RAD);

export function raDecToVec3(raHours, decDeg) {
  const ra = (raHours / 24) * Math.PI * 2;
  const dec = decDeg * DEG2RAD;
  const cosD = Math.cos(dec);
  return [cosD * Math.cos(ra), cosD * Math.sin(ra), Math.sin(dec)];
}

function normDeg(deg) {
  const r = deg % 360;
  return r < 0 ? r + 360 : r;
}

function wrapSignedDeg(deg) {
  let r = normDeg(deg);
  if (r > 180) r -= 360;
  return r;
}

function eclipticToRaDec(x, y, z) {
  const xq = x;
  const yq = y * COS_OBLIQUITY - z * SIN_OBLIQUITY;
  const zq = y * SIN_OBLIQUITY + z * COS_OBLIQUITY;
  const xy = Math.sqrt(xq * xq + yq * yq);
  const raDeg = normDeg(Math.atan2(yq, xq) * RAD2DEG);
  const decDeg = Math.atan2(zq, xy) * RAD2DEG;
  return {
    ra: raDeg / 15,
    dec: decDeg,
    dist: Math.sqrt(x * x + y * y + z * z),
  };
}

export const DEEP_SKY_OBJECTS = [
  {
    id: 'M31',
    name: 'Andromeda Galaxy',
    kind: 'Galaxy',
    constellation: 'Andromeda',
    ra: 0.712,
    dec: 41.27,
    mag: 3.4,
    size: 1.45,
    angularDeg: 3.2,
    angle: 0.62,
    color: '#ffe6c7',
    distance: '2.5M ly',
    note: 'Nearest major spiral galaxy to the Milky Way, home to roughly one trillion stars.',
  },
  {
    id: 'M42',
    name: 'Orion Nebula',
    kind: 'Nebula',
    constellation: 'Orion',
    ra: 5.588,
    dec: -5.39,
    mag: 4.0,
    size: 1.15,
    angularDeg: 1.1,
    angle: 0.2,
    color: '#d4b8ff',
    distance: '1,344 ly',
    note: 'A luminous stellar nursery visible to the unaided eye below Orion’s Belt.',
  },
  {
    id: 'M45',
    name: 'Pleiades',
    kind: 'Open Cluster',
    constellation: 'Taurus',
    ra: 3.783,
    dec: 24.12,
    mag: 1.6,
    size: 1.2,
    angularDeg: 1.8,
    angle: 0,
    color: '#b8dcff',
    distance: '444 ly',
    note: 'The Seven Sisters, young hot B-type stars wrapped in delicate blue reflection nebulosity.',
  },
  {
    id: 'M1',
    name: 'Crab Nebula',
    kind: 'Supernova Remnant',
    constellation: 'Taurus',
    ra: 5.575,
    dec: 22.01,
    mag: 8.4,
    size: 0.85,
    angularDeg: 0.1,
    angle: 0.4,
    color: '#9ee8ff',
    distance: '6,500 ly',
    note: 'Expanding wreckage of the bright supernova witnessed on Earth in 1054 AD, powered by a pulsar.',
  },
  {
    id: 'M57',
    name: 'Ring Nebula',
    kind: 'Planetary Nebula',
    constellation: 'Lyra',
    ra: 18.893,
    dec: 33.03,
    mag: 8.8,
    size: 0.78,
    angularDeg: 0.03,
    angle: 0.1,
    color: '#9cf5e0',
    distance: '2,567 ly',
    note: 'Glowing shell of ionized gas shed by a dying sun-like star in Lyra.',
  },
  {
    id: 'M13',
    name: 'Great Hercules Cluster',
    kind: 'Globular Cluster',
    constellation: 'Hercules',
    ra: 16.695,
    dec: 36.46,
    mag: 5.8,
    size: 0.95,
    angularDeg: 0.33,
    angle: 0,
    color: '#fff1d4',
    distance: '22,200 ly',
    note: 'Dense sphere of ~300,000 ancient stars and target of the 1974 Arecibo radio message.',
  },
  {
    id: 'M8',
    name: 'Lagoon Nebula',
    kind: 'Nebula',
    constellation: 'Sagittarius',
    ra: 18.06,
    dec: -24.38,
    mag: 6.0,
    size: 1.05,
    angularDeg: 1.0,
    angle: -0.3,
    color: '#ffbfd9',
    distance: '4,100 ly',
    note: 'Giant interstellar emission cloud nestled near the core direction of the Milky Way.',
  },
  {
    id: 'M20',
    name: 'Trifid Nebula',
    kind: 'Nebula',
    constellation: 'Sagittarius',
    ra: 18.043,
    dec: -23.03,
    mag: 6.3,
    size: 0.85,
    angularDeg: 0.47,
    angle: 0.5,
    color: '#cca8ff',
    distance: '4,100 ly',
    note: 'Combines red emission, blue reflection nebulae, and dark three-lobed dust lanes.',
  },
  {
    id: 'M51',
    name: 'Whirlpool Galaxy',
    kind: 'Galaxy',
    constellation: 'Canes Venatici',
    ra: 13.498,
    dec: 47.2,
    mag: 8.4,
    size: 0.95,
    angularDeg: 0.19,
    angle: 0.35,
    color: '#e5dcff',
    distance: '31M ly',
    note: 'Grand-design face-on spiral galaxy interacting gravitationally with companion NGC 5195.',
  },
  {
    id: 'M104',
    name: 'Sombrero Galaxy',
    kind: 'Galaxy',
    constellation: 'Virgo',
    ra: 12.666,
    dec: -11.62,
    mag: 8.0,
    size: 0.95,
    angularDeg: 0.15,
    angle: 0.12,
    color: '#ffe8bf',
    distance: '31M ly',
    note: 'Edge-on spiral famous for its bright central bulge and symmetric dark dust lane.',
  },
  {
    id: 'M27',
    name: 'Dumbbell Nebula',
    kind: 'Planetary Nebula',
    constellation: 'Vulpecula',
    ra: 19.993,
    dec: 22.72,
    mag: 7.5,
    size: 0.85,
    angularDeg: 0.13,
    angle: -0.45,
    color: '#9ee8ff',
    distance: '1,360 ly',
    note: 'First planetary nebula ever discovered, recorded by Charles Messier in 1764.',
  },
  {
    id: 'M44',
    name: 'Beehive Cluster',
    kind: 'Open Cluster',
    constellation: 'Cancer',
    ra: 8.673,
    dec: 19.67,
    mag: 3.7,
    size: 1.05,
    angularDeg: 1.6,
    angle: 0,
    color: '#dceaff',
    distance: '577 ly',
    note: 'Ancient Praesepe open cluster studied since antiquity as a weather omen.',
  },
  {
    id: 'M81',
    name: "Bode's Galaxy",
    kind: 'Galaxy',
    constellation: 'Ursa Major',
    ra: 9.926,
    dec: 69.07,
    mag: 6.9,
    size: 1.0,
    angularDeg: 0.45,
    angle: -0.5,
    color: '#ffebc9',
    distance: '11.8M ly',
    note: 'Bright northern spiral galaxy anchoring the M81 galaxy group.',
  },
  {
    id: 'M33',
    name: 'Triangulum Galaxy',
    kind: 'Galaxy',
    constellation: 'Triangulum',
    ra: 1.564,
    dec: 30.66,
    mag: 5.7,
    size: 1.1,
    angularDeg: 1.1,
    angle: 0.4,
    color: '#d8e7ff',
    distance: '2.7M ly',
    note: 'Third-largest member of our Local Group of galaxies after Andromeda and the Milky Way.',
  },
  {
    id: 'NGC 3372',
    name: 'Carina Nebula',
    kind: 'Nebula',
    constellation: 'Carina',
    ra: 10.751,
    dec: -59.87,
    mag: 1.0,
    size: 1.35,
    angularDeg: 2.0,
    angle: -0.25,
    color: '#ffbeab',
    distance: '8,500 ly',
    note: 'Vast southern star-forming complex cradling the luminous hypergiant Eta Carinae.',
  },
  {
    id: 'NGC 5139',
    name: 'Omega Centauri',
    kind: 'Globular Cluster',
    constellation: 'Centaurus',
    ra: 13.446,
    dec: -47.48,
    mag: 3.9,
    size: 1.15,
    angularDeg: 0.6,
    angle: 0,
    color: '#fff0d4',
    distance: '17,090 ly',
    note: 'Most massive globular cluster in the Milky Way halo, containing ~10 million stars.',
  },
  {
    id: 'NGC 7293',
    name: 'Helix Nebula',
    kind: 'Planetary Nebula',
    constellation: 'Aquarius',
    ra: 22.494,
    dec: -20.84,
    mag: 7.6,
    size: 0.9,
    angularDeg: 0.27,
    angle: 0.2,
    color: '#96e6ff',
    distance: '655 ly',
    note: 'One of the closest bright planetary nebulae to Earth, glowing like a vast celestial eye.',
  },
  {
    id: 'LMC',
    name: 'Large Magellanic Cloud',
    kind: 'Satellite Galaxy',
    constellation: 'Dorado',
    ra: 5.393,
    dec: -69.76,
    mag: 0.9,
    size: 1.55,
    angularDeg: 10.7,
    angle: 0.15,
    color: '#dbe8ff',
    distance: '163,000 ly',
    note: 'Prominent southern satellite galaxy of the Milky Way and host of the Tarantula Nebula.',
  },
  {
    id: 'SMC',
    name: 'Small Magellanic Cloud',
    kind: 'Satellite Galaxy',
    constellation: 'Tucana',
    ra: 0.878,
    dec: -72.8,
    mag: 2.7,
    size: 1.15,
    angularDeg: 5.3,
    angle: -0.35,
    color: '#d4e4ff',
    distance: '200,000 ly',
    note: 'Dwarf irregular companion galaxy rich in young star clusters and Cepheid variables.',
  },
  {
    id: 'NGC 2244',
    name: 'Rosette Nebula',
    kind: 'Nebula',
    constellation: 'Monoceros',
    ra: 6.532,
    dec: 4.95,
    mag: 4.8,
    size: 1.0,
    angularDeg: 1.3,
    angle: 0.1,
    color: '#ffb5cf',
    distance: '5,200 ly',
    note: 'Sculpted hollow emission nebula carved out by winds from hot central O-type stars.',
  },
];

export const DEEP_SPACE_PROBES = [
  {
    id: 'VGR-1',
    name: 'Voyager 1',
    kind: 'Interstellar Probe',
    constellation: 'Ophiuchus',
    ra: 17.24,
    dec: 12.4,
    color: '#7ef2ff',
    baseAu2025: 166.5,
    auPerYear: 3.57,
    launched: 'Sep 5, 1977',
    featured: true,
    note: 'Farthest human-made object in interstellar space, carrying the Golden Record.',
  },
  {
    id: 'VGR-2',
    name: 'Voyager 2',
    kind: 'Interstellar Probe',
    constellation: 'Pavo',
    ra: 20.1,
    dec: -58.7,
    color: '#7ef2ff',
    baseAu2025: 139.0,
    auPerYear: 3.24,
    launched: 'Aug 20, 1977',
    featured: true,
    note: 'Only spacecraft to visit all four giant planets: Jupiter, Saturn, Uranus, and Neptune.',
  },
  {
    id: 'NH',
    name: 'New Horizons',
    kind: 'Deep-Space Probe',
    constellation: 'Sagittarius',
    ra: 19.35,
    dec: -20.2,
    color: '#9fd6ff',
    baseAu2025: 61.2,
    auPerYear: 2.91,
    launched: 'Jan 19, 2006',
    featured: false,
    note: 'Explored the Pluto system and Arrokoth; now traversing the outer Kuiper Belt.',
  },
  {
    id: 'PIO-10',
    name: 'Pioneer 10',
    kind: 'Deep-Space Probe',
    constellation: 'Taurus',
    ra: 5.28,
    dec: 26.2,
    color: '#a7c6ff',
    baseAu2025: 137.5,
    auPerYear: 2.51,
    launched: 'Mar 3, 1972',
    featured: false,
    note: 'First spacecraft to cross the asteroid belt and fly past Jupiter; bound toward Aldebaran.',
  },
  {
    id: 'PIO-11',
    name: 'Pioneer 11',
    kind: 'Deep-Space Probe',
    constellation: 'Scutum',
    ra: 18.88,
    dec: -8.9,
    color: '#a7c6ff',
    baseAu2025: 115.6,
    auPerYear: 2.38,
    launched: 'Apr 6, 1973',
    featured: false,
    note: 'First spacecraft to encounter Saturn and discover its F ring.',
  },
];

// JPL Table 1 J2000.0 Keplerian orbital elements (1800 AD - 2050 AD)
const PLANET_ELEMENTS = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#d4dce8',
    baseMag: -0.4,
    radiusKm: 2440,
    a: 0.38709927,
    da: 0.00000037,
    e: 0.20563593,
    de: 0.00001906,
    i: 7.00497902,
    di: -0.00594749,
    L: 252.2503235,
    dL: 149472.67411175,
    wbar: 77.45779628,
    dwbar: 0.16047689,
    node: 48.33076593,
    dnode: -0.12534081,
    note: 'Swift innermost planet orbiting the Sun every 88 Earth days.',
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#fff6dc',
    baseMag: -4.1,
    radiusKm: 6052,
    a: 0.72333566,
    da: 0.0000039,
    e: 0.00677672,
    de: -0.00004107,
    i: 3.39467605,
    di: -0.0007889,
    L: 181.9790995,
    dL: 58517.81538729,
    wbar: 131.60246718,
    dwbar: 0.00268329,
    node: 76.67984255,
    dnode: -0.27769418,
    note: 'Shrouded in sulfuric cloud decks; the brightest planet in Earth’s night sky.',
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#ffb18a',
    baseMag: 0.2,
    radiusKm: 3390,
    a: 1.52371034,
    da: 0.00001847,
    e: 0.0933941,
    de: 0.00007882,
    i: 1.84969142,
    di: -0.00813131,
    L: -4.55343205,
    dL: 19140.30268499,
    wbar: -23.94362959,
    dwbar: 0.44441088,
    node: 49.55953891,
    dnode: -0.29257343,
    note: 'The iron-oxide Red Planet, orbited by two tiny captured moons.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#f5e2c4',
    baseMag: -2.3,
    radiusKm: 69911,
    a: 5.202887,
    da: -0.00011607,
    e: 0.04838624,
    de: -0.00013253,
    i: 1.30439695,
    di: -0.00183714,
    L: 34.39644051,
    dL: 3034.74612775,
    wbar: 14.72847983,
    dwbar: 0.21252668,
    node: 100.47390909,
    dnode: 0.20469106,
    note: 'Solar System’s largest gas giant, flanked by the four Galilean moons.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#f2dba8',
    baseMag: 0.4,
    radiusKm: 58232,
    hasRing: true,
    a: 9.53667594,
    da: -0.0012506,
    e: 0.05386179,
    de: -0.00050991,
    i: 2.48599187,
    di: 0.00193609,
    L: 49.95424423,
    dL: 1222.49362201,
    wbar: 92.59887831,
    dwbar: -0.41897216,
    node: 113.66242448,
    dnode: -0.28867794,
    note: 'Ringed gas giant whose icy rings span over 280,000 kilometers.',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#a9ecff',
    baseMag: 5.7,
    radiusKm: 25362,
    a: 19.18916464,
    da: -0.00196176,
    e: 0.04725744,
    de: -0.00004397,
    i: 0.77263783,
    di: -0.00242939,
    L: 313.23810451,
    dL: 428.48202785,
    wbar: 170.9542763,
    dwbar: 0.40805281,
    node: 74.01692503,
    dnode: 0.04240589,
    note: 'Ice giant tilted 98 degrees onto its side as it rolls around the Sun.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#7ea8ff',
    baseMag: 7.8,
    radiusKm: 24622,
    a: 30.06992276,
    da: 0.00026291,
    e: 0.00859048,
    de: 0.00005105,
    i: 1.77004347,
    di: 0.00035372,
    L: -55.12002969,
    dL: 218.45945325,
    wbar: 44.96476227,
    dwbar: -0.32241464,
    node: 131.78422574,
    dnode: -0.00508664,
    note: 'Outermost known major planet, swept by supersonic methane-tinted winds.',
  },
];

const EARTH_ELEMENTS = {
  a: 1.00000261,
  da: 0.00000562,
  e: 0.01671123,
  de: -0.00004392,
  i: -0.00001531,
  di: -0.01294668,
  L: 100.46457166,
  dL: 35999.37244981,
  wbar: 102.93768193,
  dwbar: 0.32327364,
  node: 0.0,
  dnode: 0.0,
};

function heliocentricEcliptic(el, T) {
  const a = el.a + el.da * T;
  const e = el.e + el.de * T;
  const inc = (el.i + el.di * T) * DEG2RAD;
  const L = el.L + el.dL * T;
  const wbar = el.wbar + el.dwbar * T;
  const node = (el.node + el.dnode * T) * DEG2RAD;
  const omega = (wbar - (el.node + el.dnode * T)) * DEG2RAD;

  const M = wrapSignedDeg(L - wbar) * DEG2RAD;
  let E = M + e * Math.sin(M);
  for (let k = 0; k < 6; k++) {
    const dM = M - (E - e * Math.sin(E));
    const dE = dM / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-8) break;
  }

  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(Math.max(0, 1 - e * e)) * Math.sin(E);

  const cosO = Math.cos(node);
  const sinO = Math.sin(node);
  const cosW = Math.cos(omega);
  const sinW = Math.sin(omega);
  const cosI = Math.cos(inc);
  const sinI = Math.sin(inc);

  const x =
    (cosW * cosO - sinW * sinO * cosI) * xp +
    (-sinW * cosO - cosW * sinO * cosI) * yp;
  const y =
    (cosW * sinO + sinW * cosO * cosI) * xp +
    (-sinW * sinO + cosW * cosO * cosI) * yp;
  const z = sinW * sinI * xp + cosW * sinI * yp;

  return { x, y, z, r: Math.hypot(x, y, z) };
}

function getMoonPhaseName(frac, waxing) {
  if (frac < 0.03) return 'New Moon';
  if (frac > 0.97) return 'Full Moon';
  if (Math.abs(frac - 0.5) < 0.06) return waxing ? 'First Quarter' : 'Last Quarter';
  if (frac < 0.5) return waxing ? 'Waxing Crescent' : 'Waning Crescent';
  return waxing ? 'Waxing Gibbous' : 'Waning Gibbous';
}

export function computeLiveSolarSystem(date = new Date()) {
  const j2000Ms = Date.UTC(2000, 0, 1, 12, 0, 0);
  const d = (date.getTime() - j2000Ms) / 86400000;
  const T = d / 36525;

  const earth = heliocentricEcliptic(EARTH_ELEMENTS, T);
  const sunEq = eclipticToRaDec(-earth.x, -earth.y, -earth.z);

  const bodies = [];

  // Moon (low-precision geocentric ecliptic model, accurate to ~1 deg)
  const L0 = normDeg(218.3164 + 13.17639648 * d);
  const Mm = normDeg(134.9634 + 13.06499295 * d) * DEG2RAD;
  const F = normDeg(93.2721 + 13.22935024 * d) * DEG2RAD;
  const D = normDeg(297.8502 + 12.19074912 * d) * DEG2RAD;
  const sunM = normDeg(357.5291 + 0.98560028 * d) * DEG2RAD;

  const moonLonDeg =
    L0 +
    6.2886 * Math.sin(Mm) +
    1.274 * Math.sin(2 * D - Mm) +
    0.6583 * Math.sin(2 * D) +
    0.2136 * Math.sin(2 * Mm) -
    0.1856 * Math.sin(sunM);
  const moonLatDeg = 5.1282 * Math.sin(F) + 0.2806 * Math.sin(Mm + F);
  const moonLon = moonLonDeg * DEG2RAD;
  const moonLat = moonLatDeg * DEG2RAD;
  const moonEq = eclipticToRaDec(
    Math.cos(moonLat) * Math.cos(moonLon),
    Math.cos(moonLat) * Math.sin(moonLon),
    Math.sin(moonLat)
  );
  const elongation = D + 0.1098 * Math.sin(Mm) - 0.0324 * Math.sin(sunM);
  const phaseFrac = 0.5 * (1 - Math.cos(elongation));
  const waxing = Math.sin(elongation) >= 0;
  const phaseName = getMoonPhaseName(phaseFrac, waxing);

  bodies.push({
    id: 'moon',
    name: 'Moon',
    kind: 'Lunar Body',
    ra: moonEq.ra,
    dec: moonEq.dec,
    dir: raDecToVec3(moonEq.ra, moonEq.dec),
    mag: -12.6 * phaseFrac - 1.5,
    color: '#f2f6ff',
    distanceAu: 0.00257,
    angularArcsec: 1865,
    phaseFrac,
    waxing,
    phaseName,
    note: `${phaseName} (${Math.round(phaseFrac * 100)}% illuminated) at 384,400 km from Earth.`,
  });

  for (const el of PLANET_ELEMENTS) {
    const p = heliocentricEcliptic(el, T);
    const gx = p.x - earth.x;
    const gy = p.y - earth.y;
    const gz = p.z - earth.z;
    const eq = eclipticToRaDec(gx, gy, gz);
    const mag = el.baseMag + Math.log10(Math.max(0.25, eq.dist)) * 1.4;
    const angularArcsec = ((2 * el.radiusKm) / (eq.dist * 149597870.7)) * 206264.806;

    bodies.push({
      id: el.id,
      name: el.name,
      kind: 'Planet',
      ra: eq.ra,
      dec: eq.dec,
      dir: raDecToVec3(eq.ra, eq.dec),
      mag,
      color: el.color,
      distanceAu: eq.dist,
      angularArcsec,
      hasRing: Boolean(el.hasRing),
      note: el.note,
    });
  }

  return {
    sun: { ra: sunEq.ra, dec: sunEq.dec },
    bodies,
  };
}

const PROBE_DIRS = DEEP_SPACE_PROBES.map((p) => raDecToVec3(p.ra, p.dec));

export function computeSpacecraft(date = new Date(), solarSystem = null) {
  const sys = solarSystem || computeLiveSolarSystem(date);
  const yearsSince2025 =
    (date.getTime() - Date.UTC(2025, 0, 1, 0, 0, 0)) / (365.25 * 86400000);

  const probes = DEEP_SPACE_PROBES.map((p, idx) => {
    const distanceAu = Math.max(1, p.baseAu2025 + p.auPerYear * yearsSince2025);
    const lightHours = (distanceAu * 499.005) / 3600;
    return {
      ...p,
      dir: PROBE_DIRS[idx],
      distanceAu,
      lightHours,
    };
  });

  // James Webb Space Telescope (JWST) stays near Earth-Sun L2 (~opposite the Sun)
  const jwstRa = (sys.sun.ra + 12) % 24;
  const jwstDec = -sys.sun.dec;
  probes.push({
    id: 'JWST',
    name: 'James Webb Space Telescope',
    kind: 'L2 Observatory',
    constellation: 'Anti-Solar L2 Point',
    ra: jwstRa,
    dec: jwstDec,
    dir: raDecToVec3(jwstRa, jwstDec),
    color: '#ffe29c',
    distanceAu: 0.01,
    lightHours: 0.0014,
    launched: 'Dec 25, 2021',
    featured: false,
    note: 'Infrared flagship stationed at the Sun-Earth L2 point ~1.5 million km beyond Earth.',
  });

  return probes;
}

const LEO_ORBITS = [
  {
    id: 'ISS',
    name: 'ISS (Zarya)',
    kind: 'LEO Station',
    inclinationDeg: 51.6,
    ascNodeDeg: 42,
    periodSec: 112,
    phaseOffset: 0.25,
    altitude: '420 km',
    speed: '7.66 km/s',
    color: '#ffffff',
    note: 'International Space Station gliding in low Earth orbit at 51.6° inclination.',
  },
  {
    id: 'HST',
    name: 'Hubble Space Telescope',
    kind: 'LEO Observatory',
    inclinationDeg: 28.5,
    ascNodeDeg: 188,
    periodSec: 146,
    phaseOffset: 2.1,
    altitude: '535 km',
    speed: '7.59 km/s',
    color: '#cfe4ff',
    note: 'Iconic orbital observatory imaging deep space since 1990.',
  },
];

// Precomputed orthonormal orbital basis + reusable zero-allocation state per LEO satellite
const LEO_FAST = LEO_ORBITS.map((orbit) => {
  const inc = orbit.inclinationDeg * DEG2RAD;
  const node = orbit.ascNodeDeg * DEG2RAD;
  const cosO = Math.cos(node);
  const sinO = Math.sin(node);
  const cosI = Math.cos(inc);
  const sinI = Math.sin(inc);
  const trailDirs = [];
  for (let k = 0; k < 6; k++) trailDirs.push([0, 0, 0]);
  return {
    omega: (Math.PI * 2) / orbit.periodSec,
    phaseOffset: orbit.phaseOffset,
    ux: cosO,
    uy: sinO,
    uz: 0,
    vx: -sinO * cosI,
    vy: cosO * cosI,
    vz: sinI,
    state: {
      ...orbit,
      dir: [0, 0, 0],
      trailDirs,
    },
  };
});

const LEO_RESULTS = LEO_FAST.map((f) => f.state);

export function computeOrbitingSatellites(nowSec) {
  for (let i = 0; i < LEO_FAST.length; i++) {
    const f = LEO_FAST[i];
    const theta = nowSec * f.omega + f.phaseOffset;
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    const d = f.state.dir;
    d[0] = f.ux * ct + f.vx * st;
    d[1] = f.uy * ct + f.vy * st;
    d[2] = f.vz * st;

    const trails = f.state.trailDirs;
    for (let k = 0; k < 6; k++) {
      const ang = theta - (k + 1) * 0.032;
      const ck = Math.cos(ang);
      const sk = Math.sin(ang);
      const td = trails[k];
      td[0] = f.ux * ck + f.vx * sk;
      td[1] = f.uy * ck + f.vy * sk;
      td[2] = f.vz * sk;
    }
  }
  return LEO_RESULTS;
}

const IAU_ABBR_GENITIVES = {
  And: 'Andromedae', Ant: 'Antliae', Aps: 'Apodis', Aqr: 'Aquarii', Aql: 'Aquilae',
  Ara: 'Arae', Ari: 'Arietis', Aur: 'Aurigae', Boo: 'Bootis', Cae: 'Caeli',
  Cam: 'Camelopardalis', Cnc: 'Cancri', CVn: 'Canum_Venaticorum', CMa: 'Canis_Majoris',
  CMi: 'Canis_Minoris', Cap: 'Capricorni', Car: 'Carinae', Cas: 'Cassiopeiae',
  Cen: 'Centauri', Cep: 'Cephei', Cet: 'Ceti', Cha: 'Chamaeleontis', Cir: 'Circini',
  Col: 'Columbae', Com: 'Comae_Berenices', CrA: 'Coronae_Australis', CrB: 'Coronae_Borealis',
  Crv: 'Corvi', Crt: 'Crateris', Cru: 'Crucis', Cyg: 'Cygni', Del: 'Delphini',
  Dor: 'Doradus', Dra: 'Draconis', Equ: 'Equulei', Eri: 'Eridani', For: 'Fornacis',
  Gem: 'Geminorum', Gru: 'Gruis', Her: 'Herculis', Hor: 'Horologii', Hya: 'Hydrae',
  Hyi: 'Hydri', Ind: 'Indi', Lac: 'Lacertae', Leo: 'Leonis', LMi: 'Leonis_Minoris',
  Lep: 'Leporis', Lib: 'Librae', Lup: 'Lupi', Lyn: 'Lyncis', Lyr: 'Lyrae',
  Men: 'Mensae', Mic: 'Microscopii', Mon: 'Monocerotis', Mus: 'Muscae', Nor: 'Normae',
  Oct: 'Octantis', Oph: 'Ophiuchi', Ori: 'Orionis', Pav: 'Pavonis', Peg: 'Pegasi',
  Per: 'Persei', Phe: 'Phoenicis', Pic: 'Pictoris', Psc: 'Piscium', PsA: 'Piscis_Austrini',
  Pup: 'Puppis', Pyx: 'Pyxidis', Ret: 'Reticuli', Sge: 'Sagittae', Sgr: 'Sagittarii',
  Sco: 'Scorpii', Scl: 'Sculptoris', Sct: 'Scuti', Ser: 'Serpentis', Sex: 'Sextantis',
  Tau: 'Tauri', Tel: 'Telescopii', Tri: 'Trianguli', TrA: 'Trianguli_Australis',
  Tuc: 'Tucanae', UMa: 'Ursae_Majoris', UMi: 'Ursae_Minoris', Vel: 'Velorum',
  Vir: 'Virginis', Vol: 'Volantis', Vul: 'Vulpeculae',
};

const STAR_WIKI_OVERRIDES = {
  'CYGNUS:Gienah': 'Epsilon_Cygni',
  'CORVUS:Gienah': 'Gamma_Corvi',
  'PHOENIX:Alpha/Zeta': 'Ankaa',
  'Asellus Bor': 'Gamma_Cancri',
  'Asellus Aus': 'Delta_Cancri',
  'Garnet Star': 'Mu_Cephei',
  'Rigil Kent': 'Alpha_Centauri',
  'The Persian': 'Alpha_Indi',
  Mimosa: 'Mimosa_(star)',
  Peacock: 'Peacock_(star)',
  Diadem: 'Alpha_Comae_Berenices',
  Chara: 'Beta_Canum_Venaticorum',
  Ran: 'Epsilon_Eridani',
  Anser: 'Alpha_Vulpeculae',
  Praecipua: '46_Leonis_Minoris',
  Ashlesha: 'Epsilon_Hydrae',
  Algedi: 'Alpha_Capricorni',
  Sarin: 'Delta_Herculis',
  Atik: 'Omicron_Persei',
  Matar: 'Eta_Pegasi',
  Ancha: 'Theta_Aquarii',
  Skat: 'Delta_Aquarii',
  Albali: 'Epsilon_Aquarii',
  Mahasim: 'Theta_Aurigae',
  Hassaleh: 'Iota_Aurigae',
  Almaaz: 'Epsilon_Aurigae',
  Kraz: 'Beta_Corvi',
  Minkar: 'Epsilon_Corvi',
  Alchiba: 'Alpha_Corvi',
  Alkes: 'Alpha_Crateris',
  Dalim: 'Alpha_Fornacis',
  Tiaki: 'Beta_Gruis',
  'Al Dhanab': 'Gamma_Gruis',
  Tureis: 'Rho_Puppis',
  Regor: 'Gamma_Velorum',
  Suhail: 'Lambda_Velorum',
  Alya: 'Theta_Serpentis',
  Mothallah: 'Alpha_Trianguli',
  Atria: 'Alpha_Trianguli_Australis',
  Ginan: 'Epsilon_Crucis',
  Imai: 'Delta_Crucis',
  Syrma: 'Iota_Virginis',
  Heze: 'Zeta_Virginis',
  Auva: 'Delta_Virginis',
  Tarf: 'Beta_Cancri',
  Brachium: 'Sigma_Librae',
  Yildun: 'Delta_Ursae_Minoris',
  'Deneb Okab': 'Zeta_Aquilae',
  'Deneb Dulfim': 'Epsilon_Delphini',
  Sadaltager: 'Zeta_Aquarii',
  'Fum al Samakah': 'Beta_Piscium',
};

const DSO_WIKI_OVERRIDES = {
  M13: 'Messier_13',
  M81: 'Messier_81',
};

const OBJECT_WIKI_OVERRIDES = {
  moon: 'Moon',
  mercury: 'Mercury_(planet)',
  venus: 'Venus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturn',
  uranus: 'Uranus',
  neptune: 'Neptune',
  'VGR-1': 'Voyager_1',
  'VGR-2': 'Voyager_2',
  NH: 'New_Horizons',
  'PIO-10': 'Pioneer_10',
  'PIO-11': 'Pioneer_11',
  JWST: 'James_Webb_Space_Telescope',
  ISS: 'International_Space_Station',
  HST: 'Hubble_Space_Telescope',
};

function toWikiTitleCase(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join('_');
}

export function resolveConstellationWikiUrl(constellationName) {
  const clean = String(constellationName || '').trim();
  if (!clean) return 'https://en.wikipedia.org/wiki/IAU_designated_constellations';
  const slug = toWikiTitleCase(clean);
  // Multi-word IAU constellations have unambiguous primary titles; single-word ones use _(constellation)
  const fullSlug = clean.includes(' ') ? slug : `${slug}_(constellation)`;
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(fullSlug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}

export function resolveStarWikiUrl(starName, constellationName) {
  const sName = String(starName || '').trim();
  if (!sName) {
    return resolveConstellationWikiUrl(constellationName);
  }
  const cKey = `${String(constellationName || '').trim().toUpperCase()}:${sName}`;
  const override = STAR_WIKI_OVERRIDES[cKey] || STAR_WIKI_OVERRIDES[sName];
  if (override) {
    return `https://en.wikipedia.org/wiki/${override}`;
  }

  // Expand Bayer / Flamsteed / variable designations like "Gamma Cas", "41 Ari", "CS Cam", "Gamma2 Nor"
  const bayerMatch = /^([A-Za-z0-9]+)\s+([A-Z][a-zA-Z]{2})$/.exec(sName);
  if (bayerMatch && IAU_ABBR_GENITIVES[bayerMatch[2]]) {
    const slug = `${bayerMatch[1]}_${IAU_ABBR_GENITIVES[bayerMatch[2]]}`;
    return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`;
  }

  const slug = sName.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}

export function resolveDeepSkyWikiUrl(dso) {
  if (!dso) return 'https://en.wikipedia.org/wiki/Messier_object';
  const override = DSO_WIKI_OVERRIDES[dso.id];
  const slug = override || String(dso.name || dso.id).trim().replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`;
}

export function resolveObjectWikiUrl(idOrName) {
  const key = String(idOrName || '').trim();
  const slug = OBJECT_WIKI_OVERRIDES[key] || key.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}
