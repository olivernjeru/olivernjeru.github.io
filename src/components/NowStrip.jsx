import React from "react";
import { Flame } from "./icons/Flame";

const monthYear = () => {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase();
};

export default function NowStrip() {
  return (
    <section
      id="now"
      style={{
        background: "linear-gradient(180deg, var(--accent-soft), transparent)",
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "18px var(--section-x)",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 18,
        }}
        className="now-grid"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Flame size={14} />
          <span className="kicker kicker--accent">Now · today</span>
        </div>

        <div
          className="italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 17,
            letterSpacing: -0.2,
            color: "var(--text-soft)",
          }}
        >
          Creating knowledge at USIU-Africa SST under the supervision of Paul Okanda, Phd &mdash; shipping the next iteration of <span style={{ color: "var(--text)" }}>Replicant Trader</span> &mdash;
          and quietly building <span style={{ color: "var(--text)" }}>Black Eternum Capital</span>.
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: 0.6,
            color: "var(--muted)",
            textTransform: "uppercase",
            textAlign: "right",
          }}
        >
          Nairobi · {monthYear()}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .now-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
          .now-grid > div:last-child { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
