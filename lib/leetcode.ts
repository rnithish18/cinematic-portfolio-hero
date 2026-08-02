export interface LeetCodeStats {
  username: string;
  ranking: number | null;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  contestRating: number | null;
  contestsAttended: number;
  streak: number;
  calendar: Record<string, number>;
  recentSolved: { title: string; slug: string; timestamp: number; difficulty: string }[];
  progressPoints: { label: string; value: number }[];
}

const QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      submissionCalendar
    }
    recentAcSubmissionList(username: $username, limit: 5) {
      title
      titleSlug
      timestamp
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
    }
  }
`;

function calcStreak(calendar: Record<string, number>): number {
  const oneDay = 86400;
  const days = new Set(
    Object.entries(calendar)
      .filter(([, count]) => Number(count) > 0)
      .map(([ts]) => Math.floor(Number(ts) / oneDay))
  );
  const todayIdx = Math.floor(Date.now() / 1000 / oneDay);
  let cursor = days.has(todayIdx) ? todayIdx : todayIdx - 1;
  let streak = 0;
  while (days.has(cursor)) {
    streak++;
    cursor--;
  }
  return streak;
}

function buildProgressPoints(calendar: Record<string, number>) {
  const oneDay = 86400;
  const todayIdx = Math.floor(Date.now() / 1000 / oneDay);
  const startIdx = todayIdx - 111;
  let cumulative = 0;

  const before = Object.entries(calendar).reduce((sum, [ts, count]) => {
    const idx = Math.floor(Number(ts) / oneDay);
    return idx < startIdx ? sum + Number(count) : sum;
  }, 0);
  cumulative = before;

  const points: { label: string; value: number }[] = [];
  for (let i = 0; i <= 111; i += 7) {
    const idx = startIdx + i;
    for (let d = 0; d < 7 && startIdx + i + d <= todayIdx; d++) {
      const ts = String((idx + d) * oneDay);
      cumulative += Number(calendar[ts] ?? 0);
    }
    const date = new Date((idx) * oneDay * 1000);
    points.push({
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: cumulative,
    });
  }
  return points;
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return null;

    const solvedByDiff: Record<string, number> = {};
    for (const item of user.submitStatsGlobal.acSubmissionNum) {
      solvedByDiff[item.difficulty] = item.count;
    }

    const totalByDiff: Record<string, number> = {};
    for (const item of json.data.allQuestionsCount) {
      totalByDiff[item.difficulty] = item.count;
    }

    const calendar: Record<string, number> = JSON.parse(user.submissionCalendar || "{}");
    const contest = json.data.userContestRanking;

    const recentSolved = (json.data.recentAcSubmissionList || []).map((s: any) => ({
      title: s.title,
      slug: s.titleSlug,
      timestamp: Number(s.timestamp),
      difficulty: "",
    }));

    return {
      username: user.username,
      ranking: user.profile?.ranking ?? null,
      totalSolved: solvedByDiff["All"] ?? 0,
      totalQuestions: totalByDiff["All"] ?? 0,
      easySolved: solvedByDiff["Easy"] ?? 0,
      easyTotal: totalByDiff["Easy"] ?? 0,
      mediumSolved: solvedByDiff["Medium"] ?? 0,
      mediumTotal: totalByDiff["Medium"] ?? 0,
      hardSolved: solvedByDiff["Hard"] ?? 0,
      hardTotal: totalByDiff["Hard"] ?? 0,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestsAttended: contest?.attendedContestsCount ?? 0,
      streak: calcStreak(calendar),
      calendar,
      recentSolved,
      progressPoints: buildProgressPoints(calendar),
    };
  } catch (err) {
    console.error("LeetCode fetch failed:", err);
    return null;
  }
}