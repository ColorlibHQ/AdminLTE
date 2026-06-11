#!/usr/bin/env node
// scripts/social-preview.mjs
//
// Capture a 1280×640 GitHub social preview image of the dashboard.
// Serves the built static output over a tiny in-process HTTP server (no
// build-tool dependency), opens the dashboard at the exact viewport in light
// theme, and writes docs/social-preview.png.
//
// Usage:  npm run build && node scripts/social-preview.mjs
//
// Env:
//   SCALE=1|2            (default 1 — 1280×640; set 2 for retina 2560×1280)
//   PLAYWRIGHT_PATH=…    (resolve playwright from elsewhere if not a local dep)

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Per-repo config ──────────────────────────────────────────────────────
const SERVE_DIR = path.resolve(ROOT, 'dist'); // built static output
const PAGE = '/index.html'; // dashboard page
// ─────────────────────────────────────────────────────────────────────────

const OUT = path.resolve(ROOT, 'docs', 'social-preview.png');
const SCALE = Number(process.env.SCALE || 1);
const VIEWPORT = { width: 1280, height: 640 };

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject', '.map': 'application/json', '.txt': 'text/plain'
};

function serve(rootDir) {
  const server = http.createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      if (urlPath === '/') urlPath = '/index.html';
      const root = path.resolve(rootDir);
      let filePath = path.resolve(root, '.' + path.posix.normalize('/' + urlPath));
      if (filePath !== root && !filePath.startsWith(root + path.sep)) {
        res.statusCode = 403; res.end('forbidden'); return;
      }
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!existsSync(filePath)) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
      res.end(await readFile(filePath));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('server error');
    }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () =>
    resolve({ port: server.address().port, close: () => server.close() })));
}

async function main() {
  if (!existsSync(SERVE_DIR)) {
    console.error(`No build output at ${SERVE_DIR} — run the build first.`);
    process.exit(1);
  }
  mkdirSync(path.dirname(OUT), { recursive: true });
  const { port, close } = await serve(SERVE_DIR);
  const url = `http://127.0.0.1:${port}${PAGE}`;
  console.log(`→ light theme, ${VIEWPORT.width}×${VIEWPORT.height} @ ${SCALE}x  (${url})`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE, colorScheme: 'light' });
  const page = await ctx.newPage();

  // Force light theme across the common storage keys before any script runs.
  await page.addInitScript(() => {
    try {
      ['theme', 'color-theme', 'dash26-theme', 'lte.theme', 'data-theme'].forEach((k) =>
        localStorage.setItem(k, 'light'));
    } catch { /* ignore */ }
  });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.evaluate(() => {
    const h = document.documentElement;
    h.setAttribute('data-bs-theme', 'light');
    h.setAttribute('data-theme', 'light');
    h.classList.remove('dark', 'dark-mode', 'theme-dark');
  });
  await page.waitForTimeout(1800); // let charts/animations settle

  await page.screenshot({ path: OUT, fullPage: false, clip: { x: 0, y: 0, ...VIEWPORT } });
  await browser.close();
  close();

  console.log(`✓ ${path.relative(ROOT, OUT)}`);
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
