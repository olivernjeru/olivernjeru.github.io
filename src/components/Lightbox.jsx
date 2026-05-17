import React, { useCallback, useEffect } from "react";
import { Close } from "./icons/UIIcons";

export default function Lightbox({ open, onClose, src, alt, title }) {
  const close = useCallback(() => onClose?.(), [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || alt || "Lightbox"}
      onClick={close}
      className="hearth-lightbox"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "var(--scrim)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "hearth-fade-in 220ms ease-out both",
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        style={{
          position: "fixed",
          top: "max(18px, env(safe-area-inset-top))",
          right: "max(18px, env(safe-area-inset-right))",
          width: 40,
          height: 40,
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
          zIndex: 201,
        }}
      >
        <Close size={18} />
      </button>

      <img
        onClick={(e) => e.stopPropagation()}
        src={src}
        alt={alt || title || ""}
        className="hearth-lightbox-img"
        style={{
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
          border: "1px solid var(--hair)",
          background: "var(--bg-inverse)",
          animation: "lightbox-rise 280ms cubic-bezier(0.2, 0.7, 0.3, 1) both",
        }}
      />

      <style>{`
        @keyframes lightbox-rise {
          from { opacity: 0; transform: translateY(12px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Reserve safe-area + a small breathing margin around the image without
           relying on percentages of a viewport that may drift on mobile. */
        .hearth-lightbox {
          --safe-top: max(24px, env(safe-area-inset-top));
          --safe-bottom: max(24px, env(safe-area-inset-bottom));
          --safe-x: max(24px, env(safe-area-inset-left), env(safe-area-inset-right));
        }
        .hearth-lightbox-img {
          /* vh fallback for older browsers, then small/dynamic viewport for mobile */
          max-width: min(1200px, calc(100vw - (var(--safe-x) * 2)));
          max-height: calc(100vh - var(--safe-top) - var(--safe-bottom));
        }
        @supports (height: 100svh) {
          .hearth-lightbox-img {
            max-height: calc(100svh - var(--safe-top) - var(--safe-bottom));
          }
        }
        @supports (height: 100dvh) {
          .hearth-lightbox-img {
            max-height: calc(100dvh - var(--safe-top) - var(--safe-bottom));
          }
        }
      `}</style>
    </div>
  );
}
