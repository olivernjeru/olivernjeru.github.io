import React, { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import Divider from "@mui/material/Divider";

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) return savedTheme;

    // If not, check the system's color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "dark" : "light";
  });

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

  // Create theme dynamically
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
