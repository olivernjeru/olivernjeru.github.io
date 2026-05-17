# Oliver Njeru — Brand Kit

The complete brand package for **The Hearth** — Oliver Njeru's personal site.

---

## What's in here

```
brand/
├── DESIGN-SYSTEM.md         ← Full spec. Hand to another LLM to reproduce the site.
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
│   ├── favicon.svg                Modern browsers — scalable, theme-aware.
│   ├── favicon-16.png             16×16
│   ├── favicon-32.png             32×32
│   ├── favicon-48.png             48×48
│   ├── apple-touch-icon.png       180×180 — iOS home screen.
│   ├── icon-192.png               192×192 — web manifest "any".
│   ├── icon-512.png               512×512 — web manifest "any".
│   ├── icon-maskable-512.png      512×512 — web manifest "maskable" (safe-area aware).
│   ├── og-image.png               1200×630 — Open Graph / Twitter card.
│   ├── site.webmanifest           PWA manifest. Edit URLs to match your deploy path.
│   └── HEAD-snippet.html          Copy/paste into <head> of every page.
│
└── tokens/
    ├── tokens.css                 CSS custom properties for both themes.
    └── tokens.json                Design-tokens-format JSON for tooling.
```

---

## Quick start

### 1. Add the fonts

In the `<head>` of every page:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Inter+Tight:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 2. Add the tokens

```html
<link rel="stylesheet" href="/tokens/tokens.css">
```

Then in your CSS:

```css
.headline { font-family: var(--font-serif); color: var(--text); }
.kicker   { font-family: var(--font-mono); color: var(--muted); }
```

### 3. Add the favicons + Open Graph tags

Open `favicons/HEAD-snippet.html` and paste its contents into the `<head>` of every page. Adjust the `/favicons/` prefix to match where you deploy the files.

### 4. Theme toggle

Set `data-theme="light"` or `data-theme="dark"` on `<html>`:

```js
document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('theme') ?? 'dark'
);
```

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

Full token reference in `tokens/tokens.css` and `tokens/tokens.json`.

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
- Email is always full and unobfuscated: `oliver@blacketernumcapital.com`.
- Issue year in Roman numerals (MMXXVI) is an editorial signature — leave it.

Full spec in `DESIGN-SYSTEM.md`.

---

## Regenerating the favicons

The PNG favicons were rasterized from the `flame-solid.svg` path. If you need to regenerate them at different sizes, use `flame-solid.svg` as the master and export at the target size. The amber core sits at roughly `cx=16, cy=22, rx=3, ry=4` in the 32×32 viewBox — keep that ratio for any new size.

The OG image is a composition: dark `#16140f` background + radial amber glow + outline flame + serif name in Newsreader. Source for editing is `og-image.png` — re-export at 1200×630 if you change anything.

---

## License

These marks belong to Oliver Njeru and are part of his personal brand. Don't reuse them for other projects.

Built by Oliver Njeru · all rights reserved © 2020 – 2026
