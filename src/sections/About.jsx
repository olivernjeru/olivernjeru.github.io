import React from "react";
import { Pill, SectionHeader } from "../components/primitives.jsx";

const INTERESTS = [
  "Multi-Agent Reinforcement Learning",
  "Optimisation",
  "Game Theory",
  "Simulations",
  "Stochastic Optimisation",
  "Research",
  "Entrepreneurship",
];

const OFF_THE_CLOCK = ["Travel", "Swimming", "Gaming"];

export default function About() {
  return (
    <section id="about" className="section">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "start",
        }}
        className="about-grid"
      >
        <div>
          <SectionHeader
            kicker="About the work"
            title="A few"
            italic="interests"
          />
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--text-soft)",
              margin: 0,
              maxWidth: 540,
            }}
          >
            I collaborate on cutting-edge research and build solutions that make a
            difference. Most days, the work sits somewhere between the headings below.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {INTERESTS.map((label) => (
              <Pill key={label} accent>
                {label}
              </Pill>
            ))}
          </div>

          <div
            style={{
              marginTop: 8,
              paddingTop: 14,
              borderTop: "1px solid var(--hair)",
              display: "grid",
              gap: 8,
            }}
          >
            <div className="kicker">Off the clock</div>
            <div
              className="italic"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 17,
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              {OFF_THE_CLOCK.join(", ")}. Always looking for new inspiration.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}
