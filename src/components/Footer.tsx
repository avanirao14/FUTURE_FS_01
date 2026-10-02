import React from 'react';
import { ArrowUp, Heart, Linkedin, Github, Mail, Sparkles, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data, setIsEditorOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <footer id="main-footer" className="relative border-t border-white/[0.08] bg-[#07080D] pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-violet-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#0D0E17] rounded-[11px] flex items-center justify-center font-heading font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200">
                  AR
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                {data.personal.name}
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-sans">
              3rd Year Information Science and Engineering student at JNNCE, VTU. Focusing on Artificial Intelligence, Generative AI, and Full Stack Development.
            </p>

            <div className="text-xs font-mono text-violet-400">
              &ldquo;{data.personal.tagline}&rdquo;
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Editor */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Connect & Manage
            </h4>

            <div className="flex items-center gap-2">
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              </a>

              {data.personal.github ? (
                <a
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 text-white" />
                </a>
              ) : null}

              <a
                href={`mailto:${data.personal.email}`}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
              </a>

              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="p-2.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/60 text-violet-300 border border-violet-700/40 transition-colors"
                title="Customize Portfolio Content"
                aria-label="Customize Portfolio Content"
              >
                <Settings className="w-4 h-4 text-cyan-300" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Designed & engineered with modern React, Tailwind CSS, and subtle motion.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Avani S Rao. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
