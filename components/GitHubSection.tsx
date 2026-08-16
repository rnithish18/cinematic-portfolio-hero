"use client";

import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaStar, FaCodeBranch, FaExternalLinkAlt, FaUsers, FaBook } from "react-icons/fa";
import GitHubContributions from "@/components/GitHubContributions";
import styles from "./GitHubSection.module.css";

const GITHUB_USERNAME = "rnithish18";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#264de4",
  Java: "#ea2d2e",
};

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");

        const profileData: GitHubProfile = await profileRes.json();
        const reposData: Repo[] = await reposRes.json();

        const sorted = [...reposData]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        if (!cancelled) {
          setProfile(profileData);
          setRepos(sorted);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className={styles.githubSection}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.eyebrow}>OPEN SOURCE</span>
        <h2 className={styles.heading}>
          GitHub <span className={styles.headingAccent}>Activity</span>
        </h2>
        <p className={styles.subtitle}>
          Live from GitHub — repositories, contributions, and what I&apos;ve been building.
        </p>
      </div>

      {status === "loading" && (
        <div className={styles.statusMessage}>Loading GitHub activity…</div>
      )}

      {status === "error" && (
        <div className={styles.statusMessage}>
          Couldn&apos;t load live data right now.{" "}
          
        <a    href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View profile directly on GitHub →
          </a>
        </div>
      )}

      {status === "ready" && profile && (
        <>
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <FaBook className={styles.statIcon} />
              <span className={styles.statNumber}>{profile.public_repos}</span>
              <span className={styles.statLabel}>Public Repos</span>
            </div>
            <div className={styles.statCard}>
              <FaUsers className={styles.statIcon} />
              <span className={styles.statNumber}>{profile.followers}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statCard}>
              <SiGithub className={styles.statIcon} />
              <span className={styles.statNumber}>{profile.following}</span>
              <span className={styles.statLabel}>Following</span>
            </div>
          </div>

          <div className={styles.contributionWrap}>
            <GitHubContributions />
          </div>

          <div className={styles.repoGrid}>
            {repos.map((repo) => (
              
            <a    key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
              >
                <div className={styles.repoTop}>
                  <span className={styles.repoName}>{repo.name}</span>
                  <FaExternalLinkAlt className={styles.repoLinkIcon} />
                </div>
                <p className={styles.repoDescription}>
                  {repo.description ?? "No description provided."}
                </p>
                <div className={styles.repoMeta}>
                  {repo.language && (
                    <span className={styles.repoLanguage}>
                      <span
                        className={styles.langDot}
                        style={{
                          background: LANGUAGE_COLORS[repo.language] ?? "#888",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.repoStat}>
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className={styles.repoStat}>
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      <div className={styles.footerRow}>
        
        <a  href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          <SiGithub /> View Full GitHub Profile
        </a>
      </div>
    </section>
  );
}