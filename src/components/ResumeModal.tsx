import React, { useRef } from 'react';
import { X, Download, Printer, Upload, Check, GraduationCap, Award, Code2, Mail, Linkedin, MapPin, FileCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64 } from '../utils/fileHelpers';

export const ResumeModal: React.FC = () => {
  const { data, isResumeModalOpen, setIsResumeModalOpen, updatePersonal, showToast } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCustomResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
      showToast('Please upload a PDF document or image file', 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      updatePersonal({ resumeUrl: base64 });
      showToast('Custom resume file uploaded successfully!');
    } catch {
      showToast('Failed to read resume file', 'error');
    }
  };

  const handleDownloadCustomOrPrint = () => {
    if (data.personal.resumeUrl) {
      const link = document.createElement('a');
      link.href = data.personal.resumeUrl;
      link.download = `Avani_S_Rao_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Downloading uploaded resume file...');
    } else {
      handlePrint();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={() => setIsResumeModalOpen(false)}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0D0F1B] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-[#090A12] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-cyan-300">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white font-heading">
                {data.personal.name} — Curriculum Vitae
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                {data.personal.resumeUrl ? 'Custom PDF Linked' : 'Standard Generated CV Preview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Upload Custom PDF */}
            <button
              type="button"
              id="resume-upload-pdf-btn"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
              title="Upload your personal PDF resume file"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Upload PDF</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleCustomResumeUpload}
              className="hidden"
            />

            {/* Print / Download Button */}
            <button
              type="button"
              id="resume-print-btn"
              onClick={handleDownloadCustomOrPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md transition-all cursor-pointer"
            >
              {data.personal.resumeUrl ? <Download className="w-3.5 h-3.5" /> : <Printer className="w-3.5 h-3.5" />}
              <span>{data.personal.resumeUrl ? 'Download PDF' : 'Print / Save PDF'}</span>
            </button>

            {/* Close */}
            <button
              type="button"
              id="resume-close-btn"
              onClick={() => setIsResumeModalOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Resume Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0B0D16]">
          <div className="max-w-3xl mx-auto bg-[#0F111E] rounded-2xl p-6 sm:p-10 border border-white/10 shadow-xl text-slate-200 text-sm space-y-8 font-sans">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase tracking-wide">
                    {data.personal.name}
                  </h1>
                  <p className="text-violet-300 font-medium text-sm sm:text-base mt-1">
                    {data.personal.role}
                  </p>
                </div>

                <div className="flex flex-col text-xs text-slate-300 font-mono space-y-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    {data.personal.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    {data.personal.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    linkedin.com/in/avani-s-rao-a48248330
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
                Professional Profile
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {data.personal.bio}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-1 bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{edu.institution}</h3>
                      <p className="text-xs text-violet-300 font-medium">
                        {edu.degree} in {edu.department}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">{edu.university} • {edu.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        CGPA: {edu.cgpa} / 10
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono">{edu.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                <span>Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-slate-400 font-mono block mb-1">Languages:</span>
                  <span className="text-white font-medium">C, Python</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-slate-400 font-mono block mb-1">AI & Tooling:</span>
                  <span className="text-white font-medium">Generative AI, AI Tools</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-slate-400 font-mono block mb-1">Database & Core:</span>
                  <span className="text-white font-medium">DBMS (Database Management Systems)</span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-slate-400 font-mono block mb-1">Web & Version Control:</span>
                  <span className="text-white font-medium">CSS, Git</span>
                </div>
              </div>
            </div>

            {/* Projects & Experiences */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
                Key Projects & Technical Experiences
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-white font-heading">{proj.title}</h3>
                      <span className="text-[11px] font-mono text-violet-300">{proj.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Workshops */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Certifications & Hackathon Participation</span>
              </h2>
              <ul className="space-y-2 text-xs">
                {data.certifications.map((c) => (
                  <li key={c.id} className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-white font-medium">{c.title}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
