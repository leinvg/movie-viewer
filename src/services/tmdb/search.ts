// src/services/tmdb/search.ts

import { fetchFromTMDB } from "./client";
import {
  TMDBListResponse,
  TMDBMultiMedia,
  TMDBMedia,
  TMDBPerson,
} from "@/types";

/** Estructura de respuesta para búsqueda multi tipo. */
export interface SearchMediaResult {
  results: TMDBMedia[];
  hasMore: boolean;
  nextPage: number;
}

/**
 * Busca películas y series en TMDB (multi endpoint).
 * @param query Texto de búsqueda
 * @param page Página inicial
 * @param limit Máximo de resultados
 */
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
  } catch (error: any) {
    if (error.type === "RATE_LIMIT") throw error;
    throw new Error(`Error en búsqueda TMDB: ${error.message}`);
  }
}
