// 88 official IAU constellations with real sky RA/Dec, normalized coordinates [-1, 1],
// visual magnitudes, spectral tints, named stars, stick-figure edges, traversal sequences, and facts.
export const CONSTELLATIONS = [
  {
    name: 'ORION',
    ra: 5.5,
    dec: 2,
    title: 'The Hunter',
    fact: 'Orion straddles the celestial equator, making it visible worldwide. Its bright red supergiant Betelgeuse and blue supergiant Rigel flank the iconic three-star Belt.',
    stars: [
      { x: -0.34, y: -0.46, mag: 0.45, color: '#ffb98a', name: 'Betelgeuse' }, // 0 left shoulder
      { x: 0.30, y: -0.42, mag: 1.64, color: '#cfe4ff', name: 'Bellatrix' },   // 1 right shoulder
      { x: -0.02, y: -0.66, mag: 3.39, color: '#cfe4ff', name: 'Meissa' },     // 2 head
      { x: -0.15, y: 0.02, mag: 1.77, color: '#b9d4ff', name: 'Alnitak' },     // 3 belt left
      { x: 0.00, y: -0.02, mag: 1.69, color: '#b9d4ff', name: 'Alnilam' },     // 4 belt mid
      { x: 0.15, y: -0.06, mag: 2.23, color: '#b9d4ff', name: 'Mintaka' },     // 5 belt right
      { x: -0.28, y: 0.54, mag: 2.09, color: '#cfe4ff', name: 'Saiph' },       // 6 left foot
      { x: 0.36, y: 0.50, mag: 0.13, color: '#b9d4ff', name: 'Rigel' },        // 7 right foot
      { x: -0.58, y: -0.78, mag: 4.10, color: '#fff3d6' },                      // 8 club tip
      { x: -0.52, y: -0.56, mag: 4.30, color: '#fff3d6' },                      // 9 club elbow
      { x: 0.56, y: -0.58, mag: 3.19, color: '#fff3d6' },                      // 10 shield top
      { x: 0.58, y: -0.26, mag: 3.69, color: '#fff3d6' },                      // 11 shield bottom
    ],
    edges: [
      [0, 2], [2, 1], [0, 1],
      [0, 3], [1, 5], [3, 4], [4, 5],
      [3, 6], [5, 7], [6, 7],
      [0, 9], [9, 8],
      [1, 10], [10, 11],
    ],
    sequence: [0, 2, 1, 5, 4, 3, 6, 7, 11, 10, 9, 8],
  },
  {
    name: 'URSA MAJOR',
    ra: 11.3,
    dec: 55,
    title: 'The Great Bear',
    fact: 'Its seven brightest stars form the Big Dipper asterism. Extending a line through Merak and Dubhe — the two outer bowl stars — points directly to Polaris, the North Star.',
    stars: [
      { x: -0.82, y: -0.22, mag: 1.86, color: '#b9d4ff', name: 'Alkaid' },     // 0 handle tip
      { x: -0.52, y: -0.34, mag: 2.23, color: '#edf4ff', name: 'Mizar' },      // 1 handle mid
      { x: -0.24, y: -0.26, mag: 1.77, color: '#edf4ff', name: 'Alioth' },     // 2 handle base
      { x: 0.04, y: -0.14, mag: 3.31, color: '#edf4ff', name: 'Megrez' },      // 3 bowl join
      { x: 0.12, y: 0.22, mag: 2.44, color: '#edf4ff', name: 'Phecda' },       // 4 bowl bottom left
      { x: 0.56, y: 0.16, mag: 2.37, color: '#edf4ff', name: 'Merak' },        // 5 bowl bottom right
      { x: 0.62, y: -0.24, mag: 1.79, color: '#ffd6a3', name: 'Dubhe' },       // 6 pointer top
      { x: 0.88, y: -0.10, mag: 3.36, color: '#fff3d6', name: 'Muscida' },     // 7 nose
      { x: 0.42, y: 0.52, mag: 3.06, color: '#fff3d6' },                       // 8 front paw
      { x: -0.04, y: 0.58, mag: 3.45, color: '#fff3d6' },                      // 9 hind paw
    ],
    edges: [
      [0, 1], [1, 2], [2, 3],
      [3, 4], [4, 5], [5, 6], [6, 3],
      [6, 7], [5, 8], [4, 9],
    ],
    sequence: [0, 1, 2, 3, 6, 5, 4, 9, 8, 7],
  },
  {
    name: 'CASSIOPEIA',
    ra: 1.0,
    dec: 62,
    title: 'The Queen',
    fact: 'Cassiopeia is instantly recognizable by its sharp "W" (or "M") shape in the northern sky, lying directly across the Milky Way opposite the Big Dipper.',
    stars: [
      { x: -0.78, y: -0.18, mag: 2.27, color: '#fff3d6', name: 'Caph' },       // 0
      { x: -0.36, y: 0.28, mag: 2.23, color: '#ffd6a3', name: 'Schedar' },     // 1
      { x: 0.02, y: -0.12, mag: 2.47, color: '#b9d4ff', name: 'Gamma Cas' },   // 2
      { x: 0.40, y: 0.26, mag: 2.68, color: '#edf4ff', name: 'Ruchbah' },     // 3
      { x: 0.78, y: -0.26, mag: 3.37, color: '#b9d4ff', name: 'Segin' },       // 4
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4],
    ],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'CYGNUS',
    ra: 20.6,
    dec: 42,
    title: 'The Swan',
    fact: 'Known as the Northern Cross, Cygnus glides straight along the summer Milky Way. Its tail star Deneb is one of the most luminous stars known, shining over 100,000 times brighter than our Sun.',
    stars: [
      { x: 0.00, y: -0.78, mag: 1.25, color: '#edf4ff', name: 'Deneb' },      // 0 tail
      { x: 0.00, y: -0.14, mag: 2.23, color: '#fff3d6', name: 'Sadr' },       // 1 heart
      { x: 0.00, y: 0.78, mag: 3.08, color: '#ffd6a3', name: 'Albireo' },     // 2 beak
      { x: -0.44, y: -0.06, mag: 2.87, color: '#b9d4ff', name: 'Delta Cyg' }, // 3 left inner wing
      { x: -0.82, y: 0.14, mag: 3.74, color: '#edf4ff' },                      // 4 left wing tip
      { x: 0.44, y: -0.06, mag: 2.48, color: '#ffd6a3', name: 'Gienah' },     // 5 right inner wing
      { x: 0.82, y: 0.14, mag: 3.20, color: '#ffd6a3' },                       // 6 right wing tip
    ],
    edges: [
      [0, 1], [1, 2],
      [4, 3], [3, 1], [1, 5], [5, 6],
    ],
    sequence: [0, 1, 3, 4, 5, 6, 2],
  },
  {
    name: 'LYRA',
    ra: 18.8,
    dec: 37,
    title: 'The Harp',
    fact: 'Lyra holds Vega, the fifth-brightest star in the night sky and a corner of the Summer Triangle. Astronomers long used Vega as the baseline zero-point for measuring star brightness.',
    stars: [
      { x: -0.40, y: -0.58, mag: 0.03, color: '#cfe4ff', name: 'Vega' },      // 0
      { x: -0.08, y: -0.44, mag: 4.36, color: '#edf4ff' },                     // 1 epsilon
      { x: 0.14, y: -0.22, mag: 4.34, color: '#edf4ff' },                      // 2 zeta
      { x: 0.42, y: 0.06, mag: 3.52, color: '#b9d4ff', name: 'Sheliak' },      // 3 beta
      { x: 0.16, y: 0.56, mag: 3.25, color: '#b9d4ff', name: 'Sulafat' },      // 4 gamma
      { x: -0.18, y: 0.34, mag: 4.30, color: '#ffd6a3' },                      // 5 delta
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [0, 2],
    ],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'SCORPIUS',
    ra: 16.9,
    dec: -27,
    title: 'The Scorpion',
    fact: 'Scorpius sweeps across the dense core of the Milky Way. Its fiery heart star Antares — meaning "rival of Mars" — is a massive red supergiant hundreds of times wider than the Sun.',
    stars: [
      { x: -0.64, y: -0.56, mag: 2.32, color: '#b9d4ff', name: 'Dschubba' },  // 0 claw top
      { x: -0.74, y: -0.24, mag: 2.62, color: '#b9d4ff', name: 'Acrab' },     // 1 claw mid
      { x: -0.56, y: 0.06, mag: 2.90, color: '#b9d4ff' },                      // 2 claw low
      { x: -0.28, y: -0.22, mag: 0.96, color: '#ffb98a', name: 'Antares' },   // 3 heart
      { x: -0.04, y: -0.02, mag: 2.82, color: '#b9d4ff' },                     // 4 body
      { x: 0.16, y: 0.24, mag: 2.29, color: '#edf4ff' },                       // 5 bend
      { x: 0.24, y: 0.54, mag: 1.87, color: '#fff3d6', name: 'Sargas' },      // 6 tail bottom
      { x: 0.52, y: 0.66, mag: 2.41, color: '#b9d4ff' },                       // 7 tail curve
      { x: 0.74, y: 0.44, mag: 1.63, color: '#b9d4ff', name: 'Shaula' },      // 8 stinger
      { x: 0.68, y: 0.20, mag: 2.69, color: '#b9d4ff', name: 'Lesath' },      // 9 stinger pair
    ],
    edges: [
      [0, 3], [1, 3], [2, 3],
      [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    name: 'LEO',
    ra: 10.6,
    dec: 15,
    title: 'The Lion',
    fact: 'Leo’s head forms a backwards question mark called the Sickle, anchored by blue-white Regulus — actually a four-star system spinning so fast it bulges at its equator.',
    stars: [
      { x: -0.68, y: 0.36, mag: 1.35, color: '#b9d4ff', name: 'Regulus' },     // 0 heart
      { x: -0.58, y: -0.04, mag: 3.49, color: '#edf4ff' },                     // 1 sickle
      { x: -0.44, y: -0.34, mag: 2.08, color: '#ffd6a3', name: 'Algieba' },    // 2 mane
      { x: -0.58, y: -0.62, mag: 3.44, color: '#ffd6a3' },                     // 3 head
      { x: -0.82, y: -0.52, mag: 2.98, color: '#ffd6a3' },                     // 4 nose
      { x: 0.16, y: -0.22, mag: 2.56, color: '#edf4ff', name: 'Zosma' },       // 5 hip
      { x: 0.18, y: 0.18, mag: 3.33, color: '#edf4ff', name: 'Chertan' },      // 6 hind leg
      { x: 0.76, y: 0.08, mag: 2.14, color: '#edf4ff', name: 'Denebola' },     // 7 tail
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [2, 5], [5, 6], [6, 0], [5, 7], [6, 7],
    ],
    sequence: [4, 3, 2, 1, 0, 6, 5, 7],
  },
  {
    name: 'TAURUS',
    ra: 4.5,
    dec: 16,
    title: 'The Bull',
    fact: 'Taurus hosts both the V-shaped Hyades cluster (around orange Aldebaran) and the sparkling Pleiades Seven Sisters, plus the Crab Nebula supernova remnant recorded in 1054 AD.',
    stars: [
      { x: -0.10, y: 0.12, mag: 0.85, color: '#ffb98a', name: 'Aldebaran' },   // 0 eye
      { x: -0.28, y: 0.24, mag: 3.84, color: '#fff3d6' },                      // 1 hyades
      { x: -0.44, y: 0.12, mag: 3.65, color: '#ffd6a3' },                      // 2 hyades v
      { x: -0.26, y: -0.04, mag: 3.76, color: '#fff3d6' },                     // 3 hyades
      { x: 0.56, y: -0.56, mag: 1.65, color: '#b9d4ff', name: 'Elnath' },      // 4 top horn
      { x: 0.62, y: 0.08, mag: 3.00, color: '#b9d4ff', name: 'Tianguan' },     // 5 lower horn
      { x: -0.78, y: -0.34, mag: 2.87, color: '#b9d4ff', name: 'Alcyone' },    // 6 pleiades
      { x: -0.72, y: 0.54, mag: 3.47, color: '#fff3d6' },                      // 7 shoulder
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [3, 4], [0, 5], [2, 7], [3, 6],
    ],
    sequence: [6, 3, 2, 1, 0, 5, 4, 7],
  },
  {
    name: 'GEMINI',
    ra: 7.1,
    dec: 22,
    title: 'The Twins',
    fact: 'Crowned by Castor and Pollux, Gemini stands high in winter skies. Castor looks like one star to the eye, yet it is actually an intricate six-star gravitational dance.',
    stars: [
      { x: -0.24, y: -0.72, mag: 1.58, color: '#edf4ff', name: 'Castor' },     // 0 castor head
      { x: 0.28, y: -0.58, mag: 1.14, color: '#ffd6a3', name: 'Pollux' },      // 1 pollux head
      { x: -0.18, y: -0.26, mag: 3.57, color: '#fff3d6' },                     // 2 castor chest
      { x: 0.24, y: -0.14, mag: 3.53, color: '#ffd6a3' },                      // 3 pollux chest
      { x: -0.56, y: 0.18, mag: 3.06, color: '#ffd6a3', name: 'Mebsuta' },     // 4 castor arm
      { x: -0.22, y: 0.34, mag: 3.53, color: '#edf4ff' },                      // 5 castor knee
      { x: -0.36, y: 0.72, mag: 2.88, color: '#ffb98a', name: 'Tejat' },       // 6 castor foot
      { x: 0.18, y: 0.34, mag: 3.36, color: '#fff3d6', name: 'Wasat' },        // 7 pollux hip
      { x: 0.44, y: 0.68, mag: 1.93, color: '#edf4ff', name: 'Alhena' },       // 8 pollux foot
    ],
    edges: [
      [0, 1], [0, 2], [2, 4], [2, 5], [5, 6],
      [1, 3], [3, 7], [7, 8], [2, 3],
    ],
    sequence: [0, 2, 4, 5, 6, 1, 3, 7, 8],
  },
  {
    name: 'PERSEUS',
    ra: 3.4,
    dec: 45,
    title: 'The Hero',
    fact: 'Perseus gives its name to the August Perseid meteor shower and contains Algol, the famous "Demon Star" whose eclipsing companion makes it visibly dim and brighten every 2.87 days.',
    stars: [
      { x: -0.28, y: -0.68, mag: 3.76, color: '#b9d4ff' },                     // 0 top
      { x: -0.12, y: -0.26, mag: 1.79, color: '#fff3d6', name: 'Mirfak' },     // 1 bright center
      { x: 0.16, y: -0.44, mag: 2.93, color: '#b9d4ff' },                      // 2 upper right
      { x: 0.28, y: 0.08, mag: 2.12, color: '#b9d4ff', name: 'Algol' },        // 3 demon star
      { x: 0.56, y: 0.34, mag: 3.39, color: '#b9d4ff' },                       // 4 gorgon arm
      { x: -0.24, y: 0.18, mag: 2.85, color: '#b9d4ff', name: 'Atik' },        // 5 left leg
      { x: -0.14, y: 0.64, mag: 2.85, color: '#b9d4ff', name: 'Zeta Per' },    // 6 foot
    ],
    edges: [
      [0, 1], [1, 2], [1, 3], [3, 4], [1, 5], [5, 6],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    name: 'PEGASUS',
    ra: 22.7,
    dec: 20,
    title: 'The Winged Horse',
    fact: 'The Great Square of Pegasus serves as an autumn sky landmark. One of its stars, 51 Pegasi, was the first Sun-like star discovered to host a planet outside our solar system (1995).',
    stars: [
      { x: -0.44, y: -0.34, mag: 2.42, color: '#ffb98a', name: 'Scheat' },     // 0 square top-left
      { x: 0.36, y: -0.36, mag: 2.06, color: '#b9d4ff', name: 'Alpheratz' },   // 1 square top-right
      { x: 0.38, y: 0.36, mag: 2.83, color: '#b9d4ff', name: 'Algenib' },      // 2 square bottom-right
      { x: -0.42, y: 0.34, mag: 2.49, color: '#edf4ff', name: 'Markab' },      // 3 square bottom-left
      { x: -0.78, y: -0.58, mag: 2.94, color: '#ffd6a3', name: 'Matar' },      // 4 front leg
      { x: -0.78, y: 0.22, mag: 3.53, color: '#fff3d6' },                      // 5 neck
      { x: -0.84, y: -0.08, mag: 2.39, color: '#ffd6a3', name: 'Enif' },       // 6 nose
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [0, 4], [3, 5], [5, 6],
    ],
    sequence: [0, 1, 2, 3, 5, 6, 4],
  },
  {
    name: 'AQUILA',
    ra: 19.7,
    dec: 6,
    title: 'The Eagle',
    fact: 'Aquila soars across the Milky Way led by Altair, one of our closest bright neighbors at just 16.7 light-years away, spinning once every ~9 hours.',
    stars: [
      { x: -0.02, y: -0.24, mag: 0.77, color: '#edf4ff', name: 'Altair' },     // 0 heart
      { x: -0.24, y: -0.38, mag: 2.72, color: '#ffd6a3', name: 'Tarazed' },    // 1 upper neck
      { x: 0.20, y: -0.10, mag: 3.71, color: '#fff3d6', name: 'Alshain' },     // 2 lower neck
      { x: -0.68, y: 0.04, mag: 2.99, color: '#b9d4ff', name: 'Deneb Okab' },  // 3 left wing
      { x: 0.68, y: -0.24, mag: 3.23, color: '#fff3d6' },                      // 4 right wing
      { x: 0.02, y: 0.34, mag: 3.36, color: '#fff3d6' },                       // 5 body
      { x: -0.22, y: 0.72, mag: 3.43, color: '#b9d4ff' },                      // 6 tail
    ],
    edges: [
      [1, 0], [0, 2], [1, 3], [2, 4], [0, 5], [5, 6],
    ],
    sequence: [3, 1, 0, 2, 4, 5, 6],
  },
  {
    name: 'DRACO',
    ra: 16.5,
    dec: 65,
    title: 'The Dragon',
    fact: 'Draco winds between the Big and Little Dippers and never sets from northern latitudes. Its star Thuban served as Earth’s North Pole Star when the Egyptian pyramids were built.',
    stars: [
      { x: -0.72, y: -0.52, mag: 2.23, color: '#ffd6a3', name: 'Eltanin' },    // 0 head
      { x: -0.84, y: -0.28, mag: 2.79, color: '#ffd6a3', name: 'Rastaban' },   // 1 head
      { x: -0.56, y: -0.14, mag: 3.75, color: '#edf4ff' },                     // 2 head back
      { x: -0.28, y: -0.34, mag: 3.07, color: '#ffd6a3' },                     // 3 neck
      { x: -0.02, y: -0.06, mag: 2.74, color: '#ffd6a3' },                     // 4 coil 1
      { x: 0.32, y: -0.24, mag: 3.17, color: '#fff3d6' },                      // 5 coil 2
      { x: 0.56, y: 0.14, mag: 3.29, color: '#edf4ff' },                       // 6 coil 3
      { x: 0.24, y: 0.44, mag: 3.65, color: '#edf4ff', name: 'Thuban' },       // 7 former pole star
      { x: 0.64, y: 0.62, mag: 3.82, color: '#ffd6a3' },                       // 8 tail
    ],
    edges: [
      [0, 1], [1, 2], [2, 0],
      [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    name: 'CRUX',
    ra: 12.4,
    dec: -60,
    title: 'The Southern Cross',
    fact: 'Although Crux is the smallest of all 88 official constellations, its brilliant four-star cross is featured on five national flags and points travelers toward the South Celestial Pole.',
    stars: [
      { x: 0.00, y: -0.68, mag: 1.63, color: '#ffb98a', name: 'Gacrux' },     // 0 top
      { x: 0.00, y: 0.68, mag: 0.77, color: '#b9d4ff', name: 'Acrux' },       // 1 bottom
      { x: -0.52, y: -0.08, mag: 1.25, color: '#b9d4ff', name: 'Mimosa' },     // 2 left
      { x: 0.48, y: -0.04, mag: 2.80, color: '#b9d4ff', name: 'Imai' },       // 3 right
      { x: 0.24, y: 0.22, mag: 3.59, color: '#ffd6a3', name: 'Ginan' },        // 4 fifth star
    ],
    edges: [
      [0, 1], [2, 3], [3, 4],
    ],
    sequence: [0, 2, 3, 4, 1],
  },
  {
    name: 'CANIS MAJOR',
    ra: 6.8,
    dec: -22,
    title: 'The Great Dog',
    fact: 'Canis Major is led by Sirius — the brightest star in Earth’s entire night sky at magnitude -1.46 — just 8.6 light-years away, accompanied by a dense white-dwarf companion.',
    stars: [
      { x: -0.14, y: -0.34, mag: -1.46, color: '#cfe4ff', name: 'Sirius' },    // 0 brightest star
      { x: -0.54, y: -0.28, mag: 1.98, color: '#b9d4ff', name: 'Mirzam' },     // 1 front paw
      { x: 0.14, y: -0.64, mag: 4.12, color: '#edf4ff' },                      // 2 ear
      { x: 0.12, y: 0.14, mag: 1.84, color: '#fff3d6', name: 'Wezen' },        // 3 hip
      { x: -0.06, y: 0.60, mag: 1.50, color: '#b9d4ff', name: 'Adhara' },      // 4 hind leg
      { x: 0.46, y: 0.56, mag: 2.45, color: '#b9d4ff', name: 'Aludra' },       // 5 tail
    ],
    edges: [
      [1, 0], [0, 2], [0, 3], [3, 4], [3, 5],
    ],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'ANDROMEDA',
    ra: 0.8,
    dec: 38,
    title: 'The Chained Maiden',
    fact: 'Andromeda contains M31, the Andromeda Galaxy — the farthest object visible to the unaided human eye at 2.5 million light-years away and on a slow 4.5-billion-year merge course with the Milky Way.',
    stars: [
      { x: -0.76, y: 0.24, mag: 2.06, color: '#b9d4ff', name: 'Alpheratz' },   // 0 head
      { x: -0.34, y: 0.10, mag: 3.27, color: '#ffd6a3', name: 'Delta And' },   // 1 shoulder
      { x: 0.08, y: 0.00, mag: 2.05, color: '#ffb98a', name: 'Mirach' },       // 2 waist
      { x: 0.58, y: -0.22, mag: 2.10, color: '#ffd6a3', name: 'Almach' },      // 3 foot
      { x: 0.02, y: -0.44, mag: 3.87, color: '#edf4ff' },                      // 4 galaxy arm
      { x: 0.28, y: 0.46, mag: 3.57, color: '#fff3d6' },                       // 5 lower leg
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [2, 4], [2, 5],
    ],
    sequence: [0, 1, 2, 4, 3, 5],
  },
  {
    name: 'BOOTES',
    ra: 14.6,
    dec: 30,
    title: 'The Herdsman',
    fact: 'Shaped like a celestial kite, Boötes is anchored by golden Arcturus — the fourth-brightest star in the sky and the brightest star in the northern celestial hemisphere.',
    stars: [
      { x: -0.02, y: 0.46, mag: -0.05, color: '#ffd6a3', name: 'Arcturus' },   // 0 kite bottom
      { x: -0.42, y: 0.04, mag: 2.68, color: '#fff3d6', name: 'Muphrid' },     // 1 left waist
      { x: 0.36, y: 0.14, mag: 2.37, color: '#ffd6a3', name: 'Izar' },         // 2 right waist
      { x: -0.32, y: -0.44, mag: 3.03, color: '#edf4ff', name: 'Seginus' },    // 3 left shoulder
      { x: 0.34, y: -0.36, mag: 3.47, color: '#ffd6a3' },                      // 4 right shoulder
      { x: 0.02, y: -0.74, mag: 3.50, color: '#ffd6a3', name: 'Nekkar' },      // 5 head
      { x: -0.28, y: 0.78, mag: 4.06, color: '#fff3d6' },                      // 6 left foot
      { x: 0.34, y: 0.72, mag: 4.10, color: '#fff3d6' },                       // 7 right foot
    ],
    edges: [
      [0, 1], [1, 3], [3, 5], [5, 4], [4, 2], [2, 0],
      [0, 6], [0, 7],
    ],
    sequence: [0, 1, 3, 5, 4, 2, 6, 7],
  },
  {
    name: 'SAGITTARIUS',
    ra: 19.0,
    dec: -28,
    title: 'The Archer (Teapot)',
    fact: 'Looking toward the spout of the Sagittarius "Teapot" points straight toward Sagittarius A*, the supermassive black hole at the heart of the Milky Way galaxy.',
    stars: [
      { x: -0.18, y: -0.58, mag: 2.81, color: '#ffd6a3', name: 'Kaus Borealis' }, // 0 lid top
      { x: -0.42, y: -0.14, mag: 2.70, color: '#ffd6a3', name: 'Kaus Media' },    // 1 spout base
      { x: -0.78, y: -0.16, mag: 2.98, color: '#ffd6a3', name: 'Alnasl' },        // 2 spout tip
      { x: -0.36, y: 0.42, mag: 1.85, color: '#b9d4ff', name: 'Kaus Australis' }, // 3 base left
      { x: 0.24, y: 0.44, mag: 2.60, color: '#edf4ff', name: 'Ascella' },         // 4 base right
      { x: 0.18, y: -0.08, mag: 3.17, color: '#edf4ff', name: 'Phi Sgr' },        // 5 lid right
      { x: 0.56, y: -0.26, mag: 2.02, color: '#b9d4ff', name: 'Nunki' },          // 6 handle top
      { x: 0.64, y: 0.22, mag: 3.14, color: '#fff3d6', name: 'Tau Sgr' },         // 7 handle bottom
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 1],
      [1, 5], [5, 0], [3, 4], [4, 5],
      [5, 6], [6, 7], [7, 4],
    ],
    sequence: [2, 1, 0, 5, 6, 7, 4, 3],
  },
  {
    name: 'URSA MINOR',
    ra: 15.0,
    dec: 78,
    title: 'The Little Bear',
    fact: 'At the tip of Ursa Minor’s handle sits Polaris — the current North Star — which lies less than one degree from Earth’s rotational axis and stays nearly motionless all night.',
    stars: [
      { x: -0.78, y: -0.34, mag: 1.98, color: '#fff3d6', name: 'Polaris' },     // 0 North Star
      { x: -0.44, y: -0.26, mag: 4.35, color: '#b9d4ff', name: 'Yildun' },      // 1 handle
      { x: -0.14, y: -0.10, mag: 4.21, color: '#edf4ff' },                      // 2 handle
      { x: 0.16, y: 0.04, mag: 4.95, color: '#fff3d6' },                       // 3 bowl join
      { x: 0.32, y: 0.34, mag: 4.25, color: '#edf4ff' },                       // 4 bowl bottom left
      { x: 0.74, y: 0.28, mag: 3.05, color: '#edf4ff', name: 'Pherkad' },      // 5 bowl bottom right
      { x: 0.64, y: -0.10, mag: 2.08, color: '#ffb98a', name: 'Kochab' },      // 6 bowl top right
    ],
    edges: [
      [0, 1], [1, 2], [2, 3],
      [3, 4], [4, 5], [5, 6], [6, 3],
    ],
    sequence: [0, 1, 2, 3, 6, 5, 4],
  },
  {
    name: 'ARIES',
    ra: 2.6,
    dec: 21,
    title: 'The Ram',
    fact: 'Over 2,000 years ago, the Sun stood in Aries on the March equinox, giving the "First Point of Aries" its name even though Earth’s precession has since shifted the equinox into Pisces.',
    stars: [
      { x: -0.62, y: -0.24, mag: 2.00, color: '#ffd6a3', name: 'Hamal' },       // 0
      { x: -0.14, y: -0.06, mag: 2.64, color: '#edf4ff', name: 'Sheratan' },    // 1
      { x: 0.14, y: 0.12, mag: 3.88, color: '#edf4ff', name: 'Mesarthim' },    // 2
      { x: 0.64, y: 0.28, mag: 4.35, color: '#b9d4ff', name: '41 Ari' },       // 3
    ],
    edges: [
      [0, 1], [1, 2], [2, 3],
    ],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'CANCER',
    ra: 8.6,
    dec: 20,
    title: 'The Crab',
    fact: 'Though its stars are faint, Cancer hides the Beehive Cluster (M44) right at its center — a glittering open cluster of ~1,000 young stars visible as a misty patch on dark nights.',
    stars: [
      { x: -0.04, y: -0.68, mag: 3.52, color: '#ffd6a3', name: 'Iota Cnc' },    // 0 top
      { x: 0.00, y: -0.12, mag: 4.67, color: '#edf4ff', name: 'Asellus Bor' }, // 1 upper body
      { x: 0.06, y: 0.14, mag: 3.94, color: '#ffd6a3', name: 'Asellus Aus' },  // 2 lower body
      { x: -0.58, y: 0.56, mag: 3.53, color: '#ffb98a', name: 'Tarf' },        // 3 left claw
      { x: 0.58, y: 0.52, mag: 4.26, color: '#edf4ff', name: 'Acubens' },      // 4 right claw
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [2, 4],
    ],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'VIRGO',
    ra: 13.4,
    dec: -4,
    title: 'The Maiden',
    fact: 'Virgo is the second-largest constellation in the sky and houses the Virgo Cluster of over 1,300 galaxies, anchored by the brilliant blue-white binary star Spica.',
    stars: [
      { x: 0.06, y: 0.56, mag: 0.97, color: '#b9d4ff', name: 'Spica' },        // 0 bright bottom
      { x: -0.04, y: 0.08, mag: 2.74, color: '#fff3d6', name: 'Porrima' },     // 1 waist
      { x: -0.44, y: -0.08, mag: 3.38, color: '#edf4ff', name: 'Auva' },       // 2 left hip
      { x: -0.66, y: -0.44, mag: 2.83, color: '#ffd6a3', name: 'Vindemiatrix' }, // 3 raised arm
      { x: 0.34, y: -0.18, mag: 3.61, color: '#fff3d6', name: 'Zaniah' },      // 4 shoulder
      { x: 0.68, y: -0.26, mag: 3.89, color: '#fff3d6', name: 'Zavijava' },    // 5 head
      { x: 0.52, y: 0.36, mag: 3.88, color: '#edf4ff', name: 'Heze' },         // 6 lower skirt
      { x: -0.42, y: 0.42, mag: 4.16, color: '#fff3d6', name: 'Syrma' },       // 7 left foot
    ],
    edges: [
      [3, 2], [2, 1], [1, 0], [1, 4], [4, 5], [4, 6], [6, 0], [2, 7],
    ],
    sequence: [3, 2, 1, 4, 5, 6, 0, 7],
  },
  {
    name: 'LIBRA',
    ra: 15.2,
    dec: -15,
    title: 'The Scales',
    fact: 'Libra is the only zodiac constellation representing an inanimate object. Its two brightest stars, Zubeneschamali and Zubenelgenubi, still carry Arabic names meaning "the northern" and "southern claws" of Scorpius.',
    stars: [
      { x: 0.00, y: -0.58, mag: 2.61, color: '#b9d4ff', name: 'Zubeneschamali' }, // 0 apex
      { x: -0.48, y: -0.04, mag: 2.75, color: '#edf4ff', name: 'Zubenelgenubi' }, // 1 left pan top
      { x: 0.46, y: -0.06, mag: 3.29, color: '#ffb98a', name: 'Brachium' },       // 2 right pan top
      { x: -0.34, y: 0.56, mag: 3.91, color: '#ffd6a3', name: 'Zubenelhakrabi' }, // 3 left pan base
      { x: 0.42, y: 0.54, mag: 4.53, color: '#b9d4ff' },                          // 4 right pan base
    ],
    edges: [
      [0, 1], [0, 2], [1, 2], [1, 3], [2, 4],
    ],
    sequence: [0, 1, 3, 2, 4],
  },
  {
    name: 'CAPRICORNUS',
    ra: 21.0,
    dec: -18,
    title: 'The Sea Goat',
    fact: 'Neptune was first telescopically discovered inside Capricornus in 1846 near its tail star Deneb Algedi, one of the oldest mythologized figures in ancient Babylonian sky charts.',
    stars: [
      { x: -0.74, y: -0.34, mag: 3.58, color: '#ffd6a3', name: 'Algedi' },     // 0 left horn
      { x: -0.56, y: -0.14, mag: 3.08, color: '#fff3d6', name: 'Dabih' },      // 1 head
      { x: -0.14, y: 0.46, mag: 3.74, color: '#edf4ff', name: 'Omega Cap' },   // 2 belly
      { x: 0.34, y: 0.24, mag: 3.67, color: '#edf4ff', name: 'Nashira' },      // 3 lower tail
      { x: 0.74, y: -0.18, mag: 2.85, color: '#edf4ff', name: 'Deneb Algedi' }, // 4 tail tip
      { x: 0.20, y: -0.22, mag: 4.28, color: '#fff3d6' },                      // 5 back mid
      { x: -0.22, y: -0.24, mag: 4.49, color: '#b9d4ff' },                     // 6 back left
    ],
    edges: [
      [0, 1], [1, 6], [6, 5], [5, 4], [4, 3], [3, 2], [2, 1],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    name: 'AQUARIUS',
    ra: 22.3,
    dec: -10,
    title: 'The Water Bearer',
    fact: 'Aquarius pours a cosmic stream toward Fomalhaut and hosts the Helix Nebula ("Eye of God"), one of the closest and largest planetary nebulae to Earth.',
    stars: [
      { x: -0.44, y: -0.44, mag: 2.90, color: '#fff3d6', name: 'Sadalsuud' },  // 0 left shoulder
      { x: 0.02, y: -0.48, mag: 2.95, color: '#fff3d6', name: 'Sadalmelik' },  // 1 right shoulder
      { x: 0.26, y: -0.22, mag: 3.84, color: '#edf4ff', name: 'Sadachbia' },   // 2 urn center
      { x: 0.48, y: -0.34, mag: 3.68, color: '#b9d4ff', name: 'Sadaltager' },  // 3 urn rim
      { x: 0.22, y: 0.06, mag: 4.18, color: '#edf4ff' },                       // 4 stream top
      { x: -0.06, y: 0.28, mag: 3.77, color: '#ffd6a3', name: 'Ancha' },       // 5 stream mid
      { x: 0.16, y: 0.48, mag: 3.27, color: '#edf4ff', name: 'Skat' },        // 6 stream bend
      { x: 0.34, y: 0.76, mag: 1.16, color: '#edf4ff', name: 'Fomalhaut' },   // 7 southern fish star
      { x: -0.68, y: -0.14, mag: 3.71, color: '#b9d4ff', name: 'Albali' },     // 8 left hand
    ],
    edges: [
      [8, 0], [0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7],
    ],
    sequence: [8, 0, 1, 3, 2, 4, 5, 6, 7],
  },
  {
    name: 'PISCES',
    ra: 0.9,
    dec: 14,
    title: 'The Fishes',
    fact: 'Two faint ribbons of stars meet at the knot star Alrescha in Pisces, where the March equinox point currently resides and where the grand spiral galaxy M74 shines.',
    stars: [
      { x: 0.14, y: 0.56, mag: 3.82, color: '#edf4ff', name: 'Alrescha' },    // 0 knot
      { x: -0.24, y: 0.28, mag: 4.30, color: '#fff3d6' },                      // 1 western cord
      { x: -0.56, y: 0.12, mag: 4.13, color: '#edf4ff', name: 'Fum al Samakah' }, // 2 west circlet
      { x: -0.78, y: -0.04, mag: 4.50, color: '#b9d4ff' },                     // 3 west circlet
      { x: -0.66, y: -0.22, mag: 4.44, color: '#ffd6a3' },                     // 4 west circlet
      { x: -0.46, y: -0.08, mag: 4.01, color: '#fff3d6' },                     // 5 west circlet close
      { x: 0.34, y: 0.12, mag: 3.62, color: '#ffd6a3', name: 'Alpherg' },      // 6 northern cord
      { x: 0.56, y: -0.34, mag: 4.26, color: '#edf4ff' },                      // 7 north fish
      { x: 0.66, y: -0.62, mag: 4.52, color: '#b9d4ff' },                      // 8 north tip
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2],
      [0, 6], [6, 7], [7, 8],
    ],
    sequence: [3, 4, 5, 2, 1, 0, 6, 7, 8],
  },
  {
    name: 'AURIGA',
    ra: 5.9,
    dec: 42,
    title: 'The Charioteer',
    fact: 'Auriga forms a crisp winter pentagon crowned by Capella — the sixth-brightest star in the night sky and a quadruple system of two golden giant pairs.',
    stars: [
      { x: -0.28, y: -0.58, mag: 0.08, color: '#fff3d6', name: 'Capella' },    // 0 brightest
      { x: 0.34, y: -0.44, mag: 1.90, color: '#edf4ff', name: 'Menkalinan' },  // 1 top right
      { x: 0.44, y: 0.10, mag: 2.65, color: '#edf4ff', name: 'Mahasim' },      // 2 right
      { x: 0.04, y: 0.58, mag: 1.65, color: '#b9d4ff', name: 'Elnath' },       // 3 bottom
      { x: -0.46, y: 0.18, mag: 2.69, color: '#ffd6a3', name: 'Hassaleh' },    // 4 left
      { x: -0.52, y: -0.28, mag: 3.17, color: '#ffb98a', name: 'Almaaz' },     // 5 kids
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    ],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'CEPHEUS',
    ra: 22.0,
    dec: 68,
    title: 'The King',
    fact: 'Shaped like a child’s drawing of a house, Cepheus contains Delta Cephei — the prototype Cepheid variable star whose rhythmic pulsing lets astronomers measure distances across the universe.',
    stars: [
      { x: -0.02, y: -0.68, mag: 3.21, color: '#ffd6a3', name: 'Errai' },      // 0 roof peak
      { x: -0.48, y: -0.14, mag: 3.23, color: '#b9d4ff', name: 'Alfirk' },     // 1 left eave
      { x: 0.48, y: -0.08, mag: 3.51, color: '#edf4ff', name: 'Zeta Cep' },    // 2 right eave
      { x: -0.36, y: 0.54, mag: 2.45, color: '#edf4ff', name: 'Alderamin' },   // 3 bottom left
      { x: 0.36, y: 0.52, mag: 3.35, color: '#ffb98a', name: 'Garnet Star' },  // 4 bottom right
    ],
    edges: [
      [0, 1], [0, 2], [1, 2], [1, 3], [3, 4], [4, 2],
    ],
    sequence: [0, 2, 4, 3, 1],
  },
  {
    name: 'CORONA BOREALIS',
    ra: 15.8,
    dec: 30,
    title: 'The Northern Crown',
    fact: 'This delicate semicircular tiara between Boötes and Hercules is set with the bright jewel Alphecca, and also hosts T Coronae Borealis — the famed "Blaze Star" recurrent nova.',
    stars: [
      { x: -0.72, y: -0.28, mag: 4.14, color: '#b9d4ff' },                     // 0 left tip
      { x: -0.52, y: 0.12, mag: 3.66, color: '#edf4ff', name: 'Nusakan' },     // 1
      { x: -0.22, y: 0.36, mag: 2.22, color: '#edf4ff', name: 'Alphecca' },    // 2 crown jewel
      { x: 0.12, y: 0.38, mag: 3.84, color: '#edf4ff' },                       // 3
      { x: 0.42, y: 0.24, mag: 4.15, color: '#ffd6a3' },                       // 4
      { x: 0.64, y: -0.04, mag: 4.63, color: '#b9d4ff' },                      // 5
      { x: 0.72, y: -0.38, mag: 4.82, color: '#fff3d6' },                      // 6 right tip
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    name: 'DELPHINUS',
    ra: 20.7,
    dec: 14,
    title: 'The Dolphin',
    fact: 'Look closely at Delphinus’s two brightest stars, Sualocin and Rotanev: astronomer Niccolò Cacciatore quietly named them in 1814 by spelling his Latinized name ("Nicolaus Venator") backwards.',
    stars: [
      { x: -0.14, y: -0.46, mag: 3.77, color: '#b9d4ff', name: 'Rotanev' },    // 0 diamond top
      { x: 0.30, y: -0.34, mag: 3.63, color: '#b9d4ff', name: 'Sualocin' },    // 1 diamond right
      { x: 0.22, y: 0.04, mag: 3.86, color: '#edf4ff' },                       // 2 diamond bottom
      { x: -0.24, y: -0.06, mag: 4.03, color: '#edf4ff' },                     // 3 diamond left
      { x: -0.58, y: 0.56, mag: 4.03, color: '#ffd6a3', name: 'Deneb Dulfim' }, // 4 tail
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], [3, 4],
    ],
    sequence: [4, 3, 0, 1, 2],
  },
  {
    name: 'HERCULES',
    ra: 17.2,
    dec: 31,
    title: 'The Hero',
    fact: 'Inside the central "Keystone" of Hercules gleams M13, the Great Globular Cluster — a dense spherical city of over 300,000 ancient stars packed into 145 light-years.',
    stars: [
      { x: -0.26, y: -0.24, mag: 3.16, color: '#fff3d6', name: 'Zeta Her' },   // 0 keystone top-left
      { x: 0.22, y: -0.20, mag: 2.81, color: '#fff3d6', name: 'Eta Her' },     // 1 keystone top-right
      { x: 0.26, y: 0.24, mag: 3.92, color: '#edf4ff', name: 'Pi Her' },       // 2 keystone bot-right
      { x: -0.22, y: 0.22, mag: 3.76, color: '#ffd6a3', name: 'Epsilon Her' }, // 3 keystone bot-left
      { x: -0.58, y: -0.58, mag: 2.78, color: '#ffd6a3', name: 'Kornephoros' }, // 4 left leg
      { x: 0.58, y: -0.56, mag: 3.51, color: '#b9d4ff', name: 'Tau Her' },     // 5 right leg
      { x: -0.52, y: 0.62, mag: 3.48, color: '#ffd6a3', name: 'Sarin' },       // 6 left arm
      { x: 0.46, y: 0.64, mag: 3.12, color: '#ffb98a', name: 'Rasalgethi' },   // 7 head
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [0, 4], [1, 5], [3, 6], [2, 7],
    ],
    sequence: [4, 0, 1, 5, 2, 7, 3, 6],
  },
  {
    name: 'HYDRA',
    ra: 10.5,
    dec: -15,
    title: 'The Water Snake',
    fact: 'Hydra is the largest of all 88 constellations, stretching more than 100 degrees across the sky. Its lone bright orange giant Alphard literally translates to "the solitary one."',
    stars: [
      { x: -0.78, y: -0.44, mag: 3.38, color: '#ffd6a3', name: 'Ashlesha' },   // 0 head
      { x: -0.84, y: -0.22, mag: 4.12, color: '#b9d4ff' },                     // 1 head
      { x: -0.62, y: -0.18, mag: 3.11, color: '#fff3d6' },                     // 2 neck
      { x: -0.34, y: 0.08, mag: 1.98, color: '#ffb98a', name: 'Alphard' },     // 3 heart
      { x: -0.02, y: 0.24, mag: 3.91, color: '#ffd6a3' },                      // 4 coil
      { x: 0.34, y: 0.16, mag: 3.60, color: '#ffd6a3' },                       // 5 coil
      { x: 0.62, y: 0.34, mag: 3.00, color: '#edf4ff' },                       // 6 body
      { x: 0.86, y: 0.52, mag: 3.27, color: '#ffd6a3', name: 'Pi Hya' },       // 7 tail
    ],
    edges: [
      [0, 1], [1, 2], [2, 0],
      [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    ],
    sequence: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: 'OPHIUCHUS',
    ra: 17.3,
    dec: -4,
    title: 'The Serpent Bearer',
    fact: 'Although the Sun actually spends more days passing through Ophiuchus each December than through Scorpius, it was omitted from the traditional 12-sign zodiac; it also hosts fast-moving Barnard’s Star.',
    stars: [
      { x: 0.02, y: -0.68, mag: 2.08, color: '#edf4ff', name: 'Rasalhague' },  // 0 head
      { x: -0.42, y: -0.26, mag: 2.77, color: '#ffd6a3', name: 'Cebalrai' },   // 1 left shoulder
      { x: 0.44, y: -0.22, mag: 3.74, color: '#edf4ff', name: 'Kappa Oph' },   // 2 right shoulder
      { x: -0.38, y: 0.36, mag: 2.43, color: '#edf4ff', name: 'Sabik' },       // 3 left knee
      { x: 0.36, y: 0.34, mag: 3.05, color: '#fff3d6', name: 'Yed Prior' },    // 4 right knee
      { x: -0.66, y: 0.56, mag: 3.32, color: '#b9d4ff' },                      // 5 left foot
      { x: 0.68, y: 0.52, mag: 2.56, color: '#b9d4ff', name: 'Zeta Oph' },     // 6 right foot
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6],
    ],
    sequence: [0, 1, 3, 5, 4, 6, 2],
  },
  {
    name: 'CENTAURUS',
    ra: 13.5,
    dec: -47,
    title: 'The Centaur',
    fact: 'Centaurus holds the Alpha Centauri triple-star system (Rigil Kentaurus and Proxima Centauri), our Sun’s closest stellar neighbors at just 4.24 to 4.37 light-years away.',
    stars: [
      { x: -0.42, y: -0.58, mag: 2.06, color: '#ffd6a3', name: 'Menkent' },    // 0 top shoulder
      { x: -0.04, y: -0.42, mag: 2.55, color: '#b9d4ff', name: 'Muhlifain' },  // 1 chest
      { x: 0.40, y: -0.38, mag: 2.30, color: '#b9d4ff', name: 'Epsilon Cen' }, // 2 back
      { x: -0.26, y: 0.04, mag: 2.54, color: '#b9d4ff' },                      // 3 waist
      { x: 0.22, y: 0.14, mag: 2.31, color: '#b9d4ff', name: 'Zeta Cen' },     // 4 hip
      { x: 0.26, y: 0.62, mag: 0.61, color: '#b9d4ff', name: 'Hadar' },        // 5 front hoof
      { x: 0.66, y: 0.66, mag: -0.01, color: '#fff3d6', name: 'Rigil Kent' },  // 6 Alpha Centauri
      { x: -0.62, y: 0.52, mag: 3.13, color: '#b9d4ff' },                      // 7 rear hoof
    ],
    edges: [
      [0, 1], [1, 2], [1, 3], [3, 4], [4, 2], [3, 7], [4, 5], [5, 6],
    ],
    sequence: [0, 1, 2, 4, 5, 6, 3, 7],
  },
  {
    name: 'CARINA',
    ra: 8.7,
    dec: -62,
    title: 'The Keel',
    fact: 'Carina shines with Canopus — the second-brightest star in the entire night sky after Sirius — used by interplanetary spacecraft as a golden navigation beacon.',
    stars: [
      { x: -0.66, y: -0.48, mag: -0.74, color: '#fff3d6', name: 'Canopus' },   // 0 brightest
      { x: -0.32, y: -0.06, mag: 1.86, color: '#b9d4ff', name: 'Avior' },      // 1 keel bend
      { x: 0.14, y: 0.36, mag: 1.67, color: '#edf4ff', name: 'Miaplacidus' },  // 2 deep keel
      { x: 0.64, y: 0.24, mag: 2.21, color: '#edf4ff', name: 'Aspidiske' },    // 3 stern
      { x: 0.42, y: -0.26, mag: 2.74, color: '#b9d4ff', name: 'Theta Car' },   // 4 upper stern
      { x: 0.10, y: -0.42, mag: 3.31, color: '#edf4ff' },                      // 5 deck
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
    ],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'PHOENIX',
    ra: 0.9,
    dec: -48,
    title: 'The Phoenix',
    fact: 'Created by Dutch navigators in the late 1590s, Phoenix rises in the southern sky led by golden-orange Ankaa ("the Phoenix") and gives its name to the December Phoenicid meteor shower.',
    stars: [
      { x: -0.58, y: -0.38, mag: 2.38, color: '#ffd6a3', name: 'Ankaa' },      // 0 head
      { x: -0.14, y: -0.16, mag: 3.30, color: '#ffd6a3', name: 'Beta Phe' },   // 1 heart
      { x: 0.34, y: -0.42, mag: 3.41, color: '#ffb98a', name: 'Gamma Phe' },   // 2 right wing
      { x: 0.58, y: 0.18, mag: 3.93, color: '#ffd6a3' },                       // 3 tail
      { x: -0.18, y: 0.46, mag: 3.88, color: '#edf4ff', name: 'Alpha/Zeta' },  // 4 left wing
    ],
    edges: [
      [0, 1], [1, 2], [1, 3], [1, 4],
    ],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'ANTLIA',
    ra: 10.3,
    dec: -32,
    title: 'The Air Pump',
    fact: 'Named by Nicolas-Louis de Lacaille in the 1750s to honor Robert Boyle’s vacuum pump, Antlia is a quiet southern constellation hosting the nearby Antlia Dwarf Galaxy.',
    stars: [
      { x: -0.62, y: 0.24, mag: 4.25, color: '#ffb98a', name: 'Alpha Ant' },
      { x: -0.14, y: -0.18, mag: 4.48, color: '#edf4ff', name: 'Epsilon Ant' },
      { x: 0.36, y: -0.06, mag: 4.28, color: '#ffd6a3', name: 'Iota Ant' },
      { x: 0.62, y: 0.34, mag: 5.27, color: '#edf4ff' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'APUS',
    ra: 16.1,
    dec: -75,
    title: 'The Bird of Paradise',
    fact: 'Positioned deep near the South Celestial Pole, Apus represents the exotic bird-of-paradise mapped by early European navigators and never rises above mid-northern horizons.',
    stars: [
      { x: -0.64, y: -0.24, mag: 3.83, color: '#ffb98a', name: 'Alpha Aps' },
      { x: -0.08, y: 0.04, mag: 3.89, color: '#ffd6a3', name: 'Gamma Aps' },
      { x: 0.38, y: 0.34, mag: 4.23, color: '#ffd6a3', name: 'Beta Aps' },
      { x: 0.56, y: -0.26, mag: 4.68, color: '#ffb98a', name: 'Delta Aps' },
    ],
    edges: [[0, 1], [1, 2], [1, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'ARA',
    ra: 17.4,
    dec: -53,
    title: 'The Altar',
    fact: 'Lying just south of Scorpius’s stinger along the Milky Way, Ara is one of Ptolemy’s original 48 constellations and hosts the bright open cluster NGC 6193.',
    stars: [
      { x: -0.32, y: -0.54, mag: 2.95, color: '#b9d4ff', name: 'Alpha Ara' },
      { x: 0.28, y: -0.48, mag: 2.85, color: '#ffb98a', name: 'Beta Ara' },
      { x: 0.36, y: 0.04, mag: 3.34, color: '#b9d4ff', name: 'Gamma Ara' },
      { x: -0.26, y: 0.08, mag: 3.13, color: '#ffd6a3', name: 'Zeta Ara' },
      { x: -0.46, y: 0.56, mag: 3.62, color: '#b9d4ff', name: 'Delta Ara' },
      { x: 0.46, y: 0.54, mag: 3.66, color: '#b9d4ff', name: 'Theta Ara' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [2, 5]],
    sequence: [0, 1, 2, 5, 3, 4],
  },
  {
    name: 'CAELUM',
    ra: 4.7,
    dec: -38,
    title: 'The Chisel',
    fact: 'Caelum is the eighth-smallest constellation in the sky, representing an engraver’s burin tucked between Columba and Eridanus with no star brighter than fourth magnitude.',
    stars: [
      { x: -0.28, y: -0.62, mag: 4.45, color: '#fff3d6', name: 'Alpha Cae' },
      { x: 0.04, y: -0.18, mag: 5.05, color: '#fff3d6', name: 'Beta Cae' },
      { x: 0.22, y: 0.28, mag: 4.55, color: '#ffd6a3', name: 'Gamma Cae' },
      { x: -0.16, y: 0.64, mag: 5.05, color: '#b9d4ff', name: 'Delta Cae' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'CAMELOPARDALIS',
    ra: 8.9,
    dec: 69,
    title: 'The Giraffe',
    fact: 'Filling a broad dark expanse between Ursa Major and Cassiopeia, Camelopardalis was charted in 1612 and hosts Kemble’s Cascade — a stunning chain of over 20 binocular stars.',
    stars: [
      { x: -0.58, y: 0.58, mag: 4.29, color: '#b9d4ff', name: 'Alpha Cam' },
      { x: -0.28, y: 0.14, mag: 4.03, color: '#fff3d6', name: 'Beta Cam' },
      { x: 0.08, y: -0.16, mag: 4.21, color: '#b9d4ff', name: 'CS Cam' },
      { x: 0.44, y: -0.56, mag: 4.54, color: '#edf4ff', name: 'Gamma Cam' },
      { x: -0.52, y: -0.24, mag: 4.63, color: '#ffd6a3', name: '7 Cam' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4]],
    sequence: [0, 1, 4, 2, 3],
  },
  {
    name: 'CANES VENATICI',
    ra: 13.1,
    dec: 40,
    title: 'The Hunting Dogs',
    fact: 'Tucked under the Big Dipper’s handle, Canes Venatici is anchored by binary star Cor Caroli ("Charles’s Heart") and holds the famed Whirlpool Galaxy (M51).',
    stars: [
      { x: 0.46, y: 0.34, mag: 2.89, color: '#edf4ff', name: 'Cor Caroli' },
      { x: -0.46, y: -0.34, mag: 4.26, color: '#fff3d6', name: 'Chara' },
      { x: -0.14, y: 0.14, mag: 4.76, color: '#ffb98a', name: 'La Superba' },
    ],
    edges: [[0, 2], [2, 1]],
    sequence: [1, 2, 0],
  },
  {
    name: 'CANIS MINOR',
    ra: 7.7,
    dec: 6,
    title: 'The Little Dog',
    fact: 'Though drawn with only two main stars, Canis Minor glows brightly thanks to Procyon — the eighth-brightest star in the sky and part of the Winter Triangle alongside Sirius and Betelgeuse.',
    stars: [
      { x: 0.34, y: 0.36, mag: 0.34, color: '#fff3d6', name: 'Procyon' },
      { x: -0.34, y: -0.36, mag: 2.89, color: '#b9d4ff', name: 'Gomeisa' },
    ],
    edges: [[0, 1]],
    sequence: [1, 0],
  },
  {
    name: 'CETUS',
    ra: 1.7,
    dec: -7,
    title: 'The Whale',
    fact: 'The fourth-largest constellation in the sky, Cetus contains Mira ("The Wonderful") — the first non-supernova variable star ever discovered, cycling dramatically in brightness every 332 days.',
    stars: [
      { x: -0.74, y: -0.38, mag: 2.54, color: '#ffb98a', name: 'Menkar' },
      { x: -0.46, y: -0.48, mag: 3.47, color: '#b9d4ff', name: 'Kaffaljidhma' },
      { x: -0.38, y: -0.12, mag: 4.04, color: '#edf4ff' },
      { x: -0.68, y: -0.04, mag: 4.27, color: '#ffd6a3' },
      { x: -0.14, y: 0.08, mag: 3.04, color: '#ffb98a', name: 'Mira' },
      { x: 0.18, y: 0.24, mag: 3.60, color: '#ffd6a3', name: 'Baten Kaitos' },
      { x: 0.56, y: 0.06, mag: 3.74, color: '#ffd6a3', name: 'Eta Cet' },
      { x: 0.78, y: 0.44, mag: 2.04, color: '#ffd6a3', name: 'Diphda' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5], [5, 6], [6, 7], [5, 7]],
    sequence: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: 'CHAMAELEON',
    ra: 10.7,
    dec: -79,
    title: 'The Chameleon',
    fact: 'Encircling the South Celestial Pole, Chamaeleon contains dark molecular clouds actively birthing young low-mass stars just 500 light-years from Earth.',
    stars: [
      { x: -0.66, y: -0.14, mag: 4.05, color: '#fff3d6', name: 'Alpha Cha' },
      { x: -0.12, y: -0.34, mag: 4.35, color: '#ffd6a3', name: 'Theta Cha' },
      { x: 0.44, y: -0.16, mag: 4.11, color: '#ffb98a', name: 'Gamma Cha' },
      { x: 0.62, y: 0.24, mag: 4.24, color: '#b9d4ff', name: 'Beta Cha' },
      { x: 0.02, y: 0.26, mag: 4.45, color: '#b9d4ff', name: 'Delta Cha' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'CIRCINUS',
    ra: 14.6,
    dec: -63,
    title: 'The Compasses',
    fact: 'Representing a pair of drafting compasses right beside Alpha Centauri, Circinus is the fourth-smallest constellation and frames the bright Circinus Galaxy.',
    stars: [
      { x: 0.00, y: -0.62, mag: 3.19, color: '#edf4ff', name: 'Alpha Cir' },
      { x: -0.44, y: 0.56, mag: 4.09, color: '#edf4ff', name: 'Beta Cir' },
      { x: 0.46, y: 0.52, mag: 4.51, color: '#b9d4ff', name: 'Gamma Cir' },
    ],
    edges: [[1, 0], [0, 2]],
    sequence: [1, 0, 2],
  },
  {
    name: 'COLUMBA',
    ra: 5.8,
    dec: -35,
    title: 'The Dove',
    fact: 'Flying just south of Orion and Lepus, Columba is led by blue-white Phact and holds a famous "runaway" star, Mu Columbae, ejected from Orion’s Trapezium millions of years ago.',
    stars: [
      { x: -0.24, y: -0.22, mag: 2.65, color: '#b9d4ff', name: 'Phact' },
      { x: 0.14, y: 0.04, mag: 3.12, color: '#ffd6a3', name: 'Wazn' },
      { x: 0.56, y: 0.22, mag: 3.85, color: '#ffd6a3', name: 'Delta Col' },
      { x: -0.58, y: 0.34, mag: 3.87, color: '#ffd6a3', name: 'Epsilon Col' },
      { x: 0.04, y: -0.56, mag: 4.36, color: '#b9d4ff', name: 'Gamma Col' },
    ],
    edges: [[3, 0], [0, 1], [1, 2], [0, 4]],
    sequence: [3, 0, 4, 1, 2],
  },
  {
    name: 'COMA BERENICES',
    ra: 12.8,
    dec: 22,
    title: 'Berenice’s Hair',
    fact: 'Named for Queen Berenice II of Egypt, this shimmering open star cluster marks the North Galactic Pole — letting telescopes peer out past the Milky Way into deep galaxy clusters.',
    stars: [
      { x: -0.52, y: -0.34, mag: 4.26, color: '#fff3d6', name: 'Beta Com' },
      { x: 0.28, y: 0.48, mag: 4.32, color: '#fff3d6', name: 'Diadem' },
      { x: -0.36, y: 0.36, mag: 4.35, color: '#ffd6a3', name: 'Gamma Com' },
      { x: 0.04, y: -0.18, mag: 4.81, color: '#edf4ff', name: '12 Com' },
    ],
    edges: [[0, 3], [3, 1], [3, 2]],
    sequence: [0, 3, 2, 1],
  },
  {
    name: 'CORONA AUSTRALIS',
    ra: 18.6,
    dec: -41,
    title: 'The Southern Crown',
    fact: 'Mirroring its northern twin, Corona Australis forms a graceful crescent of stars tucked right beneath the feet of Sagittarius along the edge of a dark dust nebula.',
    stars: [
      { x: -0.58, y: -0.44, mag: 4.10, color: '#edf4ff', name: 'Alfecca Meridiana' },
      { x: -0.18, y: -0.48, mag: 4.11, color: '#ffd6a3', name: 'Beta CrA' },
      { x: 0.26, y: -0.32, mag: 4.20, color: '#fff3d6', name: 'Gamma CrA' },
      { x: 0.56, y: 0.04, mag: 4.57, color: '#ffd6a3', name: 'Delta CrA' },
      { x: 0.42, y: 0.44, mag: 4.83, color: '#fff3d6', name: 'Zeta CrA' },
      { x: -0.12, y: 0.54, mag: 4.86, color: '#edf4ff', name: 'Epsilon CrA' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'CORVUS',
    ra: 12.4,
    dec: -18,
    title: 'The Crow',
    fact: 'Corvus forms a distinct tilted trapezoid ("Spica’s Spanker") in spring skies. Two of its stars point directly toward the bright blue star Spica in Virgo.',
    stars: [
      { x: -0.38, y: -0.44, mag: 2.59, color: '#b9d4ff', name: 'Gienah' },
      { x: 0.32, y: -0.42, mag: 2.94, color: '#edf4ff', name: 'Algorab' },
      { x: 0.44, y: 0.36, mag: 2.65, color: '#ffd6a3', name: 'Kraz' },
      { x: -0.34, y: 0.34, mag: 3.00, color: '#ffb98a', name: 'Minkar' },
      { x: -0.66, y: 0.62, mag: 4.02, color: '#fff3d6', name: 'Alchiba' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'CRATER',
    ra: 11.4,
    dec: -15,
    title: 'The Cup',
    fact: 'Resting along Hydra’s back beside Corvus, Crater outlines a delicate wine goblet whose orange giant star Alkes means "the cup."',
    stars: [
      { x: -0.44, y: 0.34, mag: 4.08, color: '#ffd6a3', name: 'Alkes' },
      { x: -0.02, y: 0.16, mag: 3.56, color: '#ffd6a3', name: 'Delta Crt' },
      { x: 0.36, y: 0.28, mag: 4.06, color: '#edf4ff', name: 'Gamma Crt' },
      { x: 0.42, y: -0.24, mag: 4.46, color: '#edf4ff', name: 'Zeta Crt' },
      { x: 0.04, y: -0.46, mag: 4.95, color: '#ffd6a3', name: 'Eta Crt' },
      { x: -0.36, y: -0.18, mag: 4.46, color: '#edf4ff', name: 'Beta Crt' },
      { x: -0.22, y: 0.66, mag: 4.82, color: '#ffd6a3' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 6]],
    sequence: [0, 5, 4, 3, 2, 1, 6],
  },
  {
    name: 'DORADO',
    ra: 5.2,
    dec: -60,
    title: 'The Dolphinfish',
    fact: 'Dorado holds most of the Large Magellanic Cloud — our galaxy’s brightest satellite — including the immense Tarantula Nebula star-forming region.',
    stars: [
      { x: -0.54, y: -0.56, mag: 3.27, color: '#edf4ff', name: 'Alpha Dor' },
      { x: -0.12, y: -0.22, mag: 3.76, color: '#fff3d6', name: 'Beta Dor' },
      { x: 0.38, y: 0.18, mag: 4.26, color: '#edf4ff', name: 'Gamma Dor' },
      { x: 0.56, y: 0.58, mag: 4.35, color: '#edf4ff', name: 'Delta Dor' },
      { x: -0.34, y: 0.44, mag: 4.65, color: '#b9d4ff', name: 'Zeta Dor' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4]],
    sequence: [0, 1, 4, 2, 3],
  },
  {
    name: 'EQUULEUS',
    ra: 21.2,
    dec: 8,
    title: 'The Little Horse',
    fact: 'Equuleus is the second-smallest of all 88 constellations (larger only than Crux), trotting right ahead of Pegasus’s nose star Enif.',
    stars: [
      { x: -0.44, y: 0.36, mag: 3.92, color: '#fff3d6', name: 'Kitalpha' },
      { x: -0.14, y: -0.34, mag: 4.49, color: '#fff3d6', name: 'Delta Equ' },
      { x: 0.36, y: -0.28, mag: 4.70, color: '#edf4ff', name: 'Gamma Equ' },
      { x: 0.44, y: 0.24, mag: 5.16, color: '#edf4ff', name: 'Beta Equ' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'ERIDANUS',
    ra: 3.3,
    dec: -29,
    title: 'The River',
    fact: 'Winding from near Rigel in Orion all the way to Achernar in the deep southern sky, Eridanus is the sixth-largest constellation and includes nearby sun-like star Epsilon Eridani.',
    stars: [
      { x: -0.68, y: -0.68, mag: 2.79, color: '#edf4ff', name: 'Cursa' },
      { x: -0.36, y: -0.52, mag: 2.95, color: '#ffb98a', name: 'Zaurak' },
      { x: -0.16, y: -0.24, mag: 3.73, color: '#ffd6a3', name: 'Ran' },
      { x: -0.44, y: 0.06, mag: 3.54, color: '#ffd6a3' },
      { x: 0.04, y: 0.24, mag: 2.91, color: '#edf4ff', name: 'Acamar' },
      { x: 0.38, y: 0.42, mag: 3.55, color: '#b9d4ff' },
      { x: 0.74, y: 0.68, mag: 0.46, color: '#b9d4ff', name: 'Achernar' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    sequence: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    name: 'FORNAX',
    ra: 2.8,
    dec: -32,
    title: 'The Furnace',
    fact: 'Though modest to the naked eye, Fornax hosts the Fornax Galaxy Cluster and the region of sky photographed for the famous Hubble Ultra-Deep Field.',
    stars: [
      { x: -0.56, y: 0.42, mag: 3.85, color: '#fff3d6', name: 'Dalim' },
      { x: 0.06, y: -0.14, mag: 4.46, color: '#ffd6a3', name: 'Beta For' },
      { x: 0.56, y: -0.44, mag: 4.69, color: '#b9d4ff', name: 'Nu For' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'GRUS',
    ra: 22.4,
    dec: -46,
    title: 'The Crane',
    fact: 'Soaring gracefully in the southern autumn sky, Grus is led by blue-white Alnair ("the bright one") and red giant Al Dhanab.',
    stars: [
      { x: -0.54, y: -0.46, mag: 1.74, color: '#b9d4ff', name: 'Alnair' },
      { x: -0.14, y: -0.12, mag: 2.11, color: '#ffb98a', name: 'Tiaki' },
      { x: 0.28, y: 0.14, mag: 3.49, color: '#ffd6a3', name: 'Delta Gru' },
      { x: 0.64, y: 0.48, mag: 3.01, color: '#b9d4ff', name: 'Al Dhanab' },
      { x: -0.24, y: 0.44, mag: 3.97, color: '#edf4ff', name: 'Epsilon Gru' },
      { x: 0.34, y: -0.48, mag: 3.01, color: '#ffb98a', name: 'Gamma Gru' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4], [1, 5]],
    sequence: [0, 1, 5, 2, 3, 4],
  },
  {
    name: 'HOROLOGIUM',
    ra: 3.3,
    dec: -53,
    title: 'The Pendulum Clock',
    fact: 'Created by Lacaille to honor Christiaan Huygens’s invention of the pendulum clock, Horologium stretches south from Eridanus toward Hydrus.',
    stars: [
      { x: 0.46, y: -0.62, mag: 3.85, color: '#ffd6a3', name: 'Alpha Hor' },
      { x: 0.14, y: -0.18, mag: 4.93, color: '#edf4ff', name: 'Delta Hor' },
      { x: -0.18, y: 0.24, mag: 4.98, color: '#edf4ff', name: 'Beta Hor' },
      { x: -0.48, y: 0.64, mag: 5.12, color: '#fff3d6', name: 'Mu Hor' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'HYDRUS',
    ra: 2.3,
    dec: -70,
    title: 'The Little Water Snake',
    fact: 'Not to be confused with giant Hydra, Hydrus winds between the Large and Small Magellanic Clouds near the South Celestial Pole.',
    stars: [
      { x: -0.58, y: -0.48, mag: 2.86, color: '#edf4ff', name: 'Alpha Hyi' },
      { x: -0.16, y: 0.44, mag: 2.80, color: '#fff3d6', name: 'Beta Hyi' },
      { x: 0.56, y: 0.12, mag: 3.24, color: '#ffb98a', name: 'Gamma Hyi' },
    ],
    edges: [[0, 1], [1, 2], [2, 0]],
    sequence: [0, 1, 2],
  },
  {
    name: 'INDUS',
    ra: 21.8,
    dec: -58,
    title: 'The Indian',
    fact: 'Anchored by orange giant Alpha Indi ("The Persian"), Indus contains Epsilon Indi — one of the closest Sun-like K-dwarf stars to our solar system at 11.9 light-years.',
    stars: [
      { x: -0.48, y: -0.52, mag: 3.11, color: '#ffd6a3', name: 'The Persian' },
      { x: -0.14, y: 0.04, mag: 3.65, color: '#ffd6a3', name: 'Beta Ind' },
      { x: 0.44, y: 0.48, mag: 4.51, color: '#b9d4ff', name: 'Delta Ind' },
      { x: 0.24, y: -0.24, mag: 4.69, color: '#ffd6a3', name: 'Epsilon Ind' },
    ],
    edges: [[0, 1], [1, 2], [1, 3]],
    sequence: [0, 1, 3, 2],
  },
  {
    name: 'LACERTA',
    ra: 22.5,
    dec: 46,
    title: 'The Lizard',
    fact: 'Wedged between Cygnus, Cassiopeia, and Andromeda along the Milky Way, Lacerta forms a subtle zig-zag sometimes called "Little Cassiopeia."',
    stars: [
      { x: -0.34, y: -0.62, mag: 4.58, color: '#b9d4ff', name: 'Beta Lac' },
      { x: 0.14, y: -0.36, mag: 3.77, color: '#edf4ff', name: 'Alpha Lac' },
      { x: -0.22, y: 0.02, mag: 4.36, color: '#b9d4ff', name: '4 Lac' },
      { x: 0.26, y: 0.34, mag: 4.36, color: '#ffb98a', name: '5 Lac' },
      { x: -0.12, y: 0.64, mag: 4.13, color: '#b9d4ff', name: '1 Lac' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'LEO MINOR',
    ra: 10.2,
    dec: 32,
    title: 'The Little Lion',
    fact: 'Introduced by Johannes Hevelius in 1687 between Leo and Ursa Major, Leo Minor is unusual because its brightest star, Praecipua (46 LMi), has no Alpha Bayer designation.',
    stars: [
      { x: -0.58, y: 0.28, mag: 3.83, color: '#ffd6a3', name: 'Praecipua' },
      { x: -0.12, y: -0.14, mag: 4.21, color: '#ffd6a3', name: 'Beta LMi' },
      { x: 0.56, y: -0.24, mag: 4.41, color: '#edf4ff', name: '21 LMi' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'LEPUS',
    ra: 5.6,
    dec: -19,
    title: 'The Hare',
    fact: 'Crouching directly beneath Orion’s feet, Lepus holds Arneb ("the hare") and Hind’s Crimson Star — one of the deepest ruby-red carbon stars in the sky.',
    stars: [
      { x: -0.06, y: -0.24, mag: 2.58, color: '#fff3d6', name: 'Arneb' },
      { x: -0.12, y: 0.24, mag: 2.81, color: '#ffd6a3', name: 'Nihal' },
      { x: -0.54, y: -0.08, mag: 3.19, color: '#ffb98a', name: 'Epsilon Lep' },
      { x: -0.64, y: -0.44, mag: 3.55, color: '#b9d4ff', name: 'Mu Lep' },
      { x: 0.42, y: -0.18, mag: 3.71, color: '#edf4ff', name: 'Gamma Lep' },
      { x: 0.54, y: 0.34, mag: 3.31, color: '#b9d4ff', name: 'Zeta Lep' },
    ],
    edges: [[3, 2], [2, 0], [0, 1], [1, 2], [0, 4], [4, 5], [5, 1]],
    sequence: [3, 2, 0, 4, 5, 1],
  },
  {
    name: 'LUPUS',
    ra: 15.2,
    dec: -43,
    title: 'The Wolf',
    fact: 'Sitting between Centaurus and Scorpius along the southern Milky Way, Lupus witnessed SN 1006 — the brightest recorded supernova in human history.',
    stars: [
      { x: -0.46, y: -0.56, mag: 2.30, color: '#b9d4ff', name: 'Alpha Lup' },
      { x: -0.12, y: -0.34, mag: 2.68, color: '#b9d4ff', name: 'Beta Lup' },
      { x: 0.38, y: -0.16, mag: 2.78, color: '#b9d4ff', name: 'Gamma Lup' },
      { x: 0.46, y: 0.38, mag: 3.22, color: '#b9d4ff', name: 'Delta Lup' },
      { x: -0.24, y: 0.48, mag: 3.37, color: '#b9d4ff', name: 'Epsilon Lup' },
      { x: -0.58, y: 0.08, mag: 3.41, color: '#ffd6a3', name: 'Zeta Lup' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5]],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'LYNX',
    ra: 7.9,
    dec: 46,
    title: 'The Lynx',
    fact: 'Johannes Hevelius named Lynx in 1687 because he joked you needed "the eyes of a lynx" to see its faint meandering chain of stars north of Gemini.',
    stars: [
      { x: -0.68, y: -0.44, mag: 3.13, color: '#ffb98a', name: 'Alpha Lyn' },
      { x: -0.32, y: -0.24, mag: 3.82, color: '#edf4ff', name: '38 Lyn' },
      { x: 0.08, y: 0.06, mag: 4.25, color: '#fff3d6', name: '31 Lyn' },
      { x: 0.44, y: 0.24, mag: 4.35, color: '#ffd6a3', name: '21 Lyn' },
      { x: 0.72, y: 0.56, mag: 4.26, color: '#edf4ff', name: '15 Lyn' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'MENSA',
    ra: 5.4,
    dec: -77,
    title: 'Table Mountain',
    fact: 'Named after Table Mountain overlooking Cape Town, Mensa is the only constellation named after an earthly geographic feature and contains part of the Large Magellanic Cloud.',
    stars: [
      { x: -0.56, y: -0.24, mag: 5.09, color: '#fff3d6', name: 'Alpha Men' },
      { x: -0.06, y: 0.14, mag: 5.19, color: '#ffd6a3', name: 'Gamma Men' },
      { x: 0.48, y: -0.18, mag: 5.31, color: '#ffd6a3', name: 'Beta Men' },
      { x: 0.28, y: 0.46, mag: 5.47, color: '#ffd6a3', name: 'Eta Men' },
    ],
    edges: [[0, 1], [1, 2], [1, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'MICROSCOPIUM',
    ra: 20.9,
    dec: -36,
    title: 'The Microscope',
    fact: 'Charted south of Capricornus, Microscopium hosts AU Microscopii — a young red dwarf star surrounded by a dramatic edge-on debris disk with newly formed planets.',
    stars: [
      { x: -0.48, y: -0.44, mag: 4.67, color: '#ffd6a3', name: 'Gamma Mic' },
      { x: 0.14, y: -0.22, mag: 4.71, color: '#edf4ff', name: 'Epsilon Mic' },
      { x: 0.44, y: 0.28, mag: 4.86, color: '#ffd6a3', name: 'Alpha Mic' },
      { x: -0.32, y: 0.46, mag: 4.82, color: '#edf4ff', name: 'Theta Mic' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'MONOCEROS',
    ra: 7.1,
    dec: -4,
    title: 'The Unicorn',
    fact: 'Framed inside the Winter Triangle by Orion, Canis Major, and Canis Minor, Monoceros cradles the glowing Rosette Nebula and the Christmas Tree Cluster.',
    stars: [
      { x: -0.48, y: 0.36, mag: 3.93, color: '#ffd6a3', name: 'Alpha Mon' },
      { x: -0.08, y: -0.12, mag: 3.98, color: '#b9d4ff', name: 'Gamma Mon' },
      { x: 0.36, y: -0.46, mag: 4.35, color: '#b9d4ff', name: 'Beta Mon' },
      { x: 0.56, y: 0.18, mag: 4.15, color: '#edf4ff', name: 'Delta Mon' },
      { x: 0.08, y: 0.48, mag: 4.34, color: '#ffd6a3', name: 'Zeta Mon' },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 0]],
    sequence: [2, 1, 0, 4, 3],
  },
  {
    name: 'MUSCA',
    ra: 12.6,
    dec: -70,
    title: 'The Fly',
    fact: 'Lying directly beneath the Southern Cross, Musca frames the dramatic Hourglass Nebula (MyCn 18) and the bright Coalsack dark nebula edge.',
    stars: [
      { x: 0.02, y: -0.22, mag: 2.69, color: '#b9d4ff', name: 'Alpha Mus' },
      { x: -0.38, y: -0.48, mag: 3.05, color: '#b9d4ff', name: 'Beta Mus' },
      { x: 0.44, y: -0.44, mag: 3.87, color: '#b9d4ff', name: 'Gamma Mus' },
      { x: 0.36, y: 0.38, mag: 3.62, color: '#ffd6a3', name: 'Delta Mus' },
      { x: -0.36, y: 0.42, mag: 3.51, color: '#ffb98a', name: 'Lambda Mus' },
    ],
    edges: [[1, 0], [0, 2], [2, 3], [3, 4], [4, 0]],
    sequence: [1, 0, 2, 3, 4],
  },
  {
    name: 'NORMA',
    ra: 16.0,
    dec: -51,
    title: 'The Carpenter’s Square',
    fact: 'Set along the Milky Way between Scorpius and Centaurus, Norma contains the Ant Nebula and marks the direction of the distant Great Attractor galaxy supercluster.',
    stars: [
      { x: -0.44, y: -0.44, mag: 4.02, color: '#ffd6a3', name: 'Gamma2 Nor' },
      { x: 0.16, y: -0.34, mag: 4.47, color: '#b9d4ff', name: 'Epsilon Nor' },
      { x: 0.48, y: 0.18, mag: 4.65, color: '#edf4ff', name: 'Delta Nor' },
      { x: -0.22, y: 0.46, mag: 4.63, color: '#b9d4ff', name: 'Eta Nor' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'OCTANS',
    ra: 21.5,
    dec: -85,
    title: 'The Octant',
    fact: 'Octans surrounds the South Celestial Pole itself; its faint fifth-magnitude star Sigma Octantis ("Polaris Australis") is the closest naked-eye star to the southern sky pole.',
    stars: [
      { x: 0.00, y: 0.02, mag: 5.47, color: '#edf4ff', name: 'Sigma Oct' },
      { x: -0.56, y: -0.34, mag: 3.76, color: '#ffd6a3', name: 'Nu Oct' },
      { x: 0.56, y: -0.28, mag: 4.15, color: '#edf4ff', name: 'Beta Oct' },
      { x: 0.12, y: 0.58, mag: 4.32, color: '#ffd6a3', name: 'Delta Oct' },
    ],
    edges: [[1, 0], [0, 2], [0, 3], [1, 2]],
    sequence: [1, 0, 2, 3],
  },
  {
    name: 'PAVO',
    ra: 19.6,
    dec: -65,
    title: 'The Peacock',
    fact: 'One of the four "Southern Birds," Pavo is led by the bright blue star Peacock (Alpha Pavonis) and contains the dazzling globular cluster NGC 6752.',
    stars: [
      { x: -0.64, y: -0.44, mag: 1.94, color: '#b9d4ff', name: 'Peacock' },
      { x: -0.14, y: -0.18, mag: 3.42, color: '#edf4ff', name: 'Beta Pav' },
      { x: 0.24, y: 0.14, mag: 3.56, color: '#ffd6a3', name: 'Delta Pav' },
      { x: 0.64, y: 0.44, mag: 3.62, color: '#ffd6a3', name: 'Eta Pav' },
      { x: -0.26, y: 0.48, mag: 4.22, color: '#fff3d6', name: 'Gamma Pav' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [1, 4]],
    sequence: [0, 1, 4, 2, 3],
  },
  {
    name: 'PICTOR',
    ra: 5.7,
    dec: -53,
    title: 'The Painter’s Easel',
    fact: 'Beside bright Canopus in Carina, Pictor hosts Beta Pictoris — the first star ever directly imaged with a dusty planet-forming debris disk and an orbiting exoplanet.',
    stars: [
      { x: -0.52, y: -0.48, mag: 3.27, color: '#edf4ff', name: 'Alpha Pic' },
      { x: 0.04, y: -0.04, mag: 3.85, color: '#edf4ff', name: 'Beta Pic' },
      { x: 0.56, y: 0.44, mag: 4.51, color: '#ffd6a3', name: 'Gamma Pic' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'PISCIS AUSTRINUS',
    ra: 22.3,
    dec: -31,
    title: 'The Southern Fish',
    fact: 'Drinking the cosmic stream poured by Aquarius, Piscis Austrinus shines with lonely first-magnitude Fomalhaut — ringed by a dramatic icy Kuiper-belt-like dust halo.',
    stars: [
      { x: 0.46, y: -0.24, mag: 1.16, color: '#edf4ff', name: 'Fomalhaut' },
      { x: 0.04, y: -0.34, mag: 4.17, color: '#b9d4ff', name: 'Epsilon PsA' },
      { x: -0.46, y: -0.14, mag: 4.21, color: '#ffd6a3', name: 'Delta PsA' },
      { x: -0.54, y: 0.28, mag: 4.29, color: '#edf4ff', name: 'Beta PsA' },
      { x: 0.08, y: 0.34, mag: 4.46, color: '#edf4ff', name: 'Iota PsA' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'PUPPIS',
    ra: 7.5,
    dec: -32,
    title: 'The Stern',
    fact: 'The largest fragment of the ancient giant ship Argo Navis, Puppis sails through a rich stretch of the Milky Way anchored by blazing blue supergiant Naos.',
    stars: [
      { x: -0.54, y: -0.42, mag: 2.25, color: '#b9d4ff', name: 'Naos' },
      { x: -0.14, y: -0.52, mag: 2.81, color: '#fff3d6', name: 'Tureis' },
      { x: 0.44, y: -0.18, mag: 2.70, color: '#ffb98a', name: 'Pi Pup' },
      { x: 0.56, y: 0.38, mag: 2.93, color: '#ffd6a3', name: 'Tau Pup' },
      { x: -0.12, y: 0.46, mag: 3.17, color: '#ffb98a', name: 'Sigma Pup' },
      { x: -0.58, y: 0.14, mag: 3.25, color: '#ffd6a3', name: 'Xi Pup' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'PYXIS',
    ra: 8.9,
    dec: -27,
    title: 'The Mariner’s Compass',
    fact: 'Replacing the mast of the old ship Argo Navis, Pyxis sits alongside Puppis and Vela and houses T Pyxidis, a famous recurrent nova.',
    stars: [
      { x: -0.44, y: -0.52, mag: 3.68, color: '#b9d4ff', name: 'Alpha Pyx' },
      { x: 0.02, y: 0.04, mag: 3.97, color: '#ffd6a3', name: 'Beta Pyx' },
      { x: 0.46, y: 0.52, mag: 4.01, color: '#ffd6a3', name: 'Gamma Pyx' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'RETICULUM',
    ra: 3.9,
    dec: -60,
    title: 'The Reticle',
    fact: 'Representing the crosshairs in an astronomer’s eyepiece, Reticulum forms a tight diamond containing Zeta Reticuli, a nearby pair of sun-like yellow stars.',
    stars: [
      { x: 0.02, y: -0.54, mag: 3.33, color: '#ffd6a3', name: 'Alpha Ret' },
      { x: 0.44, y: -0.04, mag: 3.84, color: '#ffd6a3', name: 'Beta Ret' },
      { x: -0.02, y: 0.54, mag: 4.51, color: '#ffb98a', name: 'Gamma Ret' },
      { x: -0.44, y: 0.02, mag: 4.44, color: '#ffd6a3', name: 'Delta Ret' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'SAGITTA',
    ra: 19.7,
    dec: 18,
    title: 'The Arrow',
    fact: 'Flying straight through the Milky Way between Cygnus and Aquila, Sagitta is the third-smallest constellation and looks remarkably like a feathered dart.',
    stars: [
      { x: -0.66, y: -0.28, mag: 4.37, color: '#fff3d6', name: 'Alpha Sge' },
      { x: -0.62, y: 0.28, mag: 4.39, color: '#ffd6a3', name: 'Beta Sge' },
      { x: -0.14, y: 0.02, mag: 3.82, color: '#edf4ff', name: 'Delta Sge' },
      { x: 0.66, y: 0.04, mag: 3.51, color: '#ffb98a', name: 'Gamma Sge' },
    ],
    edges: [[0, 2], [1, 2], [2, 3]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'SCULPTOR',
    ra: 0.4,
    dec: -32,
    title: 'The Sculptor',
    fact: 'Sculptor holds the South Galactic Pole — looking straight out of the Milky Way’s disk — and frames the luminous spiral Sculptor Galaxy (NGC 253).',
    stars: [
      { x: -0.56, y: -0.42, mag: 4.30, color: '#b9d4ff', name: 'Alpha Scl' },
      { x: 0.48, y: 0.34, mag: 4.38, color: '#b9d4ff', name: 'Beta Scl' },
      { x: -0.08, y: 0.24, mag: 4.41, color: '#ffd6a3', name: 'Gamma Scl' },
      { x: 0.14, y: -0.46, mag: 4.59, color: '#edf4ff', name: 'Delta Scl' },
    ],
    edges: [[0, 3], [3, 1], [1, 2], [2, 0]],
    sequence: [0, 3, 1, 2],
  },
  {
    name: 'SCUTUM',
    ra: 18.7,
    dec: -10,
    title: 'The Shield',
    fact: 'Small but set atop the bright Scutum Star Cloud of the Milky Way, Scutum contains the Wild Duck Cluster (M11) and UY Scuti, one of the largest known supergiant stars.',
    stars: [
      { x: 0.04, y: -0.56, mag: 3.85, color: '#ffd6a3', name: 'Alpha Sct' },
      { x: -0.44, y: -0.06, mag: 4.22, color: '#ffd6a3', name: 'Beta Sct' },
      { x: 0.08, y: 0.54, mag: 4.72, color: '#edf4ff', name: 'Delta Sct' },
      { x: 0.48, y: 0.06, mag: 4.70, color: '#edf4ff', name: 'Gamma Sct' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
    sequence: [0, 1, 2, 3],
  },
  {
    name: 'SERPENS',
    ra: 16.9,
    dec: 6,
    title: 'The Serpent',
    fact: 'Serpens is the only constellation split into two disconnected halves on the sky — Serpens Caput (head) and Serpens Cauda (tail) — separated by Ophiuchus the Serpent Bearer.',
    stars: [
      { x: -0.72, y: -0.46, mag: 3.76, color: '#edf4ff', name: 'Iota Ser' },
      { x: -0.52, y: -0.22, mag: 3.65, color: '#edf4ff', name: 'Beta Ser' },
      { x: -0.28, y: 0.06, mag: 2.63, color: '#ffd6a3', name: 'Unukalhai' },
      { x: 0.04, y: 0.34, mag: 3.53, color: '#ffd6a3', name: 'Epsilon Ser' },
      { x: 0.42, y: 0.48, mag: 3.25, color: '#ffd6a3', name: 'Eta Ser' },
      { x: 0.72, y: 0.14, mag: 4.62, color: '#edf4ff', name: 'Alya' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    sequence: [0, 1, 2, 3, 4, 5],
  },
  {
    name: 'SEXTANS',
    ra: 10.3,
    dec: -2,
    title: 'The Sextant',
    fact: 'Named by Hevelius in 1687 to commemorate the brass sextant he used to chart the stars, Sextans lies along the celestial equator south of Leo.',
    stars: [
      { x: -0.44, y: -0.46, mag: 4.48, color: '#edf4ff', name: 'Alpha Sex' },
      { x: 0.04, y: 0.08, mag: 5.05, color: '#b9d4ff', name: 'Beta Sex' },
      { x: 0.52, y: 0.44, mag: 5.09, color: '#edf4ff', name: 'Gamma Sex' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'TELESCOPIUM',
    ra: 19.3,
    dec: -51,
    title: 'The Telescope',
    fact: 'Tucked just south of Sagittarius and Corona Australis, Telescopium honors the long refracting telescopes of the 18th century.',
    stars: [
      { x: -0.44, y: -0.48, mag: 3.49, color: '#b9d4ff', name: 'Alpha Tel' },
      { x: 0.08, y: -0.02, mag: 4.13, color: '#ffd6a3', name: 'Zeta Tel' },
      { x: 0.48, y: 0.46, mag: 4.49, color: '#ffb98a', name: 'Epsilon Tel' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
  {
    name: 'TRIANGULUM',
    ra: 2.2,
    dec: 32,
    title: 'The Triangle',
    fact: 'Despite its tiny three-star wedge shape near Andromeda, Triangulum hosts M33 (the Triangulum Galaxy), the third-largest galaxy in our Local Group.',
    stars: [
      { x: -0.66, y: 0.24, mag: 3.42, color: '#fff3d6', name: 'Mothallah' },
      { x: 0.56, y: -0.46, mag: 3.00, color: '#edf4ff', name: 'Beta Tri' },
      { x: 0.58, y: 0.42, mag: 4.03, color: '#edf4ff', name: 'Gamma Tri' },
    ],
    edges: [[0, 1], [1, 2], [2, 0]],
    sequence: [0, 1, 2],
  },
  {
    name: 'TRIANGULUM AUSTRALE',
    ra: 16.0,
    dec: -65,
    title: 'The Southern Triangle',
    fact: 'Brighter and sharper than its northern counterpart, Triangulum Australe sits beside Centaurus and Alpha Centauri led by orange giant Atria.',
    stars: [
      { x: 0.62, y: 0.24, mag: 1.91, color: '#ffd6a3', name: 'Atria' },
      { x: -0.54, y: -0.44, mag: 2.83, color: '#fff3d6', name: 'Beta TrA' },
      { x: -0.36, y: 0.48, mag: 2.87, color: '#edf4ff', name: 'Gamma TrA' },
    ],
    edges: [[0, 1], [1, 2], [2, 0]],
    sequence: [0, 1, 2],
  },
  {
    name: 'TUCANA',
    ra: 23.8,
    dec: -66,
    title: 'The Toucan',
    fact: 'Tucana frames both the Small Magellanic Cloud and 47 Tucanae — the second-brightest globular cluster in the sky, blazing like a condensed jewel box.',
    stars: [
      { x: -0.62, y: -0.26, mag: 2.87, color: '#ffd6a3', name: 'Alpha Tuc' },
      { x: -0.06, y: -0.38, mag: 3.99, color: '#fff3d6', name: 'Gamma Tuc' },
      { x: 0.44, y: -0.14, mag: 3.70, color: '#edf4ff', name: 'Beta Tuc' },
      { x: 0.36, y: 0.44, mag: 4.23, color: '#fff3d6', name: 'Zeta Tuc' },
      { x: -0.28, y: 0.38, mag: 4.36, color: '#b9d4ff', name: 'Epsilon Tuc' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'VELA',
    ra: 9.6,
    dec: -47,
    title: 'The Sails',
    fact: 'Vela — the billowing sails of Argo Navis — shares a dazzling border with Carina and Puppis, forming the "False Cross" asterism and hosting the Vela Pulsar supernova remnant.',
    stars: [
      { x: -0.62, y: -0.38, mag: 1.75, color: '#b9d4ff', name: 'Regor' },
      { x: -0.08, y: -0.44, mag: 2.21, color: '#ffb98a', name: 'Suhail' },
      { x: 0.56, y: -0.16, mag: 2.69, color: '#ffd6a3', name: 'Psi Vel' },
      { x: 0.44, y: 0.44, mag: 2.47, color: '#b9d4ff', name: 'Kappa Vel' },
      { x: -0.28, y: 0.42, mag: 1.93, color: '#edf4ff', name: 'Delta Vel' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'VOLANS',
    ra: 7.8,
    dec: -70,
    title: 'The Flying Fish',
    fact: 'Skimming the southern Milky Way just below Carina’s False Cross, Volans is a compact kite-like constellation visible year-round from southern continents.',
    stars: [
      { x: -0.46, y: -0.48, mag: 3.77, color: '#ffd6a3', name: 'Beta Vol' },
      { x: 0.36, y: -0.34, mag: 3.78, color: '#ffd6a3', name: 'Gamma Vol' },
      { x: 0.48, y: 0.24, mag: 3.97, color: '#fff3d6', name: 'Delta Vol' },
      { x: -0.18, y: 0.46, mag: 4.00, color: '#edf4ff', name: 'Alpha Vol' },
      { x: -0.54, y: 0.04, mag: 4.35, color: '#b9d4ff', name: 'Epsilon Vol' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    sequence: [0, 1, 2, 3, 4],
  },
  {
    name: 'VULPECULA',
    ra: 20.2,
    dec: 24,
    title: 'The Little Fox',
    fact: 'Tucked inside the Summer Triangle beside Cygnus and Sagitta, Vulpecula hosts the famous Dumbbell Nebula (M27) and the very first pulsar ever discovered (1967).',
    stars: [
      { x: -0.58, y: -0.18, mag: 4.44, color: '#ffb98a', name: 'Anser' },
      { x: 0.04, y: 0.08, mag: 4.58, color: '#edf4ff', name: '23 Vul' },
      { x: 0.58, y: 0.24, mag: 4.60, color: '#b9d4ff', name: '15 Vul' },
    ],
    edges: [[0, 1], [1, 2]],
    sequence: [0, 1, 2],
  },
];
