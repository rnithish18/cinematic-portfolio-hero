"use client";

import { useEffect, useState } from "react";
import styles from "./GitHubContributions.module.css";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  totalContributions: number;
  weeks: Week[];
}

export default function GitHubContributions() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json.error) {
          setError(true);
          return;
        }
        setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className={styles.card}>
        <p className={styles.errorText}>Couldn&apos;t load GitHub activity.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.card}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>GITHUB ACTIVITY</span>
        <span className={styles.total}>
          {data.totalContributions} contributions in the last year
        </span>
      </div>

      <div className={styles.grid}>
        {data.weeks.map((week, wi) => (
          <div key={wi} className={styles.weekCol}>
            {week.contributionDays.map((day) => (
              <div
                key={day.date}
                className={styles.day}
                style={{
                  backgroundColor:
                    day.contributionCount === 0 ? "rgba(255,255,255,0.06)" : day.color,
                }}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        ))}
      </div>

      {hovered && (
        <div className={styles.tooltip}>
          {hovered.contributionCount} contribution
          {hovered.contributionCount === 1 ? "" : "s"} on{" "}
          {new Date(hovered.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      )}
    </div>
  );
}