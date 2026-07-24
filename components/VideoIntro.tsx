"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

// Same clip, used twice: a blurred, scaled-up "ambient" copy fills the
// full viewport behind everything, and a sharp, inset "frame" copy sits
// on top with rounded corners — the Apple TV/Music style treatment.
const VIDEO_SRC = "/videos/hero.mp4";

export default function VideoIntro({
  nextSectionId = "projects",
}: {
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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

    // Keep the ambient copy loosely synced to the frame copy so the blur
    // doesn't visibly drift out of phase over a long loop.
    const resync = () => {
      if (Math.abs(ambient.currentTime - frame.currentTime) > 0.35) {
        ambient.currentTime = frame.currentTime;
      }
    };
    frame.addEventListener("timeupdate", resync);
    return () => frame.removeEventListener("timeupdate", resync);
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

  // Audio only ever plays from the sharp foreground copy — the ambient
  // background copy stays muted at all times, otherwise you'd get doubled
  // audio.
  const toggleMute = () => {
    const frame = frameVideoRef.current;
    if (!frame) return;

    const nextMute = !isMuted;
    frame.muted = nextMute;
    frame.volume = nextMute ? 0 : 1;
    if (!nextMute) {
      frame
        .play()
        .then(() => console.log("Audio active"))
        .catch((e) => console.error("Play failed:", e));
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
        loop
        muted
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className={styles.frameWrapper}>
        <video
          ref={frameVideoRef}
          className={styles.frameVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={VIDEO_SRC} type="video/mp4" />
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

      <div className={styles.bottomControls}>
        <button className={styles.controlBtn} onClick={togglePlay}>
          {isPlaying ? "⏸ Pause Video" : "▶ Play Video"}
        </button>
        <button className={styles.controlBtn} onClick={toggleMute}>
          {isMuted ? "🔊 Unmute Audio" : "🔇 Mute Audio"}
        </button>
      </div>

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
    </section>
  );
}
