"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollTransition.module.css";

export default function ScrollTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.transitionSection}>
      <div className={styles.particles}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }} />
        ))}
      </div>
      <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <span className={styles.greeting}>Hi, I&apos;m</span>
        <span className={styles.role}>Full-Stack &amp; AI Engineer</span>
      </div>
    </section>
  );
}