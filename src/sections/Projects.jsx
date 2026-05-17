import React, { useState } from "react";
import { Card, Pill, SectionHeader } from "../components/primitives.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { ArrowRight, ExternalLink, GitHub } from "../components/icons/UIIcons";
import { projects } from "../data/projects";

const resolveImg = (img) => {
  if (!img) return null;
  return img.startsWith("data:") ? img : `data:image/png;base64,${img}`;
};

const ImageHeader = ({ src, alt, idx, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Open ${alt}`}
    style={{
      position: "relative",
      background: "var(--bg-inverse)",
      borderBottom: "1px solid var(--hair)",
      aspectRatio: "16 / 9",
      overflow: "hidden",
      padding: 0,
      border: "none",
      width: "100%",
      cursor: "pointer",
      display: "block",
    }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 1.4,
        color: "#f4efe5",
        textTransform: "uppercase",
        background: "rgba(14,13,9,0.55)",
        padding: "2px 8px",
      }}
    >
      {String(idx + 1).padStart(2, "0")} · Project
    </div>
  </button>
);

const NoImageHeader = ({ idx }) => (
  <div
    aria-hidden
    style={{
      position: "relative",
      borderBottom: "1px solid var(--hair)",
      background: "var(--bg-alt)",
      backgroundImage:
        "repeating-linear-gradient(135deg, transparent 0 22px, var(--faint) 22px 23px)",
      aspectRatio: "16 / 9",
      overflow: "hidden",
      display: "grid",
      placeItems: "center",
    }}
  >
    <div
      style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 500,
        fontSize: 64,
        letterSpacing: -2,
        lineHeight: 1,
        color: "var(--muted)",
      }}
    >
      {String(idx + 1).padStart(2, "0")}
    </div>
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 1.4,
        color: "var(--muted)",
        textTransform: "uppercase",
      }}
    >
      Project
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 9.5,
        letterSpacing: 0.8,
        color: "var(--muted)",
        textTransform: "uppercase",
      }}
    >
      No preview
    </div>
  </div>
);

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  fontFamily: "var(--font-sans)",
  fontSize: 12.5,
  fontWeight: 500,
  letterSpacing: 0.1,
  textDecoration: "none",
  border: "1px solid var(--hair)",
  color: "var(--text)",
  background: "transparent",
  borderRadius: 0,
};

const primaryLinkStyle = {
  ...linkStyle,
  background: "var(--accent)",
  borderColor: "var(--accent)",
  color: "var(--text-on-acc)",
};

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="projects" className="section">
      <SectionHeader
        kicker="Side of the desk"
        title="Projects,"
        italic="for the love of it"
        hint="Repositories, demos, half-finished ideas I keep coming back to. Every card lists the stack, the source, and where to see it running."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
        className="projects-grid"
      >
        {projects.map((proj, idx) => {
          const src = resolveImg(proj.img);
          const techs = proj.technologies
            ? proj.technologies.split(",").map((t) => t.trim()).filter(Boolean)
            : [];
          return (
            <Card
              key={idx}
              style={{
                padding: 0,
                overflow: "hidden",
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
                alignContent: "start",
              }}
              className="project-card"
            >
              {src ? (
                <ImageHeader
                  src={src}
                  alt={proj.name}
                  idx={idx}
                  onOpen={() =>
                    setLightbox({ src, title: proj.name, caption: proj.description })
                  }
                />
              ) : (
                <NoImageHeader idx={idx} />
              )}

              <div style={{ padding: 22, display: "grid", gap: 14, alignContent: "start" }}>
                <h3 className="serif-h4" style={{ lineHeight: 1.25 }}>
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "var(--text-soft)",
                    margin: 0,
                  }}
                >
                  {proj.description}
                </p>

                {techs.length > 0 && (
                  <div style={{ display: "grid", gap: 8 }}>
                    <div className="kicker">Stack</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {techs.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(proj.github || proj.live) && (
                <div
                  style={{
                    padding: "14px 22px 18px",
                    borderTop: "1px solid var(--hair)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={primaryLinkStyle}
                    >
                      Visit <ArrowRight size={13} />
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                    >
                      <GitHub size={14} /> Source
                    </a>
                  )}
                  {proj.live && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: 0.6,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <ExternalLink size={11} /> Live
                    </span>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Lightbox
        open={!!lightbox}
        onClose={() => setLightbox(null)}
        src={lightbox?.src}
        alt={lightbox?.title}
        title={lightbox?.title}
      />

      <style>{`
        @media (max-width: 1100px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
        .project-card { transition: border-color 160ms ease, transform 200ms ease; }
        .project-card:hover { border-color: var(--accent); }
      `}</style>
    </section>
  );
}
