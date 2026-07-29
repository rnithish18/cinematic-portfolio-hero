"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import styles from "./About.module.css";
import {
  SiReact,
  SiVite,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiFastapi,
  SiMongodb,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiRender,
} from "react-icons/si";
import { FaJava, FaDatabase, FaBrain, FaCode } from "react-icons/fa";

const photos = [
  "/about-photo-1.jpg",
  "/about-photo-2.jpg",
  "/about-photo-3.jpg",
  "/about-photo-4.jpg",
  "/about-photo-5.jpg",
  "/about-photo-6.jpg",
];

const ROTATE_INTERVAL = 10000; // 10s

const skillIconMap: Record<string, ReactNode> = {
  React: <SiReact />,
  Vite: <SiVite />,
  JavaScript: <SiJavascript />,
  "HTML/CSS": <SiHtml5 />,
  Python: <SiPython />,
  FastAPI: <SiFastapi />,
  SQL: <FaDatabase />,
  "Groq (LLaMA 3.3 70B)": <FaBrain />,
  "Google Gemini API": <FaBrain />,
  "Qwen Vision": <FaBrain />,
  "Prompt Engineering": <FaBrain />,
  "MongoDB Atlas": <SiMongodb />,
  Render: <SiRender />,
  "GitHub Actions/Pages": <SiGithubactions />,
  "Git & GitHub": <SiGithub />,
  "VS Code": <FaCode />,
  Java: <FaJava />,
};

const skillGroups = [
  { category: "Frontend", skills: ["React", "Vite", "JavaScript", "HTML/CSS"] },
  { category: "Backend", skills: ["Python", "FastAPI", "SQL"] },
  {
    category: "AI / ML",
    skills: ["Groq (LLaMA 3.3 70B)", "Google Gemini API", "Qwen Vision", "Prompt Engineering"],
  },
  { category: "Databases", skills: ["MongoDB Atlas", "SQL"] },
  {
    category: "Deployment & Tools",
    skills: ["Render", "GitHub Actions/Pages", "Git & GitHub", "VS Code"],
  },
  { category: "Languages", skills: ["Python", "Java", "JavaScript"] },
];

const funFacts = [
  "Full-stack by day, LeetCode grinder by night",
  "Built an AI that talks to farmers in Tamil & English",
  "Obsessed with clean code and cleaner UI",
  "Ships side projects faster than coffee gets cold",
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
    setProgressKey((k) => k + 1);
  };

  const handlePhotoClick = () => {
    goToNext();
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goToNext, ROTATE_INTERVAL);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${styles.aboutSection} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.bgGlowOne} aria-hidden="true" />
      <div className={styles.bgGlowTwo} aria-hidden="true" />
      <div className={styles.container}>
        <div className={`${styles.photoWrapper} ${styles.fadeInLeft}`}>
          <div
            onClick={handlePhotoClick}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Nithish R"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === activeIndex ? 1 : 0,
                  transition: "opacity 1s ease",
                  pointerEvents: i === activeIndex ? "auto" : "none",
                }}
              />
            ))}
            <div className={styles.photoOverlay} aria-hidden="true" />
            <span className={styles.clickHint}>Click to change</span>
          </div>

          <div className={styles.progressTrack}>
            {photos.map((_, i) => (
              <div key={i} className={styles.progressDot}>
                {i === activeIndex && (
                  <div
                    key={progressKey}
                    className={styles.progressFill}
                    style={{ animationDuration: `${ROTATE_INTERVAL}ms` }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.socialRow}>
            
            <a  href="https://github.com/rnithish18"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              GitHub
            </a>
            
            <a  href="https://www.linkedin.com/in/r-nithish-181206n/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              LinkedIn
            </a>
            <a href="mailto:rnithish18122006@gmail.com" className={styles.socialBtn}>
              Email
            </a>
          </div>
        </div>

        <div className={`${styles.content} ${styles.fadeInRight}`}>
          <span className={styles.eyebrow}>WHO I AM</span>
          <h2 className={styles.heading}>About Me</h2>

          <p className={styles.bio}>
            I&apos;m Nithish R, a Computer Science and Engineering student and
            full-stack/AI engineer who loves turning ideas into working
            products. I&apos;ve built AI-powered applications ranging from a
            bilingual farming assistant to enterprise workforce optimization
            tools, blending FastAPI backends with modern React frontends and
            LLM-driven intelligence. I&apos;m driven by solving real-world
            problems with clean, practical engineering — and I&apos;m always
            shipping something new.
          </p>

          <a href="/resume.pdf" download className={styles.resumeBtn}>
            Download Resume
          </a>

          <div className={styles.skillsWrapper}>
            {skillGroups.map((group, idx) => (
              <div
                key={group.category}
                className={styles.skillGroup}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <h3 className={styles.skillCategory}>{group.category}</h3>
                <div className={styles.skillTags}>
                  {group.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      <span className={styles.skillTagIcon}>
                        {skillIconMap[skill] ?? null}
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.funFacts}>
            {funFacts.map((fact, idx) => (
              <div
                key={fact}
                className={styles.funFactCard}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {fact}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}