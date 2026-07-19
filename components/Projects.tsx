import styles from "./Projects.module.css";

type Project = {
  title: string;
  stack: string[];
  points: string[];
};

const FEATURED = {
  eyebrow: "Flagship Project",
  title: "AI-Powered Personal Farming Assistant",
  tagline:
    "A voice-enabled, multilingual agricultural advisory platform for Indian farmers.",
  description:
    "A full-stack, bilingual (English + Tamil) web platform that combines LLM reasoning with structured agronomic prompting to deliver crop diagnosis, weather-linked advisory, market intelligence, farm financial tracking, community Q&A, and yield and irrigation planning — with voice input and text-to-speech across nearly every module to reduce reliance on literacy.",
  stack: [
    "FastAPI",
    "MongoDB Atlas",
    "Groq LLaMA 3.3 / 4 Scout",
    "OpenWeatherMap API",
    "Web Speech API",
    "Render CI/CD",
  ],
  highlights: [
    "15 farmer-facing modules — conversational chat, vision-based crop diagnosis, weather & 7-day forecast, market prices, soil & pest advisory, expense tracking, community Q&A, and more.",
    "Vision-based Crop Diagnosis: a photographed leaf is sent to a vision-capable LLaMA model, which returns a probable cause and a recommended course of action.",
    "Three-tier auth — verified email (OTP + bcrypt), guest, and fully anonymous — to minimize onboarding friction while preserving history for farmers who want it.",
    "Self-service, cascading account deletion and an owner-facing audit trail across registration, login, and deletion events.",
    "Community Q&A that routes a question to peers or the AI assistant, with automatic email broadcast to registered users.",
    "Deployed on Render with GitHub-triggered continuous deployment.",
  ],
};

const PROJECTS: Project[] = [
  {
    title: "Employee Skill Matrix & Project Matcher",
    stack: ["Python", "JavaScript", "SQL"],
    points: [
      "Architected an enterprise-level optimization platform that scores engineers against a technical capability matrix, cutting cross-department onboarding latency by 35%.",
      "Built a custom match-scoring algorithm that maps resource capability scores against project requirements.",
      "Shipped an interactive dashboard (HTML5, CSS3, JS) giving leadership real-time talent benchmarks at 98% query accuracy.",
    ],
  },
  {
    title: "AI-Driven Public Health Chatbot",
    stack: ["Python", "NLP", "JSON"],
    points: [
      "Designed a low-latency diagnostic advisory chatbot that maps symptom data to regional public health outbreaks.",
      "Improved conversation accuracy by 40% through structured rule-based mapping protocols.",
      "Built an accessible front end that cut user lookup steps by 50% versus standard public health portals.",
    ],
  },
  {
    title: "Echoes of Jharkhand — Digital Tourism Platform",
    stack: ["Full-Stack", "UI/UX"],
    points: [
      "Developed a multi-page tourism platform with context-aware chatbots, booking, and live market modules.",
      "Built custom, geography-aware mapping components for regional exploration.",
      "Delivered an offline-first flow that lifted content access speed by 25% on constrained mobile networks.",
    ],
  },
];

const SKILLS: { label: string; value: string }[] = [
  { label: "Languages", value: "Python, Java, C++, JavaScript, HTML, CSS, SQL" },
  { label: "Tools", value: "Git, GitHub, VS Code, Eclipse, PyCharm, Linux CLI" },
  { label: "Core", value: "Data Structures & Algorithms, OOP, Full-Stack Development" },
];

const LINKS = [
  { label: "GitHub", value: "github.com/rnithish18", href: "https://github.com/rnithish18" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/r-nithish-181206n",
    href: "https://www.linkedin.com/in/r-nithish-181206n",
  },
];

export default function Projects() {
  return (
    <section id="next-section" className={styles.projects}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Selected Work</span>
        <h2 className={styles.heading}>Things I&apos;ve shipped.</h2>
        <p className={styles.intro}>
          A flagship AI platform, a full-stack optimization tool, an
          ML-backed chatbot, and a tourism app — each one built to solve a
          real, specific problem rather than to check a box.
        </p>
      </div>

      <article className={styles.featured}>
        <div className={styles.featuredMain}>
          <span className={styles.featuredEyebrow}>{FEATURED.eyebrow}</span>
          <h3 className={styles.featuredTitle}>{FEATURED.title}</h3>
          <p className={styles.featuredTagline}>{FEATURED.tagline}</p>
          <p className={styles.featuredDescription}>{FEATURED.description}</p>
          <div className={styles.stackRow}>
            {FEATURED.stack.map((tech) => (
              <span key={tech} className={styles.pill}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ul className={styles.featuredHighlights}>
          {FEATURED.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </article>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.stackRow}>
              {project.stack.map((tech) => (
                <span key={tech} className={styles.pill}>
                  {tech}
                </span>
              ))}
            </div>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <ul className={styles.pointList}>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.skills}>
          {SKILLS.map((skill) => (
            <div key={skill.label} className={styles.skillRow}>
              <span className={styles.skillLabel}>{skill.label}</span>
              <span className={styles.skillValue}>{skill.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.linkRow}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={styles.githubLink}
            >
              {link.label} — {link.value} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
