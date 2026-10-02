import React from 'react';
import { X, Sparkles, Layers, CheckCircle2, Edit3, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setIsEditorOpen } = usePortfolio();

  if (!selectedProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0D0F1B] rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Image / Banner Area */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 border-b border-white/[0.08] flex items-center justify-center overflow-hidden">
          {selectedProject.imageUrl ? (
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-3 text-cyan-300">
                <ImageIcon className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Project Visual Showcase
              </span>
              <span className="text-[11px] text-slate-500 mt-1">
                Technical prototype & architecture
              </span>
            </div>
          )}

          {/* Close Button */}
          <button
            type="button"
            id="modal-close-btn"
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/70 border border-cyan-700/50 backdrop-blur-md">
              {selectedProject.category}
            </span>
            {selectedProject.videoUrl && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-violet-300 bg-violet-950/80 border border-violet-700/60 backdrop-blur-md">
                <VideoIcon className="w-3.5 h-3.5 text-violet-400" />
                <span>Demo Video Included</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedProject.subtitle}</span>
            </div>
            <h2
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-extrabold text-white font-heading"
            >
              {selectedProject.title}
            </h2>
          </div>

          {/* Demo Video Player - Rendered ONLY if videoUrl exists */}
          {selectedProject.videoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <VideoIcon className="w-3.5 h-3.5" />
                  <span>Interactive Demo Video</span>
                </h3>
                {selectedProject.videoName && (
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                    {selectedProject.videoName}
                  </span>
                )}
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-xl">
                <video
                  src={selectedProject.videoUrl}
                  controls
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
            </div>
          )}

          {/* Concise Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Project Overview
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
              {selectedProject.description}
            </p>
          </div>

          {/* Extended Details */}
          {selectedProject.fullDetails && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Detailed Scope & Objectives
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProject.fullDetails}
              </p>
            </div>
          )}

          {/* Technologies Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technologies & Frameworks</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Editable field</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-violet-200 bg-violet-950/50 border border-violet-700/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Value & Learning Takeaways */}
          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Key Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Hands-on architectural design & implementation</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>Rigorous problem solving within student domain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#090A12] border-t border-white/[0.08] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setSelectedProject(null);
              setIsEditorOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-violet-400" />
            <span>Edit Project Content & Media</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedProject(null)}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
