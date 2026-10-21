// APA 7 reference formatter for the entries in src/data/publications.js.
// Methodology, sources, assumptions, and the rule-to-function map: src/lib/README.md.

import { yearOf } from "./format.js";

// APA 7 lists up to 20 authors. From 21 on: the first 19, an ellipsis, then the last.
const MAX_LISTED_AUTHORS = 20;
const AUTHORS_BEFORE_ELLIPSIS = 19;

// "Bum Chul" -> "B. C."; "Seung-Gu" -> "S.-G." (hyphenated given names keep the hyphen).
export const initials = (given) =>
  given
    .trim()
    .split(/\s+/)
    .map((part) =>
      part
        .split("-")
        .map((piece) => `${piece.charAt(0).toUpperCase()}.`)
        .join("-")
    )
    .join(" ");

// Authors are inverted: "Kwon, B. C."
export const apaAuthorName = ({ given, family }) => `${family}, ${initials(given)}`;

// Editors are not inverted: "K. Larson"
export const apaEditorName = ({ given, family }) => `${initials(given)} ${family}`;

export const formatApaAuthors = (authors) => {
  if (!authors?.length) throw new Error("An APA reference needs at least one author");
  const names = authors.map(apaAuthorName);
  const last = names[names.length - 1];
  if (names.length === 1) return last;
  if (names.length <= MAX_LISTED_AUTHORS) {
    // A comma precedes the ampersand even with two authors: "Njeru, O., & Okanda, P."
    return `${names.slice(0, -1).join(", ")}, & ${last}`;
  }
  // 21 or more: no ampersand, three spaced ellipsis points before the final author.
  return `${names.slice(0, AUTHORS_BEFORE_ELLIPSIS).join(", ")}, . . . ${last}`;
};

// "In K. Larson (Ed.)" / "In M. Cunningham & P. Cunningham (Eds.)"
export const formatApaEditors = (editors) => {
  const names = editors.map(apaEditorName);
  const list =
    names.length <= 2
      ? names.join(" & ")
      : `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
  return `${list} (${names.length === 1 ? "Ed." : "Eds."})`;
};

// Every element ends with a period unless it already ends in terminal punctuation.
const terminate = (text) => (/[.?!]$/.test(text) ? text : `${text}.`);

// Returns the reference as styled segments (italic marks the journal or
// proceedings title, as APA requires) plus the same text without styling,
// which is what the Copy button puts on the clipboard.
export const formatApa = (pub) => {
  const parts = [];
  const add = (text, italic = false) => parts.push({ text, italic });

  add(`${formatApaAuthors(pub.authors)} (${yearOf(pub.date)}). ${terminate(pub.apaTitle)} `);

  if (pub.type === "journal") {
    add(pub.venue, true);
    if (pub.volume) {
      add(", ");
      add(String(pub.volume), true);
      if (pub.issue) add(`(${pub.issue})`);
      if (pub.pages) add(`, ${pub.pages}`);
      add(". ");
    } else if (pub.status === "Ahead of print") {
      // Published online before being assigned to a volume and issue.
      add(". Advance online publication. ");
    } else {
      add(". ");
    }
  } else if (pub.type === "conference") {
    // Proceedings with editors and an ISBN are cited like a chapter in an edited book.
    add("In ");
    if (pub.editors?.length) add(`${formatApaEditors(pub.editors)}, `);
    add(pub.container, true);
    add(pub.pages ? ` (pp. ${pub.pages}). ` : ". ");
    if (pub.publisher) add(`${terminate(pub.publisher)} `);
  } else {
    throw new Error(`No APA format for publication type "${pub.type}" (${pub.id})`);
  }

  // A DOI is preferred; otherwise the URL where the work can be read.
  add(pub.doi ? `https://doi.org/${pub.doi}` : pub.url);

  return { parts, text: parts.map((part) => part.text).join("") };
};
