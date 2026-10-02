import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CertificateLightbox } from './components/CertificateLightbox';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-[#090A0F] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200">
        {/* Ambient Canvas & Glow Background */}
        <BackgroundEffects />

        {/* Sticky Modern Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals and Overlays */}
        <ProjectDetailModal />
        <CertificateLightbox />
        <PdfViewerModal />
        <ResumeModal />
        <PortfolioEditorModal />
        <ToastContainer />
      </div>
    </PortfolioProvider>
  );
}
