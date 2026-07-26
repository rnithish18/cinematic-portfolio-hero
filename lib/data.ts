export type FeaturedProject = {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  demoUrl: string;
  videoUrl?: string;
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
    videoUrl:
      'https://www.linkedin.com/posts/r-nithish-181206n_agritech-artificialintelligence-fastapi-ugcPost-7484535863477944320-1I7s/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyNmscBUkkdglmhNYCkrmdGSVTa7FW9FZw',
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
    demoUrl: 'https://github.com/rnithish18/employee-skill-matrix',
    stack: ['Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Java Foundation Certification',
    issuer: 'Infosys Springboard',
    date: 'May 2026',
    credentialUrl: 'https://verify.onwingspan.com',
    skills: ['Java', 'OOP', 'Programming Fundamentals'],
  },
  {
    title: 'Programming In Java (Elite, 79%)',
    issuer: 'NPTEL / IIT Kharagpur',
    date: 'Jul–Oct 2025',
    skills: ['Java', 'Data Structures', 'Problem Solving'],
  },
  {
    title: 'Certified LLM Security Professional (CLLMSP)',
    issuer: 'Red Team Leaders',
    date: 'June 2026',
    credentialUrl: 'https://courses.redteamleaders.com/exam-completion/d170c992a3fe14ae',
    skills: ['LLM Security', 'AI Red Teaming', 'Prompt Injection Defense'],
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2026',
    skills: ['Cybersecurity', 'Network Security', 'Threat Awareness'],
  },
  {
    title: 'Introduction to IoT and Digital Transformation',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2026',
    skills: ['IoT', 'Digital Transformation', 'Networking'],
  },
  {
    title: 'Python Programming Virtual Internship',
    issuer: 'CodSoft',
    date: 'Apr 2026',
    skills: ['Python', 'Software Development'],
  },
  {
    title: "Data Science & Machine Learning Roadmap Webinar",
    issuer: 'GUVI × HCL',
    date: 'Jan 2026',
    skills: ['Data Science', 'Machine Learning'],
  },
  {
    title: 'AI Internship (1 Month)',
    issuer: 'NoviTech R&D Pvt. Ltd.',
    date: 'Jun–Jul 2026',
    skills: ['Artificial Intelligence', 'Data Handling', 'Applied AI Systems'],
  },
  {
    title: '30-Day MasterClass in Artificial Intelligence',
    issuer: 'NoviTech R&D Pvt. Ltd.',
    date: 'Jun–Jul 2026',
    skills: ['Artificial Intelligence', 'AI Model Training'],
  },
  {
    title: '21-Day MasterClass in Power BI',
    issuer: 'NoviTech R&D Pvt. Ltd.',
    date: 'Aug 2025',
    skills: ['Power BI', 'Data Visualization', 'Analytics'],
  },
  {
    title: 'Web Development in React.js: Build a Web App',
    issuer: 'Coursera Project Network',
    date: 'Dec 2025',
    credentialUrl: 'https://coursera.org/verify/WWDIU4Q79ZGE',
    skills: ['React.js', 'Web Development'],
  },
  {
    title: 'Android App Development Workshop',
    issuer: 'Vectonix Technologies',
    date: 'Feb 2026',
    skills: ['Android Development', 'Mobile Apps'],
  },
  {
    title: 'Salesforce Administrator Explorer',
    issuer: 'FutureSkills Prime (MeitY–NASSCOM) × Salesforce',
    date: 'Nov 2025',
    skills: ['Salesforce', 'CRM Administration'],
  },
  {
    title: 'International Certified Career Coach – Foundation',
    issuer: 'Mindler × Career Development Alliance',
    date: 'Jan 2026',
    skills: ['Career Coaching', 'Mentorship'],
  },
  {
    title: 'Roadmap to Become a Data Scientist at Amazon',
    issuer: 'Coding Ninjas',
    date: '2026',
    skills: ['Data Science', 'Career Roadmap'],
  },
  {
    title: 'UI/UX Webinar',
    issuer: 'Brand Nomia Academy',
    date: 'May 2026',
    skills: ['UI/UX Design'],
  },
  {
    title: 'Internship Common Aptitude Test (ICAT)',
    issuer: 'ICAT',
    date: 'Nov 2024',
    skills: ['Aptitude', 'Problem Solving'],
  },
];