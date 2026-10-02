import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Linkedin, Github, FileText, Mail, Camera, Sparkles, MapPin, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64, validateImageFile } from '../utils/fileHelpers';

export const Hero: React.FC = () => {
  const { data, updatePersonal, setIsEditorOpen, setIsResumeModalOpen, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      showToast('Failed to read image file', 'error');
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Status / Role Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-700/40 text-violet-300 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-violet-900/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{data.personal.role}</span>
              <span className="text-violet-500">•</span>
              <span className="text-slate-400 text-xs font-mono">CGPA {data.personal.cgpa}</span>
            </div>

            {/* Main Name Heading */}
            <h1 
              id="hero-name"
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 uppercase font-heading leading-tight"
            >
              <span className="block">{data.personal.name}</span>
            </h1>

            {/* Tagline */}
            <p 
              id="hero-tagline"
              className="text-lg sm:text-2xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-200 to-cyan-300 mb-5"
            >
              &ldquo;{data.personal.tagline}&rdquo;
            </p>

            {/* Short Professional Intro */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8 font-normal">
              3rd year Information Science and Engineering student at JNN College of Engineering (VTU), passionate about Artificial Intelligence, Generative AI, and Full Stack Development. Dedicated to turning ideas into impactful code through real-world projects and hackathons.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              {/* Explore My Work */}
              <button
                type="button"
                id="hero-explore-work-btn"
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-700/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
              >
                <span>Explore My Work</span>
              </button>

              {/* Download Resume */}
              <button
                type="button"
                id="hero-download-resume-btn"
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] hover:border-violet-500/40 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Resume</span>
              </button>

              {/* Contact Me */}
              <button
                type="button"
                id="hero-contact-btn"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/[0.07] w-full max-w-xl">
              {/* LinkedIn */}
              <a
                id="hero-linkedin-link"
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/40 transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>

              {/* GitHub */}
              {data.personal.github ? (
                <a
                  id="hero-github-link"
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-violet-500/40 transition-all"
                >
                  <Github className="w-4 h-4 text-slate-200" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              ) : (
                <button
                  type="button"
                  id="hero-github-placeholder-btn"
                  onClick={() => setIsEditorOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-white/[0.02] border border-dashed border-white/[0.15] hover:border-violet-500/50 transition-all"
                  title="Click to link your GitHub profile"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>Link GitHub Profile</span>
                  <span className="text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded text-slate-400">Add</span>
                </button>
              )}

              {/* Location */}
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                <span>{data.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo Area */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Decorative Tech Rings and Glow */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-cyan-500/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl p-1 bg-gradient-to-b from-white/20 via-violet-500/20 to-white/5 backdrop-blur-md shadow-2xl">
                <div className="w-full h-full rounded-[22px] bg-[#0E101A] overflow-hidden relative flex flex-col items-center justify-center text-center p-6 border border-white/[0.08]">
                  {data.personal.profileImage ? (
                    <img
                      src={data.personal.profileImage}
                      alt={data.personal.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center rounded-[20px]"
                    />
                  ) : (
                    /* Elegant placeholder until uploaded */
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-violet-900/60 to-indigo-900/40 border border-violet-500/30 flex items-center justify-center mb-4 shadow-inner">
                        <span className="font-heading text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-indigo-200 to-cyan-200">
                          AR
                        </span>
                      </div>
                      <h2 className="text-white font-semibold text-base mb-1">{data.personal.name}</h2>
                      <p className="text-xs text-slate-400 font-mono mb-4">3rd Year ISE • JNNCE</p>
                      
                      <button
                        type="button"
                        id="hero-upload-photo-btn"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 bg-violet-950/60 hover:bg-violet-900/70 border border-violet-600/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Upload Photo</span>
                      </button>
                    </div>
                  )}

                  {/* Hidden file input for photo upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    aria-label="Upload profile photo"
                  />

                  {/* Floating Action Badge on image hover */}
                  {data.personal.profileImage && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Change Profile Photo"
                      aria-label="Change Profile Photo"
                    >
                      <Camera className="w-4 h-4 text-violet-300" />
                    </button>
                  )}
                </div>

                {/* Floating status pill */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 px-3.5 py-1.5 rounded-xl bg-[#121422]/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-mono uppercase leading-none">University</span>
                    <span className="text-xs font-semibold text-slate-200 leading-tight">VTU Karnataka</span>
                  </div>
                </div>

                {/* Floating CGPA pill */}
                <div className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-[#121422]/90 border border-violet-500/30 shadow-lg backdrop-blur-md flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-mono uppercase leading-none">CGPA</span>
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300 leading-tight">
                      {data.personal.cgpa} / 10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors group cursor-pointer"
            aria-label="Scroll to About Section"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 group-hover:text-violet-300">
              Scroll Down
            </span>
            <div className="w-6 h-10 rounded-full border border-white/15 group-hover:border-violet-400/50 flex items-start justify-center p-1.5">
              <span className="w-1.5 h-2 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
