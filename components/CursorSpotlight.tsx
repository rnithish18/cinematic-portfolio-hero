"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorSpotlight.module.css";

interface Point {
  x: number;
  y: number;
}

const IDLE_DELAY = 3000;
const RING_EASE = 0.2;
const GLASS_EASE = 0.15;
const GLOW_EASE = 0.09;
const ORBIT_SPEED = 0.05;
const SPIN_SPEED = 2.2; // degrees per frame, only applied when NOT hovering

export default function CursorSpotlight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const target = useRef<Point>({ x: 0, y: 0 });
  const ringPos = useRef<Point>({ x: 0, y: 0 });
  const glassPos = useRef<Point>({ x: 0, y: 0 });
  const glowPos = useRef<Point>({ x: 0, y: 0 });
  const magnetTarget = useRef<Point | null>(null);
  const orbitAngle = useRef(0);
  const spinAngle = useRef(0);
  const rafId = useRef<number | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (prefersReducedMotion || isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glass = glassRef.current;
    const orbit = orbitRef.current;
    const glow = glowRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !glass || !orbit || !glow || !label) return;

    const clearIdle = () => {
      [ring, glass, orbit, glow].forEach((el) => el.classList.remove(styles.idle));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        [ring, glass, orbit, glow].forEach((el) => el.classList.add(styles.idle));
      }, IDLE_DELAY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.opacity = magnetTarget.current ? "0" : "1";
      ring.style.opacity = "1";
      glass.style.opacity = "1";
      orbit.style.opacity = magnetTarget.current ? "0" : "1";
      glow.style.opacity = "1";
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      clearIdle();
    };

    const handlePointerLeaveWindow = () => {
      [dot, ring, glass, orbit, glow, label].forEach((el) => {
        el.style.opacity = "0";
      });
    };

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor-label]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      magnetTarget.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const capsuleW = Math.min(rect.width + 24, 220);
      const capsuleH = 44;

      ring.style.width = `${capsuleW}px`;
      ring.style.height = `${capsuleH}px`;
      ring.style.borderRadius = "999px";
      ring.classList.add(styles.ringActive);

      glass.style.width = `${capsuleW}px`;
      glass.style.height = `${capsuleH}px`;
      glass.style.borderRadius = "999px";

      orbit.style.opacity = "0"; // hide orbit particle while morphed, avoids clutter

      glow.style.width = "160px";
      glow.style.height = "160px";
      dot.style.opacity = "0";

      label.textContent = el.dataset.cursorLabel ?? "";
      label.style.opacity = "1";
      label.style.transform = `translate3d(${magnetTarget.current.x}px, ${magnetTarget.current.y}px, 0) translate(-50%, -50%) scale(1)`;
    };

    const handleOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor-label]");
      if (!el) return;
      magnetTarget.current = null;

      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderRadius = "50%";
      ring.classList.remove(styles.ringActive);

      glass.style.width = "22px";
      glass.style.height = "22px";
      glass.style.borderRadius = "50%";

      orbit.style.opacity = "1";

      glow.style.width = "90px";
      glow.style.height = "90px";
      label.style.opacity = "0";
    };

    const handleDown = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = styles.ripple;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.opacity = "0";
        ripple.style.transform = "translate(-50%, -50%) scale(6)";
      });
      setTimeout(() => ripple.remove(), 550);

      for (let i = 0; i < 5; i++) {
        const particle = document.createElement("div");
        particle.className = styles.burstParticle;
        const angle = (Math.PI * 2 * i) / 5;
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.setProperty("--dx", `${Math.cos(angle) * 30}px`);
        particle.style.setProperty("--dy", `${Math.sin(angle) * 30}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
      }

      ring.classList.add(styles.ringCompress);
      setTimeout(() => ring.classList.remove(styles.ringCompress), 180);
    };

    const loop = () => {
      const goal = magnetTarget.current ?? target.current;

      ringPos.current.x += (goal.x - ringPos.current.x) * RING_EASE;
      ringPos.current.y += (goal.y - ringPos.current.y) * RING_EASE;

      // Only spin the ring border while idle-cruising, not while morphed into a capsule
      if (!magnetTarget.current) {
        spinAngle.current = (spinAngle.current + SPIN_SPEED) % 360;
      }
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) rotate(${spinAngle.current}deg)`;

      glassPos.current.x += (goal.x - glassPos.current.x) * GLASS_EASE;
      glassPos.current.y += (goal.y - glassPos.current.y) * GLASS_EASE;
      glass.style.transform = `translate3d(${glassPos.current.x}px, ${glassPos.current.y}px, 0) translate(-50%, -50%)`;

      glowPos.current.x += (goal.x - glowPos.current.x) * GLOW_EASE;
      glowPos.current.y += (goal.y - glowPos.current.y) * GLOW_EASE;
      glow.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;

      if (!magnetTarget.current) {
        orbitAngle.current += ORBIT_SPEED;
        const radius = 22;
        const ox = glassPos.current.x + Math.cos(orbitAngle.current) * radius;
        const oy = glassPos.current.y + Math.sin(orbitAngle.current) * radius;
        orbit.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) handlePointerLeaveWindow();
    });
    document.addEventListener("mouseover", handleOver, true);
    document.addEventListener("mouseout", handleOut, true);
    window.addEventListener("mousedown", handleDown);
    rafId.current = requestAnimationFrame(loop);
    clearIdle();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseover", handleOver, true);
      document.removeEventListener("mouseout", handleOut, true);
      window.removeEventListener("mousedown", handleDown);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div ref={glassRef} className={styles.glass} aria-hidden="true" />
      <div ref={orbitRef} className={styles.orbit} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={labelRef} className={styles.label} aria-hidden="true" />
    </>
  );
}