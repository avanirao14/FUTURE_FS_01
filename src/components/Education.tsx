import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data, setIsEditorOpen } = usePortfolio();

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Milestones</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Rigorous academic foundation in Information Science & Engineering under VTU curriculum.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {data.education.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-violet-500/30 transition-all relative overflow-hidden group shadow-xl"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-600/10 via-cyan-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-900/40 border border-violet-700/30 text-violet-300 text-xs font-mono mb-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                    <span>•</span>
                    <span className="text-cyan-300 font-semibold">{item.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    {item.institution}
                  </h3>

                  <p className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200 mt-1">
                    {item.degree} in {item.department}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-violet-400" />
                      {item.university}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between bg-white/[0.03] md:bg-transparent p-3 md:p-0 rounded-xl border border-white/[0.05] md:border-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs uppercase font-mono text-slate-400 tracking-wider block">
                      Cumulative GPA
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-300 font-heading">
                        {item.cgpa}
                      </span>
                      <span className="text-sm font-mono text-slate-500">/ 10.0</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/40 mt-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Distinction Track</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="pt-5 border-t border-white/[0.08]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Academic Focus & Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Quick Edit CTA for user */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              id="education-edit-btn"
              onClick={() => setIsEditorOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-dashed border-white/15 hover:border-violet-500/40 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-violet-400" />
              <span>Update Education & CGPA Details</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
