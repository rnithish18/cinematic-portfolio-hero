"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import styles from "./About.module.css";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiPython,
  SiMongodb,
  SiGit,
  SiGithub,
} from "react-icons/si";
import {
  FaJava,
  FaDatabase,
  FaBrain,
  FaCode,
  FaEnvelope,
  FaServer,
  FaBolt,
  FaCloud,
  FaLinkedin,
} from "react-icons/fa";

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
  React: <SiReact style={{ color: "#61DAFB" }} />,
  Vite: <FaBolt style={{ color: "#646CFF" }} />,
  JavaScript: <SiJavascript style={{ color: "#F7DF1E" }} />,
  "HTML/CSS": <SiHtml5 style={{ color: "#E34F26" }} />,
  Python: <SiPython style={{ color: "#3776AB" }} />,
  FastAPI: <FaServer style={{ color: "#009688" }} />,
  SQL: <FaDatabase style={{ color: "#4479A1" }} />,
  "Groq (LLaMA 3.3 70B)": <FaBrain style={{ color: "#F55036" }} />,
  "Google Gemini API": <FaBrain style={{ color: "#4285F4" }} />,
  "Qwen Vision": <FaBrain style={{ color: "#722ED1" }} />,
  "Prompt Engineering": <FaBrain style={{ color: "#E07A3F" }} />,
  "MongoDB Atlas": <SiMongodb style={{ color: "#47A248" }} />,
  Render: <FaCloud style={{ color: "#46E3B7" }} />,
  "GitHub Actions/Pages": <FaCode style={{ color: "#2088FF" }} />,
  "Git & GitHub": <SiGithub style={{ color: "#F05032" }} />,
  "VS Code": <FaCode style={{ color: "#007ACC" }} />,
  Java: <FaJava style={{ color: "#EA2D2E" }} />,
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

const categories = ["All", ...skillGroups.map((g) => g.category)];

const funFacts = [
  "Full-stack by day, LeetCode grinder by night",
  "Built an AI that talks to farmers in Tamil & English",
  "Obsessed with clean code and cleaner UI",
  "Ships side projects faster than coffee gets cold",
];

// Floating badges shown around the photo
const floatingBadges = [
  { icon: <SiReact style={{ color: "#61DAFB" }} />, position: styles.badgeTopRight },
  { icon: <SiPython style={{ color: "#3776AB" }} />, position: styles.badgeBottomLeft },
  { icon: <FaJava style={{ color: "#EA2D2E" }} />, position: styles.badgeMidRight },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
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
          <div className={styles.photoGlowRing}>
            <div
              onClick={handlePhotoClick}
              className={styles.photoStage}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* DO NOT MODIFY — rotation logic */}
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
              {/* END rotation logic */}

              <div className={styles.photoOverlay} aria-hidden="true" />
              <span className={styles.clickHint}>Click to change</span>

              <div className={styles.photoCaption}>
                <span className={styles.captionLine}>BUILDING SOLUTIONS</span>
                <span className={styles.captionLineAccent}>DRIVING IMPACT</span>
              </div>
            </div>

            {floatingBadges.map((b, i) => (
              <div key={i} className={`${styles.floatBadge} ${b.position}`}>
                {b.icon}
              </div>
            ))}
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
            
            <a
              href="https://github.com/rnithish18"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconBtn}
              aria-label="GitHub"
            >
              <SiGithub />
            </a>

            
            <a  href="https://www.linkedin.com/in/r-nithish-181206n/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIconBtn}
              aria-label="LinkedIn"
            >
              <FaLinkedin style={{ color: "#0A66C2" }} />
            </a>

            
            <a  href="mailto:rnithish18122006@gmail.com"
              className={styles.socialIconBtn}
              aria-label="Email"
            >
              <FaEnvelope style={{ color: "#E07A3F" }} />
            </a>
          </div>
        </div>

        <div className={`${styles.content} ${styles.fadeInRight}`}>
          <span className={styles.eyebrow}>WHO I AM</span>
          <h2 className={styles.heading}>
            About <span className={styles.headingGradient}>Me</span>
          </h2>

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

          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.filterBtnActive : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.skillsWrapper}>
            {skillGroups
              .filter(
                (group) => activeCategory === "All" || group.category === activeCategory
              )
              .map((group, idx) => (
                <div
                  key={group.category}
                  className={styles.skillGroup}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <h3 className={styles.skillCategory}>{group.category}</h3>
                  <div className={styles.skillTags}>
                    {group.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        <span className={styles.skillTagIconCircle}>
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