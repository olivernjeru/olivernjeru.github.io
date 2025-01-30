import React, { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, GlobalStyles, useMediaQuery } from "@mui/material";
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
  const setThemeMode = useState(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  })[1]; // Only keep the setter function

  useEffect(() => {
    // Detect system color scheme and set theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      setThemeMode(newTheme);
      localStorage.setItem("themeMode", newTheme); // Save to localStorage
    };

    handleChange(); // Set initial theme based on system preference
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: { main: prefersDarkMode ? '#90caf9' : '#1976d2' },
          background: { default: prefersDarkMode ? '#121212' : '#ffffff' },
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    // Add styles to prevent overflow and make Watson Assistant responsive
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
          '*::-webkit-scrollbar': {
            width: 4,
            height: 4,
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: prefersDarkMode ? '#90caf9' : '#1976d2',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: prefersDarkMode ? '#64b5f6' : '#1565c0',
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: prefersDarkMode ? '#1e1e1e' : '#f4f4f4',
            borderRadius: '8px',
          },
        }}
      />
      <div style={{ overflowX: "hidden", marginTop: "50px" }}>
        <Navbar />
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
