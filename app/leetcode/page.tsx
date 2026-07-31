import { fetchLeetCodeStats } from "@/lib/leetcode";
import styles from "./page.module.css";
import ScrollReveal from "@/components/ScrollReveal";

const USERNAME = "O7WZ2gofuH";
export const revalidate = 3600;

export const metadata = {
  title: "LeetCode Stats | Nithish R",
};

function buildHeatmap(calendar: Record<string, number>) {
  const oneDay = 86400;
  const todayIdx = Math.floor(Date.now() / 1000 / oneDay);
  const days: { idx: number; count: number }[] = [];
  for (let i = 111; i >= 0; i--) {
    const idx = todayIdx - i;
    days.push({ idx, count: calendar[String(idx * oneDay)] ?? 0 });
  }
  const weeks: { idx: number; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

function levelForCount(count: number) {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function timeAgo(ts: number) {
  const diff = Date.now() / 1000 - ts;
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export default async function LeetCodePage() {
  const stats = await fetchLeetCodeStats(USERNAME);

  if (!stats) {
    return (
      <main className={styles.page}>
        <p className={styles.errorText}>Couldn&apos;t load LeetCode stats right now.</p>
      </main>
    );
  }

  const weeks = buildHeatmap(stats.calendar);
  const solvedPct = stats.totalQuestions
    ? Math.round((stats.totalSolved / stats.totalQuestions) * 100)
    : 0;

  const bars = [
    { label: "Easy", solved: stats.easySolved, total: stats.easyTotal, color: "#4ade80" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.mediumTotal, color: "#fbbf24" },
    { label: "Hard", solved: stats.hardSolved, total: stats.hardTotal, color: "#f87171" },
  ];

  const points = stats.progressPoints;
  const maxVal = Math.max(...points.map((p) => p.value), 1);
  const chartW = 640;
  const chartH = 180;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * chartW;
    const y = chartH - (p.value / maxVal) * chartH;
    return `${x},${y}`;
  });
  const linePath = "M" + coords.join(" L");
  const areaPath = `${linePath} L${chartW},${chartH} L0,${chartH} Z`;

  const badges = [
    { icon: "🔥", label: "Streak master", sub: `${stats.streak} days`, active: stats.streak >= 7 },
    { icon: "💻", label: "Problem solver", sub: `${stats.totalSolved}+ solved`, active: stats.totalSolved >= 100 },
    { icon: "🏆", label: "Contestant", sub: `${stats.contestsAttended} contests`, active: stats.contestsAttended > 0 },
    { icon: "🎯", label: "Consistency", sub: "Active week", active: stats.streak >= 3 },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>LIVE FROM LEETCODE</span>
        <h1 className={styles.title}>
          Problem Solving <span className={styles.titleAccent}>Journey</span>
        </h1>
        <p className={styles.subtitle}>Pulled live from leetcode.com/u/{stats.username}</p>
      </div>

      <ScrollReveal direction="up">
        <div className={styles.topGrid}>
          <div className={styles.ringCard}>
            <div className={styles.ring} style={{ ["--pct" as any]: solvedPct }}>
              <div className={styles.ringInner}>
                <span className={styles.ringNumber}>{stats.totalSolved}</span>
                <span className={styles.ringLabel}>/ {stats.totalQuestions}</span>
              </div>
            </div>
            <span className={styles.ringPct}>{solvedPct}% complete</span>
          </div>

          <div className={styles.miniStats}>
            <div className={styles.miniCard}>
              <span className={styles.miniIcon}>🌐</span>
              <span className={styles.miniLabel}>Global ranking</span>
              <span className={styles.miniValue}>{stats.ranking ? `#${stats.ranking.toLocaleString()}` : "—"}</span>
            </div>
            <div className={styles.miniCard}>
              <span className={styles.miniIcon}>🔥</span>
              <span className={styles.miniLabel}>Day streak</span>
              <span className={styles.miniValue}>{stats.streak}</span>
            </div>
            <div className={styles.miniCard}>
              <span className={styles.miniIcon}>🏆</span>
              <span className={styles.miniLabel}>Contest rating</span>
              <span className={styles.miniValue}>{stats.contestRating ?? "—"}</span>
            </div>
            <div className={styles.miniCard}>
              <span className={styles.miniIcon}>🎯</span>
              <span className={styles.miniLabel}>Contests joined</span>
              <span className={styles.miniValue}>{stats.contestsAttended}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className={styles.midGrid}>
        <ScrollReveal direction="left">
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Difficulty breakdown</h3>
            {bars.map((bar, i) => {
              const pct = bar.total ? Math.round((bar.solved / bar.total) * 100) : 0;
              return (
                <div key={bar.label} className={styles.barRow}>
                  <div className={styles.barLabelRow}>
                    <span style={{ color: bar.color }} className={styles.barLabel}>{bar.label}</span>
                    <span className={styles.barValue}>{bar.solved} / {bar.total}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${pct}%`, background: bar.color, animationDelay: `${i * 0.15}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Last 16 weeks</h3>
            <div className={styles.heatmapGrid}>
              {weeks.map((week, wi) => (
                <div key={wi} className={styles.heatmapColumn}>
                  {week.map((day) => (
                    <div
                      key={day.idx}
                      className={styles.heatmapCell}
                      data-level={levelForCount(day.count)}
                      title={`${day.count} submissions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.heatmapLegend}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div key={lvl} className={styles.heatmapCell} data-level={lvl} />
              ))}
              <span>More</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className={styles.midGrid}>
        <ScrollReveal direction="left">
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Activity over time</h3>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className={styles.chartSvg} preserveAspectRatio="none">
              <path d={areaPath} className={styles.chartArea} />
              <path d={linePath} className={styles.chartLine} />
            </svg>
            <div className={styles.chartAxis}>
              <span>{points[0]?.label}</span>
              <span>{points[points.length - 1]?.label}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Recently solved</h3>
            {stats.recentSolved.length === 0 && (
              <p className={styles.errorText}>No recent submissions found.</p>
            )}
            {stats.recentSolved.map((p) => (
              
              <a  key={p.timestamp}
               href={`https://leetcode.com/problems/${p.slug}/`}
                target="_blank"
                rel="noreferrer"
                className={styles.recentRow}
              >
                <span className={styles.recentCheck}>✓</span>
                <span className={styles.recentTitle}>{p.title}</span>
                <span className={styles.recentTime}>{timeAgo(p.timestamp)}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up">
        <div className={styles.card}>
          <h3 className={styles.cardHeading}>Achievements</h3>
          <div className={styles.badgeGrid}>
            {badges.map((b) => (
              <div key={b.label} className={styles.badge} data-active={b.active}>
                <span className={styles.badgeIcon}>{b.icon}</span>
                <span className={styles.badgeLabel}>{b.label}</span>
                <span className={styles.badgeSub}>{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}