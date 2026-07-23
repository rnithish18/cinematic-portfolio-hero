"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Projects.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  title: string;
  stack: string[];
  points: string[];
};

const FEATURED = {
  eyebrow: "Mini Project",
  meta: "B.E. Computer Science & Engineering — V.S.B. Engineering College",
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
    "Genuine bilingual support — English and Tamil use separate, language-specific prompts rather than machine-translated output, across nearly every module.",
    "Three-tier auth — verified email (OTP + bcrypt), guest, and fully anonymous — to minimize onboarding friction while preserving history for farmers who want it.",
    "Diagnosed and fixed a production issue where Render's free tier blocked outbound SMTP; switched OTP and notification email to Brevo's HTTPS REST API to resolve it without a paid tier.",
    "Fixed broken Tamil text in exported PDF reports by rendering activity history to HTML and rasterizing it with html2canvas, rather than relying on jsPDF's Tamil-incompatible built-in font.",
    "Self-service, cascading account deletion and an owner-facing audit trail across registration, login, and deletion events.",
    "Community Q&A that routes a question to peers or the AI assistant, with automatic email broadcast to registered users.",
    "Deployed on Render with GitHub-triggered continuous deployment.",
  ],
  demoUrl: "https://farming-assistant-fxvg.onrender.com/static/index.html",
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
  {
    label: "GitHub",
    href: "https://github.com/rnithish18",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.36-2.65 5.32-5.18 5.6.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/r-nithish-181206n",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.featured}`, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.featured}`,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(`.${styles.card}`, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: `.${styles.grid}`,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="next-section" ref={sectionRef} className={styles.projects}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Selected Work</span>
        <h2 className={styles.heading}>Things I&apos;ve shipped.</h2>
        <p className={styles.intro}>
          A voice-enabled AI farming platform, a full-stack optimization
          tool, an ML-backed chatbot, and a tourism app — each one built to
          solve a real, specific problem rather than to check a box.
        </p>
      </div>

      <article className={styles.featured}>
        <div className={styles.featuredMain}>
          <span className={styles.featuredEyebrow}>{FEATURED.eyebrow}</span>
          <h3 className={styles.featuredTitle}>{FEATURED.title}</h3>
          <p className={styles.featuredMeta}>{FEATURED.meta}</p>
          <p className={styles.featuredTagline}>{FEATURED.tagline}</p>
          <p className={styles.featuredDescription}>{FEATURED.description}</p>
          <div className={styles.stackRow}>
            {FEATURED.stack.map((tech) => (
              <span key={tech} className={styles.pill}>
                {tech}
              </span>
            ))}
          </div>

          <a
            href={FEATURED.demoUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.demoLink}
          >
            View Live Demo ↗
          </a>
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
              className={styles.iconLink}
              aria-label={link.label}
              title={link.label}
            >
              <span className={styles.iconCircle}>{link.icon}</span>
              <span className={styles.iconLabel}>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}