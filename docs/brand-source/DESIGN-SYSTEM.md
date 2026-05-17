# The Hearth — Design System Specification

A complete, self-contained spec for reproducing the *Hearth* design system for **Oliver Njeru's** personal site. Hand this entire document to another LLM and it should be able to build the site faithfully.

---

## 1. Concept & voice

**The Hearth** is a personal portfolio styled as a lounge with a fire burning in it. The single anchoring motif is **a flame**: it sits in the hero, in the header, in the footer, and in the favicon. The whole site is calm, editorial, and slightly literary — a quiet place to read about someone's work, not a marketing page.

- **Subject:** Oliver Njeru — Founding Engineer at Replicant Trader, founder of Black Eternum Capital, research assistant at USIU-Africa. Based in Nairobi.
- **Tone:** First-person, warm, understated. Conversational openings ("Yo. I'm Oliver."). Italicised serif for emphasis. Never marketing-speak.
- **Two metaphors carried through copy:** the *fire* (energy, presence, "the fire stays lit") and the *room* (chairs, library, foyer — "pull up a chair").
- **Energy:** Slow. Generous whitespace. Italic flourishes. Confident, mature.

---

## 2. Color tokens

Two themes share structure; tokens swap. The site has a **live theme toggle** (sun/moon icon in the header). Default is **dark**.

### 2.1 Light theme

| Token         | Hex / value                       | Use                                       |
| ------------- | --------------------------------- | ----------------------------------------- |
| `bg`          | `#f4efe5`                         | page background (warm cream)              |
| `bgAlt`       | `#ece5d6`                         | section background, banded areas          |
| `bgCard`      | `#fbf7ee`                         | card background (slightly lighter)        |
| `bgInverse`   | `#16140f`                         | inverse-color CTA block                   |
| `text`        | `#1a1715`                         | primary text                              |
| `textSoft`    | `#3a322c`                         | secondary text                            |
| `textOnAcc`   | `#1a1715`                         | text on accent buttons                    |
| `muted`       | `rgba(26,23,21,0.58)`             | muted labels, captions                    |
| `faint`       | `rgba(26,23,21,0.06)`             | subtle fills                              |
| `hair`        | `rgba(26,23,21,0.14)`             | hairline dividers, borders                |
| `accent`      | `#c96442`                         | amber — the brand color                   |
| `accentDeep`  | `#a64f33`                         | deeper amber for hover / pressed text     |
| `accentSoft`  | `rgba(201,100,66,0.14)`           | amber wash for banded callouts            |
| `chromeBg`    | `#e6dfd0`                         | browser-frame chrome                      |
| `chromeFg`    | `#5a4f3e`                         | text in chrome                            |
| `chromeBar`   | `#fbf7ee`                         | URL bar in chrome                         |

### 2.2 Dark theme

| Token         | Hex / value                          | Use                                       |
| ------------- | ------------------------------------ | ----------------------------------------- |
| `bg`          | `#16140f`                            | page background                           |
| `bgAlt`       | `#1f1c16`                            | section background                        |
| `bgCard`      | `#1a1812`                            | card background                           |
| `bgInverse`   | `#f4efe5`                            | inverse-color CTA block                   |
| `text`        | `#efe7d6`                            | primary text                              |
| `textSoft`    | `rgba(239,231,214,0.85)`             | secondary text                            |
| `textOnAcc`   | `#16140f`                            | text on accent buttons                    |
| `muted`       | `rgba(239,231,214,0.55)`             | muted labels                              |
| `faint`       | `rgba(239,231,214,0.05)`             | subtle fills                              |
| `hair`        | `rgba(239,231,214,0.10)`             | dividers                                  |
| `accent`      | `#e07c5a`                            | amber — slightly brighter for dark        |
| `accentDeep`  | `#ffa483`                            | hover / focused accent                    |
| `accentSoft`  | `rgba(224,124,90,0.16)`              | banded callouts                           |
| `chromeBg`    | `#211e18`                            | chrome                                    |
| `chromeFg`    | `#a89c84`                            | chrome text                               |
| `chromeBar`   | `#0e0d09`                            | URL bar                                   |

### 2.3 Color rules

- Amber is the **only saturated color**. No other hue may be introduced.
- Never use pure black or pure white. Always the tokenized warm near-blacks / warm creams.
- Hairlines are *always* the `hair` token — never solid `text` for dividers.
- The inverse-color contact block at the bottom of the page flips `bg` ↔ `bgInverse`. Accent stays amber in both modes.

