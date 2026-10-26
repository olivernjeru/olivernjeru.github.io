import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { injectSharedHead, PLACEHOLDER, sharedHead, themeScript } from './sharedHead.js';
import { FAVICON_DARK, FAVICON_LIGHT, THEME_STORAGE_KEY } from '../src/themeConfig.js';

// Not `new URL(file, import.meta.url)`: Vite rewrites that pattern into a
// dev-server asset URL (http://localhost:3000/...), even under Vitest.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', 'publications.html', 'privacy.html', '404.html'];
const fromRoot = (...parts) => path.join(ROOT, ...parts);
const read = (file) => fs.readFileSync(fromRoot(file), 'utf8');

describe('injectSharedHead', () => {
  const page = `<head>\n  <meta charset="utf-8" />\n  ${PLACEHOLDER}\n  <title>$& test</title>\n</head>`;

  it('replaces the placeholder with the shared head block', () => {
    const html = injectSharedHead(page);
    expect(html).not.toContain(PLACEHOLDER);
    expect(html).toContain('viewport-fit=cover');
    expect(html).toContain('http-equiv="Content-Security-Policy"');
    expect(html).toContain(`<link rel="icon" type="image/svg+xml" href="${FAVICON_LIGHT}" />`);
    expect(html).toContain('rel="apple-touch-icon"');
    expect(html).toContain('<link rel="manifest" href="/manifest.json" />');
    expect(html).toContain('<script>');
  });

  it('leaves out meta tags that browsers only honor as HTTP headers', () => {
    const html = injectSharedHead(page);
    expect(html).not.toContain('X-Content-Type-Options');
    expect(html).not.toContain('Permissions-Policy');
    expect(html).toContain('<meta name="referrer" content="strict-origin-when-cross-origin" />');
  });

  it('places the theme script after the favicon it swaps', () => {
    const html = injectSharedHead(page);
    expect(html.indexOf('<script>')).toBeGreaterThan(html.indexOf('rel="icon"'));
  });

  it('leaves "$" sequences elsewhere in the page alone', () => {
    expect(injectSharedHead(page)).toContain('<title>$& test</title>');
  });

  it('fails loudly when the placeholder is missing or repeated', () => {
    expect(() => injectSharedHead('<head></head>', 'x.html')).toThrow(/x\.html.*found 0/);
    expect(() => injectSharedHead(`<head>${PLACEHOLDER}${PLACEHOLDER}</head>`)).toThrow(/found 2/);
  });

  it('runs as a pre-order transformIndexHtml hook', () => {
    const { transformIndexHtml } = sharedHead();
    expect(transformIndexHtml.order).toBe('pre');
    expect(transformIndexHtml.handler(page, { filename: 'page.html' })).toContain('<script>');
  });
});

describe('pre-paint theme script', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.head.innerHTML = '';
  });

  const run = () => {
    document.head.innerHTML = `<link rel="icon" type="image/svg+xml" href="${FAVICON_LIGHT}">`;
    new Function(themeScript)();
    return {
      theme: document.documentElement.getAttribute('data-theme'),
      icon: document.querySelector('link[rel="icon"]').getAttribute('href'),
    };
  };

  it('applies the saved theme and matching favicon', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    expect(run()).toEqual({ theme: 'light', icon: FAVICON_LIGHT });
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(run()).toEqual({ theme: 'dark', icon: FAVICON_DARK });
  });

  it('falls back to the OS preference (dark in the test setup) when nothing is saved', () => {
    expect(run()).toEqual({ theme: 'dark', icon: FAVICON_DARK });
  });
});

describe('HTML pages', () => {
  it.each(PAGES)('%s has the placeholder, a page language, and an existing module entry', (file) => {
    const html = read(file);
    expect(html.split(PLACEHOLDER).length - 1).toBe(1);
    expect(html).toMatch(/<html lang="en-US"/);
    const entry = html.match(/<script type="module" src="([^"]+)"><\/script>/);
    expect(entry).not.toBeNull();
    expect(fs.existsSync(fromRoot(entry[1]))).toBe(true);
  });

  // Vite copies public/ into dist/ and then writes the built page over it, so a
  // copy there would be a dead duplicate that silently goes stale.
  it.each(PAGES)('%s has no stale duplicate in public/', (file) => {
    expect(fs.existsSync(fromRoot('public', file))).toBe(false);
  });

  it('404.html is never indexed and has no canonical URL', () => {
    const html = read('404.html');
    expect(html).toContain('<meta name="robots" content="noindex" />');
    expect(html).not.toContain('rel="canonical"');
  });
});

// Files without a <head> (PDFs opened from the site, the Blindr demo) show
// /favicon.ico, so it must carry the brand icons rather than a leftover image.
describe('/favicon.ico', () => {
  const ico = fs.readFileSync(fromRoot('public', 'favicon.ico'));

  it('is a real icon file with 16, 32, and 48 px frames', () => {
    expect(ico.readUInt16LE(0)).toBe(0); // reserved
    expect(ico.readUInt16LE(2)).toBe(1); // type 1 = icon
    const count = ico.readUInt16LE(4);
    // Each 16-byte directory entry starts with width (0 means 256).
    const widths = Array.from({ length: count }, (_, i) => ico[6 + i * 16] || 256);
    expect(widths.sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });

  it('is the icon the Blindr demo links', () => {
    const blindr = read('public/components/blindr/index.html');
    expect(blindr).toContain('<link rel="icon" href="/favicon.ico"');
  });
});
