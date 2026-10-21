# Oliver Njeru — The Hearth

Personal portfolio of **Oliver Njeru** — Founding Engineer at Replicant Trader, founder of Black Eternum Capital, and an independent Multi-Agent Reinforcement Learning researcher.

Designed around the Hearth design system: warm cream/amber palette, Newsreader serif with italic flourishes, sharp corners, hairline dividers, a flame as the single anchoring motif.

Deployed at <https://olivernjeru.github.io/>.

---

## Stack

- **Vite 5** + React 18, built as a multi-page site (no client-side router, no MUI, no CSS framework)
- Every page is prerendered at build time with React's own server renderer (`renderToString`) and hydrated in the browser: full content without JavaScript, and no re-render or layout shift on load
- Vanilla CSS with custom-property tokens for theming
- Self-hosted variable fonts via `@fontsource-variable` (Newsreader, Inter Tight, JetBrains Mono), shared by every page — no third-party CDN
- Vitest + Testing Library + jsdom for tests
- Deployed via the official `actions/deploy-pages` flow on GitHub Pages

---

## Getting started

```sh
git clone https://github.com/olivernjeru/olivernjeru.github.io.git
cd olivernjeru.github.io
npm install
npm run dev          # vite dev server on http://localhost:3000
npm run build        # client build + server build + prerender, into dist/
npm run preview      # serve dist/ locally
npm test             # run Vitest once
npm run test:watch   # watch mode
```

The build needs no browser: `npm run build` runs `vite build`, then `vite build --ssr src/entry-server.jsx`, then `node scripts/prerender.mjs` ([details](src/pages/README.md)).

Dev and preview run in multi-page mode (`appType: 'mpa'`): unknown paths get a plain 404, like GitHub Pages. To see the custom 404 page locally, open `/404.html`.

---

## Pages

| URL | HTML entry | Component |
| --- | ---------- | --------- |
| `/` | `index.html` | `src/App.jsx` |
| `/publications.html` | `publications.html` | `src/pages/PublicationsPage.jsx` |
| `/privacy.html` | `privacy.html` | `src/pages/PrivacyPage.jsx` |
| any missing path | `404.html` | `src/pages/NotFoundPage.jsx` |

Every page shares the same header, footer, theme toggle, fonts, tokens, and `<head>` block (favicons, CSP, pre-paint theme script). How pages are built, the rules that keep hydration exact, and how to add a page: [src/pages/README.md](src/pages/README.md).

---

## Repo layout

```text
.
├── index.html                  Home page entry
├── publications.html           Publications page entry
├── privacy.html                Privacy page entry
├── 404.html                    Not-found page (GitHub Pages serves it for missing paths)
├── config/
│   └── sharedHead.js           Vite plugin: the <head> block every page shares
├── public/                     Static files copied verbatim to dist/ (never pages)
│   ├── brand/favicons/         Favicons (light + dark SVG, PNG fallbacks, OG image)
│   ├── brand/logos/            Flame + lamp + wordmark + lockup SVGs
│   ├── assets/                 Résumé, social SVGs, video clips
│   ├── components/blindr/      Standalone demo subproject
│   ├── components/art/         Gallery photos: assets/ (originals), thumbs/ (WebP thumbnails)
│   ├── papers/                 Self-hosted accepted manuscripts (PDF)
│   ├── manifest.json           PWA manifest
│   └── robots.txt, sitemap.xml
│
├── src/
│   ├── index.jsx               Home entry: mount(App)
│   ├── entries/                One entry module per other page: mount(Page)
│   ├── mount.jsx               Browser bootstrap: fonts + tokens, hydrate (or render in dev)
│   ├── entry-server.jsx        Build-time server entry: page -> renderToString
│   ├── App.jsx                 Home layout: theme provider, header, sections, footer
│   ├── pages/                  Publications, Privacy, NotFound
│   ├── theme.js                ThemeProvider: localStorage.hearthTheme, cross-tab sync
│   ├── themeConfig.js          Theme storage key + favicon paths (also used by config/sharedHead.js)
│   ├── styles/tokens.css       Hearth color/type/spacing tokens, light + dark
│   ├── data/                   Content (publications, profiles, experience, gallery thumbnails, …)
│   ├── lib/                    Framework-free helpers: APA citations, formatting, images, JSON-LD, scrolling
│   ├── assets/projects/        Project screenshots (WebP)
│   ├── components/             Shared UI: Header, Hero, NowStrip, PageShell, Lightbox, BackToTop,
│   │   └── icons/                  primitives (incl. Style), plus Flame/Lamp/UI icons
│   ├── sections/               Home sections (ThreeRoles, SelectedWork, Skills, …, Footer)
│   ├── test/setup.js           jsdom polyfills, Testing Library cleanup
│   └── **/*.test.js(x)         Tests sit next to the code they cover
│
├── docs/
│   └── brand-source/           Brand kit masters: README, favicons, logos, tokens
│
├── scripts/
│   ├── prerender.mjs           Build step: server-rendered markup into dist/*.html
│   └── compress-videos.sh      ffmpeg helper for academic mp4 → web-friendly variants
│
├── .github/workflows/deploy.yml   CI: test → build → official deploy-pages
└── vite.config.js              Pages, shared head, client and server builds, Vitest config
```