---

## 3. Typography

Three families, all from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Inter+Tight:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

| Role                      | Family                     | Notes                                              |
| ------------------------- | -------------------------- | -------------------------------------------------- |
| Display / body serif      | **Newsreader**             | Used for everything editorial and italic emphasis  |
| UI sans                   | **Inter Tight**            | Nav, buttons, small UI labels                      |
| Mono / kicker             | **JetBrains Mono**         | Kickers, metadata, code-feeling labels             |

### 3.1 Scale

| Element                | Family       | Size      | Weight | Letter-spacing | Line height |
| ---------------------- | ------------ | --------- | ------ | --------------- | ----------- |
| Hero title             | Newsreader   | 152px     | 500    | -6              | 0.84        |
| Section title (h2)     | Newsreader   | 48px      | 500    | -1.4            | 1.02        |
| Card heading           | Newsreader   | 28px      | 500    | -0.6            | 1.1         |
| Sub-card heading       | Newsreader   | 22px      | 500    | -0.4            | 1.2         |
| Pull-quote / hint      | Newsreader (italic) | 17–24px | 400 | -0.2          | 1.4–1.45    |
| Body serif             | Newsreader   | 15–17px   | 400    | 0               | 1.5–1.65    |
| Nav item               | Inter Tight  | 13.5px    | 450    | 0.1             | 1           |
| Button label           | Inter Tight  | 13px      | 500    | 0.1             | 1           |
| Stat number            | Newsreader   | 40px      | 500    | -1.2            | 1           |
| **Kicker**             | JetBrains Mono | 11px    | 500    | 1.4             | 1, ALL CAPS |
| Mono metadata          | JetBrains Mono | 10–11px | 500    | 0.4–1           | 1.2         |

### 3.2 Italic rules

- Use **Newsreader italic** for the *second word/phrase* in section titles and hero subtitles. Example: "One desk, *three hats*." or "By the *fire*."
- Italic is for **softening**, not emphasis. Bold is rarely used; weight 500 is the heaviest serif weight in play.

### 3.3 Kicker pattern

Every section starts with a small mono kicker, then a serif title:

```
[KICKER · ALL CAPS]
Big serif title with one italic word.
Optional italic serif hint below in muted color.
```

Example:
```
THE THREE JOBS
One desk, three hats.
```

---

## 4. Iconography

### 4.1 The Flame (primary mark)

The flame is **outline + amber glow**. SVG, 14×20 viewBox:

```svg
<svg width="18" height="24" viewBox="0 0 14 20">
  <path d="M7,1.2 C9.2,5 11,7 11,11.2 C11,14.8 9.2,17 7,17 C4.8,17 3,14.8 3,11.2 C3,8 4.6,6 7,1.2 Z"
    fill="{accent}" stroke="{accent}" stroke-width="1.3" stroke-linejoin="round" />
  <ellipse cx="7" cy="12.6" rx="1.8" ry="3" fill="{bg}" opacity="0.7" />
</svg>
```

**Hero flame** (large, with radial glow): 240×320 viewBox.

```svg
<svg width="240" height="320" viewBox="0 0 240 320">
  <defs>
    <radialGradient id="flameGlow" cx="50%" cy="65%" r="55%">
      <stop offset="0%" stop-color="#ffd9a0" stop-opacity="0.9"/>
      <stop offset="55%" stop-color="{accent}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="{accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="120" cy="190" r="160" fill="url(#flameGlow)"/>
  <path d="M120,18 C148,72 188,108 188,188 C188,242 158,288 120,288 C82,288 52,242 52,188 C52,138 76,108 120,18 Z"
    fill="none" stroke="{accent}" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M120,90 C134,118 154,138 154,180 C154,212 140,238 120,238 C100,238 86,212 86,180 C86,158 96,138 120,90 Z"
    fill="{accent}" opacity="0.45"/>
  <ellipse cx="120" cy="200" rx="14" ry="32" fill="#ffd9a0" opacity="0.9"/>
</svg>
```

In **light mode** drop the inner-ellipse opacity to 0.75 so it doesn't read as a hot spot.

### 4.2 The Reading Lamp (decorative section glyph)

Used **once per page**, above the "Reading & references" / "Where I studied" section. It is *not* a logo. SVG, 40×50 viewBox:

