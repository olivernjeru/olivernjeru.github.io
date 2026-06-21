import React from "react";
import { Card, SectionHeader } from "../components/primitives.jsx";
import { ExternalLink } from "../components/icons/UIIcons";
import { publications } from "../data/education";
import { workExperienceData } from "../data/experience";

const CURRENT_KEYS = new Set([
  "Black Eternum Capital",
  "Replicant Trader",
  "Independent Research",
]);

const orderExperience = (entries) => {
  const current = [];
  const past = [];
  entries.forEach(([org, details]) => {
    (CURRENT_KEYS.has(org) ? current : past).push([org, details]);
  });
  return [...current, ...past];
};

const PublicationCard = ({ p }) => (
  <Card style={{ display: "grid", gap: 12 }}>
    <div className="kicker kicker--accent">Publication</div>
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "var(--text)",
        textDecoration: "none",
        display: "grid",
        gap: 12,
      }}
    >
      <h3 className="serif-h4" style={{ lineHeight: 1.25 }}>
        {p.title.trim()}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--muted)",
          margin: 0,
        }}
      >
        {p.description}
      </p>
      {p.conference && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: "var(--text-soft)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {p.conference.name} · {p.conference.date}
          <ExternalLink size={11} />
        </div>
      )}
    </a>
  </Card>
);

const ExperienceRow = ({ org, details, isCurrent }) => (
  <details
    style={{
      borderTop: "1px solid var(--hair)",
    }}
    className="exp-row"
  >
    <summary
      style={{
        listStyle: "none",
        cursor: "pointer",
        padding: "14px 0",
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        gap: 14,
        alignItems: "baseline",
      }}
    >
      <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-serif)",
            fontSize: 17,
            fontWeight: 500,
          }}
        >
          {isCurrent && <span className="live-dot" aria-hidden />}
          {details.title}
        </div>
        <div
          className="italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 14.5,
            color: "var(--muted)",
          }}
        >
          {org}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: 0.6,
          whiteSpace: "nowrap",
        }}
      >
        {details.duration}
      </div>
      <span
        aria-hidden
        className="exp-caret"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--muted)",
          width: 14,
          textAlign: "center",
          transition: "transform 160ms ease",
        }}
      >
        +
      </span>
    </summary>
    <ul
      style={{
        margin: 0,
        padding: "0 0 18px 24px",
        listStyle: "none",
        display: "grid",
        gap: 8,
      }}
    >
      {details.responsibilities.map((task, idx) => (
        <li
          key={idx}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--text-soft)",
            position: "relative",
            paddingLeft: 14,
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: "0.75em",
              width: 6,
              height: 1,
              background: "var(--accent)",
            }}
          />
          {task}
        </li>
      ))}
    </ul>
  </details>
);

export default function SelectedWork() {
  const entries = orderExperience(Object.entries(workExperienceData));

  return (
    <section id="research" className="section" style={{ background: "var(--bg-alt)" }}>
      <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
        <SectionHeader
          kicker="From the workshop"
          title="Selected"
          italic="work"
          hint="Two publications on one side, eight years of jobs on the other. Click any role to read what it actually involved."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 22,
          }}
          className="selectedwork-grid"
        >
          <div style={{ display: "grid", gap: 14, gridAutoRows: "max-content" }}>
            {publications.map((p) => (
              <PublicationCard key={p.title} p={p} />
            ))}
          </div>

          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>
              Experience · click to expand
            </div>
            <div>
              {entries.map(([org, details]) => (
                <ExperienceRow
                  key={org}
                  org={org}
                  details={details}
                  isCurrent={CURRENT_KEYS.has(org)}
                />
              ))}
              <div style={{ borderTop: "1px solid var(--hair)" }} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .selectedwork-grid { grid-template-columns: 1fr !important; }
          }
          .exp-row > summary::-webkit-details-marker { display: none; }
          .exp-row[open] > summary .exp-caret { transform: rotate(45deg); }
          .exp-row > summary:hover { background: var(--faint); }
        `}</style>
      </div>
    </section>
  );
}
