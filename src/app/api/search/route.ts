// src/app/api/search/route.ts

import { NextResponse } from "next/server";
import { searchMedia } from "@/services/tmdb/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  if (!q) return NextResponse.json({ results: [], hasMore: false, nextPage: 1 });

  // Accumulate filtered results (items must have poster_path, backdrop_path, genre_ids)
  try {
    const aggregated: { results: any[]; hasMore: boolean; nextPage: number } = { results: [], hasMore: false, nextPage: page };
    let currentPage = page;
    let keepGoing = true;

    while (aggregated.results.length < limit && keepGoing) {
      const data = await searchMedia(q, currentPage, limit);
      const filtered = data.results.filter(
        (m: any) => m.poster_path && m.backdrop_path && Array.isArray(m.genre_ids) && m.genre_ids.length > 0
      );
      aggregated.results.push(...filtered);
      aggregated.hasMore = data.hasMore;
      aggregated.nextPage = data.nextPage;

      if (!data.hasMore) keepGoing = false;
      currentPage = data.nextPage;
    }

    aggregated.results = aggregated.results.slice(0, limit);

    return NextResponse.json(aggregated);
  } catch (err: any) {
    if (err && err.type === "RATE_LIMIT") {
      return NextResponse.json({ error: "RATE_LIMIT", retryAfter: err.retryAfter }, { status: 429 });
    }
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
