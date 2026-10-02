import React, { useState, useRef } from 'react';
import {
  X,
  User,
  GraduationCap,
  Code,
  FolderGit2,
  Award,
  Trophy,
  Share2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Camera,
  Image as ImageIcon,
  Save,
  HelpCircle
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { fileToBase64, validateImageFile } from '../utils/fileHelpers';
import { SkillItem, ProjectItem, CertificateItem, AchievementItem } from '../types';
import { MediaUploadCard } from './MediaUploadCard';

export const PortfolioEditorModal: React.FC = () => {
  const {
    data,
    isEditorOpen,
    setIsEditorOpen,
    updatePersonal,
    updateEducation,
    updateSkill,
    addSkill,
    removeSkill,
    updateProject,
    addProject,
    removeProject,
    updateCertificate,
    addCertificate,
    removeCertificate,
    updateAchievement,
    addAchievement,
    removeAchievement,
    resetToDefault,
    exportDataJSON,
    importDataJSON,
    showToast,
    setSelectedPdfCert,
    setSelectedCertificateIndex,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'education' | 'skills' | 'projects' | 'certificates' | 'achievements' | 'backup'
  >('profile');

  // References for file uploads
  const jsonImportInputRef = useRef<HTMLInputElement | null>(null);

  const isPdfCert = (cert: CertificateItem) => {
    return (
      cert.fileType === 'pdf' ||
      cert.fileName?.toLowerCase().endsWith('.pdf') ||
      cert.imageUrl?.startsWith('data:application/pdf') ||
      Boolean(cert.pdfUrl)
    );
  };

  if (!isEditorOpen) return null;

  const handleJsonFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={() => setIsEditorOpen(false)}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0D0F1B] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-[#090A12] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-cyan-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 id="editor-modal-title" className="text-base sm:text-lg font-bold text-white font-heading">
                Customize Portfolio Content
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Updates save automatically to your browser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="editor-export-btn"
              onClick={exportDataJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
              title="Save a backup file of your details"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              type="button"
              id="editor-close-btn"
              onClick={() => setIsEditorOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Editor Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto p-2 bg-[#090A13] border-b border-white/[0.07] shrink-0 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'education'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education & CGPA</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Skills</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'certificates'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'bg-violet-600/30 text-white border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Achievements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto ${
              activeTab === 'backup'
                ? 'bg-cyan-600/30 text-white border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-5 max-w-3xl">
              {/* Photo Upload Section */}
              <MediaUploadCard
                label="Profile Photo"
                sublabel="Appears in Hero and About sections with glowing border presentation"
                acceptType="image"
                currentMediaUrl={data.personal.profileImage}
                onUpload={(_, base64) => {
                  updatePersonal({ profileImage: base64 });
                  showToast('Profile photo updated successfully!');
                }}
                onRemove={() => {
                  updatePersonal({ profileImage: '' });
                  showToast('Profile photo removed');
                }}
                idPrefix="editor-profile-photo"
              />

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={data.personal.name}
                    onChange={(e) => updatePersonal({ name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Current Role / Title</label>
                  <input
                    type="text"
                    value={data.personal.role}
                    onChange={(e) => updatePersonal({ role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={data.personal.tagline}
                  onChange={(e) => updatePersonal({ tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">About Me Bio</label>
                <textarea
                  rows={4}
                  value={data.personal.bio}
                  onChange={(e) => updatePersonal({ bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={data.personal.email}
                    onChange={(e) => updatePersonal({ email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={data.personal.location}
                    onChange={(e) => updatePersonal({ location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={data.personal.linkedin}
                    onChange={(e) => updatePersonal({ linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/your-username"
                    value={data.personal.github}
                    onChange={(e) => updatePersonal({ github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-violet-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-3xl">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">College / Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Department / Branch</label>
                      <input
                        type="text"
                        value={edu.department}
                        onChange={(e) => updateEducation(edu.id, { department: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">University</label>
                      <input
                        type="text"
                        value={edu.university}
                        onChange={(e) => updateEducation(edu.id, { university: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">CGPA (e.g. 8.71)</label>
                      <input
                        type="text"
                        value={edu.cgpa}
                        onChange={(e) => {
                          updateEducation(edu.id, { cgpa: e.target.value });
                          updatePersonal({ cgpa: e.target.value });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Year / Period</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Manage your technical skills (No percentages or progress bars, just clear domain proficiencies)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addSkill({
                      name: 'New Skill',
                      category: 'Languages',
                      description: 'Skill description and applications',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] flex flex-col sm:flex-row items-center gap-3"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                      className="w-full sm:w-44 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                    />

                    <select
                      value={skill.category}
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          category: e.target.value as SkillItem['category'],
                        })
                      }
                      className="w-full sm:w-44 px-3 py-1.5 rounded-lg bg-[#0F111E] border border-white/[0.08] text-slate-200 text-xs font-mono"
                    >
                      <option value="Languages">Languages</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Core Engineering">Core Engineering</option>
                      <option value="Web & Tools">Web & Tools</option>
                    </select>

                    <input
                      type="text"
                      value={skill.description || ''}
                      onChange={(e) => updateSkill(skill.id, { description: e.target.value })}
                      placeholder="Usage context or description"
                      className="flex-1 w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs"
                    />

                    <button
                      type="button"
                      onClick={() => removeSkill(skill.id)}
                      className="p-2 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/40 transition-colors"
                      title="Delete skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Update your project descriptions, technologies, and visual screenshots
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addProject({
                      title: 'New Project',
                      subtitle: 'Project Subtitle',
                      description: 'Concise description of the initiative or platform.',
                      category: 'Software Development',
                      technologies: ['Python', 'Web Tech'],
                      type: 'project',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Project Title {project.isFeatured && '(Major Featured Project)'}
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Subtitle / Domain
                        </label>
                        <input
                          type="text"
                          value={project.subtitle}
                          onChange={(e) => updateProject(project.id, { subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-950/50 rounded-lg transition-colors"
                      title="Remove Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Technologies (comma separated, e.g. Python, AI Tools, Web Tech)
                    </label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) =>
                        updateProject(project.id, {
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-mono text-xs"
                    />
                  </div>

                  {/* Project Media Uploads: Image & Video Demo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <MediaUploadCard
                      label="Solution Photo / Project Image"
                      sublabel="Screenshot, diagram, or prototype of what you built (JPG, PNG, WEBP)"
                      acceptType="image"
                      currentMediaUrl={project.imageUrl}
                      onUpload={(_, base64) => {
                        updateProject(project.id, { imageUrl: base64 });
                        showToast(`Solution photo updated for ${project.title}`);
                      }}
                      onRemove={() => {
                        updateProject(project.id, { imageUrl: '' });
                        showToast(`Solution photo removed from ${project.title}`);
                      }}
                      idPrefix={`project-img-${project.id}`}
                    />

                    <MediaUploadCard
                      label="Project Demo Video"
                      sublabel="Demonstration video clip (MP4, WEBM, MOV up to 50MB)"
                      acceptType="video"
                      isVideo={true}
                      currentMediaUrl={project.videoUrl}
                      onUpload={(_, base64) => {
                        updateProject(project.id, { videoUrl: base64 });
                        showToast(`Demo video uploaded for ${project.title}`);
                      }}
                      onRemove={() => {
                        updateProject(project.id, { videoUrl: '' });
                        showToast(`Demo video removed from ${project.title}`);
                      }}
                      idPrefix={`project-video-${project.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Upload your actual certificate photos or documents (NASA Space Apps, HackFest 0.1, AURA 1.0, Generative AI)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addCertificate({
                      title: 'New Certificate',
                      issuer: 'Certifying Organization',
                      badge: 'Certification',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Entry</span>
                </button>
              </div>

              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Certificate Name
                      </label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => updateCertificate(cert.id, { title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Issuing Organization / Event
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Certificate Upload Field (Image or PDF) */}
                  <div className="pt-2 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-300">
                        Certificate Document or Image (JPG, PNG, WEBP, or PDF)
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCertificate(cert.id)}
                        className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-white px-2 py-1 rounded bg-rose-950/30 hover:bg-rose-900/50 transition-colors cursor-pointer"
                        title="Delete certificate entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Entry</span>
                      </button>
                    </div>

                    <MediaUploadCard
                      label="Certificate File"
                      sublabel="Official certificate or participation proof (PDF or Image)"
                      acceptType="certificate"
                      isPdf={isPdfCert(cert)}
                      currentMediaUrl={cert.pdfUrl || cert.imageUrl}
                      currentFileName={cert.fileName}
                      currentFileSize={cert.fileSize}
                      onPreview={() => {
                        if (isPdfCert(cert)) {
                          setSelectedPdfCert(cert);
                        } else {
                          const idx = data.certifications.findIndex((c) => c.id === cert.id);
                          if (idx !== -1) setSelectedCertificateIndex(idx);
                        }
                      }}
                      onUpload={(_, base64, metadata) => {
                        updateCertificate(cert.id, {
                          imageUrl: base64,
                          pdfUrl: metadata.fileType === 'pdf' ? base64 : undefined,
                          fileType: metadata.fileType === 'pdf' ? 'pdf' : 'image',
                          fileName: metadata.fileName,
                          fileSize: metadata.fileSize,
                        });
                        showToast(
                          `Uploaded ${metadata.fileType === 'pdf' ? 'PDF certificate' : 'certificate image'} for ${cert.title}`
                        );
                      }}
                      onRemove={() => {
                        updateCertificate(cert.id, {
                          imageUrl: '',
                          pdfUrl: undefined,
                          fileType: undefined,
                          fileName: undefined,
                          fileSize: undefined,
                        });
                        showToast(`Removed certificate media from ${cert.title}`);
                      }}
                      idPrefix={`cert-upload-${cert.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Update hackathons, workshops, technical exhibitions, and activities
                </span>
                <button
                  type="button"
                  onClick={() =>
                    addAchievement({
                      title: 'New Achievement',
                      category: 'Hackathons',
                      year: '2025',
                      organization: 'Event Organization',
                      description: 'Participation and key learnings description',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Achievement</span>
                </button>
              </div>

              {data.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <input
                      type="text"
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => removeAchievement(ach.id)}
                      className="p-1.5 text-rose-400 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <select
                      value={ach.category}
                      onChange={(e) =>
                        updateAchievement(ach.id, {
                          category: e.target.value as AchievementItem['category'],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#0F111E] border border-white/[0.08] text-slate-200 text-xs font-mono"
                    >
                      <option value="Hackathons">Hackathons</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Technical Activities">Technical Activities</option>
                      <option value="Project Exhibitions">Project Exhibitions</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Year / Date"
                      value={ach.year}
                      onChange={(e) => updateAchievement(ach.id, { year: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs"
                    />

                    <input
                      type="text"
                      placeholder="Organization"
                      value={ach.organization}
                      onChange={(e) => updateAchievement(ach.id, { organization: e.target.value })}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={ach.description}
                    onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Export Portfolio Data (JSON)</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download a complete backup of all your customized portfolio text, links, and uploaded base64 images as a single JSON file. You can import this anytime on any device.
                </p>
                <button
                  type="button"
                  id="backup-export-json-btn"
                  onClick={exportDataJSON}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition-colors"
                >
                  Download Backup File (.json)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Import Portfolio Data (JSON)</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Restore previously exported portfolio settings or load custom configuration.
                </p>
                <button
                  type="button"
                  id="backup-import-json-btn"
                  onClick={() => jsonImportInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors"
                >
                  Choose JSON File to Import
                </button>
                <input
                  ref={jsonImportInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleJsonFileSelected}
                  className="hidden"
                />
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-3">
                <h4 className="text-sm font-bold text-rose-200 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  <span>Reset to Default Content</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Revert all texts, education, projects, and certifications back to Avani S Rao's original portfolio specifications.
                </p>
                <button
                  type="button"
                  id="backup-reset-default-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset all portfolio fields to default?')) {
                      resetToDefault();
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700/40 transition-colors"
                >
                  Reset Everything to Default
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#090A12] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Changes persist automatically</span>
          </span>

          <button
            type="button"
            onClick={() => {
              setIsEditorOpen(false);
              showToast('Portfolio changes saved!');
            }}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md transition-all cursor-pointer"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
