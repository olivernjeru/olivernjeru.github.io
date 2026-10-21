import React from "react";
import { Card, SectionHeader, Style } from "../components/primitives.jsx";
import { ExternalLink } from "../components/icons/UIIcons";
import { categorizedCertificates } from "../data/certificates";

const SHORT_TITLE = {
  "Technical Certifications": "Technical",
  "Finance & Trading Simulations": "Finance & trading",
  "Professional Development": "Professional dev.",
};

export default function Certifications() {
  const groups = Object.entries(categorizedCertificates);

  return (
    <section id="certifications" className="section" style={{ background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <SectionHeader
          kicker="On the wall"
          title="Certifications,"
          italic="quietly stacked"
          hint="Twenty-something stamps across software, finance, and process."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
            alignItems: "start",
          }}
          className="certs-grid"
        >
          {groups.map(([groupTitle, items]) => (
            <Card key={groupTitle} variant="inset" style={{ display: "grid", gap: 12 }}>
              <div className="kicker">{SHORT_TITLE[groupTitle] || groupTitle}</div>
              <h3 className="serif-h4">
                {items.length} <em className="italic">{items.length === 1 ? "stamp" : "stamps"}</em>.
              </h3>
              <div>
                {items.map((cert) => {
                  const isLink = cert.url && cert.url !== "#";
                  return (
                    <div
                      key={cert.name}
                      style={{
                        borderTop: "1px solid var(--hair)",
                        padding: "10px 0",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 13.5,
                          lineHeight: 1.3,
                          color: "var(--text-soft)",
                        }}
                      >
                        {cert.name}
                      </span>
                      {isLink ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View credential for ${cert.name}`}
                          style={{
                            color: "var(--accent)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontStyle: "italic",
                            fontSize: 11.5,
                            color: "var(--muted)",
                            textAlign: "right",
                            lineHeight: 1.3,
                            maxWidth: 110,
                          }}
                        >
                          Credential available upon request
                        </span>
                      )}
                    </div>
                  );
                })}
                <div style={{ borderTop: "1px solid var(--hair)" }} />
              </div>
            </Card>
          ))}
        </div>

        <Style css={`
          @media (max-width: 1000px) {
            .certs-grid { grid-template-columns: 1fr !important; }
          }
        `} />
      </div>
    </section>
  );
}
