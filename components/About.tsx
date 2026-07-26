import styles from "./About.module.css";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Vite", "JavaScript", "HTML/CSS"],
  },
  {
    category: "Backend",
    skills: ["Python", "FastAPI", "SQL"],
  },
  {
    category: "AI / ML",
    skills: [
      "Groq (LLaMA 3.3 70B)",
      "Google Gemini API",
      "Qwen Vision",
      "Prompt Engineering",
    ],
  },
  {
    category: "Databases",
    skills: ["MongoDB Atlas", "SQL"],
  },
  {
    category: "Deployment & Tools",
    skills: ["Render", "GitHub Actions/Pages", "Git & GitHub", "VS Code"],
  },
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript"],
  },
];

const funFacts = [
  "Full-stack by day, LeetCode grinder by night",
  "Built an AI that talks to farmers in Tamil & English",
  "Obsessed with clean code and cleaner UI",
  "Ships side projects faster than coffee gets cold",
];

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.photoWrapper}>
          <img src="/about-photo.jpg" alt="Nithish R" className={styles.photo} />
          <div className={styles.socialRow}>
            <a href="https://github.com/rnithish18" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>GitHub</a>
            <a href="https://www.linkedin.com/in/r-nithish-181206n/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>LinkedIn</a>
            <a href="mailto:rnithish18122006@gmail.com" className={styles.socialBtn}>Email</a>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>WHO I AM</span>
          <h2 className={styles.heading}>About Me</h2>

          <p className={styles.bio}>
            I&apos;m Nithish R, a Computer Science and Engineering student and full-stack/AI engineer who loves turning ideas into working products. I&apos;ve built AI-powered applications ranging from a bilingual farming assistant to enterprise workforce optimization tools, blending FastAPI backends with modern React frontends and LLM-driven intelligence. I&apos;m driven by solving real-world problems with clean, practical engineering — and I&apos;m always shipping something new.
          </p>

          <a href="/resume.pdf" download className={styles.resumeBtn}>Download Resume</a>

          <div className={styles.skillsWrapper}>
            {skillGroups.map((group) => (
              <div key={group.category} className={styles.skillGroup}>
                <h3 className={styles.skillCategory}>{group.category}</h3>
                <div className={styles.skillTags}>
                  {group.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.funFacts}>
            {funFacts.map((fact) => (
              <div key={fact} className={styles.funFactCard}>{fact}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}