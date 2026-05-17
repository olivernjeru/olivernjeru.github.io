import React from "react";
import { Card, ListRow, SectionHeader } from "../components/primitives.jsx";
import { categorizedAwards } from "../data/awards";

export default function Awards() {
  const { academicHonors, hackathonsCompetitions, photographyAchievements } = categorizedAwards;

  return (
    <section id="awards" className="section">
      <SectionHeader
        kicker="Quietly noted"
        title="Awards &"
        italic="hackathons"
        hint="Things on the shelf. Not the work itself, but the reminders it counted."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
        }}
        className="awards-grid"
      >
        <Card style={{ display: "grid", gap: 8 }}>
          <div className="kicker">Academic honours</div>
          <h3 className="serif-h4" style={{ marginBottom: 6 }}>
            School laurels.
          </h3>
          <div>
            {academicHonors.map((a) => (
              <ListRow key={a} left={<span style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>{a}</span>} />
            ))}
            <div style={{ borderTop: "1px solid var(--hair)" }} />
          </div>
        </Card>

        <Card style={{ display: "grid", gap: 8 }}>
          <div className="kicker">Hackathons & competitions</div>
          <h3 className="serif-h4" style={{ marginBottom: 6 }}>
            Time-boxed wins.
          </h3>
          <div>
            {hackathonsCompetitions.map((a) => (
              <ListRow key={a} left={<span style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>{a}</span>} />
            ))}
            <div style={{ borderTop: "1px solid var(--hair)" }} />
          </div>
        </Card>
      </div>

      <Card variant="accent" style={{ marginTop: 18, display: "grid", gap: 8 }}>
        <div className="kicker kicker--accent">Photography stats</div>
        <h3 className="serif-h4">A million+ views.</h3>
        <div>
          {photographyAchievements.map((a) => (
            <ListRow key={a} left={<span style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>{a}</span>} />
          ))}
          <div style={{ borderTop: "1px solid var(--hair)" }} />
        </div>
      </Card>

      <style>{`
        @media (max-width: 900px) {
          .awards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
