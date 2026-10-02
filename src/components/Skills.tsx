import React, { useState } from 'react';
import { Sparkles, Terminal, Database, Code, GitBranch, Cpu, Brain, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Skills: React.FC = () => {
  const { data, setIsEditorOpen } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Artificial Intelligence', 'Core Engineering', 'Web & Tools'];

  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'python':
        return Terminal;
      case 'c':
        return Code;
      case 'generative ai':
        return Brain;
      case 'ai tools':
        return Cpu;
      case 'dbms':
        return Database;
      case 'git':
        return GitBranch;
      case 'css':
        return Code;
      default:
        return Sparkles;
    }
  };

  const filteredSkills =
    activeCategory === 'All'
      ? data.skills
      : data.skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Hands-on technical proficiencies applied in software development, machine learning, and engineering projects.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25 border border-violet-400/30'
                  : 'text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid - No fake progress bars, genuine high-craft presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const Icon = getSkillIcon(skill.name);
            const isSelected = selectedSkillId === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkillId(isSelected ? null : skill.id)}
                className={`glass-panel p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400/60 bg-[#161828]/95 shadow-xl shadow-cyan-500/10 -translate-y-1'
                    : 'border-white/[0.08] hover:border-violet-500/40 hover:-translate-y-1'
                }`}
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-700/40 flex items-center justify-center text-cyan-300 group-hover:text-white group-hover:scale-105 group-hover:border-cyan-500/50 transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading mb-2 group-hover:text-violet-200 transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {skill.description || 'Core technology implemented across coursework and practical projects.'}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Active Proficiency
                  </span>
                  <span className="text-[11px] text-violet-400 group-hover:underline">
                    Interactive Card
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add / Edit Skill Button for Avani */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            id="skills-manage-btn"
            onClick={() => setIsEditorOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-dashed border-white/15 hover:border-violet-500/40 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add or Update Skills List</span>
          </button>
        </div>
      </div>
    </section>
  );
};
