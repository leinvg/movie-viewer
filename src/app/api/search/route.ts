// src/app/api/search/route.ts

import { NextResponse } from "next/server";
import { fetchFilteredSearch } from "@/services/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  if (!q)
    return NextResponse.json({ results: [], hasMore: false, nextPage: 1 });

  // Accumulate filtered results (items must have poster_path, backdrop_path, genre_ids)
  try {
    // Delegate to centralized service (same filtering rules as SSR)
    const data = await fetchFilteredSearch(q, page, limit, { maxPagesToScan: 8 });
    return NextResponse.json(data);
  } catch (err: any) {
    if (err && err.type === "RATE_LIMIT") {
      return NextResponse.json(
        { error: "RATE_LIMIT", retryAfter: err.retryAfter },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
