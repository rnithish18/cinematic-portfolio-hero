"use client";
import { useEffect, useRef, useState } from "react";
import { SiGithub } from "react-icons/si";
import styles from "./Navbar.module.css";

const SECTIONS = [
  { id: "home", href: "#home", label: "HOME" },
  { id: "about", href: "#about", label: "ABOUT" },
  { id: "projects", href: "#projects", label: "PROJECTS" },
  { id: "certifications", href: "#certifications", label: "CERTIFICATIONS" },
];

export default function Navbar() {
  const [timeString, setTimeString] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  const lastScrollY = useRef(0);
  const navLinksRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Shrink-on-scroll + hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 80);

      // Always show navbar near the top, regardless of direction
      if (currentY < 120) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true); // scrolling down
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: which section is currently active
  useEffect(() => {
    const allIds = [...SECTIONS.map((s) => s.id), "contact"];
    const elements = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // active when section is near top third of viewport
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Move the sliding underline whenever the active section changes
  useEffect(() => {
    const activeLink = linkRefs.current[activeId];
    const container = navLinksRef.current;
    if (!activeLink || !container) return;

    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setUnderline({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [activeId, timeString]); // timeString dependency forces a re-measure after first paint

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveId("home");
  };

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    encodeURIComponent(
      "rnithish18122006@gmail.com,rnithish181206@gmail.com"
    );

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
        hidden ? styles.hidden : ""
      }`}
    >
      <div className={styles.timeBadge}>
        INDIA TIME – <span>{timeString || "10:27:36 PM"}</span>
      </div>
      <nav className={styles.navLinks} ref={navLinksRef}>
        {SECTIONS.map((section) => (
          
          <a  key={section.id}
            href={section.href}
            ref={(el) => {
              linkRefs.current[section.id] = el;
            }}
            onClick={section.id === "home" ? scrollToTop : undefined}
            className={activeId === section.id ? styles.activeLink : ""}
          >
            {section.label}
          </a>
        ))}
        
        <a  href="/leetcode"
          ref={(el) => {
            linkRefs.current["leetcode"] = el;
          }}
        >
          LEETCODE
        </a>
        
        <a  href="https://github.com/rnithish18"
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => {
            linkRefs.current["github"] = el;
          }}
          className={styles.githubLink}
          aria-label="GitHub"
        >
          <SiGithub />
          <span>GITHUB</span>
        </a>
        
        <a
          href="#contact"
          ref={(el) => {
            linkRefs.current["contact"] = el;
          }}
          className={activeId === "contact" ? styles.activeLink : ""}
        >
          CONTACT
        </a>
        <span
          className={styles.underline}
          style={{
            transform: `translateX(${underline.left}px)`,
            width: `${underline.width}px`,
            opacity: underline.opacity,
          }}
        />
      </nav>
      <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className={styles.emailBtn}>
        Email me
      </a>
    </header>
  );
}