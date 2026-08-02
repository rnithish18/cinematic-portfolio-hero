import Link from "next/link";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import styles from "./LeetCodeSection.module.css";

const USERNAME = "O7WZ2gofuH";

export default async function LeetCodeSection() {
  const stats = await fetchLeetCodeStats(USERNAME);

  if (!stats) {
    return (
      <section id="leetcode" className={styles.section}>
        <p className={styles.errorText}>Couldn&apos;t load LeetCode stats right now.</p>
      </section>
    );
  }

  const solvedPct = stats.totalQuestions
    ? Math.round((stats.totalSolved / stats.totalQuestions) * 100)
    : 0;

  const statBoxes = [
    { key: "easy", icon: "🚀", value: stats.easySolved, label: "Easy", spark: "0,20 8,14 16,17 24,9 32,12 40,4" },
    { key: "medium", icon: "⚡", value: stats.mediumSolved, label: "Medium", spark: "0,16 8,18 16,10 24,13 32,6 40,3" },
    { key: "hard", icon: "🏔️", value: stats.hardSolved, label: "Hard", spark: "0,10 8,15 16,8 24,17 32,11 40,5" },
  ];

  return (
    <section id="leetcode" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          LIVE FROM LEETCODE
        </span>
        <h2 className={styles.title}>
          Problem <span className={styles.titleAccent}>Solving</span>
        </h2>
        <p className={styles.subtitle}>
          Real-time stats pulled directly from my LeetCode profile.
        </p>
        <span className={styles.underline} />
      </div>

      <div className={styles.card}>
        <div className={styles.decor} aria-hidden="true">
          <div className={styles.decorRing} />
          <div className={styles.decorIcon}>{"</>"}</div>
          <div className={styles.decorBars}>
            <span /><span /><span /><span /><span />
          </div>
        </div>

        <div className={styles.topRow}>
          <div className={styles.ring} style={{ ["--pct" as any]: solvedPct }}>
            <div className={styles.ringInner}>
              <span className={styles.ringNumber}>{stats.totalSolved}</span>
              <span className={styles.ringLabel}>Solved</span>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {statBoxes.map((box) => (
              <div key={box.key} className={styles.statBox}>
                <span className={styles.statIcon} data-difficulty={box.key}>
                  {box.icon}
                </span>
                <span className={styles.statValue} data-difficulty={box.key}>
                  {box.value}
                </span>
                <span className={styles.statLabel}>{box.label}</span>
                <svg className={styles.spark} viewBox="0 0 40 24" preserveAspectRatio="none">
                  <polyline points={box.spark} data-difficulty={box.key} />
                </svg>
              </div>
            ))}

            <div className={styles.statBox}>
              <span className={styles.statIcon} data-difficulty="streak">
                🔥
              </span>
              <span className={styles.statValue} data-difficulty="streak">
                {stats.streak}
              </span>
              <span className={styles.statLabel}>Day Streak</span>
            </div>
          </div>
        </div>

        <div className={styles.footerRow}>
          <div className={styles.footerItem}>
            <span className={styles.footerIcon}>🎯</span>
            <div>
              <span className={styles.footerTitle}>Keep Solving</span>
              <span className={styles.footerSub}>Consistency builds mastery.</span>
            </div>
          </div>

          <div className={styles.footerItem}>
            <span className={styles.footerIcon}>📊</span>
            <div>
              <span className={styles.footerTitle}>{solvedPct}% Complete</span>
              <span className={styles.footerSub}>
                Of {stats.totalQuestions} problems
              </span>
            </div>
          </div>

          <Link href="/leetcode" className={styles.viewMore}>
            View Full Stats <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}