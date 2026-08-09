"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
  FaGraduationCap,
  FaBriefcase,
  FaTimes,
  FaSchool,
  FaKeyboard,
  FaChartLine,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaPen,
  FaTrophy,
  FaArrowRight,
  FaArrowLeft,
  FaVolumeMute,
  FaVolumeUp,
  FaExpandAlt,
  FaLaptopCode,
  FaRocket,
  FaMedal,
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

const floatingBadges = [
  { icon: <SiReact style={{ color: "#61DAFB" }} />, position: styles.badgeTopRight },
  { icon: <SiPython style={{ color: "#3776AB" }} />, position: styles.badgeBottomLeft },
  { icon: <FaJava style={{ color: "#EA2D2E" }} />, position: styles.badgeMidRight },
];

interface MarksheetImage {
  label: string;
  src: string;
}

interface HeroStat {
  icon: ReactNode;
  label: string;
  value: string;
}

interface JourneyStep {
  icon: ReactNode;
  text: string;
}

interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  marksheet?: string;
  marksheets?: MarksheetImage[];

  // Hero-variant fields (10th, 11th, 12th, College)
  heroBackground?: string;
  heroStats?: HeroStat[];
  journeySteps?: JourneyStep[];
  journeyLabel?: string;
  quote?: { text: string; author: string };

  // Video-variant field (Typewriting)
  video?: string;
}

