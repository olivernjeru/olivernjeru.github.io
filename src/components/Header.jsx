import React, { useState } from "react";
import { Flame } from "./icons/Flame";
import { Sun, Moon, Menu as MenuIcon, Close as CloseIcon } from "./icons/UIIcons";
import { useTheme } from "../theme.js";
import { scrollToSection } from "../lib/scroll.js";
import { Style } from "./primitives.jsx";

// Items with an id are sections of the home page; items with an href are pages.
const NAV = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { page: "publications", href: "/publications.html", label: "Publications" },
  { id: "education", label: "Education" },
  { id: "gallery", label: "Gallery" },
  { id: "now", label: "Now" },
];

const roundButton = {
  width: 32,
  height: 32,
  borderRadius: "999px",
  border: "1px solid var(--hair)",
  background: "transparent",
  color: "var(--text)",
  alignItems: "center",
  justifyContent: "center",
};

// page: "home" | "publications" | "privacy" | "notFound".
// On home, section links scroll in place; on other pages they go to /#id.
//
// Nothing here depends on the viewport or the theme at render time: the
// phone/desktop switch and the theme icon are CSS (see the Style block). The
// server-rendered HTML and the first browser render are therefore identical,
// so hydration keeps the prerendered DOM and phones never flash the desktop nav.
export default function Header({ page = "home" }) {
  const isHome = page === "home";
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const linkProps = (item, onNavigate) => {
    if (item.href) {
      return {
        href: item.href,
        "aria-current": item.page === page ? "page" : undefined,
        onClick: onNavigate,
      };
    }
    if (!isHome) return { href: `/#${item.id}`, onClick: onNavigate };
    return {
      href: `#${item.id}`,
      onClick: (e) => {
        e.preventDefault();
        onNavigate?.();
        scrollToSection(item.id);
      },
    };
  };

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
          href={isHome ? "#home" : "/"}
          onClick={
            isHome
              ? (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              : undefined
          }
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

        <nav
          aria-label="Primary"
          className="hearth-nav"
          style={{ gridColumn: 2, gap: 22, justifyContent: "center" }}
        >
          {NAV.map((item) => (
            <a key={item.label} className="hearth-nav-link" {...linkProps(item)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div
          style={{
            gridColumn: 3,
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifySelf: "end",
          }}
        >
          {/* Both icons and both labels render; CSS shows the pair for the
              current data-theme (set before first paint), so the markup never
              depends on the theme. */}
          <button type="button" onClick={toggle} style={{ ...roundButton, display: "inline-flex" }}>
            <span className="theme-when-dark" aria-hidden="true">
              <Sun size={14} />
            </span>
            <span className="theme-when-light" aria-hidden="true">
              <Moon size={14} />
            </span>
            <span className="visually-hidden theme-when-dark">Switch to light mode</span>
            <span className="visually-hidden theme-when-light">Switch to dark mode</span>
          </button>

          <button
            type="button"
            className="hearth-menu-button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="hearth-mobile-menu"
            style={roundButton}
          >
            {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="hearth-mobile-menu"
          aria-label="Primary"
          className="hearth-mobile-menu"
          style={{
            borderTop: "1px solid var(--hair)",
            padding: "12px var(--section-x) 18px",
            gap: 10,
            background: "var(--bg)",
          }}
        >
          {NAV.map((item) => (
            <a key={item.label} className="hearth-menu-link" {...linkProps(item, () => setOpen(false))}>
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <Style
        css={`
          .hearth-nav { display: flex; }
          .hearth-menu-button { display: none; }
          .hearth-mobile-menu { display: grid; }
          @media (max-width: 879px) {
            .hearth-nav { display: none; }
            .hearth-menu-button { display: inline-flex; }
          }
          @media (min-width: 880px) {
            .hearth-mobile-menu { display: none; }
          }
          :root[data-theme="light"] .theme-when-dark,
          :root[data-theme="dark"] .theme-when-light { display: none; }
          .hearth-nav-link {
            color: var(--text-soft);
            font-family: var(--font-sans);
            font-size: 13.5px;
            font-weight: 450;
            letter-spacing: 0.1px;
            text-decoration: none;
            transition: color 120ms ease;
          }
          .hearth-nav-link:hover,
          .hearth-nav-link[aria-current="page"] { color: var(--accent); }
          .hearth-menu-link {
            display: block;
            color: var(--text);
            font-family: var(--font-sans);
            font-size: 16px;
            padding: 10px 0;
            border-bottom: 1px solid var(--hair);
            text-decoration: none;
          }
          .hearth-menu-link[aria-current="page"] { color: var(--accent); }
        `}
      />
    </header>
  );
}
