import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Settings, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { data, setIsEditorOpen, setIsResumeModalOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0B0D14]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            id="nav-logo"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-sm shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0D0E17] rounded-[11px] flex items-center justify-center font-heading font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200">
                AR
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-violet-300 transition-colors">
                {data.personal.name}
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono hidden sm:inline-block">
                Information Science
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  id={`nav-link-${link.href.substring(1)}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-inner border border-violet-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Actions (Resume & Customize) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              id="nav-resume-btn"
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] hover:border-violet-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <FileText className="w-3.5 h-3.5 text-violet-400" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              id="nav-customize-btn"
              onClick={() => setIsEditorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-200 bg-violet-950/40 hover:bg-violet-900/50 border border-violet-700/40 hover:border-violet-500/60 shadow-sm shadow-violet-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
              title="Edit and customize portfolio content"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
              <span>Customize</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              id="mobile-customize-btn"
              onClick={() => setIsEditorOpen(true)}
              aria-label="Customize portfolio"
              className="p-2 rounded-lg text-violet-300 bg-white/[0.05] border border-violet-500/30 sm:hidden"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/[0.05] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0D0E17]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl space-y-1 animate-fadeIn"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'text-white bg-violet-600/20 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsResumeModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.06] border border-white/[0.1]"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>View Resume</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsEditorOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-violet-200 bg-violet-900/30 border border-violet-600/40"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Edit / Customize Portfolio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