// Career / education timeline — chronological, oldest to newest
const TIMELINE: TimelineEntry[] = [
  {
    id: "t1",
    year: "2021 — 2022",
    title: "10th Grade",
    subtitle: "Sarojini Vidhalaya Matric Higher Secondary School, Namakkal",
    description: "Completed SSLC (10th grade) with an aggregate of 77.5%.",
    icon: <FaGraduationCap />,
    marksheet: "/marksheets/10th-marksheet.jpg",
    heroBackground: "/timeline-bg/school-10th.jpg",
    journeyLabel: "MY JOURNEY",
    heroStats: [
      { icon: <FaChartLine />, label: "AGGREGATE", value: "77.5%" },
      { icon: <FaSchool />, label: "SCHOOL", value: "SVMHSS Namakkal" },
      { icon: <FaMapMarkerAlt />, label: "LOCATION", value: "Namakkal, Tamil Nadu" },
      { icon: <FaCalendarAlt />, label: "ACADEMIC YEAR", value: "2021 – 2022" },
    ],
    journeySteps: [
      { icon: <FaBookOpen />, text: "Started my secondary education" },
      { icon: <FaPen />, text: "Dedicated hard work and consistent learning" },
      { icon: <FaTrophy />, text: "Achieved 77.5% in 10th Board Exams" },
      { icon: <FaArrowRight />, text: "Moved forward to higher secondary" },
    ],
    quote: {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
  },
  {
    id: "t2",
    year: "2022 — 2024",
    title: "11th Grade",
    subtitle: "Sarojini Vidhalaya Matric Higher Secondary School, Namakkal",
    description: "Completed 11th grade with an aggregate of 82.3%.",
    icon: <FaSchool />,
    marksheet: "/marksheets/12th-marksheet.jpg",
    heroBackground: "/timeline-bg/school-11-12.jpg",
    journeyLabel: "MY JOURNEY",
    heroStats: [
      { icon: <FaChartLine />, label: "AGGREGATE", value: "82.3%" },
      { icon: <FaSchool />, label: "SCHOOL", value: "SVMHSS Namakkal" },
      { icon: <FaMapMarkerAlt />, label: "LOCATION", value: "Namakkal, Tamil Nadu" },
      { icon: <FaCalendarAlt />, label: "ACADEMIC YEAR", value: "2022 – 2024" },
    ],
    journeySteps: [
      { icon: <FaBookOpen />, text: "Continued my academic growth" },
      { icon: <FaPen />, text: "Focused on learning and self improvement" },
      { icon: <FaTrophy />, text: "Achieved 82.3% in 11th & 12th" },
      { icon: <FaArrowRight />, text: "Pushed forward for excellence" },
    ],
    quote: {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi",
    },
  },
  {
    id: "t2b",
    year: "2022 — 2024",
    title: "12th Grade",
    subtitle: "Sarojini Vidhalaya Matric Higher Secondary School, Namakkal",
    description: "Completed higher secondary education (12th grade) with an aggregate of 82.3%.",
    icon: <FaSchool />,
    marksheet: "/marksheets/12th-marksheet.jpg",
    heroBackground: "/timeline-bg/school-11-12.jpg",
    journeyLabel: "MY JOURNEY",
    heroStats: [
      { icon: <FaChartLine />, label: "AGGREGATE", value: "82.3%" },
      { icon: <FaSchool />, label: "SCHOOL", value: "SVMHSS Namakkal" },
      { icon: <FaMapMarkerAlt />, label: "LOCATION", value: "Namakkal, Tamil Nadu" },
      { icon: <FaCalendarAlt />, label: "ACADEMIC YEAR", value: "2022 – 2024" },
    ],
    journeySteps: [
      { icon: <FaBookOpen />, text: "Strengthened my knowledge" },
      { icon: <FaPen />, text: "Consistent effort and discipline" },
      { icon: <FaTrophy />, text: "Achieved 82.3% in 11th & 12th" },
      { icon: <FaArrowRight />, text: "Ready for the next chapter" },
    ],
    quote: {
      text: "Go confidently in the direction of your dreams.",
      author: "Henry David Thoreau",
    },
  },
  {
    id: "t2c",
    year: "2021 — 2023",
    title: "Typewriting Certifications",
    subtitle: "Govt. of Tamil Nadu · Dept. of Technical Education",
    description:
      "Passed three Government Technical Examinations in typewriting — English Junior (30 WPM), English Senior (45 WPM), and Tamil Junior (30 WPM) — all First Class with Distinction.",
    icon: <FaKeyboard />,
    video: "/videos/typewriter-nr-logo.mp4",
    marksheets: [
      {
        label: "English Junior · 30 WPM · Sep 2021",
        src: "/marksheets/typewriting-english-junior.jpg",
      },
      {
        label: "English Senior · 45 WPM · Aug 2022",
        src: "/marksheets/typewriting-english-senior.jpg",
      },
      {
        label: "Tamil Junior · 30 WPM · Feb 2023",
        src: "/marksheets/typewriting-tamil-junior.jpg",
      },
    ],
  },
  {
    id: "t3",
    year: "2024 — Present",
    title: "B.E. Computer Science and Engineering",
    subtitle: "V.S.B Engineering College, Karur",
    description:
      "Coursework and projects centered on algorithms, databases, and software engineering, alongside independent AI/full-stack builds. Expected graduation 2028.",
    icon: <FaGraduationCap />,
    marksheet: "/marksheets/college-cgpa.jpg",
    heroBackground: "/timeline-bg/college.jpg",
    journeyLabel: "MY COLLEGE JOURNEY",
    heroStats: [
      { icon: <FaChartLine />, label: "CGPA (CURRENT)", value: "7.8" },
      { icon: <FaCalendarAlt />, label: "ACADEMIC YEAR", value: "2024 – 2025" },
      { icon: <FaBookOpen />, label: "DEPARTMENT", value: "CSE" },
      { icon: <FaMedal />, label: "OVERALL STATUS", value: "Good Standing" },
    ],
    journeySteps: [
      { icon: <FaSchool />, text: "Joined the journey — began my engineering journey with big dreams" },
      { icon: <FaLaptopCode />, text: "Learning & exploring — diving deep into code, concepts & creativity" },
      { icon: <FaTrophy />, text: "Building skills — working on projects, gaining real-world exposure" },
      { icon: <FaRocket />, text: "Future ready — committed to innovation and meaningful impact" },
    ],
    quote: {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
  },
  {
    id: "t4",
    year: "July 2025",
    title: "Python Foundation Intern",
    subtitle: "Infosys Springboard",
    description:
      "Validated core industrial Python backend development concepts, working through programmatic sequences and algorithmic data parsing structures.",
    icon: <FaBriefcase />,
  },
  {
    id: "t5",
    year: "2026",
    title: "AI-Powered Farming Assistant",
    subtitle: "FastAPI · Groq LLaMA 3.3 70B · Qwen Vision",
    description:
      "Built a bilingual (English/Tamil) AI assistant with voice input and 15+ modules — crop disease diagnosis, weather advisory, market prices — deployed on Render for the Hack2Skill Ideathon.",
    icon: <FaBrain />,
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [visibleTimelineIds, setVisibleTimelineIds] = useState<Set<string>>(new Set());
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) setVisibleTimelineIds((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );
    timelineRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedEntry || lightboxSrc) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (lightboxSrc) setLightboxSrc(null);
          else setSelectedEntry(null);
        }
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [selectedEntry, lightboxSrc]);

  useEffect(() => {
    setVideoMuted(true);
  }, [selectedEntry]);

  const closeModal = () => {
    setSelectedEntry(null);
    setLightboxSrc(null);
  };

  const isHero = !!selectedEntry?.heroBackground;
  const isVideo = !!selectedEntry?.video;

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
            
            <a  href="https://github.com/rnithish18"
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

      {/* Career / education timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <span className={styles.eyebrow}>MY JOURNEY</span>
          <h2 className={styles.heading}>
            How I <span className={styles.headingGradient}>Got Here</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {TIMELINE.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                timelineRefs.current[index] = el;
              }}
              data-id={item.id}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.timelineLeft : styles.timelineRight
              } ${visibleTimelineIds.has(item.id) ? styles.timelineVisible : ""}`}
            >
              <div className={styles.timelineDot}>{item.icon}</div>
              <button
                type="button"
                className={styles.timelinePanel}
                data-cursor-label="View details"
                onClick={() => setSelectedEntry(item)}
              >
                <span className={styles.year}>{item.year}</span>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineSubtitle}>{item.subtitle}</p>
                <p className={styles.timelineDescription}>{item.description}</p>
                <span className={styles.viewDetailsHint}>View details →</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {mounted &&
        selectedEntry &&
        createPortal(
          <>
            {/* ============ HERO VARIANT — school + college ============ */}
            {isHero && (
              <div className={styles.heroModalOverlay} onClick={closeModal}>
                <div
                  className={styles.heroModalPanel}
                  onClick={(e) => e.stopPropagation()}
                  style={{ backgroundImage: `url(${selectedEntry.heroBackground})` }}
                >
                  <div className={styles.heroDimOverlay} aria-hidden="true" />

                  <button
                    type="button"
                    className={styles.backBtn}
                    onClick={closeModal}
                    aria-label="Back to timeline"
                  >
                    <FaArrowLeft /> <span>Back</span>
                  </button>
                  <button
                    type="button"
                    className={styles.modalClose}
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>

                  <div className={styles.heroInfoCard}>
                    <div className={styles.modalIcon}>{selectedEntry.icon}</div>
                    <span className={styles.year}>{selectedEntry.year}</span>
                    <h3 className={styles.heroTitle}>{selectedEntry.title}</h3>
                    <p className={styles.heroSubtitle}>{selectedEntry.subtitle}</p>

                    {selectedEntry.heroStats && (
                      <div className={styles.heroStatsGrid}>
                        {selectedEntry.heroStats.map((s) => (
                          <div key={s.label} className={styles.heroStatItem}>
                            <div className={styles.heroStatIcon}>{s.icon}</div>
                            <span className={styles.heroStatLabel}>{s.label}</span>
                            <span className={styles.heroStatValue}>{s.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedEntry.journeySteps && (
                      <div className={styles.heroJourney}>
                        <span className={styles.heroJourneyLabel}>
                          {selectedEntry.journeyLabel ?? "MY JOURNEY"}
                        </span>
                        <div className={styles.heroJourneySteps}>
                          {selectedEntry.journeySteps.map((step, i) => (
                            <div key={i} className={styles.heroJourneyStepWrap}>
                              <div className={styles.heroJourneyStep}>
                                <div className={styles.heroJourneyIcon}>{step.icon}</div>
                                <p>{step.text}</p>
                              </div>
                              {i < selectedEntry.journeySteps!.length - 1 && (
                                <div className={styles.heroJourneyConnector} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedEntry.quote && (
                      <blockquote className={styles.heroQuote}>
                        <span>&ldquo;{selectedEntry.quote.text}&rdquo;</span>
                        — {selectedEntry.quote.author}
                      </blockquote>
                    )}
                  </div>

                  {selectedEntry.marksheet && (
                    <div className={styles.heroMarksheetCard}>
                      <span className={styles.heroMarksheetLabel}>Marksheet</span>
                      <img
                        src={selectedEntry.marksheet}
                        alt={`${selectedEntry.title} marksheet`}
                        className={styles.heroMarksheetImg}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className={styles.heroMarksheetFallback} style={{ display: "none" }}>
                        Marksheet not uploaded yet
                      </div>
                      <button
                        type="button"
                        className={styles.heroMarksheetBtn}
                        onClick={() => setLightboxSrc(selectedEntry.marksheet!)}
                      >
                        <FaExpandAlt /> View Full Marksheet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============ VIDEO VARIANT — Typewriting ============ */}
            {isVideo && (
              <div className={styles.modalOverlay} onClick={closeModal}>
                <div
                  className={`${styles.modalPanel} ${styles.videoModalPanel}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={videoRef}
                    className={styles.videoBg}
                    src={selectedEntry.video}
                    autoPlay
                    loop
                    muted={videoMuted}
                    playsInline
                  />
                  <div className={styles.videoDimOverlay} aria-hidden="true" />

                  <button
                    type="button"
                    className={styles.backBtnCompact}
                    onClick={closeModal}
                    aria-label="Back to timeline"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    type="button"
                    className={styles.modalClose}
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>

                  <button
                    type="button"
                    className={styles.muteToggle}
                    onClick={() => setVideoMuted((m) => !m)}
                    aria-label={videoMuted ? "Unmute video" : "Mute video"}
                  >
                    {videoMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>

                  <div className={styles.videoContent}>
                    <div className={styles.modalIcon}>{selectedEntry.icon}</div>
                    <span className={styles.year}>{selectedEntry.year}</span>
                    <h3 className={styles.modalTitle}>{selectedEntry.title}</h3>
                    <p className={styles.modalSubtitle}>{selectedEntry.subtitle}</p>
                    <p className={styles.modalDescription}>{selectedEntry.description}</p>

                    {selectedEntry.marksheets && selectedEntry.marksheets.length > 0 && (
                      <div className={styles.modalMarksheet}>
                        <span className={styles.modalMarksheetLabel}>Certificates</span>
                        <div className={styles.modalMarksheetGrid}>
                          {selectedEntry.marksheets.map((m) => (
                            <div key={m.src} className={styles.modalMarksheetItem}>
                              <img
                                src={m.src}
                                alt={m.label}
                                className={styles.modalMarksheetImg}
                                onClick={() => setLightboxSrc(m.src)}
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement | null;
                                  if (fallback) fallback.style.display = "block";
                                }}
                              />
                              <div
                                className={styles.modalMarksheetFallback}
                                style={{ display: "none" }}
                              >
                                {m.label} — image not uploaded yet
                              </div>
                              <span className={styles.modalMarksheetItemCaption}>
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============ COMPACT VARIANT — internship, project ============ */}
            {!isHero && !isVideo && (
              <div className={styles.modalOverlay} onClick={closeModal}>
                <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={styles.backBtnCompact}
                    onClick={closeModal}
                    aria-label="Back to timeline"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    type="button"
                    className={styles.modalClose}
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>

                  <div className={styles.modalIcon}>{selectedEntry.icon}</div>
                  <span className={styles.year}>{selectedEntry.year}</span>
                  <h3 className={styles.modalTitle}>{selectedEntry.title}</h3>
                  <p className={styles.modalSubtitle}>{selectedEntry.subtitle}</p>
                  <p className={styles.modalDescription}>{selectedEntry.description}</p>

                  {selectedEntry.marksheet && (
                    <div className={styles.modalMarksheet}>
                      <span className={styles.modalMarksheetLabel}>Marksheet</span>
                      <img
                        src={selectedEntry.marksheet}
                        alt={`${selectedEntry.title} marksheet`}
                        className={styles.modalMarksheetImg}
                        onClick={() => setLightboxSrc(selectedEntry.marksheet!)}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = "block";
                        }}
                      />
                      <div className={styles.modalMarksheetFallback} style={{ display: "none" }}>
                        Marksheet image not uploaded yet
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>,
          document.body
        )}

      {mounted &&
        lightboxSrc &&
        createPortal(
          <div className={styles.lightboxOverlay} onClick={() => setLightboxSrc(null)}>
            <button
              type="button"
              className={styles.backBtnCompact}
              onClick={() => setLightboxSrc(null)}
              aria-label="Back"
              style={{ left: 18 }}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setLightboxSrc(null)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <img
              src={lightboxSrc}
              alt="Marksheet full view"
              className={styles.lightboxImg}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </section>
  );
}