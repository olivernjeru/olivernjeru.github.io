# Oliver Njeru — Brand Kit

The brand package for **The Hearth** — Oliver Njeru's personal site, <https://olivernjeru.github.io>.

The live site in this repository is the reference implementation: where this kit and the site differ, the site's files win (`src/styles/tokens.css`, `config/sharedHead.js`, `public/brand/`).

---

## What's in here

```text
docs/brand-source/
├── README.md                ← This file.
│
├── logos/
│   ├── flame.svg                  Primary mark (outline + amber). Use on light surfaces.
│   ├── flame-solid.svg            Solid silhouette. Better at small sizes.
│   ├── flame-on-dark.svg          Cream strokes for dark backgrounds.
│   ├── flame-stamped.svg          Inverted on an ink circle. For stamps, watermarks.
│   ├── lamp.svg                   Reading lamp. Decorative section glyph, NOT a logo.
│   ├── wordmark.svg               "Oliver Njeru" in Newsreader 500.
│   ├── lockup-horizontal.svg      Flame + wordmark, side-by-side, light.
│   ├── lockup-horizontal-dark.svg Same, on dark.
│   └── lockup-stacked.svg         Flame above wordmark, centered. Square use.
│
├── favicons/
│   ├── favicon.svg                Modern browsers — scalable. Light-theme variant.
│   ├── favicon-16.png             16×16
│   ├── favicon-32.png             32×32
│   ├── favicon-48.png             48×48
│   ├── apple-touch-icon.png       180×180 — iOS home screen.
│   ├── icon-192.png               192×192 — web manifest "any".
│   ├── icon-512.png               512×512 — web manifest "any".
│   ├── icon-maskable-512.png      512×512 — web manifest "maskable" (safe-area aware).
│   ├── og-image.png               1200×630 — Open Graph / Twitter card.
│   ├── site.webmanifest           Master copy of the site's public/manifest.json.
│   └── HEAD-snippet.html          The shared <head> block, for pages outside the build.
│
└── tokens/
    ├── tokens.css                 Core palette and font stacks for both themes.
    └── tokens.json                The same, in design-tokens JSON for tooling.
```

The dark-theme favicon, `favicon-dark.svg`, exists only in `public/brand/favicons/`.

---

## Quick start

### 1. Add the fonts

The site self-hosts its fonts; it never calls a font CDN (its privacy page promises this). In a Vite or other bundled project, install and import the same packages the site uses (`src/mount.jsx`):

```sh
npm install @fontsource-variable/newsreader @fontsource-variable/inter-tight @fontsource-variable/jetbrains-mono
```

```js
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
```

These register the families as "Newsreader Variable", "Inter Tight Variable", and "JetBrains Mono Variable"; the site's font stacks list those names first.

### 2. Add the tokens

`tokens/tokens.css` carries the core palette and font stacks. The live site's `src/styles/tokens.css` is a superset: it adds translucent surfaces (glass, scrim, inverse), the variable-font names, layout tokens, and shared component classes. Prefer it when you want the site's exact look.

```css
.headline { font-family: var(--font-serif); color: var(--text); }
.kicker   { font-family: var(--font-mono); color: var(--muted); }
```

### 3. Add the favicons + Open Graph tags

In this repository, every page gets them automatically from `config/sharedHead.js`. For a page outside the build, paste `favicons/HEAD-snippet.html` into its `<head>`, right after `<meta charset>`. Its paths assume the files are served from `/brand/favicons/`, as on olivernjeru.github.io.

### 4. Theme

Set `data-theme="light"` or `data-theme="dark"` on `<html>`. The site saves the visitor's choice in `localStorage` under `hearthTheme` and falls back to the OS preference. The snippet's inline script applies it before first paint, so there is no flash of the wrong theme.

---

## Logo usage rules

1. **Flame is the only logo.** Use one of the four flame SVGs depending on context:
   - `flame.svg` — default, on light surfaces, at any size above 32px.
   - `flame-solid.svg` — at small sizes (below 32px) or whenever the outline gets thin.
   - `flame-on-dark.svg` — on dark backgrounds.
   - `flame-stamped.svg` — for watermarks, business-card backs, single-color print.
2. **The lamp is decorative**, not a logo. It appears **once** per page, above the "Reading & references" / "Where I studied" section. Do not place it in headers, footers, favicons, or anywhere else.
3. **Clear space:** keep at least one flame-width of clear space around the mark on all sides.
4. **Minimum size:** 16×16 px (use `flame-solid.svg` or the rasterized `favicon-16.png`).
5. **Don't** rotate, skew, recolor, or add effects. The amber inner core may not change hue.

---

## Color palette at a glance

| Role         | Light      | Dark        |
| ------------ | ---------- | ----------- |
| Background   | `#f4efe5`  | `#16140f`   |
| Text         | `#1a1715`  | `#efe7d6`   |
| Accent       | `#c96442`  | `#e07c5a`   |

Full token reference in `tokens/tokens.css` and `tokens/tokens.json` (core) and the site's `src/styles/tokens.css` (complete).

---

## Typography

- **Newsreader** — display + body serif. Italic carries emphasis.
- **Inter Tight** — UI sans (nav, buttons, small labels).
- **JetBrains Mono** — kickers, metadata, dates.

Italic Newsreader is reserved for the **second word/phrase** of a section title:

> One desk, *three hats*.
> Reading & *references*.
> By the *fire*.

Do not italicize body copy.

---

## Voice cues

- First-person, conversational openings: "Yo. I'm Oliver."
- Direct, never marketing: "Shipping the next iteration of Replicant Trader." (NOT "Building the future of trading.")
- Carry the lounge metaphor: *pull up a chair*, *the fire stays lit*, *off the foyer*.
- Email is always full and unobfuscated: `onjeru@usiu.ac.ke`.
- Issue year in Roman numerals (MMXXVI) is an editorial signature — leave it.

---

## Regenerating the favicons

The PNG favicons were rasterized from the `flame-solid.svg` path. If you need to regenerate them at different sizes, use `flame-solid.svg` as the master and export at the target size. The amber core sits at roughly `cx=16, cy=22, rx=3, ry=4` in the 32×32 viewBox — keep that ratio for any new size.

The OG image is a composition: dark `#16140f` background + radial amber glow + outline flame + serif name in Newsreader. Source for editing is `og-image.png` — re-export at 1200×630 if you change anything.

---

## License

These marks belong to Oliver Njeru and are part of his personal brand. Don't reuse them for other projects.

Built by Oliver Njeru · all rights reserved © 2020 – 2026
