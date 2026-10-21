// schema.org JSON-LD for /publications.html: one ScholarlyArticle per paper,
// built from src/data/publications.js. Vocabulary: https://schema.org/ScholarlyArticle.
// What it does and does not do for search: src/lib/README.md.

import { fullName } from "./format.js";

export const SITE_URL = "https://olivernjeru.github.io";
export const PUBLICATIONS_URL = `${SITE_URL}/publications.html`;

const absolute = (href) => new URL(href, SITE_URL).href;
const samePerson = (a, b) => a.given === b.given && a.family === b.family;

export const publicationsJsonLd = (publications, { self, selfSameAs = [] }) => ({
  "@context": "https://schema.org",
  "@graph": publications.map((p) => {
    const id = `${PUBLICATIONS_URL}#${p.id}`;
    const freeCopy = p.links.find((l) => l.kind === "manuscript" || l.kind === "pdf");
    return {
      "@type": "ScholarlyArticle",
      "@id": id,
      url: id,
      name: p.title,
      headline: p.title,
      author: p.authors.map((a) =>
        samePerson(a, self)
          ? { "@type": "Person", name: fullName(a), url: `${SITE_URL}/`, sameAs: selfSameAs }
          : { "@type": "Person", name: fullName(a) }
      ),
      datePublished: p.date,
      isPartOf:
        p.type === "journal"
          ? { "@type": "Periodical", name: p.venue }
          : {
              "@type": "Book",
              name: p.container,
              ...(p.publisher && { publisher: { "@type": "Organization", name: p.publisher } }),
            },
      ...(p.pages && { pagination: p.pages }),
      ...(p.doi && {
        sameAs: `https://doi.org/${p.doi}`,
        identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
      }),
      ...(freeCopy && {
        isAccessibleForFree: true,
        encoding: {
          "@type": "MediaObject",
          contentUrl: absolute(freeCopy.href),
          encodingFormat: "application/pdf",
          ...(freeCopy.license && { license: freeCopy.license }),
        },
      }),
    };
  }),
});

// Serialized for <script type="application/ld+json">. "<" is escaped so that no
// string in the data can close the script element early.
export const toJsonLdScript = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
