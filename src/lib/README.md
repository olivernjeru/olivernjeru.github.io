# src/lib/

Framework-free helpers. Plain JS (no JSX).

| File | Purpose |
| ---- | ------- |
| `citation.js` | APA 7 references for publications |
| `format.js` | Dates, names, and number words |
| `images.js` | Responsive gallery images: `srcset` and cover-aware `sizes` |
| `structuredData.js` | schema.org JSON-LD for the Publications page |
| `scroll.js` | Smooth in-page scrolling with the sticky-header offset |

## citation.js: APA 7

**Methodology.** APA Style, 7th edition. Source: *Publication Manual of the American Psychological Association* (7th ed., 2020), chapter 9 (elements of a reference) and chapter 10 (reference examples), plus the APA Style website. APA was chosen because it is widely used and precisely specified, and it uses the DOI as the locator.

**Rules implemented, and where:**

| Rule | Function |
| ---- | -------- |
| Authors inverted, initials with periods and spaces ("Kwon, B. C."); hyphenated given names keep the hyphen ("Kang, S.-G.") | `initials`, `apaAuthorName` |
| 1 author: "A". 2 authors: "A, & B". 3 to 20: every name, with a comma and an ampersand before the last | `formatApaAuthors` |
| 21 or more: the first 19, a comma, ". . .", then the last author, with no ampersand | `formatApaAuthors` |
| Editors not inverted, then "(Ed.)" or "(Eds.)"; two editors joined by "&" with no comma | `formatApaEditors` |
| Journal article: *Journal*, *volume*(issue), pages. DOI | `formatApa` |
| Journal article online before it has a volume: *Journal*. Advance online publication. DOI | `formatApa` (`status: "Ahead of print"`) |
| Proceedings cited like a chapter in an edited book: In E. Editor (Ed.), *Title* (pp. x–y). Publisher. DOI. Editors are left out when the cited version lists none | `formatApa` |
| Locator: `https://doi.org/<doi>`, else the URL | `formatApa` |

**Assumptions and limits.**

- Titles must be in sentence case, which cannot be derived reliably (proper nouns, and acronyms such as SPARK or DbAPI). Each entry therefore carries a hand-written `apaTitle`. A test checks it has the same words as `title`.
- Only the `journal` and `conference` types exist. Anything else throws, rather than silently dropping a paper.
- No tunable parameters. The 20 and 19 thresholds are APA constants (`MAX_LISTED_AUTHORS`, `AUTHORS_BEFORE_ELLIPSIS`).
- Output is `{ parts, text }`. `parts` marks the italic segments for display; `text` is the plain string the Copy button writes to the clipboard.

**Algorithm.** One linear pass over the author array. The 21+ rule is two array slices (the first 19, then the last). O(n).

The exact expected strings are pinned in `citation.test.js`.

## format.js

- `formatDate("2026-10-20")` returns "Oct 20, 2026".
  **Gotcha:** a date-only ISO string parses as UTC midnight. Formatting it in the viewer's time zone shows the previous day anywhere west of UTC, so the formatter uses `timeZone: "UTC"`. Invalid input throws a `RangeError`.
- `numberWord(3)` returns "three": 0 to 12 become words; larger numbers stay digits.
- `parseMonthYear("Mar 2018")` reads the durations in `src/data/experience.js`; anything else throws. `yearsSince(start, now)` counts whole years. Together they derive "eight years of jobs" on the home page from the earliest role.

## images.js: gallery images

**Problem.** The gallery showed 21 full-size photos (3120 or 4160 px wide, 39 MB in total) in tiles about 270 px wide.

**Approach.** Each tile gets a `srcset` with three candidates: WebP thumbnails at 640 and 1280 px, plus the untouched original as the largest. The `sizes` attribute tells the browser how wide the photo is actually drawn, and the browser picks the smallest candidate that is sharp enough for that width times the screen's pixel density. A screen that needs more than 1280 px gets the original rather than an upscaled thumbnail. The lightbox always shows the original. The thumbnails (Lanczos downscaling, WebP quality 90) are listed in `src/data/galleryThumbs.js`.

**Cover-aware `sizes` (the algorithm).** A tile's photo uses `object-fit: cover`, which scales it until it fills the tile. A photo wider than its tile, relative to height, is therefore drawn wider than the tile:

    drawn width = tile width x max(1, photo aspect / tile aspect)

`coverFactor` computes that multiplier. `gallerySizes` combines it with the grid geometry: 4 columns and 14 px gaps inside `min(100vw, 1240px)` minus 2 x 56 px padding above 900 px; 2 columns at or below 900 px; 22 px side padding at or below 720 px. Wide tiles span 2 columns at 2:1 and the rest are 1:1. The result is one `calc()` per breakpoint. Without the factor, a landscape photo in a square tile would be drawn a third wider than the size the browser chose for it, and look soft.

**Constraint.** `gallerySizes` mirrors the CSS in `src/sections/ArtGallery.jsx` and `src/styles/tokens.css`. If the grid, gaps, breakpoints, or span pattern change, update it too.

**Data structures.** A plain object keyed by the photo path in `artGallery.js`, giving O(1) lookup per tile; variants sorted by width.

## structuredData.js: search data

Builds one schema.org `ScholarlyArticle` per paper, with:

- title, authors, and publication date;
- the venue: a `Periodical` for journals, a `Book` for proceedings;
- pages, and the DOI (as `sameAs` plus an `identifier`);
- the free PDF as an `encoding` MediaObject, with its license when it has one.

The site owner is linked to their profiles, including ORCID. `toJsonLdScript` escapes `<`, so no string in the data can close the `<script>` early.

**What it does and does not do.**

- **What it does:** it describes the papers in a standard, machine-readable way for search engines and knowledge graphs.
- **What it does not do:** Google shows no special rich result for `ScholarlyArticle`. Google Scholar uses its own crawler, and its `citation_*` meta tags assume one article per page, so they do not fit a list page. Scholar finds papers through the publisher versions, which the DOIs point to.

## scroll.js

`scrollToSection(id)` smooth-scrolls to a home-page section, subtracting the 70 px sticky header (`HEADER_OFFSET`). It is used by the Header, Footer, and Hero.

Deep links from other pages (`/#skills`) use the browser's own jump. `scroll-padding-top: 70px` on `html` in `src/styles/tokens.css` keeps the section below the header; keep the two values equal.
