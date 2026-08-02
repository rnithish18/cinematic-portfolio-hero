"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorSpotlight.module.css";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty(
          "--spotlight-x",
          `${currentPos.current.x}px`
        );
        spotlightRef.current.style.setProperty(
          "--spotlight-y",
          `${currentPos.current.y}px`
        );
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={spotlightRef} className={styles.spotlight} aria-hidden="true" />
  );
}