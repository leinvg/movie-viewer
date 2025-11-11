// src/services/tmdb/config.ts

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const TMDB_LANGUAGE = "es-ES";

/** Tamaños estándar de imagen soportados por TMDB. */
export enum TmdbImageSize {
  W300 = "w300",
  W500 = "w500",
  W780 = "w780",
  Original = "original",
}
