import React from "react";
import { Card, ListRow, SectionHeader, Style } from "../components/primitives.jsx";
import { Lamp } from "../components/icons/Lamp";
import { ExternalLink } from "../components/icons/UIIcons";
import { educationData } from "../data/education";

const SHORT_NAME = {
  "United States International University-Africa": "USIU-Africa",
  "London Institute of Banking & Finance": "London Institute of Banking & Finance",
  "Strathmore University": "Strathmore University",
};

export default function ReadingReferences() {
  const schools = Object.values(educationData);

  return (
    <section id="education" className="section" style={{ background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <div style={{ display: "grid", justifyContent: "center", marginBottom: 24 }}>
          <Lamp size={48} />
        </div>

        <SectionHeader
          kicker="Where I studied"
          title="Reading &"
          italic="references"
          hint="Three schools, three different rhythms."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
          className="education-grid"
        >
          {schools.map((s) => (
            <Card key={s.name} style={{ display: "grid", gap: 12 }}>
              <div className="kicker">School</div>
              <h3 className="serif-h4">{SHORT_NAME[s.name] || s.name}</h3>
              <div
                className="italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.4,
                }}
              >
                {s.degree}
              </div>

              {s.classes?.length > 0 && (
                <div>
                  <div className="kicker" style={{ marginTop: 8, marginBottom: 6 }}>
                    Courses
                  </div>
                  <div style={{ display: "grid", gap: 0 }}>
                    {s.classes.map((c) => (
                      <div
                        key={c}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 14,
                          padding: "6px 0",
                          borderTop: "1px solid var(--hair)",
                          color: "var(--text-soft)",
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {s.achievements?.length > 0 && (
                <div>
                  <div className="kicker" style={{ marginTop: 8, marginBottom: 6 }}>
                    Honors
                  </div>
                  {s.achievements.map((a) => (
                    <div
                      key={a}
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 14,
                        color: "var(--text-soft)",
                        padding: "4px 0",
                      }}
                    >
                      {a}
                    </div>
                  ))}
                </div>
              )}

              {s.link && (
                <a
                  className="link"
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    borderBottom: "none",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  Visit <ExternalLink size={11} />
                </a>
              )}
            </Card>
          ))}
        </div>

        <Style css={`
          @media (max-width: 960px) {
            .education-grid { grid-template-columns: 1fr !important; }
          }
        `} />
      </div>
    </section>
  );
}
