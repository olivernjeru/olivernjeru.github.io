import React from "react";

export const SectionHeader = ({ kicker, title, italic, hint, id }) => (
  <header id={id} style={{ display: "grid", gap: 12, marginBottom: 40 }}>
    <div className="kicker">{kicker}</div>
    <h2 className="serif-h2">
      {title}
      {italic ? (
        <>
          {" "}
          <em className="italic">{italic}</em>
        </>
      ) : null}
      .
    </h2>
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
