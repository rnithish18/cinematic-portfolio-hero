"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

function formatTimecode(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function VideoIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const [timecode, setTimecode] = useState("00:00");

  // ---- GSAP entrance timeline ------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "var(--ease-cinematic)" as unknown as string },
      });

      tl.fromTo(
        `.${styles.ambient}, .${styles.vignette}`,
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: "power2.out" }
      )
        .fromTo(
          `.${styles.frame}`,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
          "-=1.1"
        )
        .fromTo(
          `.${styles.eyebrow}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        )
        .fromTo(
          `.${styles.nameLine}`,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 },
          "-=0.45"
        )
        .fromTo(
          `.${styles.subtitle}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          `.${styles.controls}`,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          `.${styles.scrollIndicator}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ---- Try to start the intro playing WITH sound ------------------------
  // Browsers may block unmuted autoplay without prior user interaction on
  // the page — if that happens, fall back to a muted autoplay and show the
  // "tap for sound" hint so the person can turn it on themselves. Either
  // way, playback starts automatically; sound is what's conditional.
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    let hintTimer: ReturnType<typeof setTimeout> | undefined;

    fg.muted = false;
    const playAttempt = fg.play();

    if (playAttempt !== undefined) {
      playAttempt
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          fg.muted = true;
          setIsMuted(true);
          fg.play().catch(() => {});
          setShowSoundHint(true);
          hintTimer = setTimeout(() => setShowSoundHint(false), 4500);
        });
    }

    bg.play().catch(() => {});

    return () => {
      if (hintTimer) clearTimeout(hintTimer);
    };
  }, []);

  // ---- Unmute on the first interaction anywhere on the page --------------
  // Browsers hard-block unmuted autoplay until the visitor has interacted
  // with the page at all — no code can override that. As the closest thing
  // to "turn on automatically," the very first click, key press, scroll, or
  // touch anywhere (not just the mute button) silently switches sound on,
  // so most visitors never actually have to find and tap the hint.
  useEffect(() => {
    if (!isMuted) return;

    const unmuteOnFirstInteraction = () => {
      const fg = fgVideoRef.current;
      if (!fg) return;
      fg.muted = false;
      fg.play()
        .then(() => {
          setIsMuted(false);
          setShowSoundHint(false);
        })
        .catch(() => {
          /* still blocked for some reason — leave muted */
        });
    };

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
      "wheel",
    ];
    events.forEach((evt) =>
      window.addEventListener(evt, unmuteOnFirstInteraction, {
        once: true,
        passive: true,
      })
    );

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, unmuteOnFirstInteraction)
      );
    };
  }, [isMuted]);

  // ---- After the first full play-through: pause + auto-scroll down -------
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const onEnded = () => {
      setIsPlaying(false);
      document
        .getElementById("next-section")
        ?.scrollIntoView({ behavior: "smooth" });
    };
    fg.addEventListener("ended", onEnded);
    return () => fg.removeEventListener("ended", onEnded);
  }, []);

  // ---- Timecode ticker synced to the foreground video -------------------
  useEffect(() => {
    const video = fgVideoRef.current;
    if (!video) return;
    const onTimeUpdate = () => setTimecode(formatTimecode(video.currentTime));
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // ---- Controls -----------------------------------------------------
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      if (fg.ended) {
        fg.currentTime = 0;
        bg.currentTime = 0;
      }
      fg.play();
      bg.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    setShowSoundHint(false);
  }, []);

  const scrollToNext = useCallback(() => {
    document
      .getElementById("next-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={rootRef} className={styles.hero}>
      {/* Blurred ambient duplicate, bleeds color beyond the framed video */}
      <video
        ref={bgVideoRef}
        className={styles.ambient}
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        preload="auto"
      />

      {/* Cinematic gradient overlays for legibility and mood */}
      <div className={styles.vignette} aria-hidden="true" />

      {/* Framed foreground video */}
      <div className={styles.frame}>
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src="/videos/hero.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
        />
        <div className={styles.frameScrim} aria-hidden="true" />
        <div className={styles.frameRim} aria-hidden="true" />
      </div>

      {/* Floating bokeh particles */}
      <CinematicLayer />

      {/* Content overlay */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          <span className={styles.recDot} aria-hidden="true" />
          REC &nbsp;·&nbsp; {timecode} &nbsp;·&nbsp; CSE Student &amp; Full-Stack Developer
        </span>

        <h1 className={styles.name}>
          <span className={styles.nameLine}>Nithish</span>
          <span className={styles.nameLine}>R</span>
        </h1>

        <p className={styles.subtitle}>
          I bridge backend engineering with responsive, considered
          frontends — building full-stack platforms and ML-backed tools
          that turn real-world problems into software people actually
          enjoy using.
        </p>
      </div>

      {/* Player controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.glassButton}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="3.4" height="12" rx="1" fill="currentColor" />
              <rect x="9.6" y="2" width="3.4" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.6L13 8L4 13.4V2.6Z" fill="currentColor" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={styles.glassButton}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path
                d="M2 6H4.6L8.4 3V13L4.6 10H2V6Z"
                fill="currentColor"
              />
              <path
                d="M11 5.5L14.5 10.5M14.5 5.5L11 10.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path
                d="M2 6H4.6L8.4 3V13L4.6 10H2V6Z"
                fill="currentColor"
              />
              <path
                d="M11 5.2C12 6.1 12 9.9 11 10.8M12.8 3.4C15 5.3 15 10.7 12.8 12.6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {showSoundHint && (
          <button
            type="button"
            className={styles.soundHint}
            onClick={toggleMute}
          >
            <span className={styles.soundHintPulse} />
            Tap for sound
          </button>
        )}
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>
    </section>
  );
}
