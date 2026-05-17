import React, { useEffect, useState } from "react";
import { ArrowDown } from "./icons/UIIcons";

const SHOW_AFTER_PX = 320;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        right: "max(18px, env(safe-area-inset-right))",
        bottom: "max(18px, env(safe-area-inset-bottom))",
        width: 44,
        height: 44,
        borderRadius: 999,
        border: "1px solid var(--hair)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        color: "var(--text)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 80,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transition: "opacity 200ms ease, transform 240ms cubic-bezier(0.2, 0.7, 0.3, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span aria-hidden style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
        <ArrowDown size={16} />
      </span>
    </button>
  );
}
