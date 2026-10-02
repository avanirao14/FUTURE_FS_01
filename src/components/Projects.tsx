import React from 'react';
import {
  Sparkles,
  Layers,
  ArrowUpRight,
  FolderGit2,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  Video as VideoIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';

export const Projects: React.FC = () => {
  const { data, setSelectedProject, setIsEditorOpen } = usePortfolio();

  // Project 1 is major featured card
  const featuredProject = data.projects.find((p) => p.isFeatured) || data.projects[0];
  const otherProjects = data.projects.filter((p) => p.id !== featuredProject?.id);

  const handleOpenDetails = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>PORTFOLIO & EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Featured Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Experiences</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Academic projects, hackathon prototypes, and collaborative engineering challenges.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* 1. MAJOR PROJECT CARD: Adaptive Learning for Neurodivergence */}
        {featuredProject && (
          <div className="mb-12">
            <div className="glass-panel rounded-3xl border border-violet-500/30 overflow-hidden relative group hover:border-violet-400/50 transition-all duration-300 shadow-2xl">
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-violet-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left/Visual Container */}
                <div className="lg:col-span-5 bg-gradient-to-br from-violet-950/50 via-slate-900 to-indigo-950/40 p-8 flex flex-col justify-between relative min-h-[260px] border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                  {featuredProject.imageUrl ? (
                    <img
                      src={featuredProject.imageUrl}
                      alt={featuredProject.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center my-auto text-center p-6">
                      <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-400/30 flex items-center justify-center mb-4 text-cyan-300 shadow-inner">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-semibold">
                        Major Project Showcase
                      </span>
                      <span className="text-[11px] text-slate-400 mt-1 max-w-xs">
                        Interactive prototype & architectural design
                      </span>
                    </div>
                  )}

                  <div className="relative z-10 flex items-center justify-between w-full mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-700/50 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        Major Initiative
                      </span>
                      {featuredProject.videoUrl && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-violet-300 bg-violet-950/80 border border-violet-700/60 backdrop-blur-md">
                          <VideoIcon className="w-3.5 h-3.5 text-violet-400" />
                          <span>Demo Video</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {featuredProject.category}
                    </span>
                  </div>
                </div>

                {/* Right/Content Container */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-violet-400 mb-1">
                      {featuredProject.subtitle}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-4">
                      {featuredProject.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>

                    {/* Technologies Field */}
                    <div className="mb-6">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Core Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs font-mono text-slate-200 bg-white/[0.04] border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      id={`project-details-btn-${featuredProject.id}`}
                      onClick={() => handleOpenDetails(featuredProject)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/30 transition-all cursor-pointer"
                    >
                      <span>View Project Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditorOpen(true)}
                      className="text-xs font-mono text-slate-400 hover:text-violet-300 transition-colors"
                    >
                      Edit details & tech
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECONDARY PROJECTS & EXPERIENCES: Separate boxes for Python Chatbot, NASA Space Apps, HackFest 0.1, and AURA 1.0 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Visual Header / Placeholder */}
                <div className="h-44 bg-gradient-to-br from-slate-900 to-violet-950/40 border-b border-white/[0.07] relative flex items-center justify-center p-4">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-2 text-cyan-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Project Media
                      </span>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-violet-300 bg-violet-950/80 border border-violet-700/50 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.videoUrl && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 backdrop-blur-md flex items-center gap-1 shadow-md">
                      <VideoIcon className="w-3 h-3 text-cyan-400" />
                      <span>Demo</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[11px] font-mono text-violet-400 mb-1">
                    {project.subtitle}
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-violet-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Technologies / Focus
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with View Details */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  id={`project-details-btn-${project.id}`}
                  onClick={() => handleOpenDetails(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-violet-500/40 transition-all cursor-pointer"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Project CTA */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            id="projects-add-btn"
            onClick={() => setIsEditorOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.07] border border-dashed border-white/15 hover:border-violet-500/40 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add / Edit Projects & Descriptions</span>
          </button>
        </div>
      </div>
    </section>
  );
};


