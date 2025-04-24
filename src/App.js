import React, { useEffect, useMemo, useState } from "react";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import ArtGallery from "./components/ArtGallery";
import Footer from "./components/Footer";
import Divider from "@mui/material/Divider";

function App() {
  // Initialize themeMode from localStorage or system preference
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Toggle handler: flip mode & persist
  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  // Build MUI theme based on themeMode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: themeMode === "dark" ? "#90caf9" : "#1976d2",
          },
          background: {
            default: themeMode === "dark" ? "#121212" : "#ffffff",
          },
        },
      }),
    [themeMode]
  );

  // Global scrollbar styles + Watson CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }
      .watson-chat-wrapper {
        max-width: 100vw;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    // Watson Assistant Chat Integration
    window.watsonAssistantChatOptions = {
      integrationID: "8c52f70e-015f-4fac-acbf-beee86368e4f",
      region: "eu-gb",
      serviceInstanceID: "41284dbb-53ee-4795-8bc7-a4dc37c7ba92",
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*::-webkit-scrollbar": {
            width: 4,
            height: 4,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor:
              themeMode === "dark" ? "#64b5f6" : "#1565c0",
          },
          "*::-webkit-scrollbar-track": {
            backgroundColor:
              themeMode === "dark" ? "#1e1e1e" : "#f4f4f4",
            borderRadius: "8px",
          },
        }}
      />

      <div style={{ overflowX: "hidden", marginTop: "50px" }}>
        {/* Pass themeMode + toggleTheme down to Navbar */}
        <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />

        <HomePage />
        <Divider />

        <Education />
        <Divider />

        <Experience />
        <Divider />

        <Projects />
        <Divider />

        <Skills />
        <Divider />

        <Awards />
        <Divider />

        <Certificates />
        <Divider />

        <ArtGallery />
        <Divider />

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
