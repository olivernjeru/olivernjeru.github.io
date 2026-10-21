import React from "react";
import { Card, SectionHeader, Style } from "../components/primitives.jsx";
import { workExperienceData } from "../data/experience";

const FEATURED = [
  { key: "Replicant Trader", number: "01" },
  { key: "Black Eternum Capital", number: "02" },
  { key: "Independent Research", number: "03" },
];

export default function ThreeRoles() {
  return (
    <section id="work" className="section">
      <SectionHeader
        kicker="The three jobs"
        title="One desk,"
        italic="three hats"
        hint="Three current roles, one continuous workshop."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
        className="threeroles-grid"
      >
        {FEATURED.map(({ key, number }) => {
          const role = workExperienceData[key];
          if (!role) return null;
          return (
            <Card key={key} variant="inset" style={{ display: "grid", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span className="kicker">{number}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {role.duration}
                </span>
              </div>

              <h3 className="serif-h3">{role.title}</h3>
              <div
                className="italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "var(--muted)",
                }}
              >
                {key}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 15.5,
                  lineHeight: 1.55,
                  color: "var(--text-soft)",
                  margin: 0,
                }}
              >
                {role.responsibilities.join(" ")}
              </p>
            </Card>
          );
        })}
      </div>

      <Style css={`
        @media (max-width: 960px) {
          .threeroles-grid { grid-template-columns: 1fr !important; }
        }
      `} />
    </section>
  );
}
