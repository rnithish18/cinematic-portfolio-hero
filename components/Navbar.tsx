"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [timeString, setTimeString] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    encodeURIComponent(
      "rnithish18122006@gmail.com,rnithish181206@gmail.com"
    );

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.timeBadge}>
        INDIA TIME – <span>{timeString || "10:27:36 PM"}</span>
      </div>

      <nav className={styles.navLinks}>
        <a href="#home" onClick={scrollToTop}>HOME</a>
        <a href="#about">ABOUT</a>
        <a href="#projects">PROJECTS</a>
        <a href="#certifications">CERTIFICATIONS</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className={styles.emailBtn}>
        Email me
      </a>
    </header>
  );
}