import React from "react";
import { Flame } from "../components/icons/Flame";

const SITEMAP = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "coursework", label: "Coursework" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "gallery", label: "Gallery" },
  { id: "awards", label: "Awards" },
  { id: "certifications", label: "Certifications" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  { label: "Founding Engineer", org: "Replicant Trader" },
  { label: "Founder", org: "Black Eternum Capital" },
  { label: "Research Assistant", org: "USIU-Africa SST" },
];

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/olivernjeru" },
  { label: "LinkedIn", href: "https://linkedin.com/in/olivernjeru" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en" },
  { label: "Unsplash", href: "https://unsplash.com/olivernjeru" },
  { label: "Figma", href: "https://figma.com/@olivernjeru" },
];

const colTitle = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: 1.4,
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 14,
  fontWeight: 500,
};

const linkStyle = {
  display: "block",
  padding: "4px 0",
  fontFamily: "var(--font-serif)",
  fontSize: 14,
  color: "var(--text-soft)",
  textDecoration: "none",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--hair)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "56px var(--section-x) 24px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 28,
        }}
        className="footer-grid"
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Flame size={16} />
            <span className="serif-h4" style={{ fontSize: 20 }}>
              Oliver Njeru
            </span>
          </div>
          <p
            className="hint-italic"
            style={{ margin: 0, maxWidth: 360, color: "var(--muted)", fontSize: 15 }}
          >
            By the <span className="italic">fire</span>. Calm work on AI,
            optimisation, and a lounge built around a flame.
          </p>
        </div>

        <div>
          <div style={colTitle}>Sitemap</div>
          {SITEMAP.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={linkStyle}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(s.id);
                if (el) {
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 70,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div>
          <div style={colTitle}>Roles</div>
          {ROLES.map((r) => (
            <div key={r.label} style={{ padding: "4px 0" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 14 }}>{r.label}</div>
              <div
                className="italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 12.5,
                  color: "var(--muted)",
                }}
              >
                {r.org}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={colTitle}>Elsewhere</div>
          {ELSEWHERE.map((e) => (
            <a
              key={e.label}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              {e.label}
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "16px var(--section-x) 22px",
          borderTop: "1px solid var(--hair)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span>Built by Oliver Njeru · all rights reserved © 2020 – {year}</span>
        <a href="/privacy.html" style={{ color: "var(--muted)", textDecoration: "none" }}>
          Privacy
        </a>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
