// Last step of `npm run build`: writes each page's server-rendered markup into
// its HTML file in dist/, so browsers, crawlers, and Google Scholar get the full
// content without running JavaScript. src/mount.jsx then hydrates that markup.
//
// Expects dist/ (client build) and dist-ssr/entry-server.js (`vite build --ssr`).
// Removes dist-ssr/ when done, so it is never deployed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');
const ROOT_DIV = '<div id="root"></div>';

const { PAGES, render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

// Every built page with an empty #root needs a renderer, and every renderer a page.
const shells = fs
  .readdirSync(DIST)
  .filter((file) => file.endsWith('.html'))
  .filter((file) => fs.readFileSync(path.join(DIST, file), 'utf8').includes(ROOT_DIV));
const unrendered = shells.filter((file) => !(file in PAGES));
if (unrendered.length > 0) {
  throw new Error(`No server renderer for ${unrendered.join(', ')}: add it to PAGES in src/entry-server.jsx`);
}

for (const [file, Page] of Object.entries(PAGES)) {
  const htmlPath = path.join(DIST, file);
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`${file} is in PAGES but was not built: add it to PAGES in vite.config.js`);
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (html.split(ROOT_DIV).length !== 2) {
    throw new Error(`${file} must contain exactly one ${ROOT_DIV}`);
  }
  const markup = render(Page);
  // A replacer function, so "$" sequences in the markup are never treated as patterns.
  fs.writeFileSync(htmlPath, html.replace(ROOT_DIV, () => `<div id="root">${markup}</div>`));
  process.stdout.write(`prerendered ${file} (${(markup.length / 1024).toFixed(1)} kB of markup)\n`);
}

fs.rmSync(SSR_DIR, { recursive: true, force: true });
