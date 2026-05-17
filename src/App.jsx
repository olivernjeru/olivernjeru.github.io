import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "./theme.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import NowStrip from "./components/NowStrip.jsx";
import BackToTop from "./components/BackToTop.jsx";

const ThreeRoles = lazy(() => import("./sections/ThreeRoles.jsx"));
const About = lazy(() => import("./sections/About.jsx"));
const SelectedWork = lazy(() => import("./sections/SelectedWork.jsx"));
const Skills = lazy(() => import("./sections/Skills.jsx"));
const ReadingReferences = lazy(() => import("./sections/ReadingReferences.jsx"));
const Coursework = lazy(() => import("./sections/Coursework.jsx"));
const Projects = lazy(() => import("./sections/Projects.jsx"));
const ArtGallery = lazy(() => import("./sections/ArtGallery.jsx"));
const Awards = lazy(() => import("./sections/Awards.jsx"));
const Certifications = lazy(() => import("./sections/Certifications.jsx"));
const EventsVolunteering = lazy(() => import("./sections/EventsVolunteering.jsx"));
const ContactCTA = lazy(() => import("./sections/ContactCTA.jsx"));
const Footer = lazy(() => import("./sections/Footer.jsx"));

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Hero />
      <NowStrip />
      <Suspense fallback={null}>
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
        <Footer />
      </Suspense>
      <BackToTop />
    </ThemeProvider>
  );
}
