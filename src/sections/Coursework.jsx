import React from "react";
import { Card, Pill, SectionHeader } from "../components/primitives.jsx";
import { ExternalLink } from "../components/icons/UIIcons";
import { academics } from "../data/academics";

const Achievement = ({ ach }) => (
  <div style={{ display: "grid", gap: 6 }}>
    <h4
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 500,
        fontSize: 17,
        letterSpacing: -0.2,
        lineHeight: 1.25,
        margin: 0,
      }}
    >
      {ach.name}
    </h4>
    {ach.description && (
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--muted)",
          margin: 0,
        }}
      >
        {ach.description}
      </p>
    )}
    {ach.links?.length > 0 && (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
        {ach.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 999,
              border: "1px solid var(--accent)",
              color: "var(--accent-deep)",
              background: "var(--accent-soft)",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            {l.label} <ExternalLink size={11} />
          </a>
        ))}
      </div>
    )}
  </div>
);

export default function Coursework() {
  return (
    <section id="coursework" className="section" style={{ background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <SectionHeader
          kicker="The notebooks"
          title="Coursework,"
          italic="quietly stacked"
          hint="Five undergraduate projects I'm still happy to show. Each card lists the stack and the highlights worth opening."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 18,
          }}
          className="coursework-grid"
        >
          {academics.map((item, idx) => {
            const code = (item.courseCode || "").toUpperCase().replace(/\s+/g, "");
            const stack = item.skills
              ? item.skills.split(",").map((s) => s.trim()).filter(Boolean)
              : [];
            return (
              <Card
                key={code || idx}
                variant="inset"
                id={`coursework-${code}`}
                style={{ display: "grid", gap: 16 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="kicker">{code}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                    }}
                  >
                    Course
                  </span>
                </div>

                <h3 className="serif-h4">{(item.title || "").toUpperCase()}</h3>

                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--text-soft)",
                    margin: 0,
                  }}
                >
                  {item.summary}
                </p>

                {stack.length > 0 && (
                  <div style={{ display: "grid", gap: 8 }}>
                    <div className="kicker">Stack</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {stack.map((s) => (
                        <Pill key={s}>{s}</Pill>
                      ))}
                    </div>
                  </div>
                )}

                {item.achievements?.length > 0 && (
                  <div
                    style={{
                      marginTop: 4,
                      paddingTop: 16,
                      borderTop: "1px solid var(--hair)",
                      display: "grid",
                      gap: 16,
                    }}
                  >
                    <div className="kicker">Highlights</div>
                    {item.achievements.map((ach, j) => (
                      <React.Fragment key={ach.name}>
                        {j > 0 && (
                          <div
                            aria-hidden
                            style={{ borderTop: "1px solid var(--hair)", marginTop: -4 }}
                          />
                        )}
                        <Achievement ach={ach} />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .coursework-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
