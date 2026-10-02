import React, { useRef } from 'react';
import {
  GraduationCap,
  MapPin,
  Sparkles,
  Code2,
  BrainCircuit,
  Rocket,
  Award,
  BookOpen,
  Camera,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64, validateImageFile } from '../utils/fileHelpers';

export const About: React.FC = () => {
  const { data, updatePersonal, setIsEditorOpen, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid image file', 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      updatePersonal({
        profileImage: base64,
        profileImageName: file.name,
        profileImageSize: file.size,
      });
      showToast('Profile photo updated successfully!');
    } catch {
      showToast('Failed to update photo', 'error');
    }
  };

  const quickStats = [
    {
      label: 'Institution',
      value: 'JNNCE, Shivamogga',
      subtext: 'Jawaharlal Nehru National College of Engineering',
      icon: GraduationCap,
      color: 'text-violet-400',
    },
    {
      label: 'Degree & Branch',
      value: '3rd Year ISE',
      subtext: 'Information Science & Engineering',
      icon: Code2,
      color: 'text-indigo-400',
    },
    {
      label: 'University Affiliation',
      value: 'VTU',
      subtext: 'Visvesvaraya Technological University',
      icon: BookOpen,
      color: 'text-blue-400',
    },
    {
      label: 'Academic Standing',
      value: `${data.personal.cgpa} CGPA`,
      subtext: 'Cumulative Grade Point Average',
      icon: Award,
      color: 'text-cyan-400',
    },
    {
      label: 'Location',
      value: 'Shivamogga, India',
      subtext: 'Karnataka State',
      icon: MapPin,
      color: 'text-purple-400',
    },
    {
      label: 'Core Focus',
      value: 'AI & Full Stack',
      subtext: 'Building & Exploring Tech',
      icon: BrainCircuit,
      color: 'text-pink-400',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-800/40 text-violet-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GET TO KNOW ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">Avani S Rao</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Dedicated Professional Portrait Presentation */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="glass-panel p-6 rounded-3xl border border-white/[0.08] w-full flex flex-col items-center text-center relative overflow-hidden group shadow-2xl">
              {/* Subtle ambient background glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-cyan-500/15 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

              {/* Circular/Rounded Professional Portrait Frame */}
              <div className="relative mb-5">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-950/50">
                  <div className="w-full h-full rounded-full bg-[#0E101A] overflow-hidden relative flex items-center justify-center border-2 border-[#090A0F]">
                    {data.personal.profileImage ? (
                      <img
                        src={data.personal.profileImage}
                        alt={data.personal.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <span className="font-heading text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                          AR
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono mt-1">Avani S Rao</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Upload / Change trigger button */}
                <button
                  type="button"
                  id="about-change-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 p-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-lg border border-white/20 transition-all hover:scale-110 cursor-pointer"
                  title="Upload / Change Profile Photo"
                  aria-label="Upload / Change Profile Photo"
                >
                  <Camera className="w-4 h-4 text-cyan-200" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  aria-label="Upload photo"
                />
              </div>

              {/* Identity Details */}
              <h3 className="text-xl font-bold text-white font-heading mb-1">
                {data.personal.name}
              </h3>
              <p className="text-xs font-mono text-violet-300 mb-3">
                {data.personal.role}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40">
                  JNNCE Shivamogga
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-violet-300 bg-violet-950/60 border border-violet-800/40">
                  CGPA {data.personal.cgpa}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
              >
                Customize Profile
              </button>
            </div>
          </div>

          {/* Right Column: Main Narrative Card */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-heading flex items-center gap-2.5">
              <span>Engineering the Future with Curiosity</span>
            </h3>

            {/* Exact user biography requested */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="border-l-2 border-violet-500/60 pl-4 py-1 italic text-slate-200 bg-white/[0.02] rounded-r-lg">
                &ldquo;{data.personal.bio}&rdquo;
              </p>
              
              <p>
                My educational journey at <strong className="text-white font-medium">JNN College of Engineering</strong> in Shivamogga, affiliated with <strong className="text-white font-medium">Visvesvaraya Technological University (VTU)</strong>, provides a strong conceptual foundation in data structures, algorithms, database management, and computing architecture.
              </p>

              <p>
                I actively channel academic principles into hands-on innovation through participation in competitive hackathons such as the <span className="text-cyan-300 font-medium">NASA International Space Apps Challenge</span>, <span className="text-violet-300 font-medium">HackFest 0.1</span>, and <span className="text-violet-300 font-medium">AURA 1.0</span>, constantly testing new concepts and building meaningful software.
              </p>
            </div>

            {/* Key Interests Tags */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technical Interests</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(true)}
                  className="text-xs text-violet-400 hover:text-violet-300 underline font-mono"
                >
                  Edit Interests
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.personal.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/40 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/[0.07] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                    {stat.value}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

