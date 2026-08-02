"use client";

import { FEATURED_PROJECTS } from "@/lib/data";
import TiltCard from "@/components/TiltCard";
import styles from "./ProjectsShowcase.module.css";

export default function ProjectsShowcase() {
  return (
    <section id="projects" className={styles.showcaseSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.headerLabel}>PROJECTS</span>

        
        <a  href="https://github.com/rnithish18"
          target="_blank"
          rel="noreferrer"
          className={styles.allProjectsBtn}
        >
          VIEW ALL PROJECTS ↗
        </a>
      </div>
      <div className={styles.projectsList}>
        {FEATURED_PROJECTS.map((project) => (
          <article key={project.id} className={styles.slideCard}>
            <span className={styles.watermarkNumber}>
              {project.number.split(" / ")[0]}
            </span>
            <div className={styles.contentGrid}>
              <div className={styles.leftCol}>
                <span className={styles.categoryBadge}>{project.category}</span>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>

                
                <a  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.demoBtn}
                >
                  LIVE DEMO ↗
                </a>
                {project.videoUrl && (
                  
                  <a  href={project.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.videoBtn}
                  >
                    WATCH DEMO VIDEO ↗
                  </a>
                )}
              </div>
              <div className={styles.rightCol}>
                <div className={styles.counter}>{project.number}</div>

                <TiltCard className={styles.imagePreview} maxTilt={8} scale={1.04}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.previewImage}
                  />
                </TiltCard>

                <p className={styles.description}>{project.description}</p>
                <div className={styles.stackPills}>
                  {project.stack.map((tech) => (
                    <span key={tech} className={styles.pill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}