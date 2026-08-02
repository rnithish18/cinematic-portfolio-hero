"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorSpotlight.module.css";

interface Particle {
  el: HTMLDivElement;
  born: number;
}

export default function CursorSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const SPAWN_INTERVAL = 24;
    const LIFETIME = 650;

    const spawnParticle = (x: number, y: number) => {
      const el = document.createElement("div");
      el.className = styles.particle;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      container.appendChild(el);

      requestAnimationFrame(() => {
        el.style.opacity = "0";
        el.style.transform = "translate(-50%, -50%) scale(2.6)";
      });

      particlesRef.current.push({ el, born: performance.now() });
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < SPAWN_INTERVAL) return;
      lastSpawnRef.current = now;
      spawnParticle(e.clientX, e.clientY);
    };

    const cleanupInterval = setInterval(() => {
      const now = performance.now();
      particlesRef.current = particlesRef.current.filter((p) => {
        if (now - p.born > LIFETIME) {
          p.el.remove();
          return false;
        }
        return true;
      });
    }, 300);

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      clearInterval(cleanupInterval);
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className={styles.trailLayer} aria-hidden="true" />;
}