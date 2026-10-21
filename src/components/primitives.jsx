import React from "react";
import { ExternalLink } from "./icons/UIIcons";

// A component-scoped stylesheet. Always use this instead of <style>{css}</style>:
// React's server renderer escapes text children (">" becomes "&gt;", '"' becomes
// "&quot;"), and a <style> element does not decode entities, so selectors such as
// `.a > b` or `[aria-current="page"]` would silently break in the prerendered HTML.
export const Style = ({ css }) => <style dangerouslySetInnerHTML={{ __html: css }} />;

// as: heading element. Home sections use h2; a page's own title uses h1.
export const SectionHeader = ({ kicker, title, italic, hint, id, as: Heading = "h2" }) => (
  <header id={id} style={{ display: "grid", gap: 12, marginBottom: 40 }}>
    <div className="kicker">{kicker}</div>
    <Heading className="serif-h2">
      {title}
      {italic ? (
        <>
          {" "}
          <em className="italic">{italic}</em>
        </>
      ) : null}
      .
    </Heading>
    {hint ? (
      <p className="hint-italic" style={{ margin: 0, maxWidth: 640 }}>
        {hint}
      </p>
    ) : null}
  </header>
);

export const Card = ({ children, variant = "default", style, ...rest }) => {
  const base = {
    padding: 24,
    border: "1px solid var(--hair)",
    background: "var(--bg-card)",
  };
  const variants = {
    default: {},
    inset: { background: "var(--bg-alt)" },
    accent: { background: "var(--accent-soft)", borderColor: "var(--accent)" },
  };
  return (
    <div style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
    </div>
  );
};

export const Pill = ({ children, accent = false, style, ...rest }) => (
  <span
    className={accent ? "pill pill--accent" : "pill"}
    style={style}
    {...rest}
  >
    {children}
  </span>
);

// The amber link chip (coursework highlights, publication links). Opens in a new tab.
export const LinkPill = ({ href, children, style, ...rest }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "3px 10px",
      borderRadius: 999,
      border: "1px solid var(--accent)",
      color: "var(--accent-deep)",
      background: "var(--accent-soft)",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      textDecoration: "none",
      lineHeight: 1,
      ...style,
    }}
    {...rest}
  >
    {children} <ExternalLink size={11} />
  </a>
);

export const ListRow = ({ left, right, children, style }) => (
  <div
    style={{
      borderTop: "1px solid var(--hair)",
      padding: "14px 0",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      alignItems: "baseline",
      ...style,
    }}
  >
    <div>{left || children}</div>
    {right ? (
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
        {right}
      </div>
    ) : null}
  </div>
);
