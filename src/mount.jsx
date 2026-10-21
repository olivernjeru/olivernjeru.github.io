import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

// Self-hosted variable fonts (bundled by Vite, no CDN call), shared by every page.
// Newsreader: opsz (optical size) + wght axes for upright and italic.
// Inter Tight / JetBrains Mono: wght axis only.
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

import "./styles/tokens.css";

// Mounts a page component in #root. Each HTML entry calls this once.
// Built pages arrive with server-rendered markup (scripts/prerender.mjs), so
// React hydrates it: the existing DOM is kept, nothing re-renders or shifts.
// The dev server serves an empty #root, so the page renders from scratch.
// The tree must match src/entry-server.jsx exactly.
export function mount(Page) {
  const container = document.getElementById("root");
  const app = (
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}
