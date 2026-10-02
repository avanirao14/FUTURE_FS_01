import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: 'Avani S Rao',
    role: '3rd Year Information Science & Engineering Student',
    tagline: 'Building ideas. Exploring AI. Learning by doing.',
    bio: 'I am a 3rd year Information Science and Engineering student at JNN College of Engineering, Shivamogga. I am interested in Artificial Intelligence, Generative AI and Full Stack Development. I enjoy learning by building projects, participating in hackathons and exploring new technologies.',
    college: 'JNN College of Engineering (JNNCE), Shivamogga',
    university: 'Visvesvaraya Technological University (VTU)',
    cgpa: '8.71',
    year: '3rd Year (B.E.)',
    location: 'Shivamogga, Karnataka, India',
    email: 'avanirao226@gmail.com',
    linkedin: 'https://www.linkedin.com/in/avani-s-rao-a48248330',
    github: '', // Left blank as user hasn't provided their personal GitHub URL yet
    profileImage: '', // Elegant customizable placeholder until uploaded
    resumeUrl: '', // Ready for PDF upload or interactive resume view
    interests: [
      'Artificial Intelligence',
      'Generative AI',
      'Full Stack Web Development',
      'Software Development',
      'Hackathons',
      'Learning new technologies',
    ],
  },
  education: [
    {
      id: 'edu-1',
      institution: 'JNN College of Engineering (JNNCE)',
      degree: 'Bachelor of Engineering (B.E.)',
      department: 'Information Science and Engineering',
      year: '3rd Year Undergraduate',
      university: 'Visvesvaraya Technological University (VTU)',
      cgpa: '8.71',
      location: 'Shivamogga, Karnataka, India',
      period: '2023 - Present',
      highlights: [
        'Academic excellence with cumulative GPA of 8.71',
        'Active participant in engineering hackathons and technical project exhibitions',
        'Focus on core computing foundations, algorithms, and AI exploration',
      ],
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Python',
      category: 'Languages',
      description: 'Core programming, algorithmic problem solving & AI development',
    },
    {
      id: 'skill-2',
      name: 'C',
      category: 'Languages',
      description: 'Structured programming, memory management & computing fundamentals',
    },
    {
      id: 'skill-3',
      name: 'Generative AI',
      category: 'Artificial Intelligence',
      description: 'Exploration of large language models, prompt workflows & generative solutions',
    },
    {
      id: 'skill-4',
      name: 'AI Tools',
      category: 'Artificial Intelligence',
      description: 'Application of modern AI developer suites, assistants & productivity tools',
    },
    {
      id: 'skill-5',
      name: 'DBMS',
      category: 'Core Engineering',
      description: 'Relational database concepts, schema design & query management',
    },
    {
      id: 'skill-6',
      name: 'CSS',
      category: 'Web & Tools',
      description: 'Modern styling, responsive layouts & structured UI design',
    },
    {
      id: 'skill-7',
      name: 'Git',
      category: 'Web & Tools',
      description: 'Distributed version control, repository tracking & team collaboration',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Adaptive Learning for Neurodivergence',
      subtitle: 'Inclusive Personalized Learning Platform',
      description:
        'An inclusive personalized learning platform designed to adapt educational content and interaction flows to the distinct cognitive styles and learning needs of neurodivergent learners.',
      fullDetails:
        'This initiative addresses learning accessibility through responsive educational structures. The project explores assistive interfaces, adjustable pacing, multi-modal content delivery, and sensory-friendly interaction paradigms to support neurodivergent students effectively.',
      category: 'Inclusive Technology',
      technologies: ['Generative AI', 'Web Tech', 'Accessible UI', 'Python'],
      isFeatured: true,
      type: 'project',
    },
    {
      id: 'proj-2',
      title: 'Python Chatbot',
      subtitle: 'Interactive Conversational Assistant',
      description:
        'A Python-based interactive chatbot created as a learning and project experience using fundamental programming logic, conversational handling, and rule-based response routines.',
      fullDetails:
        'Developed as a hands-on programming experience to master conversational flow logic, user input parsing, data structures, and conditional branching in Python. Serves as a foundational stepping stone towards advanced conversational AI systems.',
      category: 'Software Development',
      technologies: ['Python', 'Natural Language Logic', 'Data Structures'],
      isFeatured: false,
      type: 'project',
    },
    {
      id: 'proj-3',
      title: 'NASA International Space Apps Challenge 2025',
      subtitle: 'Global Hackathon Experience',
      description:
        'Participation and project experience in the worldwide NASA Space Apps hackathon, collaborating on technology solutions to solve real-world challenges on Earth and in space.',
      fullDetails:
        'Engaged in intense collaborative problem solving under global hackathon criteria, analyzing challenges, rapid prototyping, and communicating technical ideas within multidisciplinary problem spaces.',
      category: 'Hackathon & Innovation',
      technologies: ['Team Prototyping', 'Problem Solving', 'Data Analysis'],
      isFeatured: false,
      type: 'challenge',
    },
    {
      id: 'proj-4',
      title: 'HackFest 0.1',
      subtitle: 'Competitive Engineering Hackathon Experience',
      description:
        'Participated in HackFest 0.1, developing collaborative technological concepts under competitive time constraints, rapid feature design, and refining software development workflows.',
      fullDetails:
        'Hands-on hackathon experience at HackFest 0.1, focusing on rapid technical prototyping, agile collaboration, problem statement analysis, and presenting live solutions before technical evaluators.',
      category: 'Hackathon & Innovation',
      technologies: ['Rapid Development', 'Technical Prototyping', 'Teamwork'],
      isFeatured: false,
      type: 'hackathon_experience',
    },
    {
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
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'NASA International Space Apps Challenge 2025',
      issuer: 'NASA Space Apps Challenge',
      date: '2025',
      badge: 'Global Challenge',
      description: 'Official participation and project completion experience.',
    },
    {
      id: 'cert-2',
      title: 'HackFest 0.1',
      issuer: 'HackFest Organizing Committee',
      date: 'Technical Hackathon',
      badge: 'Hackathon',
      description: 'Participation in HackFest 0.1 competitive project development.',
    },
    {
      id: 'cert-3',
      title: 'AURA 1.0',
      issuer: 'AURA Innovation Committee',
      date: 'Technical Hackathon',
      badge: 'Hackathon',
      description: 'Participation in AURA 1.0 technical sprint and innovation challenge.',
    },
    {
      id: 'cert-4',
      title: 'Generative AI Workshop',
      issuer: 'Technical Workshop Initiative',
      date: 'AI Skills Workshop',
      badge: 'AI Workshop',
      description: 'Specialized practical training in Generative AI tools, workflows, and fundamentals.',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'NASA International Space Apps Challenge 2025',
      category: 'Hackathons',
      year: '2025',
      organization: 'NASA Global Hackathon',
      description:
        'Tackled real-world planetary and terrestrial problem statements in an intensive collaborative sprint.',
    },
    {
      id: 'ach-2',
      title: 'HackFest 0.1',
      category: 'Hackathons',
      year: 'Competitive Sprint',
      organization: 'HackFest Committee',
      description:
        'Participated in HackFest 0.1 technical hackathon, designing and presenting rapid collaborative software prototypes.',
    },
    {
      id: 'ach-4',
      title: 'AURA 1.0',
      category: 'Hackathons',
      year: 'Innovation Challenge',
      organization: 'AURA Committee',
      description:
        'Competed in AURA 1.0 technical sprint, developing solutions and delivering rapid prototypes under timed evaluations.',
    },
    {
      id: 'ach-3',
      title: 'Generative AI Workshop Series',
      category: 'Workshops',
      year: 'Recent',
      organization: 'Technical Learning Program',
      description:
        'Gained hands-on familiarity with state-of-the-art Generative AI frameworks, prompt engineering, and intelligent tooling.',
    },
    {
      id: 'ach-4',
      title: 'Technical Project Demonstrations',
      category: 'Project Exhibitions',
      year: 'Ongoing',
      organization: 'JNNCE Department of ISE',
      description:
        'Presented software prototypes including the Adaptive Learning for Neurodivergence and interactive Python tools.',
    },
  ],
};
