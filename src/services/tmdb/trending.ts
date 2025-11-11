// src/services/tmdb/tmdbMovies.ts
import { fetchFromTMDB } from "./client";
import { TMDBMultiMedia, TMDBListResponse, TMDBMedia } from "@/types";

/**
 * Devuelve las tendencias del día (solo películas y series), combinando varias páginas.
 * @param pages Número de páginas a descargar (por defecto 1).
 */
export const getTrendingAll = async (pages: number = 1) => {
  const requests = Array.from({ length: pages }, (_, i) =>
    fetchFromTMDB<TMDBListResponse<TMDBMultiMedia>>(
      `/trending/all/day?page=${i + 1}`
    )
  );

  const responses = await Promise.all(requests);
  const allResults = responses.flatMap((r) => r.results);

  const filteredResults = allResults.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  ) as TMDBMedia[];

  return {
    page: 1,
    results: filteredResults,
    total_pages: 1,
    total_results: filteredResults.length,
  } as TMDBListResponse<TMDBMedia>;
};
