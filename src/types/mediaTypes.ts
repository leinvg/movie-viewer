// src/types/mediaTypes.ts

/** Estructura compartida entre películas y series en TMDB. */
export interface TMDBMediaBase {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

/** Estructura de datos de una película en TMDB. */
export interface TMDBMovie extends TMDBMediaBase {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  media_type: "movie";
}

/** Estructura de datos de una serie en TMDB. */
export interface TMDBTv extends TMDBMediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  media_type: "tv";
}

/** Tipo de unión para películas y series. */
export type TMDBMedia = TMDBMovie | TMDBTv;

/** Estructura de datos de una persona en TMDB. */
export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for: TMDBMedia[];
  known_for_department: string;
  popularity: number;
  media_type: "person";
}

/** Tipo de unión para películas, series y personas. */
export type TMDBMultiMedia = TMDBMedia | TMDBPerson;

/** Estructura base para respuestas paginadas */
export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Tamaños predefinidos de imagen soportados por TMDB. */
export enum TmdbImageSize {
  W300 = "w300",
  W500 = "w500",
  W780 = "w780",
  Original = "original",
}
