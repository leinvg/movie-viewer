// src/services/tmdb/tmdbMovies.ts
import { fetchFromTMDB } from "./client";
import { TMDBMultiMedia, TMDBListResponse, TMDBMedia } from "@/types";

/**
 * Devuelve las tendencias del día (solo películas y series), combinando varias páginas.
 * Deduplica por media_type + id y limita a 24 resultados.
 * @param pages Número de páginas a descargar (por defecto 2 para asegurar 24 items únicos).
 */
export const getTrendingAll = async (pages: number = 2) => {
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

  // Deduplicar por media_type + id
  const seen = new Set<string>();
  const uniqueResults = filteredResults.filter((item) => {
    const key = `${item.media_type}_${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Limitar a 24 resultados
  const limitedResults = uniqueResults.slice(0, 24);

  return {
    page: 1,
    results: limitedResults,
    total_pages: 1,
    total_results: limitedResults.length,
  } as TMDBListResponse<TMDBMedia>;
};
