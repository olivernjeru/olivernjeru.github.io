import React from "react";
import { ThemeProvider } from "../theme.js";
import Header from "./Header.jsx";
import BackToTop from "./BackToTop.jsx";
import Footer from "../sections/Footer.jsx";

// The frame every page except home shares: theme, header, <main>, footer.
// (The home page composes the same pieces around its sections in App.jsx.)
// page: "publications" | "privacy" | "notFound"; marks the current page in the nav.
export default function PageShell({ page, children }) {
  return (
    <ThemeProvider>
      <Header page={page} />
      <main>{children}</main>
      <Footer page={page} />
      <BackToTop />
    </ThemeProvider>
  );
}
