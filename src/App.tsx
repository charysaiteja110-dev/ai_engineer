/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { LearningJourney } from './components/LearningJourney';
import { BuildingInPublic } from './components/BuildingInPublic';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PhotoProvider } from './context/PhotoContext';
import { PhotoModal } from './components/PhotoModal';

export default function App() {
  return (
    <PhotoProvider>
      <div className="min-h-screen bg-[#FBFBFA] text-[#111111] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Top Navigation */}
        <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Skills & Technologies */}
        <Skills />

        {/* Projects with Interactive Logic Demos */}
        <Projects />

        {/* Hackathons & Ideathons */}
        <Experience />

        {/* My Learning Journey Timeline */}
        <LearningJourney />

        {/* Building in Public (GitHub) */}
        <BuildingInPublic />

        {/* Let's Connect (Contact & Socials) */}
        <Contact />
      </main>
 
      {/* Minimal Footer */}
      <Footer />

      {/* Global Photo Customizer Modal */}
      <PhotoModal />
    </div>
  </PhotoProvider>
);
}