```svg
<svg width="48" height="60" viewBox="0 0 40 50">
  <path d="M9,21 L31,21 L26,7 L14,7 Z" fill="none" stroke="{text}" stroke-width="2" stroke-linejoin="round"/>
  <line x1="20" y1="21" x2="20" y2="42" stroke="{text}" stroke-width="2"/>
  <line x1="11" y1="42" x2="29" y2="42" stroke="{text}" stroke-width="2.4" stroke-linecap="round"/>
  <ellipse cx="20" cy="24" rx="9" ry="2.4" fill="{accent}" opacity="0.85"/>
</svg>
```

### 4.3 Theme-toggle icons

- **Light mode showing →** moon glyph (will flip to dark when clicked)
- **Dark mode showing →** sun glyph

Both 14×14 inside a 32×32 circular border-1 button using `hair` color.

### 4.4 Forbidden

- No emoji
- No stock iconography (Heroicons, Lucide, etc.)
- No new SVG illustrations beyond the flame and lamp. Photography is handled as placeholder striped tiles, not drawn.

---

## 5. Layout & spacing

- **Max content width:** 1240px, centred
- **Section vertical padding:** 64–96px top/bottom
- **Section horizontal padding:** 56px
- **Card padding:** 22–24px
- **Gap between sibling cards:** 14–18px
- **Hairline dividers** between list rows: `1px solid {hair}`. List rows use `padding: 12–24px 0`.
- **Sticky header** at top, with `backdrop-filter: saturate(140%) blur(8px)` and a hairline bottom border.
- Use **CSS grid** for the page-level structure and for stat / role / education grids. Use **flex with `gap`** for inline runs.

### 5.1 Common grids

| Section                | Columns                | Notes                                |
| ---------------------- | ---------------------- | ------------------------------------ |
| Stats strip            | `repeat(4, 1fr)`       | each cell with `border-top: 1px hair`|
| Three roles            | `repeat(3, 1fr)`       | inset cards                          |
| Publications + timeline| `1.2fr 1fr`            | pubs left, experience right          |
| Skills                 | `repeat(4, 1fr)`       | last column is accent-tinted        |
| Coursework             | `repeat(2, 1fr)`       | inset cards                          |
| Education              | `repeat(3, 1fr)`       | regular cards                        |
| Photography            | `repeat(4, 1fr)`       | some cells use `grid-column: span 2` |
| Awards                 | `1fr 1fr`              | two list cards                       |
| Certifications         | `repeat(3, 1fr)`       | inset cards                          |
| Events + Volunteering  | `1.4fr 1fr`            |                                       |
| Contact CTA            | `1.5fr 1fr`            | inverse colors                       |
| Footer                 | `1.6fr 1fr 1fr 1fr`    |                                       |

---

## 6. Components

### 6.1 Browser frame

Every page sits inside a faux browser frame.

- 38px chrome bar with three traffic-light dots (`#e06c5e`, `#e0b54f`, `#7ab46a`)
- A pill-shaped URL bar in `chromeBar` color, mono font 11px, content like `⌂ https://oliver.njeru.co`
- Content area below scrolls independently.

### 6.2 Site header

```
[flame 16px] Oliver Njeru [Nairobi pill]    Work  Research  Education  Gallery  Now   [Hire me btn] [theme toggle]
```

- Nairobi pill: `accentSoft` background, `accent` text, mono 9px, ALL CAPS, border-radius 999
- Primary CTA in header is the "Hire me" amber button
- Theme toggle is the last item on the right

### 6.3 Kicker

```
font-family: JetBrains Mono
font-size: 11px
letter-spacing: 1.4px
text-transform: uppercase
color: {muted}   // or {accent} for emphasis
font-weight: 500
```

### 6.4 Pills (tags)

- Default: `1px solid hair`, `textSoft` text, transparent bg
- Accent: `1px solid accent`, `accentDeep` text, `accentSoft` bg
- `border-radius: 999px`, mono 10.5px, ALL CAPS, padding `4px 10px`

### 6.5 Buttons

| Variant     | Border          | Background      | Text         |
| ----------- | --------------- | --------------- | ------------ |
| `primary`   | `accent`        | `accent`        | `textOnAcc`  |
| `default`   | `text`          | transparent     | `text`       |
| `ghost`     | `hair`          | transparent     | `text`       |

All buttons: 0 border-radius (sharp), padding `11px 18px`, Inter Tight 13px / weight 500. Arrow → at the end is conventional for forward actions.

### 6.6 Card

