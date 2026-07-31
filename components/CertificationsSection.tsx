"use client";

import { useEffect, useRef, useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import styles from "./CertificationsSection.module.css";

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gridVisible, setGridVisible] = useState(false);
  const [settled, setSettled] = useState(false); // true once stagger entrance is fully done
  const gridRef = useRef<HTMLDivElement>(null);

  const totalCerts = CERTIFICATIONS.length;
  const totalSkills = new Set(CERTIFICATIONS.flatMap((c) => c.skills)).size;
  const active = activeIndex !== null ? CERTIFICATIONS[activeIndex] : null;

  // Trigger the staggered card animation once the grid scrolls into view
  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.unobserve(node);

          // After the last card's stagger delay + transition finishes,
          // clear the per-card delay so hover transitions stay snappy.
          const totalTime = CERTIFICATIONS.length * 60 + 700; // ms
          setTimeout(() => setSettled(true), totalTime);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [totalCerts]);

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % CERTIFICATIONS.length);
  };

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <section id="certifications" className={styles.certSection}>
      <div className={styles.headerRow}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>PROVEN SKILLS. REAL IMPACT.</span>
          <h2 className={styles.title}>
            Certifications &amp; <span className={styles.titleAccent}>Achievements</span>
          </h2>
          <p className={styles.subtitle}>
            A collection of certifications that validate my skills and commitment to continuous learning.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🏆</span>
            <span className={styles.statNumber}>{totalCerts}+</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🛡️</span>
            <span className={styles.statNumber}>{totalSkills}+</span>
            <span className={styles.statLabel}>Skills Validated</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>✅</span>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Dedication</span>
          </div>
        </div>
      </div>

      <div className={styles.grid} ref={gridRef}>
        {CERTIFICATIONS.map((cert, i) => (
          <button
            key={cert.title}
            className={`${styles.card} ${gridVisible ? styles.cardVisible : ""}`}
            style={{
              transitionDelay: !settled && gridVisible ? `${i * 0.06}s` : "0s",
            }}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${cert.title}`}
          >
            <div className={styles.imageWrap}>
              <img src={cert.image} alt={cert.title} className={styles.cardImage} />
              <div className={styles.imageShine} />
              <span className={styles.expandHint}>🔍 View details</span>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardText}>
                <span className={styles.cardIssuer}>{cert.issuer}</span>
                <span className={styles.cardTitle}>{cert.title}</span>
              </div>
              <span className={styles.verifiedBadge}>✓ Verified</span>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.footerRow}>
        <span className={styles.footerText}>Building Skills, Creating Impact 💜</span>
      </div>

      {active && (
        <div
          className={styles.lightbox}
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous certificate"
          >
            ←
          </button>

          <div
            key={activeIndex}
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxImageWrap}>
              <img src={active.image} alt={active.title} className={styles.lightboxImage} />
            </div>
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxIssuer}>{active.issuer}</span>
              <h3 className={styles.lightboxTitle}>{active.title}</h3>
              <span className={styles.lightboxDate}>{active.date}</span>
              <div className={styles.lightboxSkills}>
                {active.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
              {active.credentialUrl && (
                
                <a
                  href={active.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.verifyLink}
                >
                  Verify Credential ↗
                </a>
              )}
              <span className={styles.lightboxCounter}>
                {activeIndex! + 1} / {CERTIFICATIONS.length}
              </span>
            </div>
          </div>

          <button
            className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next certificate"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}