import React, { useState } from 'react';
import { Trophy, Calendar, Sparkles, Terminal, Wrench, Layers, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Achievements: React.FC = () => {
  const { data, setIsEditorOpen } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    'All',
    'Hackathons',
    'Workshops',
    'Technical Activities',
    'Project Exhibitions',
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hackathons':
        return Trophy;
      case 'Workshops':
        return Terminal;
      case 'Technical Activities':
        return Wrench;
      case 'Project Exhibitions':
        return Layers;
      default:
        return Sparkles;
    }
  };

  const filteredItems =
    activeTab === 'All'
      ? data.achievements
      : data.achievements.filter((item) => item.category === activeTab);

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACTIVITIES & PARTICIPATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Experiences</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Active engagement across competitive hackathons, hands-on workshops, and institutional exhibitions.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25 border border-violet-400/30'
                  : 'text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline / Card Structure */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredItems.map((item, index) => {
            const Icon = getCategoryIcon(item.category);

            return (
              <div
                key={item.id}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-medium text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-700/40">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">•</span>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.organization}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-heading group-hover:text-violet-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="sm:self-center shrink-0 flex sm:flex-col items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-white/[0.06]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add / Manage CTA */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            id="achievements-edit-btn"
            onClick={() => setIsEditorOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-dashed border-white/15 hover:border-violet-500/40 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add or Edit Achievements</span>
          </button>
        </div>
      </div>
    </section>
  );
};
