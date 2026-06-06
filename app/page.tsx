"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import GrainOverlay from "@/components/GrainOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Discography from "@/components/Discography";
import LinerNotes from "@/components/LinerNotes";
import Equipment from "@/components/Equipment";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  function openProject(id: string) {
    const found = projects.find((p) => p.id === id) ?? null;
    setActiveProject(found);
  }

  function closeProject() {
    setActiveProject(null);
  }

  return (
    <>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <Discography onOpenProject={openProject} />
        <LinerNotes />
        <Equipment />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.id}
            project={activeProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
