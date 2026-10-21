import React, { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { Card, LinkPill, SectionHeader, Style } from "../components/primitives.jsx";
import { publications, SELF } from "../data/publications.js";
import { PROFILES } from "../data/profiles.js";
import { formatApa } from "../lib/citation.js";
import { formatDate, fullName } from "../lib/format.js";
import { publicationsJsonLd, toJsonLdScript } from "../lib/structuredData.js";

// Search-engine description of every paper (schema.org ScholarlyArticle).
const JSON_LD = toJsonLdScript(
  publicationsJsonLd(publications, {
    self: SELF,
    selfSameAs: Object.values(PROFILES).map((p) => p.href),
  })
);

const GROUPS = [
  { type: "journal", title: "Journal articles" },
  { type: "conference", title: "Conference papers" },
];

// One pass over the data (newest first). A Map keeps the group order stable.
// An unknown type throws rather than silently dropping a paper from the page.
const groupByType = (items) => {
  const groups = new Map(GROUPS.map((g) => [g.type, []]));
  items.forEach((p) => {
    if (!groups.has(p.type)) throw new Error(`Unknown publication type "${p.type}" (${p.id})`);
    groups.get(p.type).push(p);
  });
  return groups;
};

// Author lists longer than this collapse right after the site owner's name.
const COLLAPSE_OVER = 8;

const isSelf = (a) => a.given === SELF.given && a.family === SELF.family;

const names = (authors) =>
  authors.map((a, i) => (
    <React.Fragment key={`${a.family}|${a.given}`}>
      {i > 0 && ", "}
      {isSelf(a) ? <strong className="pub-self">{fullName(a)}</strong> : fullName(a)}
    </React.Fragment>
  ));

// <details> needs no JavaScript, so the full list also works in the prerendered HTML.
function Authors({ authors }) {
  if (authors.length <= COLLAPSE_OVER) {
    return <div className="pub-authors">{names(authors)}</div>;
  }
  const cut = Math.max(authors.findIndex(isSelf) + 1, 3);
  const rest = authors.slice(cut);
  return (
    <div className="pub-authors">
      {names(authors.slice(0, cut))}
      <details className="pub-more">
        <summary>
          <span className="pub-more__closed">Show all {authors.length} authors</span>
          <span className="pub-more__open">Hide {rest.length} authors</span>
        </summary>
        {names(rest)}
      </details>
    </div>
  );
}

const selectContents = (el) => {
  if (!el) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

function Cite({ pub }) {
  const { parts, text } = formatApa(pub);
  const textRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle" | "copied" | "failed"

  useEffect(() => {
    if (status !== "copied") return undefined;
    const timer = setTimeout(() => setStatus("idle"), 2400);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      // The failure is shown on the button and in the status line below; the
      // citation is selected so it can be copied by hand. (No console call:
      // vite.config.js strips console.* from every build, dev and test included.)
      selectContents(textRef.current);
      setStatus("failed");
    }
  };

  return (
    <div className="pub-cite">
      <div className="pub-cite__head">
        <span className="kicker">Cite (APA)</span>
        <button type="button" className="pub-cite__copy" onClick={copy}>
          {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"}
        </button>
      </div>
      <p ref={textRef} className="pub-cite__text">
        {parts.map((part, i) =>
          part.italic ? <em key={i}>{part.text}</em> : <React.Fragment key={i}>{part.text}</React.Fragment>
        )}
      </p>
      <p role="status" className={status === "failed" ? "pub-cite__status" : "visually-hidden"}>
        {status === "copied" && "Citation copied to the clipboard."}
        {status === "failed" &&
          "Couldn't copy automatically. The citation is selected: press Ctrl+C (Cmd+C on a Mac)."}
      </p>
    </div>
  );
}

function PublicationEntry({ pub }) {
  const kicker = [pub.venueShort, pub.track, formatDate(pub.date), pub.status].filter(Boolean).join(" · ");
  const notes = pub.links.filter((l) => l.note).map((l) => l.note);

  return (
    <Card id={pub.id} style={{ display: "grid", gap: 14 }}>
      <div className="kicker kicker--accent">{kicker}</div>
      <h3 className="serif-h4" style={{ lineHeight: 1.25 }}>
        {pub.title}
      </h3>
      <Authors authors={pub.authors} />
      <div className="pub-venue">{pub.venue}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {pub.links.map((l) => (
          <LinkPill key={l.href} href={l.href}>
            {l.label}
          </LinkPill>
        ))}
      </div>
      {notes.map((note) => (
        <p key={note} className="pub-note">
          {note}
        </p>
      ))}
      <Cite pub={pub} />
    </Card>
  );
}

export default function PublicationsPage() {
  const groups = groupByType(publications);

  return (
    <PageShell page="publications">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <section className="section">
        <SectionHeader
          as="h1"
          kicker="Research"
          title="Publications,"
          italic="in full"
          hint="Peer-reviewed papers I've co-authored."
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: -16, marginBottom: 48 }}>
          <LinkPill href={PROFILES.orcid.href}>ORCID {PROFILES.orcid.handle}</LinkPill>
          <LinkPill href={PROFILES.scholar.href}>Google Scholar</LinkPill>
        </div>

        {GROUPS.map(({ type, title }) => {
          const items = groups.get(type);
          if (items.length === 0) return null;
          return (
            <section key={type} className="pub-group" aria-labelledby={`pubs-${type}`}>
              <div className="kicker" style={{ marginBottom: 10 }}>
                {String(items.length).padStart(2, "0")} · {items.length === 1 ? "paper" : "papers"}
              </div>
              <h2 id={`pubs-${type}`} className="serif-h3" style={{ marginBottom: 18 }}>
                {title}
              </h2>
              <div className="pub-list">
                {items.map((p) => (
                  <PublicationEntry key={p.id} pub={p} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <Style css={`
        .pub-group + .pub-group { margin-top: 56px; }
        .pub-list { display: grid; gap: 18px; max-width: 880px; }
        .pub-authors {
          font-family: var(--font-serif);
          font-size: 15.5px;
          line-height: 1.55;
          color: var(--text-soft);
        }
        .pub-self { color: var(--text); font-weight: 600; }
        .pub-more { margin-top: 6px; }
        .pub-more > summary {
          cursor: pointer;
          list-style: none;
          width: max-content;
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .pub-more > summary::-webkit-details-marker { display: none; }
        .pub-more > summary:hover { color: var(--accent); }
        .pub-more[open] .pub-more__closed,
        .pub-more:not([open]) .pub-more__open { display: none; }
        .pub-venue {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 15px;
          line-height: 1.45;
          color: var(--muted);
        }
        .pub-note {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 13.5px;
          color: var(--muted);
        }
        .pub-cite {
          border-top: 1px solid var(--hair);
          padding-top: 14px;
          margin-top: 4px;
          display: grid;
          gap: 8px;
        }
        .pub-cite__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .pub-cite__copy {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--text);
          background: transparent;
          border: 1px solid var(--hair);
          padding: 6px 10px;
          transition: border-color 120ms ease, color 120ms ease;
        }
        .pub-cite__copy:hover { border-color: var(--accent); color: var(--accent); }
        /* APA hanging indent; long DOIs and URLs may break anywhere. */
        .pub-cite__text {
          margin: 0;
          padding-left: 2em;
          text-indent: -2em;
          font-family: var(--font-serif);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-soft);
          overflow-wrap: anywhere;
        }
        .pub-cite__status {
          margin: 0;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 13px;
          color: var(--muted);
        }
      `} />
    </PageShell>
  );
}
