# config/

Build-time tooling that is not app code. (It lives here rather than in `build/`, which `.gitignore` ignores.)

## sharedHead.js: the `<head>` every page shares

A Vite plugin. In every HTML page it replaces `<!-- hearth:shared-head -->` with the block all pages share:

- viewport, including `viewport-fit=cover` (the safe-area insets in BackToTop and Lightbox rely on it)
- referrer policy and the Content Security Policy
- theme color, every favicon, the apple-touch icon, the web manifest
- Open Graph and Twitter defaults (site name, `en_US` locale, share image)
- the pre-paint theme script

**Contract.** Each page in the project root (`index.html`, `publications.html`, `privacy.html`, `404.html`) contains the placeholder exactly once, right after `<meta charset>`. If it is missing or repeated, the dev server and the build throw. Page-specific tags (title, description, canonical, robots, `og:url`/`og:title`/`og:description`, Twitter title and description, JSON-LD) stay in each HTML file.

**Why a plugin.** One source of truth. The old hand-written pages had drifted: missing favicons, no CSP, their own copies of the colors, and fonts that never loaded. The cost is one string replacement per page at build time, and nothing at runtime.

**Pre-paint theme script.** Runs before first paint. It reads `localStorage.hearthTheme` (key from `src/themeConfig.js`), falls back to the OS `prefers-color-scheme`, sets `data-theme` on `<html>`, and swaps the SVG favicon. It mirrors `readInitial()` in `src/theme.js`, and sits after the favicon links because it edits one. Reading storage can throw in some private-browsing modes; the OS preference is then the intended fallback. The header's theme icon and label are chosen by CSS from `data-theme`, so they are right from the first paint too.

## Security headers on GitHub Pages

- Browsers honor the **Content Security Policy** and **referrer policy** as meta tags, so they are here.
- `X-Content-Type-Options` and `Permissions-Policy` work only as HTTP response headers, and GitHub Pages does not let a site set headers. Their meta-tag versions were removed because they did nothing.
- GitHub Pages itself sends `Strict-Transport-Security` (checked October 2026). Adding other headers would need a host that supports them (for example a `_headers` file on Netlify or Cloudflare Pages); for a static site with no user data, the CSP covers the main risk.

## Gotcha

`injectSharedHead` passes a replacer function to `String.replace`: a replacement string would interpret `$&`-style patterns.

Tests: `config/sharedHead.test.js` covers placeholder handling, the absence of the header-only tags, the theme script's behavior in jsdom, and the contract for every page.
