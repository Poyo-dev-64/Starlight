// Auto-generated single-file classic bundle for Tauri and Wallpaper Engine CEF (file://).
(function () {
'use strict';
// === constellations.js ===
const CONSTELLATIONS = [
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
// === celestial.js ===
const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const OBLIQUITY_RAD = 23.43928 * DEG2RAD;
const COS_OBLIQUITY = Math.cos(OBLIQUITY_RAD);
const SIN_OBLIQUITY = Math.sin(OBLIQUITY_RAD);
function raDecToVec3(raHours, decDeg) {
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
const DEEP_SKY_OBJECTS = [
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
const DEEP_SPACE_PROBES = [
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
function computeLiveSolarSystem(date = new Date()) {
const j2000Ms = Date.UTC(2000, 0, 1, 12, 0, 0);
const d = (date.getTime() - j2000Ms) / 86400000;
const T = d / 36525;
const earth = heliocentricEcliptic(EARTH_ELEMENTS, T);
const sunEq = eclipticToRaDec(-earth.x, -earth.y, -earth.z);
const bodies = [];
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
function computeSpacecraft(date = new Date(), solarSystem = null) {
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
function computeOrbitingSatellites(nowSec) {
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
function resolveConstellationWikiUrl(constellationName) {
const clean = String(constellationName || '').trim();
if (!clean) return 'https://en.wikipedia.org/wiki/IAU_designated_constellations';
const slug = toWikiTitleCase(clean);
const fullSlug = clean.includes(' ') ? slug : `${slug}_(constellation)`;
return `https://en.wikipedia.org/wiki/${encodeURIComponent(fullSlug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}
function resolveStarWikiUrl(starName, constellationName) {
const sName = String(starName || '').trim();
if (!sName) {
return resolveConstellationWikiUrl(constellationName);
}
const cKey = `${String(constellationName || '').trim().toUpperCase()}:${sName}`;
const override = STAR_WIKI_OVERRIDES[cKey] || STAR_WIKI_OVERRIDES[sName];
if (override) {
return `https://en.wikipedia.org/wiki/${override}`;
}
const bayerMatch = /^([A-Za-z0-9]+)\s+([A-Z][a-zA-Z]{2})$/.exec(sName);
if (bayerMatch && IAU_ABBR_GENITIVES[bayerMatch[2]]) {
const slug = `${bayerMatch[1]}_${IAU_ABBR_GENITIVES[bayerMatch[2]]}`;
return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`;
}
const slug = sName.replace(/\s+/g, '_');
return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}
function resolveDeepSkyWikiUrl(dso) {
if (!dso) return 'https://en.wikipedia.org/wiki/Messier_object';
const override = DSO_WIKI_OVERRIDES[dso.id];
const slug = override || String(dso.name || dso.id).trim().replace(/\s+/g, '_');
return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug)}`;
}
function resolveObjectWikiUrl(idOrName) {
const key = String(idOrName || '').trim();
const slug = OBJECT_WIKI_OVERRIDES[key] || key.replace(/\s+/g, '_');
return `https://en.wikipedia.org/wiki/${encodeURIComponent(slug).replace(/%28/g, '(').replace(/%29/g, ')')}`;
}
// === visualizer.js ===
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
const COLOR_THEMES = {
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
const EQUATOR_DASH = [5, 7];
const NO_DASH = [];
const EQUATOR_SEGMENTS = 144;
class StarVisualizer {
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
showEquator: true,
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
this.rotMat = new Float64Array(9);
this._qBreathZ = [0, 0, 0, 1];
this._qBreathX = [0, 0, 0, 1];
this._qBreathY = [0, 0, 0, 1];
this._qTemp = [0, 0, 0, 1];
this._qTemp2 = [0, 0, 0, 1];
this._qRender = [0, 0, 0, 1];
this.skyConstellations = this._buildSkyConstellations();
this.skyDeepSky = DEEP_SKY_OBJECTS.map((obj) => ({
...obj,
dir: raDecToVec3(obj.ra, obj.dec),
metaStr: `Mag ${obj.mag.toFixed(1)} · ${obj.distance} · ${obj.constellation}`,
titleName: `${obj.id} · ${obj.name}`,
wikiUrl: resolveDeepSkyWikiUrl(obj),
}));
this.starSprites = this._buildStarSprites();
this.wordBitmapCache = new Map();
this.wordCacheSignature = '';
this.titleBitmapCache = new Map();
this.titleCacheFont = '';
this.miniLabelCache = new Map();
this.miniLabelSig = '';
this.moonCache = { canvas: null, key: '', size: 0 };
const nowDate = new Date();
this.solarSystem = computeLiveSolarSystem(nowDate);
this.spacecraft = computeSpacecraft(nowDate, this.solarSystem);
this.lastEphemerisAt = typeof performance !== 'undefined' ? performance.now() / 1000 : 0;
this._initSphereStars(320, 120);
this._initCelestialEquator();
this.bgBuckets = Array.from({ length: BG_BUCKET_COUNT }, () => new Float32Array(450 * 3));
this.bgBucketCounts = new Int32Array(BG_BUCKET_COUNT);
this.ambLineSegs = [
new Float32Array(800),
new Float32Array(800),
new Float32Array(800),
];
this.ambLineCounts = new Int32Array(3);
this.shootingStars = [];
this.nextShootingStarAt = 3.5;
this.lastBeatShootingStarAt = 0;
this.audioEnergy = { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0, kick: 0, instrumental: 0 };
this.ambientMotionEnv = 0.35;
this.kickBobY = 0;
this.kickBobVel = 0;
this.kickZoomPulse = 0;
this.prevKickRaw = 0;
this.lastKickRippleAt = 0;
this.lastCx = 0;
this.lastCy = 0;
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
this.lastLyricActivitySec = 0;
this.lastInstrumentalPulseSec = 0;
this.instrumentalStep = 0;
this.isInstrumentalActive = false;
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
const simDt = dt < 0.05 ? dt : 0.05;
ctx.fillStyle = this.theme.bg;
ctx.fillRect(0, 0, w, h);
this.bottomClearY = frameState.bottomClearY;
const react = clamp(this.settings.audioReactivity ?? 1.0, 0, 2);
const rawAudio = frameState.audio || { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0, kick: 0, instrumental: 0 };
const aLerp = expSmoothing(dt, 18);
this.audioEnergy.bass += (rawAudio.bass * react - this.audioEnergy.bass) * aLerp;
this.audioEnergy.mid += (rawAudio.mid * react - this.audioEnergy.mid) * aLerp;
this.audioEnergy.treble += (rawAudio.treble * react - this.audioEnergy.treble) * aLerp;
this.audioEnergy.rms += (rawAudio.rms * react - this.audioEnergy.rms) * aLerp;
this.audioEnergy.beat += (rawAudio.beat * react - this.audioEnergy.beat) * expSmoothing(dt, 24);
const kickTarget = (rawAudio.kick !== undefined ? rawAudio.kick : rawAudio.beat) * react;
const instTarget =
(rawAudio.instrumental !== undefined
? rawAudio.instrumental
: rawAudio.mid * 0.5 + rawAudio.bass * 0.3) * react;
const kickLerp = expSmoothing(dt, kickTarget > this.audioEnergy.kick ? 42 : 11);
const instLerp = expSmoothing(dt, instTarget > this.audioEnergy.instrumental ? 22 : 8);
this.audioEnergy.kick += (kickTarget - this.audioEnergy.kick) * kickLerp;
this.audioEnergy.instrumental += (instTarget - this.audioEnergy.instrumental) * instLerp;
const clampedKick = clamp(kickTarget, 0, 1.4);
const kickImpulse = clamp(clampedKick - this.prevKickRaw, 0, 1);
this.prevKickRaw = this.prevKickRaw * 0.45 + clampedKick * 0.55;
if (kickImpulse > 0.14 && !this.isDragging) {
this.kickBobVel += kickImpulse * 42;
this.kickZoomPulse = Math.max(this.kickZoomPulse, kickImpulse * 0.85);
}
this.kickBobVel += (-72 * this.kickBobY - 15 * this.kickBobVel) * simDt;
this.kickBobY = clamp(this.kickBobY + this.kickBobVel * simDt, -10, 14);
this.kickZoomPulse *= Math.exp(-dt * 7.5);
const targetMotionEnv = this.isDragging ? 0 : (frameState.isPlaying ? 1.0 : 0.48);
this.ambientMotionEnv += (targetMotionEnv - this.ambientMotionEnv) * expSmoothing(dt, 3.2);
const bobX = (Math.sin(nowSec * 0.37) * 5.5 + Math.cos(nowSec * 0.23) * 3.0) * this.ambientMotionEnv;
const bobY = (Math.cos(nowSec * 0.43) * 6.5 + Math.sin(nowSec * 0.19) * 3.5) * this.ambientMotionEnv + this.kickBobY;
const cx = w * 0.5 + bobX;
const cy = h * 0.48 + bobY;
this.lastCx = cx;
this.lastCy = cy;
const minDim = w < h ? w : h;
const targetZoom = clamp(this.settings.zoom ?? 1.0, 0.45, 2.4);
this.currentZoom += (targetZoom - this.currentZoom) * expSmoothing(dt, 10);
const domeRadius =
((minDim * 0.30) / CONSTELLATION_ANGULAR_RADIUS) *
this.currentZoom *
(1 + this.kickZoomPulse * 0.014);
this.lastDomeRadius = domeRadius;
if (
Math.max(this.audioEnergy.kick, this.audioEnergy.beat * 0.85) > 0.65 &&
nowSec - this.lastBeatShootingStarAt > 3.2 &&
this.settings.effectsIntensity > 0.2
) {
this.lastBeatShootingStarAt = nowSec;
this._spawnShootingStar(nowSec);
}
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
const inst = clamp(this.audioEnergy.instrumental, 0, 1.3);
const driftScale = this.ambientMotionEnv * (1 + inst * 0.35);
const halfZ = (Math.sin(nowSec * 0.21) * 0.014 + Math.sin(nowSec * 0.09) * 0.008) * driftScale * 0.5;
const halfX = (Math.cos(nowSec * 0.16) * 0.010 + Math.sin(nowSec * 0.27) * 0.005) * driftScale * 0.5;
const halfY = (Math.sin(nowSec * 0.13) * 0.011 + Math.cos(nowSec * 0.31) * 0.004) * driftScale * 0.5;
this._qBreathZ[2] = Math.sin(halfZ);
this._qBreathZ[3] = Math.cos(halfZ);
this._qBreathX[0] = Math.sin(halfX);
this._qBreathX[3] = Math.cos(halfX);
this._qBreathY[1] = Math.sin(halfY);
this._qBreathY[3] = Math.cos(halfY);
quatMulInto(this._qTemp, this._qBreathZ, this._qBreathX);
quatMulInto(this._qTemp2, this._qTemp, this._qBreathY);
quatMulInto(this._qRender, this._qTemp2, this.qCamera);
const m = quatToMat3(this._qRender, this.rotMat);
const bgCx = w * 0.5 + bobX * 0.62;
const bgCy = h * 0.48 + bobY * 0.62;
this._drawSphereBackgroundStars(ctx, nowSec, bgCx, bgCy, domeRadius, m);
if (this.settings.showEquator) {
this._drawCelestialEquator(ctx, m, cx, cy, domeRadius);
}
if (this.settings.showDeepSky) {
this._drawDeepSkyObjects(ctx, m, cx, cy, domeRadius, nowSec);
}
if (nowSec >= this.nextShootingStarAt) {
this._spawnShootingStar(nowSec);
}
if (this.shootingStars.length > 0) {
this._drawShootingStars(ctx, dt);
}
this._drawAllAmbientConstellations(ctx, m, cx, cy, domeRadius, nowSec);
if (this.settings.showDeepSky) {
this._drawSolarSystem(ctx, m, cx, cy, domeRadius);
}
if (this.settings.showSatellites) {
this._drawSpacecraftAndSatellites(ctx, m, cx, cy, domeRadius, nowSec);
}
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
if (this.settings.hoverInspector && this.hoveredTarget) {
this._drawHoverReticle(ctx, this.hoveredTarget, nowSec);
}
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
_initCelestialEquator() {
this.equatorDirs = new Float32Array(EQUATOR_SEGMENTS * 3);
for (let i = 0; i < EQUATOR_SEGMENTS; i++) {
const ra = (i / EQUATOR_SEGMENTS) * Math.PI * 2;
const o = i * 3;
this.equatorDirs[o] = Math.cos(ra);
this.equatorDirs[o + 1] = Math.sin(ra);
this.equatorDirs[o + 2] = 0;
}
this.equatorTicks = new Float32Array(24 * 6);
this.equatorLabels = [];
for (let h = 0; h < 24; h++) {
const decSpan = h % 6 === 0 ? 1.35 : 0.9;
const a = raDecToVec3(h, -decSpan);
const b = raDecToVec3(h, decSpan);
const o = h * 6;
this.equatorTicks[o] = a[0];
this.equatorTicks[o + 1] = a[1];
this.equatorTicks[o + 2] = a[2];
this.equatorTicks[o + 3] = b[0];
this.equatorTicks[o + 4] = b[1];
this.equatorTicks[o + 5] = b[2];
if (h % 2 === 0) {
this.equatorLabels.push({
text: `${h}h`,
dir: raDecToVec3(h, 2.1),
});
}
}
}
_drawSphereBackgroundStars(ctx, nowSec, cx, cy, domeRadius, m) {
const bright = this.settings.starBrightness;
const trebleBoost = 1 + clamp(this.audioEnergy.instrumental * 0.32 + this.audioEnergy.treble * 0.22, 0, 0.72);
const bassBoost = 1 + clamp(this.audioEnergy.kick * 0.28 + this.audioEnergy.bass * 0.08, 0, 0.42);
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
const ck = domeRadius / (1 + (cz < 1.22 ? (1 - cz) * 0.28 : -0.0616));
const csx = cx + (m00 * cd[0] + m01 * cd[1] + m02 * cd[2]) * ck;
const csy = cy + (m10 * cd[0] + m11 * cd[1] + m12 * cd[2]) * ck;
const boundPx = ck * sky.boundScale + 40;
if (csx + boundPx < 0 || csx - boundPx > w || csy + boundPx < 0 || csy - boundPx > h) {
continue;
}
const proj = this._projectSkyConstellation(sky, m, cx, cy, domeRadius);
const limbFade = clamp((cz + 0.12) * 1.45, 0, 1);
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
const ambPulse = 1 + clamp(this.audioEnergy.instrumental * 0.28 + this.audioEnergy.kick * 0.14, 0, 0.45);
const bandAlphas = [
0.022 * lineMult * ambPulse,
0.052 * lineMult * ambPulse,
0.086 * lineMult * ambPulse,
];
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
_drawCelestialEquator(ctx, m, cx, cy, domeRadius) {
const dirs = this.equatorDirs;
const ticks = this.equatorTicks;
if (!dirs || !ticks) return;
const lineMult = this.settings.lineOpacity;
const luts = this.themeLuts;
const m00 = m[0], m01 = m[1], m02 = m[2];
const m10 = m[3], m11 = m[4], m12 = m[5];
const m20 = m[6], m21 = m[7], m22 = m[8];
const maxJumpX = this.width * 0.7;
const maxJumpY = this.height * 0.7;
let drawing = false;
let prevSx = 0;
let prevSy = 0;
let firstVisible = false;
let firstSx = 0;
let firstSy = 0;
ctx.strokeStyle = luts.heroLine[alphaIdx(clamp(0.16 * lineMult, 0.05, 0.34))];
ctx.lineWidth = 1.05;
ctx.setLineDash(EQUATOR_DASH);
ctx.beginPath();
for (let i = 0; i < EQUATOR_SEGMENTS; i++) {
const o = i * 3;
const dx = dirs[o], dy = dirs[o + 1], dz = dirs[o + 2];
const vz = m20 * dx + m21 * dy + m22 * dz;
if (vz <= 0.04) {
drawing = false;
continue;
}
const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
const sx = cx + (m00 * dx + m01 * dy + m02 * dz) * k;
const sy = cy + (m10 * dx + m11 * dy + m12 * dz) * k;
if (i === 0) {
firstVisible = true;
firstSx = sx;
firstSy = sy;
}
if (!drawing || Math.abs(sx - prevSx) > maxJumpX || Math.abs(sy - prevSy) > maxJumpY) {
ctx.moveTo(sx, sy);
drawing = true;
} else {
ctx.lineTo(sx, sy);
}
prevSx = sx;
prevSy = sy;
}
if (drawing && firstVisible && Math.abs(firstSx - prevSx) <= maxJumpX && Math.abs(firstSy - prevSy) <= maxJumpY) {
ctx.lineTo(firstSx, firstSy);
}
ctx.stroke();
ctx.setLineDash(NO_DASH);
ctx.strokeStyle = luts.heroLine[alphaIdx(clamp(0.24 * lineMult, 0.08, 0.45))];
ctx.lineWidth = 1.0;
ctx.beginPath();
for (let h = 0; h < 24; h++) {
const o = h * 6;
const ax = ticks[o], ay = ticks[o + 1], az = ticks[o + 2];
const bx = ticks[o + 3], by = ticks[o + 4], bz = ticks[o + 5];
const vza = m20 * ax + m21 * ay + m22 * az;
const vzb = m20 * bx + m21 * by + m22 * bz;
if (vza <= 0.06 || vzb <= 0.06) continue;
const ka = domeRadius / (1 + (vza < 1.22 ? (1 - vza) * 0.28 : -0.0616));
const kb = domeRadius / (1 + (vzb < 1.22 ? (1 - vzb) * 0.28 : -0.0616));
ctx.moveTo(cx + (m00 * ax + m01 * ay + m02 * az) * ka, cy + (m10 * ax + m11 * ay + m12 * az) * ka);
ctx.lineTo(cx + (m00 * bx + m01 * by + m02 * bz) * kb, cy + (m10 * bx + m11 * by + m12 * bz) * kb);
}
ctx.stroke();
if (this.showLabels) {
const labelColor = this.theme.ambLabelHex || this.theme.brand;
const margin = 40;
const maxX = this.width - margin;
const maxY = this.bottomClearY > 80 ? this.bottomClearY - 24 : this.height - margin;
let bestZ = 0.35;
let bestLx = 0;
let bestLy = 0;
for (let i = 0; i < this.equatorLabels.length; i++) {
const lbl = this.equatorLabels[i];
const d = lbl.dir;
const vz = m20 * d[0] + m21 * d[1] + m22 * d[2];
if (vz <= 0.22) continue;
const k = domeRadius / (1 + (vz < 1.22 ? (1 - vz) * 0.28 : -0.0616));
const lx = cx + (m00 * d[0] + m01 * d[1] + m02 * d[2]) * k;
const ly = cy + (m10 * d[0] + m11 * d[1] + m12 * d[2]) * k;
if (lx > margin && lx < maxX && ly > margin && ly < maxY) {
this._drawMiniLabel(ctx, lbl.text, 8.5, 500, labelColor, lx, ly, clamp(0.32 * vz * lineMult, 0.1, 0.42), true);
if (vz > bestZ) {
bestZ = vz;
bestLx = lx;
bestLy = ly;
}
}
}
if (bestLx > 0) {
this._drawMiniLabel(
ctx,
'CELESTIAL EQUATOR',
8.5,
600,
labelColor,
bestLx,
bestLy - 13,
clamp(0.34 * bestZ * lineMult, 0.12, 0.45),
true
);
}
}
}
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
const m = this.rotMat;
const m00 = m[0], m01 = m[1], m02 = m[2];
const m10 = m[3], m11 = m[4], m12 = m[5];
const m20 = m[6], m21 = m[7], m22 = m[8];
const cx = this.lastCx || this.width * 0.5;
const cy = this.lastCy || this.height * 0.48;
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
this._releaseCurrentLyricBubbles();
const seq = hero.sequence && hero.sequence.length ? hero.sequence : null;
const seqLen = seq ? seq.length : hero.stars.length;
const energy = Math.max(
this.audioEnergy.kick,
this.audioEnergy.instrumental * 0.92,
this.audioEnergy.beat * 0.72
);
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
const kick = clamp(this.audioEnergy.kick, 0, 1.3);
const inst = clamp(this.audioEnergy.instrumental, 0, 1.3);
const beat = clamp(this.audioEnergy.beat, 0, 1.2);
const luts = this.themeLuts;
ctx.strokeStyle = luts.heroLine[alphaIdx(clamp(0.18 + inst * 0.18 + kick * 0.08, 0.1, 0.55) * fadeIn * lineMult)];
ctx.lineWidth = 1.1 + inst * 0.55;
ctx.beginPath();
for (let e = 0; e < edgesFlat.length; e += 2) {
const sa = proj[edgesFlat[e]];
const sb = proj[edgesFlat[e + 1]];
if (sa.z <= -0.15 && sb.z <= -0.15) continue;
ctx.moveTo(sa.sx, sa.sy);
ctx.lineTo(sb.sx, sb.sy);
}
ctx.stroke();
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
const edgeGlow = maxG * 0.72 + minG * 0.28 + inst * 0.28 + kick * 0.10;
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
const aAlpha = clamp((0.18 + ga * 0.75 + inst * 0.20) * fadeIn * lineMult, 0, 0.98);
const bAlpha = clamp((0.18 + gb * 0.75 + inst * 0.20) * fadeIn * lineMult, 0, 0.98);
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
if (
kick > 0.72 &&
nowSec - this.lastKickRippleAt >= 0.26 &&
fx > 0.2 &&
this.ripples.length < 28 &&
proj.length > 0
) {
const rippleStar = activeStarIdx >= 0 ? proj[activeStarIdx] : proj[0];
if (rippleStar && rippleStar.z > 0.05) {
this.lastKickRippleAt = nowSec;
this.ripples.push({
x: rippleStar.sx,
y: rippleStar.sy,
radius: 4,
maxRadius: 34 * (0.7 + fx * 0.35),
alpha: 0.42 * Math.min(1.1, fx) * fadeIn,
speed: 74,
color: rippleStar.renderColor || this.theme.brand,
});
}
}
for (let i = 0; i < proj.length; i++) {
const s = proj[i];
if (s.z <= 0.01) continue;
const sCol = s.renderColor;
const starLimb = clamp((s.z - 0.01) * 2.5, 0, 1);
const glow = clamp((this.starGlow[i] || 0) + kick * 0.34 + inst * 0.20 + beat * 0.08, 0, 1.45);
const isActiveStar = i === activeStarIdx;
const twinkle = 0.85 + 0.15 * Math.sin(nowSec * 2.6 + i * 1.9);
const baseR = this._computeStarRadius(s.mag, true, bright) * (1 + kick * 0.28 + bass * 0.08);
const starR = baseR * (1 + glow * (0.95 + fx * 0.25)) * fadeIn * starLimb;
const haloR = starR * (4.4 + glow * (6.2 + fx * 2.5) + kick * 2.4 + beat * 0.8);
const bloomAlpha = clamp((0.26 + glow * 0.72) * fadeIn * twinkle * (0.65 + bright * 0.35), 0, 0.98);
this._drawStarSprite(ctx, s.sx, s.sy, haloR, sCol, bloomAlpha);
if (glow > 0.1 || s.mag < 1.4) {
const spikeStrength = Math.max(glow, s.mag < 1.4 ? 0.38 : 0) * fadeIn * clamp(0.45 + fx * 0.65, 0.25, 1.5);
const spikeLen = starR * (3.8 + glow * (5.6 + fx * 1.8) + kick * 1.6);
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
const __MATH_DEBUG__ = { rotateVecByQuat, quatSlerp, quatToMat3 };
// === we-lyrics.js ===
const DEFAULT_LYRIC_HIERARCHY = [
{ id: 'limusic', tier: 1 },
{ id: 'boidu', tier: 1 },
{ id: 'lyricsplus', tier: 2 },
{ id: 'unison', tier: 3 },
{ id: 'lrclib', tier: 3 },
{ id: 'netease', tier: 3 },
{ id: 'ytmusic', tier: 3 },
{ id: 'qqmusic', tier: 3 },
{ id: 'kugou', tier: 3 },
];
const DEFAULT_TIER_BY_ID = Object.fromEntries(DEFAULT_LYRIC_HIERARCHY.map((e) => [e.id, e.tier]));
function normalizeLyricHierarchy(raw) {
const seen = new Set();
const list = [];
if (Array.isArray(raw)) {
for (const item of raw) {
const id = typeof item?.id === 'string' ? item.id.trim() : '';
if (!id || !(id in DEFAULT_TIER_BY_ID) || seen.has(id)) continue;
seen.add(id);
const t = Number(item.tier);
const tier = Number.isFinite(t) ? Math.max(1, Math.min(3, Math.round(t))) : DEFAULT_TIER_BY_ID[id];
list.push({ id, tier });
}
}
for (const def of DEFAULT_LYRIC_HIERARCHY) {
if (!seen.has(def.id)) {
list.push({ id: def.id, tier: def.tier });
}
}
list.sort((a, b) => a.tier - b.tier);
return list;
}
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
async function fetchLyricsInBrowser(trackKey, rawTitle, rawArtist, album, durationSec, prefs = {}) {
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
const hierarchy = normalizeLyricHierarchy(prefs.hierarchy);
const plainCandidates = [];
if (preferred !== 'auto' && isEnabled[preferred]) {
const prefRes = await fetchProvider(preferred);
if (prefRes?.synced) return prefRes;
if (prefRes?.found) plainCandidates.push(prefRes);
}
for (let tier = 1; tier <= 3; tier++) {
const tierIds = hierarchy
.filter((entry) => entry.tier === tier && entry.id !== preferred && isEnabled[entry.id])
.map((entry) => entry.id);
if (tierIds.length === 0) continue;
const res = await Promise.all(tierIds.map((id) => fetchProvider(id)));
const best = selectStageResult(res, plainCandidates);
if (best) return best;
}
return plainCandidates[0] || empty;
}
// === app.js ===
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
showEquator: true,
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
lyricHierarchy: DEFAULT_LYRIC_HIERARCHY.map((e) => ({ ...e })),
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
const optEquator = document.getElementById('opt-equator');
const optInstrumental = document.getElementById('opt-instrumental');
const optHoverInspector = document.getElementById('opt-hover-inspector');
const optProportionalSizes = document.getElementById('opt-proportional-sizes');
const optFreeExplore = document.getElementById('opt-free-explore');
const optPlayerControls = document.getElementById('opt-player-controls');
const LYRIC_PROVIDER_META = {
limusic: { key: 'enableLimusic', label: 'Limusic (via Boidu)' },
boidu: { key: 'enableBoidu', label: 'Boidu · Better Lyrics' },
lyricsplus: { key: 'enableLyricsplus', label: 'LyricsPlus' },
unison: { key: 'enableUnison', label: 'Unison' },
lrclib: { key: 'enableLrclib', label: 'LRCLIB' },
netease: { key: 'enableNetease', label: 'Netease Cloud Music' },
ytmusic: { key: 'enableYtmusic', label: 'YouTube Music' },
qqmusic: { key: 'enableQqmusic', label: 'QQ Music' },
kugou: { key: 'enableKugou', label: 'Kugou' },
};
const optLyricPreferred = document.getElementById('opt-lyric-preferred');
const lyricHierarchyList = document.getElementById('lyric-hierarchy-list');
const btnResetHierarchy = document.getElementById('btn-reset-hierarchy');
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
const merged = raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
merged.lyricHierarchy = normalizeLyricHierarchy(merged.lyricHierarchy);
return merged;
} catch {
return { ...DEFAULT_SETTINGS, lyricHierarchy: normalizeLyricHierarchy(DEFAULT_SETTINGS.lyricHierarchy) };
}
}
function saveSettings(settings) {
try {
localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
} catch {
}
}
const initialSettings = loadSettings();
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
ctrlHeld: false,
ctrlHoverActive: false,
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
weLastLookupDurSec: 0,
docHiddenPaused: false,
rafScheduled: false,
weTargetFps: 0,
weBassAvg: 0.01,
weBeatEnv: 0,
weSubAvg: 0.008,
wePrevSub: 0,
weKickEnv: 0,
weLastKickMs: 0,
weInstEnv: 0,
weLyricsCache: new Map(),
audioLevels: { bass: 0, mid: 0, treble: 0, rms: 0, beat: 0, kick: 0, instrumental: 0 },
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
showEquator: s.showEquator,
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
if (optEquator) optEquator.checked = Boolean(s.showEquator);
optInstrumental.checked = Boolean(s.instrumentalMode);
optHoverInspector.checked = Boolean(s.hoverInspector);
optProportionalSizes.checked = Boolean(s.proportionalSizes);
optFreeExplore.checked = Boolean(s.freeExplore);
optPlayerControls.checked = Boolean(s.showPlayerControls);
optLyricPreferred.value = s.lyricPreferred || 'auto';
renderLyricHierarchyList();
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
function renderLyricHierarchyList(refocus = null) {
const normalized = normalizeLyricHierarchy(state.settings.lyricHierarchy);
state.settings.lyricHierarchy = normalized;
if (!lyricHierarchyList) return;
lyricHierarchyList.textContent = '';
const frag = document.createDocumentFragment();
for (let idx = 0; idx < normalized.length; idx++) {
const entry = normalized[idx];
const meta = LYRIC_PROVIDER_META[entry.id];
if (!meta) continue;
const row = document.createElement('div');
row.className = 'hierarchy-row';
row.dataset.provider = entry.id;
const checkLabel = document.createElement('label');
checkLabel.className = 'hierarchy-check';
checkLabel.htmlFor = `opt-prov-${entry.id}`;
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.id = `opt-prov-${entry.id}`;
checkbox.checked = Boolean(state.settings[meta.key]);
checkbox.addEventListener('change', () => {
state.settings[meta.key] = checkbox.checked;
applySettingsToApp(true);
syncLyricPrefsToBackend();
showToast(`${meta.label} ${checkbox.checked ? 'enabled' : 'disabled'}`);
});
const nameSpan = document.createElement('span');
nameSpan.className = 'hierarchy-name';
nameSpan.textContent = meta.label;
checkLabel.append(checkbox, nameSpan);
const controls = document.createElement('div');
controls.className = 'hierarchy-controls';
const select = document.createElement('select');
select.className = 'tier-select';
select.dataset.role = 'tier';
select.setAttribute('aria-label', `${meta.label} tier`);
for (let t = 1; t <= 3; t++) {
const opt = document.createElement('option');
opt.value = String(t);
opt.textContent = `T${t}`;
select.appendChild(opt);
}
select.value = String(entry.tier);
select.addEventListener('change', () => {
const nextTier = Math.max(1, Math.min(3, Number(select.value) || 3));
const nextList = normalized.map((item) =>
item.id === entry.id ? { id: item.id, tier: nextTier } : { ...item }
);
state.settings.lyricHierarchy = normalizeLyricHierarchy(nextList);
saveSettings(state.settings);
renderLyricHierarchyList({ id: entry.id, role: 'tier' });
syncLyricPrefsToBackend();
showToast(`${meta.label} assigned to Tier ${nextTier}`);
});
const btnUp = document.createElement('button');
btnUp.className = 'order-btn';
btnUp.type = 'button';
btnUp.dataset.role = 'up';
btnUp.textContent = '▲';
btnUp.title = 'Move higher';
btnUp.setAttribute('aria-label', `Move ${meta.label} higher`);
btnUp.disabled = idx === 0 && entry.tier === 1;
btnUp.addEventListener('click', () => {
const nextList = normalized.map((item) => ({ ...item }));
const cur = nextList[idx];
if (idx > 0 && nextList[idx - 1].tier === cur.tier) {
nextList[idx] = nextList[idx - 1];
nextList[idx - 1] = cur;
} else if (cur.tier > 1) {
cur.tier -= 1;
} else {
return;
}
state.settings.lyricHierarchy = normalizeLyricHierarchy(nextList);
saveSettings(state.settings);
renderLyricHierarchyList({ id: entry.id, role: 'up' });
syncLyricPrefsToBackend();
});
const btnDown = document.createElement('button');
btnDown.className = 'order-btn';
btnDown.type = 'button';
btnDown.dataset.role = 'down';
btnDown.textContent = '▼';
btnDown.title = 'Move lower';
btnDown.setAttribute('aria-label', `Move ${meta.label} lower`);
btnDown.disabled = idx === normalized.length - 1 && entry.tier === 3;
btnDown.addEventListener('click', () => {
const nextList = normalized.map((item) => ({ ...item }));
const cur = nextList[idx];
if (idx < nextList.length - 1 && nextList[idx + 1].tier === cur.tier) {
nextList[idx] = nextList[idx + 1];
nextList[idx + 1] = cur;
} else if (cur.tier < 3) {
cur.tier += 1;
const without = nextList.filter((_, i) => i !== idx);
const insertAt = without.findIndex((item) => item.tier >= cur.tier);
if (insertAt === -1) without.push(cur);
else without.splice(insertAt, 0, cur);
state.settings.lyricHierarchy = normalizeLyricHierarchy(without);
saveSettings(state.settings);
renderLyricHierarchyList({ id: entry.id, role: 'down' });
syncLyricPrefsToBackend();
return;
} else {
return;
}
state.settings.lyricHierarchy = normalizeLyricHierarchy(nextList);
saveSettings(state.settings);
renderLyricHierarchyList({ id: entry.id, role: 'down' });
syncLyricPrefsToBackend();
});
controls.append(select, btnUp, btnDown);
row.append(checkLabel, controls);
frag.appendChild(row);
}
lyricHierarchyList.appendChild(frag);
if (refocus) {
const targetRow = lyricHierarchyList.querySelector(`[data-provider="${refocus.id}"]`);
const targetEl = targetRow?.querySelector(`[data-role="${refocus.role}"]`);
if (targetEl && !targetEl.disabled) targetEl.focus();
}
}
function syncLyricPrefsToBackend() {
state.weLyricsCache.clear();
if (!invoke) {
if (state.media.hasSession) {
lookupBrowserLyrics(true);
}
return Promise.resolve();
}
return invoke('set_lyric_prefs', {
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
hierarchy: normalizeLyricHierarchy(state.settings.lyricHierarchy),
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
function getActiveLyricFrame(lines, timeSec) {
const len = lines ? lines.length : 0;
if (len === 0) return EMPTY_LYRIC_FRAME;
let foundIdx = -1;
const hint = state.lyricHintIdx;
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
const ALLOWED_CELESTIAL_ORIGINS = [
'https://en.wikipedia.org',
'https://simbad.cds.unistra.fr',
'https://science.nasa.gov',
];
function isAllowedCelestialUrl(candidate) {
try {
if ('Origin' in globalThis) {
const candOrigin = Origin.from(candidate);
return ALLOWED_CELESTIAL_ORIGINS.some((trusted) => candOrigin.isSameOrigin(Origin.from(trusted)));
}
const parsed = new URL(String(candidate));
return parsed.origin !== 'null' && ALLOWED_CELESTIAL_ORIGINS.includes(parsed.origin);
} catch {
return false;
}
}
async function openCelestialSourcePage(target) {
if (!target?.url || !isAllowedCelestialUrl(target.url)) return;
visualizer.triggerStarClickFeedback(target.x, target.y, target.color);
showToast(`Opening Wikipedia: ${target.name}`);
if (invoke) {
try {
await invoke('open_external_url', { url: target.url });
return;
} catch {
}
}
const opened = window.open(target.url, '_blank', 'noopener,noreferrer');
if (!opened) {
const a = document.createElement('a');
a.href = target.url;
a.target = '_blank';
a.rel = 'noopener noreferrer';
a.style.display = 'none';
document.body.appendChild(a);
a.click();
a.remove();
}
}
function setCtrlStarHover(active) {
const next = Boolean(active);
if (state.ctrlHoverActive === next) return;
state.ctrlHoverActive = next;
document.body.classList.toggle('ctrl-star-hover', next);
}
function hideInspector() {
if (!state.inspectorHidden) {
state.inspectorHidden = true;
elInspector.classList.add('hidden');
state.lastInspectedKey = '';
}
}
function updateStarInspector() {
if (!state.pointer.inside || state.settingsOpen || state.drag.active) {
if (visualizer.hoveredTarget) visualizer.hitTest(-9999, -9999);
setCtrlStarHover(false);
hideInspector();
return;
}
if (!state.settings.hoverInspector) {
if (visualizer.hoveredTarget) visualizer.hitTest(-9999, -9999);
hideInspector();
if (state.ctrlHeld) {
const ctrlHit = visualizer.pickCelestialAt(state.pointer.x, state.pointer.y);
setCtrlStarHover(Boolean(ctrlHit?.url));
} else {
setCtrlStarHover(false);
}
return;
}
const hit = visualizer.hitTest(state.pointer.x, state.pointer.y);
if (!hit) {
setCtrlStarHover(false);
hideInspector();
return;
}
setCtrlStarHover(Boolean(state.ctrlHeld && hit.url));
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
if (state.settings.freeExplore) {
const nearest = visualizer.getNearestConstellationIndex();
if (nearest !== state.lastExploreNearestIdx) {
state.lastExploreNearestIdx = nearest;
optConstellation.value = String(nearest);
updateFactCard(nearest);
}
}
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
state.ctrlHeld = Boolean(e.ctrlKey || e.metaKey);
showHud(false);
if (e.target === canvas) {
state.pointer.x = e.clientX;
state.pointer.y = e.clientY;
state.pointer.inside = true;
visualizer.pointerActiveUntil = performance.now() + 400;
} else {
state.pointer.inside = false;
setCtrlStarHover(false);
}
});
document.addEventListener('mouseleave', () => {
state.pointer.inside = false;
setCtrlStarHover(false);
});
window.addEventListener('blur', () => {
state.ctrlHeld = false;
setCtrlStarHover(false);
});
window.addEventListener('keyup', (e) => {
if (e.key === 'Control' || e.key === 'Meta') {
state.ctrlHeld = false;
setCtrlStarHover(false);
}
});
canvas.addEventListener('wheel', (e) => {
e.preventDefault();
const step = e.deltaY < 0 ? 0.1 : -0.1;
adjustZoom(step, true);
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
if (e.button === 0 && (e.ctrlKey || e.metaKey)) {
const hit = visualizer.pickCelestialAt(e.clientX, e.clientY);
if (hit?.url) {
e.preventDefault();
e.stopPropagation();
openCelestialSourcePage(hit);
return;
}
}
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
if (optEquator) {
optEquator.addEventListener('change', () => {
state.settings.showEquator = optEquator.checked;
applySettingsToApp(true);
showToast(state.settings.showEquator ? 'Celestial equator shown' : 'Celestial equator hidden');
});
}
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
if (btnResetHierarchy) {
btnResetHierarchy.addEventListener('click', () => {
state.settings.lyricHierarchy = DEFAULT_LYRIC_HIERARCHY.map((e) => ({ ...e }));
applySettingsToApp(true);
syncLyricPrefsToBackend();
showToast('Lyric hierarchy reset to default');
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
if (e.key === 'Control' || e.key === 'Meta') {
state.ctrlHeld = true;
}
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
let weLookupTimer = null;
function scheduleWeLyricsLookup(force = false, delayMs = 140) {
clearTimeout(weLookupTimer);
weLookupTimer = setTimeout(() => {
lookupBrowserLyrics(force);
}, delayMs);
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
state.weLastLookupDurSec = m.endSec || 0;
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
hierarchy: normalizeLyricHierarchy(state.settings.lyricHierarchy),
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
const len = audioArray.length;
const half = Math.min(64, (len >> 1) || len);
const hasStereo = len >= half * 2;
let subSum = 0;
let bass = 0;
let mid = 0;
let treble = 0;
let sideInst = 0;
let airSum = 0;
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
if (i >= 4 && i < 48) {
sideInst += Math.abs(l - r);
}
}
total += v;
if (i < 3) subSum += v;
if (i < 6) bass += v;
else if (i < 28) mid += v;
else treble += v;
if (i >= 32) airSum += v;
}
const nSub = Math.min(1, (subSum / 3) * 2.0);
const nBass = Math.min(1, (bass / 6) * 1.8);
const nMid = Math.min(1, (mid / 22) * 2.2);
const nTreble = Math.min(1, (treble / Math.max(1, half - 28)) * 2.6);
const nRms = Math.min(1, (total / half) * 2.0);
const nSide = hasStereo ? Math.min(1, (sideInst / Math.max(1, Math.min(44, half - 4))) * 3.8) : 0;
const nAir = Math.min(1, (airSum / Math.max(1, half - 32)) * 2.8);
const rawInst = Math.min(1, nSide * 0.68 + nSub * 0.34 + nAir * 0.24);
state.weInstEnv = rawInst > state.weInstEnv
? state.weInstEnv * 0.50 + rawInst * 0.50
: state.weInstEnv * 0.78 + rawInst * 0.22;
state.weBassAvg = state.weBassAvg * 0.92 + nBass * 0.08;
if (nBass > state.weBassAvg * 1.38 && nBass > 0.14) {
state.weBeatEnv = 1.0;
} else {
state.weBeatEnv *= 0.82;
}
const subFlux = Math.max(0, nSub - state.wePrevSub);
state.wePrevSub = state.wePrevSub * 0.35 + nSub * 0.65;
state.weSubAvg = state.weSubAvg * 0.93 + nSub * 0.07;
const nowMs = performance.now();
if (
nowMs - state.weLastKickMs >= 130 &&
nSub > 0.14 &&
(nSub > state.weSubAvg * 1.48 || (subFlux > 0.07 && nSub > state.weSubAvg * 1.25))
) {
state.weKickEnv = 1.0;
state.weLastKickMs = nowMs;
} else {
state.weKickEnv *= 0.72;
}
const al = state.audioLevels;
al.bass = nBass;
al.mid = nMid;
al.treble = nTreble;
al.rms = nRms;
al.beat = state.weBeatEnv;
al.kick = state.weKickEnv;
al.instrumental = state.weInstEnv;
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
if (props.showequator && props.showequator.value !== undefined) {
state.settings.showEquator = Boolean(props.showequator.value);
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
const nextPref = String(props.lyricpreferred.value);
if (nextPref !== state.settings.lyricPreferred) {
state.settings.lyricPreferred = nextPref;
state.weLyricsCache.clear();
if (!invoke && state.media.hasSession) {
scheduleWeLyricsLookup(true, 40);
}
}
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
state.weLastLookupDurSec = 0;
scheduleWeLyricsLookup(false, 140);
} else if (!hasSession) {
clearTimeout(weLookupTimer);
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
const nextDur = Number(evt.duration) || 0;
applyMediaUpdate({
...state.media,
positionSec: Number(evt.position) || 0,
endSec: nextDur,
lastUpdatedMs: Date.now(),
sampledAtMs: Date.now(),
});
if (
!invoke &&
state.media.hasSession &&
state.weLastLookupDurSec < 5 &&
nextDur >= 10 &&
!state.lyricsLoading
) {
const pref = state.settings.lyricPreferred || 'auto';
const src = String(state.lyrics.source || '');
const hitTopOrPref =
pref !== 'auto'
? src.startsWith(`${pref}:`)
: src.startsWith('limusic:') || src.startsWith('boidu:');
if (!state.lyrics.synced || !hitTopOrPref) {
state.weLastLookupDurSec = nextDur;
state.weLyricsCache.delete(state.currentTrackKey);
scheduleWeLyricsLookup(true, 60);
}
}
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
al.kick = p.kick || 0;
al.instrumental = p.instrumental || 0;
}
});
await listen('wallpaper-mode', (event) => {
applyWallpaperMode(Boolean(event.payload));
});
try {
await syncLyricPrefsToBackend();
const initial = await invoke('get_initial_state');
if (initial?.wallpaperMode) applyWallpaperMode(true);
if (initial?.media) applyMediaUpdate(initial.media);
state.lyricsLoading = Boolean(initial?.lyricsLoading);
if (initial?.lyrics && (!initial.lyrics.trackKey || initial.lyrics.trackKey === state.currentTrackKey)) {
applyLyricsUpdate(initial.lyrics, state.lyricsLoading);
}
} catch {
}
}
scheduleTick();
}
registerWallpaperEngineHooks();
init();
})();
