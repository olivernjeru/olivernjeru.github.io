import React from "react";
import { Card, Pill, SectionHeader, Style } from "../components/primitives.jsx";
import { categorizedSkills } from "../data/skills";

const TITLES = {
  ProgrammingLanguages: "Languages",
  SoftwareDevelopmentTools: "Frameworks & Tools",
  SoftSkills: "Soft skills",
  OtherSkills: "Off the clock",
};

export default function Skills() {
  const keys = Object.keys(categorizedSkills);

  return (
    <section id="skills" className="section">
      <SectionHeader
        kicker="What I know"
        title="The"
        italic="kit"
        hint="Four shelves: the languages I write in, the tools on the bench, the soft work, and the stuff that's just life."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
        }}
        className="skills-grid"
      >
        {keys.map((key, idx) => {
          const isLast = idx === keys.length - 1;
          const variant = isLast ? "accent" : "default";
          return (
            <Card key={key} variant={variant} style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <div className="kicker">0{idx + 1}</div>
              <h3 className="serif-h4">{TITLES[key] || key}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {categorizedSkills[key].map((skill) => (
                  <Pill key={skill} accent={isLast}>
                    {skill}
                  </Pill>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <Style css={`
        @media (max-width: 1100px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `} />
    </section>
  );
}
