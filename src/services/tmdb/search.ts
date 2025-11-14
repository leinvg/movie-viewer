// src/services/tmdb/search.ts

import { fetchFromTMDB, RateLimitError } from "./client";
import {
  TMDBListResponse,
  TMDBMultiMedia,
  TMDBMedia,
  TMDBPerson,
  SearchMediaResult,
} from "@/types";

export async function searchMedia(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<SearchMediaResult> {
  if (!query.trim()) return { results: [], hasMore: false, nextPage: 1 };
  try {
    const results: TMDBMedia[] = [];
    const seen = new Set<string>();
    let tmdbPage = page;
    let hasMore = true;
    while (results.length < limit && hasMore) {
      const data = await fetchFromTMDB<TMDBListResponse<TMDBMultiMedia>>(
        `/search/multi?query=${encodeURIComponent(
          query
        )}&include_adult=false&page=${tmdbPage}`
      );
      if (tmdbPage >= data.total_pages) hasMore = false;
      for (const item of data.results) {
        if (item.media_type === "movie" || item.media_type === "tv") {
          const key = `${item.media_type}_${item.id}`;
          if (!seen.has(key)) {
            seen.add(key);
            results.push(item as TMDBMedia);
            if (results.length === limit) break;
          }
        } else if (
          item.media_type === "person" &&
          (item as TMDBPerson).known_for
        ) {
          for (const kf of (item as TMDBPerson).known_for) {
            if (kf.media_type === "movie" || kf.media_type === "tv") {
              const key = `${kf.media_type}_${kf.id}`;
              if (!seen.has(key)) {
                seen.add(key);
                results.push(kf as TMDBMedia);
                if (results.length === limit) break;
              }
            }
          }
        }
        if (results.length === limit) break;
      }
      tmdbPage++;
    }
    return {
      results,
      hasMore: results.length >= limit || hasMore,
      nextPage: tmdbPage,
    };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && (error as { type?: unknown }).type === "RATE_LIMIT") throw error as RateLimitError;
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Error en búsqueda TMDB: ${message}`);
  }
}

export async function fetchFilteredSearch(
  query: string,
  page: number = 1,
  limit: number = 20,
  options?: {
    requirePoster?: boolean;
    requireBackdrop?: boolean;
    requireGenres?: boolean;
    requireOverview?: boolean;
    maxPagesToScan?: number; // to avoid long loops
  }
): Promise<SearchMediaResult> {
  const {
    requirePoster = true,
    requireBackdrop = true,
    requireGenres = true,
    requireOverview = true,
    maxPagesToScan = 5,
  } = options || {};

  if (!query.trim()) return { results: [], hasMore: false, nextPage: page };

  const aggregated: SearchMediaResult = {
    results: [],
    hasMore: false,
    nextPage: page,
  };
  let currentPage = page;
  let scanned = 0;

  while (aggregated.results.length < limit && scanned < maxPagesToScan) {
    const chunk = await searchMedia(query, currentPage, limit);
    const filtered = chunk.results.filter((m) => {
      if (requirePoster && !m.poster_path) return false;
      if (requireBackdrop && !m.backdrop_path) return false;
      if (requireGenres) {
        const g = m.genre_ids;
        if (!Array.isArray(g) || g.length === 0) return false;
      }
      if (requireOverview && !m.overview) return false;
      return true;
    });

    aggregated.results.push(...filtered);
    aggregated.hasMore = chunk.hasMore;
    aggregated.nextPage = chunk.nextPage;

    if (!chunk.hasMore) break;
    currentPage = chunk.nextPage;
    scanned++;
  }

  aggregated.results = aggregated.results.slice(0, limit);
  return aggregated;
}