- `padding: 24px`
- `border: 1px solid hair`
- Background `bgCard` (default) or `bgAlt` (inset)
- Some cards use `accentSoft` bg + `accent` border for highlights (e.g. photography callout, off-the-clock skills, volunteering)
- No border-radius. Sharp corners throughout.

### 6.7 Stat block

```
[kicker]
Big serif 40px / weight 500
Small sans 12px muted footnote
```

Top hairline border on each. Sit in a 4-column grid below the hero.

### 6.8 List row pattern

Used for experience, certifications, awards, education courses:

```
[1px hair top border]
padding: 12–18px 0
display: grid; grid-template-columns: 1fr auto;
  left:  serif title + serif italic sub
  right: mono date / accent badge
[last row gets 1px hair bottom border too]
```

### 6.9 Photo tile

A placeholder for real photography — the system designs around real photos being added later.

- Aspect: variable, some `grid-column: span 2`
- Background: `bgInverse` (always dark) with 22px-spaced 135° diagonal stripes overlaid at low opacity
- A radial-gradient amber wash placed off-center for warmth
- Top-left: mono kicker "PHOTOGRAPH"
- Bottom-left: serif title (size 18, on light cream) + italic serif sub-caption muted
- Border: `1px solid hair`

### 6.10 Now strip

A full-width band immediately under the hero with a linear gradient from `accentSoft` to transparent. Three columns: flame + "NOW · today" kicker / italic serif current-status sentence / mono right-aligned location + date.

### 6.11 Contact CTA

The penultimate section. Uses inverse colors (`bgInverse` as background, `bg` as text). The amber stays amber. Two columns: left is the big "Pull up a chair. *The fire stays lit.*" title and italic intro; right is a stack of contact rows (Email / GitHub / Scholar / LinkedIn / Unsplash), each row is a `1px` outlined block with a mono key on the left and a serif value on the right.

---

## 7. Page structure (top → bottom)

In this exact order:

1. **Sticky site header** (logo, nav, "Hire me", theme toggle)
2. **Hero** — large serif name with one italic word, italic intro paragraph, two CTAs, **4-column stats strip** at the bottom
3. **Now strip** — single-line status with flame, accent-soft gradient band
4. **Three Roles** — 3 cards (Founding Engineer / Founder / Research Assistant)
5. **Selected Work** — Publications (cards, left, 1.2fr) + Experience timeline (list, right, 1fr) with live-dot indicators on current roles
6. **Skills** — 4 cards (Research areas / Languages / Frameworks / Off-the-clock — the last accent-tinted)
7. **Coursework** — 2-column grid of 5 academic project cards, each with course code, title, blurb, stack pills
8. **Reading & references** — **The lamp glyph appears here**, with education cards (3 schools)
9. **Art Gallery** — Photography tiles, masonry-feel grid, with secondary chip row for additional titles
10. **Awards & Hackathons** — 2 list cards + amber photography callout below
11. **Certifications** — 3-column inset cards
12. **Invited Events + Volunteering** — `1.4fr 1fr`, volunteering card is the amber-tinted one
13. **Contact CTA** — inverse-colored, "Pull up a chair. The fire stays lit." with contact rows
14. **Footer** — 4 columns (brand + sitemap + roles + elsewhere), bottom mono row with copyright and "Privacy" link

---

## 8. Content patterns / voice rules

- **Hero name** is the user's first name with an italic flourish: "Yo. I'm *Oliver*." Use first name only; the wordmark elsewhere is "Oliver Njeru".
- **Section titles** follow `[noun], [italic noun].` or `[verb] [italic noun].` patterns. Examples:
  - "One desk, *three hats*."
  - "From the *workshop*."
  - "Reading & *references*."
  - "Pull up a chair. *The fire stays lit*."
  - "A million *views*."
- **Kickers** are descriptive, not labels — "The three jobs" not "ROLES"; "Where I studied" not "EDUCATION".
- **Status copy** is direct ("Shipping the next iteration of…"). Never marketing ("Building the future of…").
- **Dates** in mono, format `Feb 2024 →` for ongoing, `Mar 2023` for one-off, `2022 – 2024` for ranges.
- **Email** displayed in full, no obfuscation: `oliver@blacketernumcapital.com`.
- **Numerals** in stats: roman MMXXVI for the issue year (a quiet editorial nod); arabic everywhere else. Spell single digits below ten in prose; numerals in stat blocks.

---

