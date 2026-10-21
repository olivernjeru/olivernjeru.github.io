import React, { useEffect, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { SectionHeader, Style } from "../components/primitives.jsx";
import { HeroFlame } from "../components/icons/Flame";
import { ArrowRight } from "../components/icons/UIIcons";
import { EMAIL } from "../data/profiles.js";

// The address that was not found, decoded for display. Empty when someone opens
// /404.html itself. decodeURIComponent throws on malformed escapes.
const missingPath = () => {
  const { pathname } = window.location;
  if (pathname === "/404.html") return "";
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
};

// GitHub Pages serves 404.html (with HTTP status 404) for any address that does
// not exist, so this page can appear at any path.
export default function NotFoundPage() {
  // Read after mount: the prerendered HTML is built at /404.html and must stay generic.
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(missingPath());
  }, []);

  return (
    <PageShell page="notFound">
      <section className="section">
        <div
          className="nf-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <SectionHeader
              as="h1"
              kicker="404 · Off the map"
              title="Wrong"
              italic="door"
              hint={
                <>
                  There&rsquo;s no page at{" "}
                  {path ? <code className="nf-path">{path}</code> : "this address"}. It may have
                  moved, or the link may have a typo. The fire&rsquo;s still going in the lounge.
                </>
              }
            />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="/">
                Back to the lounge <ArrowRight size={13} />
              </a>
              <a className="btn" href="/publications.html">
                Publications
              </a>
              <a className="btn btn--ghost" href={`mailto:${EMAIL}`}>
                Write to me
              </a>
            </div>
          </div>

          <div aria-hidden className="nf-flame">
            <HeroFlame width={180} />
          </div>
        </div>
      </section>

      <Style css={`
        .nf-path {
          font-family: var(--font-mono);
          font-style: normal;
          font-size: 0.8em;
          background: var(--bg-alt);
          color: var(--text);
          padding: 1px 6px;
          overflow-wrap: anywhere;
        }
        @media (max-width: 720px) {
          .nf-grid { grid-template-columns: 1fr !important; }
          .nf-flame { display: none; }
        }
      `} />
    </PageShell>
  );
}
