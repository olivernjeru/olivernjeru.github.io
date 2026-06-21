# Oliver Njeru — The Hearth

Personal portfolio of **Oliver Njeru** — Founding Engineer at Replicant Trader, founder of Black Eternum Capital, and an independent Multi-Agent Reinforcement Learning researcher.

Designed around the [Hearth design system](./docs/design-system.md): warm cream/amber palette, Newsreader serif with italic flourishes, sharp corners, hairline dividers, a flame as the single anchoring motif.

Deployed at <https://olivernjeru.github.io/>.

---

## Stack

- **Vite 5** + React 18 (no Create React App, no MUI, no CSS framework)
- Vanilla CSS with custom-property tokens for theming
- Self-hosted variable fonts via `@fontsource-variable` (Newsreader, Inter Tight, JetBrains Mono) — no third-party CDN
- `@prerenderer/rollup-plugin` for build-time prerendering of the root route
- Vitest + Testing Library + jsdom for tests
- Deployed via the official `actions/deploy-pages` flow on GitHub Pages

---

## Getting started

```sh
git clone https://github.com/olivernjeru/olivernjeru.github.io.git
cd olivernjeru.github.io
npm install
npm run dev          # vite dev server on http://localhost:3000
npm run build        # production build into dist/
npm run preview      # serve dist/ locally
npm test             # run Vitest once
npm run test:watch   # watch mode
```

The build step pulls Chromium for the prerender plugin on first install (~170MB). Set `PUPPETEER_SKIP_DOWNLOAD=true` if you want to skip that and rely on a system Chrome.

---

## Repo layout

```text
.
├── index.html                  Vite entry HTML (root route)
├── public/                     Static assets copied verbatim to dist/
│   ├── brand/favicons/         Favicons (light + dark SVG, PNG fallbacks, OG image)
│   ├── brand/logos/            Flame + lamp + wordmark + lockup SVGs
│   ├── assets/                 Résumé, social SVGs, photo gallery sources, video clips
│   ├── components/             Standalone demo subprojects (blindr/, art/, …)
│   ├── manifest.json           PWA manifest
│   ├── robots.txt, sitemap.xml
│   └── privacy.html            Static privacy page, theme-synced with the React app
│
├── src/
│   ├── index.jsx               React entry: imports fonts + tokens, mounts <App />
│   ├── App.jsx                 Top-level layout, theme provider, section composition
│   ├── App.test.jsx            Smoke test
│   ├── theme.js                ThemeProvider, persists to localStorage.hearthTheme
│   ├── styles/tokens.css       Hearth color/type/spacing tokens, light + dark
│   ├── data/                   Content (experience, education, skills, …)
│   ├── components/             Shared UI: Header, Hero, NowStrip, Lightbox, BackToTop,
│   │   ├── icons/                  primitives, plus Flame/Lamp/UI icons
│   │   └── primitives.jsx
│   ├── sections/               Page sections (ThreeRoles, SelectedWork, Skills, …)
│   └── test/setup.js           jsdom polyfills for tests
│
├── docs/
│   ├── design-system.md        Full Hearth design spec (canonical)
│   └── brand-source/           Source files for brand kit:
│       ├── DESIGN-SYSTEM.md        — system spec packaged with the brand kit
│       ├── README.md               — brand kit README
│       ├── favicons/               — master PNG/SVG favicons + manifest + OG image
│       ├── logos/                  — flame variants + lamp + wordmark + lockups
│       └── tokens/                 — tokens.css + tokens.json (design tokens)
│
├── scripts/
│   └── compress-videos.sh      ffmpeg helper for academic mp4 → web-friendly variants
│
├── .github/workflows/deploy.yml   CI: test → build → official deploy-pages
└── vite.config.js              Vite + React + prerender + Vitest config
```

`src/data/` files use ES module exports — edit those to update content without touching components. The page sections, in order, are:

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

Assets in [docs/brand-source/](docs/brand-source/) are the master files for the brand kit. If you regenerate favicons or update the design tokens, edit those there first, then copy/rebuild into [public/brand/](public/brand/) and update [src/styles/tokens.css](src/styles/tokens.css) accordingly.

---

## Theming

- Two themes (dark default), driven by `data-theme="dark|light"` on `<html>`
- All colors flow through CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css)
- The amber accent (`#c96442` light / `#e07c5a` dark) is the only saturated color in the palette
- Theme toggle lives in the header; choice is persisted to `localStorage.hearthTheme`
- The favicon swaps between two SVG variants (`favicon.svg` light, `favicon-dark.svg` dark) on toggle
- The privacy page reads the same `localStorage` key and stays in sync across tabs via the `storage` event

To add a new themed color: define it under both `:root,[data-theme="dark"]` and `[data-theme="light"]` in tokens.css, then use `var(--your-token)` anywhere.

---

## Privacy

The site runs **no analytics, no trackers, no third-party scripts** in production. The only data stored on a visitor's device is their theme preference in `localStorage`. See [public/privacy.html](public/privacy.html).

Content Security Policy (in `index.html`) is `default-src 'self'` with allowances only for inline styles/scripts that Vite emits. No external origins are whitelisted.

---

## Deploy

GitHub Actions workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. **test** — runs Vitest on push and pull request
2. **build** — runs `npm run build`, uploads `dist/` as a Pages artifact
3. **deploy** — pushes the artifact via the official `actions/deploy-pages`

Repo settings → Pages → Source must be set to **GitHub Actions** (not "Deploy from a branch"). Puppeteer Chromium is cached at `~/.cache/puppeteer` between runs.

---

## License

Brand marks (flame, lamp, lockups, wordmark) belong to Oliver Njeru. The code is private to this repo.

Built by Oliver Njeru · all rights reserved © 2020 – 2026
