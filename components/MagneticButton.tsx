"use client";
import { useEffect, useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the cursor. Default 0.35 (matches Certifications CTA). */
  strength?: number;
  as?: "div" | "span";
}

/**
 * Wraps any element (typically a link or button) with a magnetic
 * mouse-follow effect: the element subtly moves toward the cursor
 * while hovered, and springs back to rest on mouse leave.
 *
 * Usage:
 *   <MagneticButton>
 *     <a href="#projects" className={styles.viewProjectsBtn}>View Projects ↗</a>
 *   </MagneticButton>
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  as = "div",
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    const handleLeave = () => {
      node.style.transform = "translate3d(0, 0, 0)";
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  const Tag = as;

  return (
    <Tag
      ref={wrapperRef as any}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.15s ease-out" }}
    >
      {children}
    </Tag>
  );
}