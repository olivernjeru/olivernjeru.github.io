import React from "react";
import { ArrowRight } from "../components/icons/UIIcons";

const ROWS = [
  { key: "Email", value: "onjeru@usiu.ac.ke", href: "mailto:onjeru@usiu.ac.ke" },
  { key: "GitHub", value: "github.com/olivernjeru", href: "https://github.com/olivernjeru" },
  { key: "LinkedIn", value: "linkedin.com/in/olivernjeru", href: "https://linkedin.com/in/olivernjeru" },
  { key: "Scholar", value: "Oliver Njeru", href: "https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en" },
  { key: "Unsplash", value: "@olivernjeru", href: "https://unsplash.com/@olivernjeru" },
];

export default function ContactCTA() {
  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-inverse)",
        color: "var(--bg)",
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "80px var(--section-x)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 32,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        <div>
          <div
            className="kicker"
            style={{
              color: "var(--inverse-muted)",
              marginBottom: 18,
            }}
          >
            Get in touch
          </div>
          <h2
            className="serif-h2"
            style={{ color: "var(--bg)", marginBottom: 16, maxWidth: 720 }}
          >
            Pull up a chair. <em className="italic">The fire stays lit.</em>
          </h2>
          <p
            className="hint-italic"
            style={{
              color: "var(--inverse-soft)",
              fontSize: 19,
              maxWidth: 540,
              margin: 0,
            }}
          >
            For collaborations, advisory, or a slow correspondence about
            research, trading systems, or photography &mdash; my inbox is
            open.
          </p>

          <a
            href="mailto:onjeru@usiu.ac.ke"
            className="btn btn--primary"
            style={{ marginTop: 26 }}
          >
            Write to me <ArrowRight size={13} />
          </a>
        </div>

        <div style={{ display: "grid" }}>
          {ROWS.map((row) => (
            <a
              key={row.key}
              href={row.href}
              target={row.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              style={{
                padding: "16px 0",
                display: "grid",
                gridTemplateColumns: "100px 1fr auto",
                gap: 14,
                alignItems: "center",
                borderTop: "1px solid var(--inverse-hair)",
                textDecoration: "none",
                color: "var(--bg)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: "var(--inverse-muted)",
                }}
              >
                {row.key}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  letterSpacing: -0.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.value}
              </span>
              <ArrowRight size={13} />
            </a>
          ))}
          <div style={{ borderTop: "1px solid var(--inverse-hair)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr !important; padding: 56px var(--section-x) !important; }
        }
      `}</style>
    </section>
  );
}
