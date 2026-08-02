"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CERTIFICATIONS } from "@/lib/data";
import CountUp from "@/components/CountUp";
import styles from "./CertificationsSection.module.css";

export default function CertificationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const rafId = useRef<number | null>(null);

  const total = CERTIFICATIONS.length;
  const totalSkills = new Set(CERTIFICATIONS.flatMap((c) => c.skills)).size;
  const selected = selectedIndex !== null ? CERTIFICATIONS[selectedIndex] : null;

  // Needed so createPortal only runs client-side (document isn't available during SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotlightRef.current;
    if (!section || !spot) return;

    let pendingX = 0;
    let pendingY = 0;

    const apply = () => {
      spot.style.transform = `translate3d(${pendingX - 300}px, ${pendingY - 300}px, 0)`;
      rafId.current = null;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      pendingX = e.clientX - rect.left;
      pendingY = e.clientY - rect.top;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(apply);
      }
    };

    section.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      section.removeEventListener("mousemove", handleMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const handleLeave = () => {
      btn.style.transform = "translate3d(0, 0, 0)";
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 7 + Math.random() * 8,
      })),
    []
  );

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + total) % total);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % total);
  };

  // Fast fade-out close — used by close button, backdrop click, and Escape
  const closeModal = () => {
    if (selectedIndex === null || closing) return;
    setClosing(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setClosing(false);
    }, 150);
  };

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
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
  }, [selectedIndex]);

  const modalNode = selected && (
    <div
      className={`${styles.modalOverlay} ${closing ? styles.modalClosing : ""}`}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
    >
      <button className={styles.modalClose} onClick={closeModal} aria-label="Close">
        ✕
      </button>

      <button
        className={`${styles.modalArrow} ${styles.modalArrowLeft}`}
        onClick={(e) => {
          e.stopPropagation();
          showPrev();
        }}
        aria-label="Previous certificate"
      >
        ←
      </button>

      <div
        key={selectedIndex}
        className={`${styles.modalContent} ${closing ? styles.modalContentClosing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalImageWrap}>
          <img src={selected.image} alt={selected.title} className={styles.modalImage} />
        </div>
        <div className={styles.modalInfo}>
          <span className={styles.modalIssuer}>{selected.issuer}</span>
          <h3 className={styles.modalTitle}>{selected.title}</h3>
          <span className={styles.modalDate}>{selected.date}</span>

          <div className={styles.modalSkills}>
            {selected.skills.map((skill) => (
              <span key={skill} className={styles.skillPill}>
                {skill}
              </span>
            ))}
          </div>

          <div className={styles.modalActions}>
            
            <a
              href={selected.image}
              download={`${selected.title.replace(/\s+/g, "-")}.jpg`}
              className={styles.downloadBtn}
            >
              ⬇ Download Certificate
            </a>
            {selected.credentialUrl && (
              
              <a
                href={selected.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.verifyBtn}
              >
                Verify Credential ↗
              </a>
            )}
          </div>

          <span className={styles.modalCounter}>
            {selectedIndex! + 1} / {total}
          </span>
        </div>
      </div>

      <button
        className={`${styles.modalArrow} ${styles.modalArrowRight}`}
        onClick={(e) => {
          e.stopPropagation();
          showNext();
        }}
        aria-label="Next certificate"
      >
        →
      </button>
    </div>
  );

  return (
    <section id="certifications" className={styles.certSection} ref={sectionRef}>
      <div className={styles.spotlight} ref={spotlightRef} />
      <div className={styles.noiseOverlay} />
      <div className={styles.particleField}>
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.headerRow}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>PROVEN SKILLS. REAL IMPACT.</span>
          <h2 className={styles.title}>
            Certifications &amp;
            <br />
            <span className={styles.titleAccent}>Achievements</span>
          </h2>
          <p className={styles.subtitle}>
            A collection of certifications validating my technical expertise and continuous
            learning journey.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🏆</span>
            <span className={styles.statNumber}>
              <CountUp end={total} suffix="+" />
            </span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🛡️</span>
            <span className={styles.statNumber}>
              <CountUp end={totalSkills} suffix="+" />
            </span>
            <span className={styles.statLabel}>Skills Validated</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🎯</span>
            <span className={styles.statNumber}>
              <CountUp end={100} suffix="%" />
            </span>
            <span className={styles.statLabel}>Dedication</span>
          </div>
        </div>
      </div>

      <div className={styles.grid} ref={gridRef}>
        {CERTIFICATIONS.map((cert, i) => {
          const isExpanded = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;
          return (
            <div
              key={cert.title}
              className={`${styles.certCard} ${isExpanded ? styles.expanded : ""} ${
                isDimmed ? styles.dimmed : ""
              } ${cardsVisible ? styles.cardVisible : ""}`}
              style={{ transitionDelay: cardsVisible ? `${i * 0.06}s` : "0s" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open full certificate: ${cert.title}`}
            >
              <span className={styles.cardGlow} aria-hidden="true" />

              <div className={styles.cardTop}>
                <div className={styles.logoCircle}>{cert.issuer.charAt(0)}</div>
                <div className={styles.cardMeta}>
                  <span className={styles.certName}>{cert.title}</span>
                  <span className={styles.certIssuer}>{cert.issuer}</span>
                </div>
                <div className={styles.metaRight}>
                  <span className={styles.verifiedBadge}>✔ Verified</span>
                  <span className={styles.certYear}>{cert.date}</span>
                </div>
              </div>

              <div className={styles.imageWrap}>
                <img src={cert.image} alt={cert.title} className={styles.certImage} />
                <div className={styles.blurLayer} />
                <div className={styles.shine} />
              </div>

              <div className={styles.expandPanel}>
                <div className={styles.skillRow}>
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  className={styles.viewFullBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                >
                  View Full Certificate →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footerRow}>
        <a href="#certifications" ref={ctaRef} className={styles.ctaBtn}>
          View All Certifications →
        </a>
      </div>

      {mounted && modalNode && createPortal(modalNode, document.body)}
    </section>
  );
}