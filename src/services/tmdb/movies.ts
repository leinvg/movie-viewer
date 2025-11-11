// src/services/tmdb/tmdbMovies.ts
import { fetchFromTMDB } from "./client";
import { TMDBMovie, TMDBListResponse } from "@/types";

/**
 * Devuelve las próximas películas a estrenarse.
 * @param limit Número total de películas deseadas (por defecto 20).
 */
export const getUpcomingMovies = async (limit: number = 20) => {
  const today = new Date();
  const twoMonthsLater = new Date();
  twoMonthsLater.setMonth(today.getMonth() + 2);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const gte = formatDate(today);
  const lte = formatDate(twoMonthsLater);

  const results: TMDBMovie[] = [];
  let currentPage = 1;

  while (results.length < limit) {
    const response = await fetchFromTMDB<TMDBListResponse<TMDBMovie>>(
      `/discover/movie?page=${currentPage}&sort_by=popularity.desc&primary_release_date.gte=${gte}&primary_release_date.lte=${lte}&with_release_type=3|2`
    );

    if (!response.results.length) break;
    results.push(...response.results);

    if (results.length >= limit || currentPage >= response.total_pages) break;
    currentPage++;
  }

  // Validación estricta
  const validResults = results
    .filter(
      (item) =>
        item.id &&
        item.title &&
        item.poster_path &&
        typeof item.vote_average === "number" &&
        typeof item.popularity === "number"
    )
    .slice(0, limit);

  return {
    page: 1,
    results: validResults,
    total_pages: 1,
    total_results: validResults.length,
  } as TMDBListResponse<TMDBMovie>;
};
