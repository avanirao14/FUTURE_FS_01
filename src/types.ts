export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  department: string;
  year: string;
  university: string;
  cgpa: string;
  location: string;
  period: string;
  highlights?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Core Engineering' | 'Web & Tools' | 'Artificial Intelligence';
  description?: string;
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDetails?: string;
  category: string;
  technologies: string[];
  imageUrl?: string;
  imageName?: string;
  imageSize?: number;
  videoUrl?: string;
  videoName?: string;
  videoSize?: number;
  isFeatured?: boolean;
  type: 'project' | 'hackathon_experience' | 'challenge';
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description?: string;
  imageUrl?: string; // base64 or url (images or pdf)
  fileType?: 'image' | 'pdf';
  fileName?: string;
  fileSize?: number;
  pdfUrl?: string;
  badge?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Workshops' | 'Technical Activities' | 'Project Exhibitions';
  year: string;
  organization: string;
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    bio: string;
    college: string;
    university: string;
    cgpa: string;
    year: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    profileImage: string;
    profileImageName?: string;
    profileImageSize?: number;
    resumeUrl: string;
    interests: string[];
  };
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificateItem[];
  achievements: AchievementItem[];
}