### Documentation map

| Doc | Covers |
| --- | ------ |
| [src/pages/README.md](src/pages/README.md) | Page shell, build and hydration, hydration-safe component rules, adding a page, 404 behavior |
| [src/data/README.md](src/data/README.md) | Content files, the publication schema, adding a paper or photo, IST-Africa's reuse rules |
| [src/lib/README.md](src/lib/README.md) | APA 7 citation methodology, gallery image sizing, search data, dates, scrolling |
| [config/README.md](config/README.md) | The shared `<head>` plugin, the pre-paint theme script, security headers on GitHub Pages |

---

## Content

`src/data/` files use ES module exports — edit those to update content without touching components ([details](src/data/README.md)).

- **Publications:** `src/data/publications.js` feeds the Hero count, the home-page cards, and the Publications page with its APA citations and search data. Add a paper once and all of them update.
- **Profile links and email:** `src/data/profiles.js`. The JSON-LD in `index.html` repeats the URLs; a test keeps them in sync.
- **Project images:** `src/assets/projects/` (WebP), imported in `src/data/projects.js`.
- **Gallery photos:** originals in `public/components/art/assets/`, WebP thumbnails in `public/components/art/thumbs/`, listed in `src/data/galleryThumbs.js`.

The home page sections, in order, are:

1. Hero, NowStrip
2. ThreeRoles (Founding Engineer / Founder / Researcher)
3. About (interests + off-the-clock)
4. SelectedWork (publications + collapsible experience timeline)
5. Skills
6. ReadingReferences (the lamp glyph appears here)
7. Coursework
8. Projects (lightbox-able images)
9. ArtGallery (lightbox photography)
10. Awards & Hackathons
11. Certifications
12. EventsVolunteering
13. ContactCTA, Footer

[docs/brand-source/](docs/brand-source/) is the brand kit (logos, favicon masters, core tokens, a `<head>` snippet) for use outside this repository. The live site's files are the reference: [src/styles/tokens.css](src/styles/tokens.css) is a superset of the kit's tokens, and [public/brand/](public/brand/) also holds `favicon-dark.svg`. When you change a shared value (a color, a favicon), update both.

---

## Theming

- Two themes (dark default), driven by `data-theme="dark|light"` on `<html>`
- All colors flow through CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css)
- The amber accent (`#c96442` light / `#e07c5a` dark) is the only saturated color in the palette
- A pre-paint script in every page's `<head>` applies the saved theme (or the OS preference) before first paint, so there is no flash of the wrong theme ([config/README.md](config/README.md))
- The theme toggle lives in the header; the choice is saved to `localStorage.hearthTheme`. Its sun/moon icon and spoken label are picked by CSS from `data-theme`, so the prerendered header never depends on the theme
- The favicon swaps between two SVG variants (`favicon.svg` light, `favicon-dark.svg` dark)
- `ThemeProvider` listens for the `storage` event, so every open tab follows a change made in another

To add a new themed color: define it under both `:root,[data-theme="dark"]` and `[data-theme="light"]` in tokens.css, then use `var(--your-token)` anywhere.

---

## Privacy

The site runs **no analytics, no trackers, no third-party scripts** in production. The only data stored on a visitor's device is their theme preference in `localStorage`. See the [privacy page](https://olivernjeru.github.io/privacy.html) ([source](src/pages/PrivacyPage.jsx)).

Every page carries the same Content Security Policy and referrer policy, injected by [config/sharedHead.js](config/sharedHead.js): `default-src 'self'`, inline styles and scripts allowed (Vite output, the pre-paint theme script), and no external origins for scripts, styles, fonts, or connections. Images may load over https. Headers that only work as HTTP headers are not faked with meta tags; GitHub Pages sends HSTS ([details](config/README.md)).

---

## Tests

`npm test` covers:

- hydration parity: every page is server-rendered, then hydrated, for a dark-mode visitor, a light-mode visitor, and a later month than the build;
- the APA formatter, dates, gallery image sizing, and search data;
- the integrity of the publication, profile, experience, and gallery-thumbnail data;
- the shared-head plugin and every HTML page's contract;
- the Header, Footer, Publications, and 404 pages;
- the home page smoke test.

Things to know when writing tests:

- `vite.config.js` sets `esbuild.drop: ['console']`, which strips `console.*` in dev, tests, and builds alike. Use visible UI state, or `process.stdout.write` for test debugging.
- Inside Vite and Vitest, `new URL('<relative path>', import.meta.url)` is rewritten into a dev-server asset URL (`http://localhost:3000/...`). Build file paths with `fileURLToPath(import.meta.url)` and `node:path` instead.

---

## Deploy

GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. **test** — runs Vitest on push and pull request
2. **build** — runs `npm run build` (client build, server build, prerender), uploads `dist/` as a Pages artifact
3. **deploy** — pushes the artifact via the official `actions/deploy-pages`

Repo settings → Pages → Source must be set to **GitHub Actions** (not "Deploy from a branch").

GitHub Pages serves `dist/404.html`, with HTTP status 404, for any path that does not exist.

---

## License

Brand marks (flame, lamp, lockups, wordmark) belong to Oliver Njeru. The code is private to this repo.

Built by Oliver Njeru · all rights reserved © 2020 – 2026
