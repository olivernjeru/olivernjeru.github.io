import React, { useEffect, useState } from "react";
import { Flame } from "./icons/Flame";
import { Sun, Moon, Menu as MenuIcon, Close as CloseIcon } from "./icons/UIIcons";
import { useTheme } from "../theme.js";

const NAV = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "education", label: "Education" },
  { id: "gallery", label: "Gallery" },
  { id: "now", label: "Now" },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function Header() {
  const { mode, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 880);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-glass)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "14px var(--section-x)",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 18,
        }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          <Flame size={16} />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: 17,
              letterSpacing: -0.2,
            }}
          >
            Oliver Njeru
          </span>
          <span className="pill pill--accent" style={{ marginLeft: 4, fontSize: 9 }}>
            Nairobi
          </span>
        </a>

        {!isMobile ? (
          <nav
            style={{
              display: "flex",
              gap: 22,
              justifyContent: "center",
            }}
          >
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-soft)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  fontWeight: 450,
                  letterSpacing: 0.1,
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-soft)")}
              >
                {item.label}
              </button>
            ))}
          </nav>
        ) : (
          <span />
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, justifySelf: "end" }}>
          <button
            onClick={toggle}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              border: "1px solid var(--hair)",
              background: "transparent",
              color: "var(--text)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mode === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {isMobile && (
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{
                width: 32,
                height: 32,
                borderRadius: "999px",
                border: "1px solid var(--hair)",
                background: "transparent",
                color: "var(--text)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && open && (
        <div
          style={{
            borderTop: "1px solid var(--hair)",
            padding: "12px var(--section-x) 18px",
            display: "grid",
            gap: 10,
            background: "var(--bg)",
          }}
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setOpen(false);
                scrollTo(item.id);
              }}
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                padding: "10px 0",
                borderBottom: "1px solid var(--hair)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
