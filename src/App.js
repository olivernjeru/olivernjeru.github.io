import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Education from "./components/Education";
import WorkExperience from "./components/Work";
import ProjectList from "./components/Projects";
import Skills from "./components/Skills";
import AwardsAndHonors from "./components/AwardsandHonors";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
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
        <Education />
        <WorkExperience />
        <ProjectList />
        <Skills />
        <AwardsAndHonors />
        <Certificates />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
