"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";
import MagneticButton from "./MagneticButton";

export default function VideoIntro({
  videoSrc = "/hero-video.mp4",
  nextSectionId = "projects",
}: {
  videoSrc?: string;
  nextSectionId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const frameVideoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndRef = useRef<HTMLButtonElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const hasInteractedRef = useRef(false);

  // Autoplay both layers muted (required by browsers), keep them in sync.
  useEffect(() => {
    const ambient = ambientVideoRef.current;
    const frame = frameVideoRef.current;
    if (!ambient || !frame) return;

    ambient.muted = true;
    ambient.volume = 0;
    frame.muted = true;
    frame.volume = 0;

    Promise.all([ambient.play(), frame.play()]).catch((err) =>
      console.log("Autoplay prevented:", err)
    );

    const resync = () => {
      if (Math.abs(ambient.currentTime - frame.currentTime) > 0.35) {
        ambient.currentTime = frame.currentTime;
      }
    };
    frame.addEventListener("timeupdate", resync);
    return () => frame.removeEventListener("timeupdate", resync);
  }, []);

  // Video plays once, then auto-scroll to the next section when it ends.
  useEffect(() => {
    const frame = frameVideoRef.current;
    if (!frame) return;
    const handleEnded = () => scrollToNext();
    frame.addEventListener("ended", handleEnded);
    return () => frame.removeEventListener("ended", handleEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableSound = useCallback(() => {
    if (hasInteractedRef.current) return;
    hasInteractedRef.current = true;

    const frame = frameVideoRef.current;
    if (frame) {
      frame.muted = false;
      frame.volume = 1;
      frame.play().catch((e) => console.error("Play failed:", e));
    }
    setIsMuted(false);
    setHasInteracted(true);
  }, []);

  // First click anywhere on the page unmutes and enables sound.
  useEffect(() => {
    const handleFirstClick = () => enableSound();
    window.addEventListener("click", handleFirstClick, { once: true });
    return () => window.removeEventListener("click", handleFirstClick);
  }, [enableSound]);

  // Auto-hide the bottom controls after 3s of no mouse movement.
  useEffect(() => {
    const resetHideTimer = () => {
      setControlsVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 3000);
    };

    resetHideTimer();
    window.addEventListener("mousemove", resetHideTimer);
    window.addEventListener("touchstart", resetHideTimer);

    return () => {
      window.removeEventListener("mousemove", resetHideTimer);
      window.removeEventListener("touchstart", resetHideTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(containerRef.current, { opacity: 1, duration: 1 });
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
      tl.fromTo(
        [firstNameRef.current, lastNameRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
        "-=0.5"
      );
      tl.fromTo(
        roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
      tl.fromTo(
        scrollIndRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    enableSound();
    const ambient = ambientVideoRef.current;
    const frame = frameVideoRef.current;
    if (!ambient || !frame) return;

    if (isPlaying) {
      ambient.pause();
      frame.pause();
    } else {
      ambient.play();
      frame.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!hasInteractedRef.current) {
      enableSound();
      return;
    }
    const frame = frameVideoRef.current;
    if (!frame) return;

    const nextMute = !isMuted;
    frame.muted = nextMute;
    frame.volume = nextMute ? 0 : 1;
    if (!nextMute) {
      frame.play().catch((e) => console.error("Play failed:", e));
    }
    setIsMuted(nextMute);
  };

  const scrollToNext = () => {
    const el = document.getElementById(nextSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <video
        ref={ambientVideoRef}
        className={styles.ambientVideo}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={styles.frameWrapper}>
        <video
          ref={frameVideoRef}
          className={styles.frameVideo}
          autoPlay
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div className={styles.gradientOverlay} />
      <CinematicLayer />

      <header className={styles.contentWrapper}>
        <span ref={taglineRef} className={styles.tagline}>
          PORTFOLIO 2026
        </span>
        <h1 className={styles.name}>
          <span ref={firstNameRef} className={styles.nameSpan}>
            NITHISH
          </span>
          <span ref={lastNameRef} className={styles.nameSpan}>
            R
          </span>
        </h1>
        <p ref={roleRef} className={styles.roleSubtitle}>
          Full-Stack &amp; AI Engineer building intelligent platforms,
          diagnostic tools, and high-performance web applications.
        </p>
      </header>

      {!hasInteracted && (
        <div className={styles.soundHint}>Click anywhere to enable sound</div>
      )}

      <div
        className={`${styles.bottomControls} ${
          controlsVisible ? styles.controlsVisible : styles.controlsHidden
        }`}
      >
        <button className={styles.controlBtn} onClick={togglePlay}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button className={styles.controlBtn} onClick={toggleMute}>
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      </div>

      <MagneticButton strength={0.25}>
        <button
          ref={scrollIndRef}
          className={styles.scrollIndicator}
          onClick={scrollToNext}
          aria-label="Scroll to projects section"
        >
          <span className={styles.scrollText}>SCROLL</span>
          <div className={styles.scrollLineContainer}>
            <div className={styles.scrollLinePulse} />
          </div>
        </button>
      </MagneticButton>
    </section>
  );
}