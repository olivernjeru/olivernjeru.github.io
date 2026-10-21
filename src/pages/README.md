# src/pages/

The pages other than home. Each is wrapped in `PageShell` (`src/components/PageShell.jsx`): ThemeProvider, then Header, `<main>`, Footer, and BackToTop. So every page shares the header, footer, theme toggle, fonts, tokens, and `<head>` block with the home page.

| Page | HTML file (project root) | Entry module | Component | Notes |
| ---- | ------------------------ | ------------ | --------- | ----- |
| Home | `index.html` | `src/index.jsx` | `src/App.jsx` | Every section imported directly (no lazy loading) |
| Publications | `publications.html` | `src/entries/publications.jsx` | `PublicationsPage.jsx` | Reads `src/data/publications.js`; schema.org JSON-LD |
| Privacy | `privacy.html` | `src/entries/privacy.jsx` | `PrivacyPage.jsx` | Change "Last updated" only when the notice changes |
| Not found | `404.html` | `src/entries/notFound.jsx` | `NotFoundPage.jsx` | `noindex`, no canonical URL |

## How a page is built

`npm run build` runs three steps:

1. **Client build** (`vite build`): bundles each HTML file in `PAGES` (`vite.config.js`) with its entry module. `config/sharedHead.js` fills in the shared `<head>`.
2. **Server build** (`vite build --ssr src/entry-server.jsx`): bundles the same components for Node into `dist-ssr/`.
3. **Prerender** (`node scripts/prerender.mjs`): renders each page with React's `renderToString` (`src/entry-server.jsx` maps HTML file to component), writes the markup into that page's `<div id="root">` in `dist/`, then deletes `dist-ssr/`.

In the browser, `mount()` (`src/mount.jsx`) **hydrates** that markup. React attaches to the existing DOM instead of rebuilding it, so nothing shifts on load, `/#section` links land natively, and crawlers, Google Scholar, and visitors without JavaScript get the full content. In `npm run dev` the page is not prerendered, so `mount()` renders from scratch.

## Adding a page

1. Copy an existing root HTML file to `<name>.html`. Keep the placeholder, the `<html>` attributes, and an empty `<div id="root"></div>`; change the title, description, canonical URL, and social text.
2. Add `src/entries/<name>.jsx` and `src/pages/<Name>Page.jsx`, wrapped in `<PageShell page="<name>">`.
3. Register it in three places: `PAGES` in `vite.config.js`, `PAGES` in `src/entry-server.jsx`, and `PAGES` in `config/sharedHead.test.js`. The prerender script fails the build if the first two disagree.
4. To link it from the header or footer, add it to `NAV` in `Header.jsx` or `PAGE_LINKS` in `Footer.jsx`. The `page` value drives `aria-current`.
5. Add it to `public/sitemap.xml` if it should be indexed.

## The 404 page on GitHub Pages

GitHub Pages serves `404.html`, with HTTP status 404, for any path that does not exist, and it serves it *at that path*. Every URL in the page must therefore be root-absolute; Vite's `base: '/'` does this for assets.

The missing path is read after mount, because the prerendered HTML is built for `/404.html` and must stay generic. Decoding is guarded against malformed escapes.

Locally, `npm run preview` answers unknown paths with a plain 404 (`appType: 'mpa'`), so open `/404.html` directly.

## Rules for hydration-safe components

The first browser render must produce exactly the markup the server produced. `src/hydration.test.jsx` checks every page: a dark-mode visitor, a light-mode visitor, and a visit in a later month than the build.

- **No viewport or theme in markup.** Decide with CSS instead. The header's phone/desktop switch and its theme icon and label are all CSS (`Header.jsx`). A `window.innerWidth` or theme check during render would differ between server and browser.
- **Dates go in a single text child with `suppressHydrationWarning`.** The month in NowStrip, the footer year, and "N years of jobs" are written that way, so React swaps in the current value during hydration. With several text pieces, React reports a mismatch instead.
- **No `window` or `document` during render.** Read them in effects, as NotFoundPage does with the path.
- **No `React.lazy` for prerendered content.** A lazy component suspends while hydrating.
- **Inline CSS goes through `Style`** (`primitives.jsx`), never `<style>{css}</style>`. React's server renderer escapes text, turning `>` into `&gt;` and `"` into `&quot;`, and a `<style>` element does not decode entities, so selectors like `.a > b` would break.

## Gotchas

- **Keep pages out of `public/`.** Vite copies `public/` into `dist/` and then overwrites it with the built page, so a copy there is a silent dead duplicate. A test enforces this.
- **Deep links rely on `scroll-padding-top`.** The browser's own jump to `/#skills` knows nothing about the sticky header; `scroll-padding-top: 70px` on `html` (tokens.css) keeps the section visible.
- **Puppeteer snapshots cannot be hydrated.** The site used to prerender by snapshotting the page in headless Chrome. Serializing a browser DOM merges adjacent text nodes, which React then reports as mismatches. `renderToString` marks text boundaries with `<!-- -->`, which is why the build now uses it.
- **Publications.** Author lists longer than 8 collapse right after the site owner, inside `<details>`, which works without JavaScript. Copy uses `navigator.clipboard`. On failure the citation is selected and the button reads "Copy failed". There is no console logging, because `vite.config.js` strips `console.*` from every build, dev and tests included.
