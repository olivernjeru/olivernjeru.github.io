import React from "react";
import { ThemeProvider } from "./theme.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import NowStrip from "./components/NowStrip.jsx";
import BackToTop from "./components/BackToTop.jsx";
import ThreeRoles from "./sections/ThreeRoles.jsx";
import About from "./sections/About.jsx";
import SelectedWork from "./sections/SelectedWork.jsx";
import Skills from "./sections/Skills.jsx";
import ReadingReferences from "./sections/ReadingReferences.jsx";
import Coursework from "./sections/Coursework.jsx";
import Projects from "./sections/Projects.jsx";
import ArtGallery from "./sections/ArtGallery.jsx";
import Awards from "./sections/Awards.jsx";
import Certifications from "./sections/Certifications.jsx";
import EventsVolunteering from "./sections/EventsVolunteering.jsx";
import ContactCTA from "./sections/ContactCTA.jsx";
import Footer from "./sections/Footer.jsx";

// Sections are imported directly, not with React.lazy: the page is prerendered
// and hydrated, and a lazy section would suspend during hydration. Together
// they are small (images live in separate files).
export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero />
        <NowStrip />
        <ThreeRoles />
        <About />
        <SelectedWork />
        <Skills />
        <ReadingReferences />
        <Coursework />
        <Projects />
        <ArtGallery />
        <Awards />
        <Certifications />
        <EventsVolunteering />
        <ContactCTA />
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
