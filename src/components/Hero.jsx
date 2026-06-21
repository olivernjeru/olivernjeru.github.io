import React from "react";
import { HeroFlame } from "./icons/Flame";
import { ArrowRight, ArrowDown } from "./icons/UIIcons";

const STATS = [
  { kicker: "ROLES", number: "03", caption: "active — Replicant Trader, Black Eternum Capital, independent research" },
  { kicker: "PUBLICATIONS", number: "02", caption: "IJCAI 2024 · IST-Africa 2024" },
  { kicker: "PHOTOGRAPHY", number: "1M+", caption: "Unsplash views · 4,000+ uses across platforms" },
  { kicker: "ISSUE", number: "MMXXVI", caption: "the current pressing" },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        padding: "80px var(--section-x) 24px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: 32,
          alignItems: "start",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div className="kicker" style={{ marginBottom: 32 }}>
            By the fire · Issue MMXXVI
          </div>
          <h1 className="serif-h1">
            Yo. I&rsquo;m <em className="italic">Oliver</em>.
          </h1>
          <p
            className="hint-italic"
            style={{
              maxWidth: 640,
              marginTop: 28,
              fontSize: 20,
              color: "var(--text-soft)",
            }}
          >
            Founding engineer at <strong style={{ fontWeight: 500, fontStyle: "normal" }}>Replicant Trader</strong>,
            founder of <strong style={{ fontWeight: 500, fontStyle: "normal" }}>Black Eternum Capital</strong>, and an
            independent researcher in <strong style={{ fontWeight: 500, fontStyle: "normal" }}>Multi-Agent Reinforcement Learning</strong>.
            Writing from <span className="italic">Nairobi</span>.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <a className="btn btn--primary" href="/assets/Resume/Oliver Njeru Résumé.pdf" target="_blank" rel="noopener noreferrer">
              Résumé <ArrowRight size={13} />
            </a>
            <a className="btn" href="mailto:onjeru@usiu.ac.ke">
              Write to me <ArrowRight size={13} />
            </a>
          </div>
        </div>

        <div
          aria-hidden
          style={{
            display: "grid",
            placeItems: "end center",
            position: "relative",
          }}
          className="hero-flame-wrap"
        >
          <HeroFlame width={220} />
        </div>
      </div>

      <div
        style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
        className="hero-stats"
      >
        {STATS.map((s) => (
          <div
            key={s.kicker}
            style={{
              borderTop: "1px solid var(--hair)",
              padding: "18px 16px 8px 0",
              display: "grid",
              gap: 10,
            }}
          >
            <div className="kicker">{s.kicker}</div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 40,
                fontWeight: 500,
                letterSpacing: -1.2,
                lineHeight: 1,
              }}
            >
              {s.number}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.5,
                maxWidth: 240,
              }}
            >
              {s.caption}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const next = document.getElementById("now");
          if (next) {
            window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
          }
        }}
        aria-label="Scroll to Now"
        style={{
          marginTop: 36,
          background: "transparent",
          border: "1px solid var(--hair)",
          color: "var(--text-soft)",
          padding: "8px 12px",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1.2,
        }}
      >
        <ArrowDown size={12} /> Read on
      </button>

      <style>{`
        @media (max-width: 880px) {
          .hero-flame-wrap { position: absolute; right: var(--section-x); top: 40px; opacity: 0.7; }
          .hero-flame-wrap svg { width: 130px !important; height: auto !important; }
          .hero-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
