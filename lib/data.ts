export type FeaturedProject = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  demoUrl: string;
  stack: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'farming-assistant',
    number: '01 / 02',
    category: 'AI & FULL-STACK PLATFORM',
    title: 'AI FARMING ASSISTANT',
    subtitle: 'Voice-Enabled Agricultural Advisory',
    description:
      'A full-stack, bilingual (English + Tamil) web platform combining LLM reasoning with agronomic logic.',
    image: '/projects/farming-assistant.png',
    demoUrl: 'https://farming-assistant-fxvg.onrender.com/static/index.html',
    stack: ['FastAPI', 'MongoDB Atlas', 'Groq LLaMA 3.3', 'OpenWeatherMap API', 'Web Speech API'],
  },
  {
    id: 'skill-matrix',
    number: '02 / 02',
    category: 'ENTERPRISE OPTIMIZATION',
    title: 'SKILL MATRIX MATCHER',
    subtitle: 'Resource & Project Alignment Engine',
    description:
      'Architected an enterprise optimization platform scoring engineers against capability matrices.',
    image: '/projects/skill-matrix.png',
    demoUrl: 'https://github.com/rnithish18',
    stack: ['Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Certification Platform',
    date: '2025',
    credentialUrl: 'https://github.com/rnithish18',
    skills: ['React', 'FastAPI', 'MongoDB', 'SQL'],
  },
  {
    title: 'Python & Machine Learning Foundations',
    issuer: 'Certification Platform',
    date: '2024',
    credentialUrl: 'https://github.com/rnithish18',
    skills: ['Python', 'NLP', 'Data Structures'],
  },
];