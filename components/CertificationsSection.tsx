"use client";

import { useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import styles from "./CertificationsSection.module.css";

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex !== null ? CERTIFICATIONS[activeIndex] : null;

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % CERTIFICATIONS.length);
  };

  return (
    <section id="certifications" className={styles.certSection}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>VERIFIED CREDENTIALS</span>
        <h2 className={styles.title}>Certifications &amp; Achievements</h2>
      </div>

      <div className={styles.wall}>
        {CERTIFICATIONS.map((cert, i) => (
          <button
            key={cert.title}
            className={styles.wallItem}
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${cert.title}`}
          >
            <img src={cert.image} alt={cert.title} className={styles.wallImage} />
            <div className={styles.wallOverlay}>
              <span className={styles.wallIssuer}>{cert.issuer}</span>
              <span className={styles.wallTitle}>{cert.title}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className={styles.lightbox} onClick={() => setActiveIndex(null)}>
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
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.title}
              className={styles.lightboxImage}
            />
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
                
                 <a href={active.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.verifyLink}
                >
                  Verify Credential ↗
                </a>
              )}
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