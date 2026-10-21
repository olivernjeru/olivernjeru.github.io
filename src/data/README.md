# src/data/

Content lives here as ES modules. Components read these files, so changing content never requires touching a component.

| File | Read by |
| ---- | ------- |
| `publications.js` | Hero (count and venues), SelectedWork (home cards), PublicationsPage (cards, APA, JSON-LD) |
| `profiles.js` | Footer, ContactCTA, PublicationsPage; mirrored in the `index.html` JSON-LD (test-enforced) |
| `education.js` | ReadingReferences |
| `experience.js` | ThreeRoles, SelectedWork (timeline, and "N years of jobs" from the earliest start) |
| `projects.js` | Projects (images in `src/assets/projects/`) |
| `academics.js` | Coursework |
| `artGallery.js` | ArtGallery: titles, captions, original photos in `public/components/art/assets/` |
| `galleryThumbs.js` | ArtGallery: thumbnail manifest (see Images) |
| `awards.js` | Awards, EventsVolunteering |
| `certificates.js` | Certifications |
| `skills.js` | Skills |

## publications.js

The single source of truth for publications. Keep entries newest first (a test checks the order).

| Field | Required | Meaning |
| ----- | -------- | ------- |
| `id` | yes | Unique. Also the card's HTML id, so `publications.html#<id>` links to it |
| `type` | yes | `"journal"` or `"conference"` |
| `title` | yes | Exactly as published |
| `apaTitle` | yes | The same words in APA sentence case: capitalize the first word, the first word after a colon, and proper nouns |
| `authors` | yes | `[{ given, family }]` in publication order; must include `SELF` |
| `date` | yes | ISO `YYYY-MM-DD` |
| `venue`, `venueShort` | yes | Full venue (italic line) and short label (kicker, Hero stat) |
| `track` | no | For example `"Demo Track"` |
| `status` | no | `"Ahead of print"` produces APA's "Advance online publication." |
| `volume`, `issue`, `pages` | journals, once assigned | Replace "Advance online publication" in the citation |
| `container`, `editors`, `pages`, `publisher` | conferences | APA proceedings fields (`editors` only if the cited version lists them) |
| `doi` or `url` | one of them | APA locator; a DOI is preferred |
| `links` | yes | `[{ kind, label, href, note?, license? }]`, where `kind` is `"published"`, `"manuscript"` (self-hosted accepted manuscript), `"pdf"`, or `"data"`; `license` is a license URL for the structured data |

**Adding a paper.**

1. Insert the entry at its date position.
2. If you self-host the accepted manuscript, put the PDF in `public/papers/` and link it with `kind: "manuscript"`; the home card then mentions the free manuscript.
3. Run `npm test`.

## profiles.js

`EMAIL` and `PROFILES` (GitHub, LinkedIn, Google Scholar, ORCID, Unsplash, Figma). `index.html` cannot import JavaScript, so its JSON-LD repeats the URLs; `profiles.test.js` fails if the two drift. They had drifted before this file existed: three different Unsplash URLs.

## Images

**Project screenshots** live in `src/assets/projects/*.webp` and are imported in `projects.js`, so Vite adds a content hash to their file names for caching. Keep images as files: a base64 string in a data file gets inlined into both the prerendered HTML and the JavaScript bundle.

**Gallery photos.** The originals in `public/components/art/assets/` are never modified; the lightbox shows them. Tiles use WebP thumbnails at 640 and 1280 px in `public/components/art/thumbs/`, listed in `galleryThumbs.js` together with the original as the largest candidate. Every photo in `artGallery.js` needs an entry there: a photo without thumbnails makes the build fail on purpose, rather than quietly sending a 4 MB original into a small tile. How the browser picks a size: `src/lib/README.md`.

## experience.js

Durations are `"Mon YYYY - Mon YYYY"`, `"Mon YYYY - Current"`, or a single `"Mon YYYY"`. Keep that format: SelectedWork parses the earliest start to say how many years of work the timeline covers, and `experience.test.js` fails on anything it cannot parse.
