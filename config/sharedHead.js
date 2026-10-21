// Vite plugin: replaces <!-- hearth:shared-head --> in every HTML page with the
// <head> block all pages share (viewport, security meta, favicons, social
// defaults, pre-paint theme script). One source of truth, so pages cannot drift.
// Contract and rationale: config/README.md.

import { FAVICON_DARK, FAVICON_LIGHT, THEME_STORAGE_KEY } from "../src/themeConfig.js";

export const PLACEHOLDER = "<!-- hearth:shared-head -->";

const SITE_URL = "https://olivernjeru.github.io";
const OG_IMAGE = `${SITE_URL}/brand/favicons/og-image.png`;

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// Runs before first paint: applies the saved theme (or the OS preference) and
// the matching favicon, so light-mode visitors never see a dark flash.
// Mirrors readInitial() in src/theme.js. localStorage throws when storage is
// blocked (some private modes); the OS preference is the intended fallback.
export const themeScript = [
  "(function () {",
  "  var saved = null;",
  `  try { saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch (e) { /* storage blocked: use the OS preference */ }`,
  "  var mode = saved === 'light' || saved === 'dark' ? saved",
  "    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');",
  "  document.documentElement.setAttribute('data-theme', mode);",
  "  var icon = document.querySelector('link[rel=\"icon\"][type=\"image/svg+xml\"]');",
  `  if (icon) icon.href = mode === 'dark' ? ${JSON.stringify(FAVICON_DARK)} : ${JSON.stringify(FAVICON_LIGHT)};`,
  "})();",
].join("\n");

// Only meta tags browsers honor. X-Content-Type-Options and Permissions-Policy
// work solely as HTTP response headers, which GitHub Pages cannot set, so they
// are deliberately absent (see config/README.md). CSP and referrer work as meta.
export const sharedHeadMarkup = () =>
  [
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    '<meta name="referrer" content="strict-origin-when-cross-origin" />',
    `<meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />`,
    '<meta name="author" content="Oliver Njeru" />',
    '<meta name="theme-color" content="#c96442" />',
    '<meta name="msapplication-TileColor" content="#16140f" />',
    `<link rel="icon" type="image/svg+xml" href="${FAVICON_LIGHT}" />`,
    '<link rel="icon" type="image/png" sizes="48x48" href="/brand/favicons/favicon-48.png" />',
    '<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicons/favicon-32.png" />',
    '<link rel="icon" type="image/png" sizes="16x16" href="/brand/favicons/favicon-16.png" />',
    '<link rel="apple-touch-icon" sizes="180x180" href="/brand/favicons/apple-touch-icon.png" />',
    '<link rel="manifest" href="/manifest.json" />',
    '<meta property="og:site_name" content="Oliver Njeru" />',
    '<meta property="og:locale" content="en_US" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    // After the favicon links: the script swaps the SVG icon's href.
    `<script>\n${themeScript}\n</script>`,
  ].join("\n  ");

// Throws instead of skipping a page, so a missing or duplicated placeholder
// fails the dev server and the build rather than shipping an unbranded page.
export const injectSharedHead = (html, filename = "an HTML page") => {
  const count = html.split(PLACEHOLDER).length - 1;
  if (count !== 1) {
    throw new Error(
      `[hearth-shared-head] ${filename} must contain ${PLACEHOLDER} exactly once inside <head> (found ${count}).`
    );
  }
  // A replacer function, so "$" sequences in the markup are never treated as patterns.
  return html.replace(PLACEHOLDER, () => sharedHeadMarkup());
};

export const sharedHead = () => ({
  name: "hearth-shared-head",
  transformIndexHtml: {
    order: "pre",
    handler: (html, ctx) => injectSharedHead(html, ctx?.filename),
  },
});
