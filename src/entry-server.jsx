import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import PublicationsPage from "./pages/PublicationsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Server entry, built by `vite build --ssr` and used by scripts/prerender.mjs.
// Maps each built HTML file to the component that renders it.
export const PAGES = {
  "index.html": App,
  "publications.html": PublicationsPage,
  "privacy.html": PrivacyPage,
  "404.html": NotFoundPage,
};

// The same tree src/mount.jsx hydrates in the browser. renderToString marks
// text boundaries with <!-- --> comments, which is what makes hydration exact.
export const render = (Page) =>
  renderToString(
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
