import React from "react";
import ReactDOM from "react-dom/client";

// Self-hosted variable fonts (bundled by Vite, no CDN call).
// Newsreader: opsz (optical size) + wght axes for upright and italic.
// Inter Tight / JetBrains Mono: wght axis only.
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

import "./styles/tokens.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
