// src/services/tmdb/trending.ts
import { fetchFromTMDB } from "./client";
import { TMDBMovie, TMDBTv, TMDBListResponse, TMDBMedia } from "@/types";

/**
 * Obtiene las películas más populares del día según TMDB.
 * @param limit Número máximo de películas (por defecto 20).
 */
export const getTrendingMovies = async (limit: number = 20) => {
  const response = await fetchFromTMDB<TMDBListResponse<TMDBMovie>>(
    `/trending/movie/day?page=1`
  );

  const validResults = response.results
    .filter((item) => item.id && item.title && item.poster_path)
    .slice(0, limit)
    .map((movie) => ({ ...movie, media_type: "movie" } as TMDBMedia));

  return {
    page: 1,
    results: validResults,
    total_pages: 1,
    total_results: validResults.length,
  } as TMDBListResponse<TMDBMedia>;
};

/**
 * Obtiene las series más populares del día según TMDB.
 * @param limit Número máximo de series (por defecto 20).
 */
export const getTrendingTv = async (limit: number = 20) => {
  const response = await fetchFromTMDB<TMDBListResponse<TMDBTv>>(
    `/trending/tv/day?page=1`
  );

  const validResults = response.results
    .filter((item) => item.id && item.name && item.poster_path)
    .slice(0, limit)
    .map((tv) => ({ ...tv, media_type: "tv" } as TMDBMedia));

  return {
    page: 1,
    results: validResults,
    total_pages: 1,
    total_results: validResults.length,
  } as TMDBListResponse<TMDBMedia>;
};
