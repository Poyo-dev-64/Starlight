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

function stripModuleSyntaxAndCompact(source, filename) {
  let out = source.replace(/\r\n/g, '\n');
  // Remove single-line or multi-line ES import statements
  out = out.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Strip `export ` prefixes on declarations
  out = out.replace(/^\s*export\s+(?=(?:const|let|var|function|async\s+function|class)\b)/gm, '');
  // Strip standalone JSDoc / block comments that start on their own line
  out = out.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '');

  // Safely strip full-line `//` comments & blank lines, and trim indentation outside template literals
  const lines = out.split('\n');
  const kept = [];
  let inTemplate = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!inTemplate) {
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('//')) {
        continue;
      }
      kept.push(trimmed);
    } else {
      kept.push(rawLine);
    }

    // Track unescaped backticks to never touch indentation inside multi-line template strings
    for (let c = 0; c < rawLine.length; c++) {
      if (rawLine.charCodeAt(c) === 96) {
        let backslashes = 0;
        let k = c - 1;
        while (k >= 0 && rawLine.charCodeAt(k) === 92) {
          backslashes++;
          k--;
        }
        if ((backslashes & 1) === 0) {
          inTemplate = !inTemplate;
        }
      }
    }
  }

  return `// === ${filename} ===\n${kept.join('\n')}`;
}

const chunks = moduleFiles.map((file) => {
  const fullPath = path.join(uiDir, file);
  const src = fs.readFileSync(fullPath, 'utf8');
  return stripModuleSyntaxAndCompact(src, file);
});

const bundled = `// Auto-generated single-file classic bundle for Tauri and Wallpaper Engine CEF (file://).\n(function () {\n'use strict';\n${chunks.join('\n')}\n})();\n`;

const outPath = path.join(uiDir, 'bundle.js');
fs.writeFileSync(outPath, bundled, 'utf8');
execFileSync(process.execPath, ['--check', outPath], { stdio: 'inherit' });
console.log(`Built ${outPath} (${(bundled.length / 1024).toFixed(1)} KB)`);
