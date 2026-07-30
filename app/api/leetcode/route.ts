import { NextResponse } from "next/server";
import { fetchLeetCodeStats } from "@/lib/leetcode";

export const revalidate = 3600;

export async function GET() {
  const stats = await fetchLeetCodeStats("O7WZ2gofuH");
  if (!stats) {
    return NextResponse.json({ error: "Unable to fetch LeetCode stats" }, { status: 502 });
  }
  return NextResponse.json(stats);
}