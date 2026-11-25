import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const uiDir = path.join(rootDir, 'ui');

const moduleFiles = [
  'constellations.js',
  'celestial.js',
  'visualizer.js',
  'we-lyrics.js',
  'app.js',
];

function stripModuleSyntax(source, filename) {
  let out = source;
  // Remove single-line or multi-line ES import statements
  out = out.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Strip `export ` prefixes on declarations
  out = out.replace(/^\s*export\s+(?=(?:const|let|var|function|async\s+function|class)\b)/gm, '');
  return `\n// === ${filename} ===\n${out.trim()}\n`;
}

const chunks = moduleFiles.map((file) => {
  const fullPath = path.join(uiDir, file);
  const src = fs.readFileSync(fullPath, 'utf8');
  return stripModuleSyntax(src, file);
});

const bundled = `// Auto-generated single-file classic bundle for Tauri and Wallpaper Engine CEF (file://).\n(function () {\n'use strict';\n${chunks.join('\n')}\n})();\n`;

const outPath = path.join(uiDir, 'bundle.js');
fs.writeFileSync(outPath, bundled, 'utf8');
execFileSync(process.execPath, ['--check', outPath], { stdio: 'inherit' });
console.log(`Built ${outPath} (${(bundled.length / 1024).toFixed(1)} KB)`);