## 9. Mobile adaptation

Same content, vertical stack, **same theme toggle** in the header.

- Phone width: **402px** (iPhone 15 Pro frame)
- Outer padding: 22px
- Hero: name shrinks to **76px** with `letter-spacing: -3`. Flame becomes 130×170 in the top-right corner.
- Stats: `1fr 1fr` 2-column grid with cell internal borders
- All multi-column desktop grids collapse to single column or `1fr 1fr` for tight items (skills, gallery)
- Photo gallery: `1fr 1fr` × 92px tiles
- Section titles drop to 30px / `letter-spacing: -0.9`
- Contact CTA stays full-bleed and inverse-colored
- Stick to system font for the iPhone status bar; everything else uses the same web fonts

---

## 10. Implementation notes

### 10.1 React + Babel scaffolding

Use these exact pinned versions in `index.html`:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
```

Each component file is a `<script type="text/babel" src="…">` import. Components export themselves to `window` at the bottom so subsequent files can use them:

```js
Object.assign(window, { HfHearth, /* ... */ });
```

**Critical:** Style objects in component files must use **unique names** (`hearthStyles`, not `styles`) to avoid global collisions, or use inline styles.

### 10.2 Theme architecture

Define a `Themes` object with `light` and `dark` keys, each containing the full token set from §2. Each component reads its theme via a `T` prop and applies inline styles:

```jsx
const HfHearth = ({ initialMode = 'dark' }) => {
  const [mode, setMode] = React.useState(initialMode);
  const T = Themes[mode];
  const toggle = () => setMode(mode === 'dark' ? 'light' : 'dark');
  // ...pass T to every sub-component
};
```

The toggle button lives in the header. Sun = dark mode is on (click to go light), moon = light mode is on (click to go dark).

### 10.3 Backdrop blur for the header

```css
position: sticky;
top: 0;
backdrop-filter: saturate(140%) blur(8px);
```

### 10.4 Forbidden patterns

- No CSS frameworks (Tailwind, Bootstrap, etc.)
- No rounded corners on cards / buttons / browser frames — only on pills, the URL bar, and the theme-toggle button
- No gradients except the **Now strip** (`linear-gradient(180deg, accentSoft, transparent)`) and the **hero flame glow** (radial)
- No drop shadows on cards
- No hover animations beyond simple color changes
- No emoji, no stock icons, no AI-generated illustrations

---

## 11. Content (real, not placeholder)

When reproducing the site, use **this** content verbatim where possible.

### 11.1 Roles

| #  | Title                  | Org                       | Since      | Body                                                                                                                                                                |
| -- | ---------------------- | ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01 | Founding Engineer      | Replicant Trader          | Feb 2024 → | Democratising high-quality trading simulations and financial tools — helping users build trading confidence and understand market dynamics.                         |
| 02 | Founder                | Black Eternum Capital     | Aug 2024 → | Empowering Kenyan traders and investors with essential resources and knowledge tailored to a dynamic local market.                                                  |
| 03 | Research Assistant     | USIU‑Africa · SST         | Oct 2023 → | Applied machine learning at the School of Science & Technology. Co-author on biomedical foundation models and BaaS research.                                        |

### 11.2 Publications

1. **SPARK: Harnessing Human-Centered Workflows with Biomedical Foundation Models for Drug Discovery** — Kwon B.C., Rabinovici-Cohen S., Moturi B., Mwaura R., Wahome K., **Njeru O.**, Shinyenyi M., Wanjiru C., Remy S., Ogallo W., *et al.* — IJCAI, Aug 2024.
2. **DbAPI: A Backend-as-a-Service Platform for Rapid Deployment of Cloud Services** — Okanda P., Chhatbar A., **Njeru O.** — IST-Africa, May 2024.

### 11.3 Experience timeline

Current (live dot): Black Eternum Capital · Replicant Trader · USIU‑Africa SST.

Past: IBM Research (SWE Intern · Foundation Models UI, Summer 2023) · USIU‑Africa SST (Teaching Assistant · Business Data Analytics, Mar 2023) · USIU‑Africa (Campus Work Study, 2022–2024) · Mombasa Area Locality (Jr. Software Developer, 2018).

### 11.4 Education

- **USIU–Africa** — BSc Applied Computer Technology, Software Engineering — In progress. Courses: Database Systems, Discrete Mathematics, Business Data Analytics, Software Design & Architecture. Honours: Dean's List, VC Grant, JA Africa Scholarship, IEEE, GDSC.
- **London Institute of Banking & Finance** — Level 4 Diploma, Investment Bank Sales & Trading — Awarded Mar 2023. Courses: Investment Strategies, Equities, Commodities, Currencies, Fixed Income. AmplifyMe × Morgan Stanley; ranked first in AmplifyMe simulation.
- **Strathmore University** — Diploma, Business Information Technology — Sep 2021. Courses: Accounting, Business Finance, Economics. IEEE VP, GDSC Social Media Manager, ITSA Member.

### 11.5 Coursework projects

- **DBIT1201** OOP — Parking Lot Management System (Java/Swing, JDBC, MySQL, MVC).
- **APT3025** Applied ML — Diabetes Classification with Ensembles (Python, scikit-learn, pandas, NumPy).
- **APT3060** Mobile Programming — Android Portfolio of Apps (Android, Fragments, SQLite, Sensors).
- **APT2040** Operating Systems — Round Robin + Banker's Algorithm (C, Bash). Led a 4-person team.
- **APT2060** DSA — Search Algorithms Suite (C++, Big-O): Linear, Binary, Jump, Interpolation, Exponential.

### 11.6 Awards & Hackathons

- Dean's List · Honours Roll — USIU-Africa
- Junior Achievement Africa Scholarship — Recipient
- Vice Chancellor's Grant — USIU-Africa
- JP Morgan Chase · Code For Good Africa — Team Lead, Sep 2023
- CME Group FX Trading Challenge — Top 25%, Aug 2023
- AmplifyMe simulation — Ranked first, 2023
- Hult Prize · USIU-Africa Innovation Week — 1st Runners-Up, 2022

### 11.7 Photography

**Stats:** 1M+ Unsplash views · 4,000+ uses across Notion, Figma, Squarespace, Wix, Padlet, PicsArt, WordPress, Trello · 11 editorial features, 2021–22.

**Featured titles:** Africa Hotel · Bridge by the Ocean · Defense Watch Tower · Moon Light · Architectural Digest · Patterned School Walkway · Petrol Station · Imani Collective · Down Top Ceiling · Red Brick Wall · Detailed Tree Bark · Seedling · Ball in the Field · Detailed Floor · Detailed Mall Wall · Fake Restaurant Plants · Mall Wall · Pattern Floor · Restaurant · Vintage Sgr Metal · Bridge by the Ocean 2.

### 11.8 Certifications (27 total)

**Technical (14):** Lyft Back-End Sim · JPM SWE Sim · JPM SWE Lite Sim · Python & Flask · IBM Watson Assistants · Linux CLI · Python from UST · Kaggle · Bash Scripting · IBM Open Source · ML for All · Python for Everybody · CSS3 · HTML5.

**Finance & trading (7):** AmplifyMe Finance × Morgan Stanley · AmplifyMe Quant · CME Crude Oil · CME Precious Metals · CME Grains & Oilseeds · CME Micro FX · CME Intro FX.

**Professional dev. (6):** McKinsey Forward · JPM Agile Sim · JPM CADP Sim · Agile (Scrum/Kanban) · Google UX Foundations · Google UX Empathize-Define-Ideate.

### 11.9 Invited events & volunteering

- **Evercore Virtual Events (2023)** — Private Capital Markets, Private Funds Group, PCA Diversity, Strategic Defense & Shareholder Advisory
- **Morgan Stanley Virtual Series (2023–24)**
- **Applied Machine Learning Days (2024)**
- **Volunteering:** Fundraising volunteer · Mji wa Huruma Nyumba ya Wazee · Sep–Dec 2024.

### 11.10 Contact

- Email: `oliver@blacketernumcapital.com`
- GitHub, Google Scholar, LinkedIn, Unsplash (`@oliverr_n`)
- Footer copyright: "Built by Oliver Njeru · all rights reserved © 2020 – 2026"

---

## 12. The decision summary

If anything is unclear, defer to these:

1. **Flame is the only logo.** It appears in the header, hero, footer.
2. **Lamp is the only decorative glyph.** It appears once, above "Reading & references".
3. **Amber is the only saturated color.**
4. **Newsreader is the dominant typeface.** Italic carries emphasis.
5. **Two themes, live toggle in the header.** Dark is the default.
6. **No marketing voice.** First-person, calm, slightly literary.
7. **No rounded corners** anywhere except pills, theme-toggle, and the URL bar.

— end —
