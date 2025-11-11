// src/types/mediaTypes.ts

/** Estructura base para películas y series. */
export interface TMDBMediaBase {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  popularity: number;
}

/** Estructura para películas. */
export interface TMDBMovie extends TMDBMediaBase {
  title: string;
  original_title: string;
  release_date: string;
  media_type: "movie";
}

/** Estructura para series. */
export interface TMDBTv extends TMDBMediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
  media_type: "tv";
}

/** Tipo de unión para películas o series. */
export type TMDBMedia = TMDBMovie | TMDBTv;

/** Estructura para personas. */
export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for: TMDBMedia[];
  known_for_department: string;
  popularity: number;
  media_type: "person";
}

/** Tipo de unión para películas, series o personas. */
export type TMDBMultiMedia = TMDBMedia | TMDBPerson;

/** Estructura base para respuestas paginadas */
export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Tamaños estándar de imagen soportados por TMDB. */
export enum TmdbImageSize {
  W300 = "w300",
  W500 = "w500",
  W780 = "w780",
  Original = "original",
}
