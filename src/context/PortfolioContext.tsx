import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProjectItem, CertificateItem, EducationItem, SkillItem, AchievementItem } from '../types';
import { initialPortfolioData } from '../data/initialData';
import { savePortfolioToStorage, loadPortfolioFromStorage, clearPortfolioStorage } from '../utils/dbStorage';

const STORAGE_KEY = 'avani_portfolio_data_v1';

const migratePortfolioData = (inputData: PortfolioData): PortfolioData => {
  if (!inputData) return initialPortfolioData;
  let hackfestCount = 0;
  const updatedCertifications = (inputData.certifications || initialPortfolioData.certifications).map((cert) => {
    const titleLower = cert.title.toLowerCase();
    if (titleLower.includes('hackfest 1.0')) {
      return {
        ...cert,
        title: 'AURA 1.0',
        issuer: cert.issuer.includes('HackFest') ? 'AURA Innovation Committee' : cert.issuer,
        description: cert.description?.includes('HackFest')
          ? 'Participation in AURA 1.0 technical sprint and innovation challenge.'
          : cert.description,
      };
    }
    if (titleLower.includes('hackfest 0.1') || titleLower === 'hackfest') {
      hackfestCount++;
      if (hackfestCount > 1) {
        return {
          ...cert,
          title: 'AURA 1.0',
          issuer: cert.issuer.includes('HackFest') ? 'AURA Innovation Committee' : cert.issuer,
          description: cert.description?.includes('HackFest')
            ? 'Participation in AURA 1.0 technical sprint and innovation challenge.'
            : cert.description,
        };
      }
    }
    return cert;
  });

  const rawAchievements = inputData.achievements || initialPortfolioData.achievements;
  const hasAuraAch = rawAchievements.some((a) => a.title.toLowerCase().includes('aura'));
  const updatedAchievements = rawAchievements.map((ach) => {
    if (ach.title.includes('HackFest') && (ach.title.includes('AURA') || ach.title.includes('1.0'))) {
      return {
        ...ach,
        title: 'HackFest 0.1',
        category: 'Hackathons' as const,
        year: 'Competitive Sprint',
        organization: 'HackFest Committee',
        description:
          'Participated in HackFest 0.1 technical hackathon, designing and presenting rapid collaborative software prototypes.',
      };
    }
    return ach;
  });

  if (!hasAuraAch) {
    updatedAchievements.push({
      id: 'ach-4',
      title: 'AURA 1.0',
      category: 'Hackathons',
      year: 'Innovation Challenge',
      organization: 'AURA Committee',
      description:
        'Competed in AURA 1.0 technical sprint, developing solutions and delivering rapid prototypes under timed evaluations.',
    });
  }

  const rawProjects = inputData.projects || initialPortfolioData.projects;
  const hasAuraProject = rawProjects.some((p) => p.title.toLowerCase().includes('aura'));
  
  const updatedProjects = rawProjects.map((proj) => {
    if (proj.title.includes('HackFest') && (proj.title.includes('AURA') || proj.title === 'HackFest')) {
      return {
        ...proj,
        title: 'HackFest 0.1',
        subtitle: 'Competitive Engineering Hackathon Experience',
        description:
          'Participated in HackFest 0.1, developing collaborative technological concepts under competitive time constraints, rapid feature design, and refining software development workflows.',
        fullDetails:
          'Hands-on hackathon experience at HackFest 0.1, focusing on rapid technical prototyping, agile collaboration, problem statement analysis, and presenting live solutions before technical evaluators.',
      };
    }
    return proj;
  });

  if (!hasAuraProject) {
    updatedProjects.push({
      id: 'proj-5',
      title: 'AURA 1.0',
      subtitle: 'Technical Innovation & Hackathon Challenge',
      description:
        'Participated in AURA 1.0, architecting innovative software solutions, rapid sprint development, and tackling real-world computational problem statements.',
      fullDetails:
        'Intensive engineering sprint at AURA 1.0, collaborating with multidisciplinary team members to conceptualize, design, and deliver a functioning technological solution under timed constraints.',
      category: 'Hackathon & Innovation',
      technologies: ['Solution Architecture', 'Agile Sprint', 'Technical Prototyping'],
      isFeatured: false,
      type: 'hackathon_experience',
    });
  }

  return {
    ...inputData,
    certifications: updatedCertifications,
    achievements: updatedAchievements,
    projects: updatedProjects,
  };
};

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonal: (fields: Partial<PortfolioData['personal']>) => void;
  updateEducation: (id: string, updated: Partial<EducationItem>) => void;
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  removeEducation: (id: string) => void;
  updateSkill: (id: string, updated: Partial<SkillItem>) => void;
  addSkill: (item: Omit<SkillItem, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  removeProject: (id: string) => void;
  updateCertificate: (id: string, updated: Partial<CertificateItem>) => void;
  addCertificate: (item: Omit<CertificateItem, 'id'>) => void;
  removeCertificate: (id: string) => void;
  updateAchievement: (id: string, updated: Partial<AchievementItem>) => void;
  addAchievement: (item: Omit<AchievementItem, 'id'>) => void;
  removeAchievement: (id: string) => void;
  resetToDefault: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  selectedCertificateIndex: number | null;
  setSelectedCertificateIndex: (index: number | null) => void;
  selectedPdfCert: CertificateItem | null;
  setSelectedPdfCert: (cert: CertificateItem | null) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return migratePortfolioData({
          ...initialPortfolioData,
          ...parsed,
          personal: { ...initialPortfolioData.personal, ...(parsed.personal || {}) },
        });
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from storage:', e);
    }
    return initialPortfolioData;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number | null>(null);
  const [selectedPdfCert, setSelectedPdfCert] = useState<CertificateItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load authoritative data from IndexedDB on initial launch
  useEffect(() => {
    let isMounted = true;
    loadPortfolioFromStorage().then((savedData) => {
      if (isMounted && savedData && savedData.personal) {
        setData(
          migratePortfolioData({
            ...initialPortfolioData,
            ...savedData,
            personal: { ...initialPortfolioData.personal, ...savedData.personal },
          })
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Save changes to robust storage
  useEffect(() => {
    savePortfolioToStorage(data);
  }, [data]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updatePersonal = (fields: Partial<PortfolioData['personal']>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...fields },
    }));
    showToast('Personal info updated successfully');
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    showToast('Education details updated');
  };

  const addEducation = (item: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = { ...item, id: `edu-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      education: [newItem, ...prev.education],
    }));
    showToast('Education entry added');
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
    showToast('Education entry removed', 'info');
  };

  const updateSkill = (id: string, updated: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    showToast('Skill updated');
  };

  const addSkill = (item: Omit<SkillItem, 'id'>) => {
    const newItem: SkillItem = { ...item, id: `skill-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newItem],
    }));
    showToast('New skill added');
  };

  const removeSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
    showToast('Skill removed', 'info');
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject((prev) => (prev ? { ...prev, ...updated } : null));
    }
    showToast('Project updated');
  };

  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = { ...item, id: `proj-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      projects: [newItem, ...prev.projects],
    }));
    showToast('New project added');
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
    showToast('Project removed', 'info');
  };

  const updateCertificate = (id: string, updated: Partial<CertificateItem>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    showToast('Certificate updated');
  };

  const addCertificate = (item: Omit<CertificateItem, 'id'>) => {
    const newItem: CertificateItem = { ...item, id: `cert-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newItem],
    }));
    showToast('Certificate added');
  };

  const removeCertificate = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
    showToast('Certificate removed', 'info');
  };

  const updateAchievement = (id: string, updated: Partial<AchievementItem>) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item) => (item.id === id ? { ...item, ...updated } : item)),
    }));
    showToast('Achievement updated');
  };

  const addAchievement = (item: Omit<AchievementItem, 'id'>) => {
    const newItem: AchievementItem = { ...item, id: `ach-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newItem],
    }));
    showToast('Achievement added');
  };

  const removeAchievement = (id: string) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((item) => item.id !== id),
    }));
    showToast('Achievement removed', 'info');
  };

  const resetToDefault = () => {
    setData(initialPortfolioData);
    clearPortfolioStorage();
    showToast('Portfolio reset to original details', 'info');
  };

  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `avani-s-rao-portfolio-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Portfolio configuration downloaded as JSON');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.personal || !parsed.personal.name) {
        throw new Error('Invalid portfolio structure');
      }
      setData({
        ...initialPortfolioData,
        ...parsed,
        personal: { ...initialPortfolioData.personal, ...(parsed.personal || {}) },
      });
      showToast('Portfolio configuration imported successfully!');
      return true;
    } catch (e) {
      showToast('Failed to import JSON: Invalid file format', 'error');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updatePersonal,
        updateEducation,
        addEducation,
        removeEducation,
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
        isEditorOpen,
        setIsEditorOpen,
        selectedCertificateIndex,
        setSelectedCertificateIndex,
        selectedPdfCert,
        setSelectedPdfCert,
        selectedProject,
        setSelectedProject,
        isResumeModalOpen,
        setIsResumeModalOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
