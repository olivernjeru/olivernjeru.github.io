import React from "react";
import { Card, SectionHeader } from "../components/primitives.jsx";
import { ExternalLink } from "../components/icons/UIIcons";
import { categorizedAwards } from "../data/awards";

export default function EventsVolunteering() {
  const { invitedEvents, volunteering } = categorizedAwards;

  return (
    <section id="events" className="section">
      <SectionHeader
        kicker="Off the foyer"
        title="Invited rooms &"
        italic="time given"
        hint="Closed-door conferences on one side, evenings volunteered on the other."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 18,
        }}
        className="events-grid"
      >
        <Card style={{ display: "grid", gap: 12 }}>
          <div className="kicker">Invited events</div>
          <h3 className="serif-h4">Rooms I&rsquo;ve been let into.</h3>
          <div>
            {invitedEvents.map((entry) => (
              <div
                key={entry.name}
                style={{
                  borderTop: "1px solid var(--hair)",
                  padding: "14px 0",
                  display: "grid",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 12,
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "var(--font-serif)",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {entry.name}
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${entry.name}`}
                        style={{ color: "var(--accent)", display: "inline-flex" }}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  {entry.date && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: 0.6,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.date}
                    </span>
                  )}
                </div>
                {entry.details?.length > 0 && (
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      fontFamily: "var(--font-serif)",
                      fontSize: 14,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {entry.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--hair)" }} />
          </div>
        </Card>

        <Card variant="accent" style={{ display: "grid", gap: 12 }}>
          <div className="kicker kicker--accent">Volunteering</div>
          <h3 className="serif-h4">Time given.</h3>
          {volunteering.map((v) => (
            <div key={v.role} style={{ display: "grid", gap: 8 }}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {v.role}
              </div>
              <div
                className="italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "var(--text-soft)",
                }}
              >
                {v.organization}
              </div>
              <div
                className="mono"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: 0.6,
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                {v.period}
              </div>
              {v.details?.length > 0 && (
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    fontFamily: "var(--font-serif)",
                    fontSize: 14,
                    color: "var(--text-soft)",
                    lineHeight: 1.55,
                  }}
                >
                  {v.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Card>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
