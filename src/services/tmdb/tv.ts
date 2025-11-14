// src/services/tmdb/tv.ts
import { fetchFromTMDB } from "./client";
import { TMDBTv } from "@/types";

/**
 * Devuelve una serie por su ID con información detallada.
 */
export const getTvDetails = async (tvId: number): Promise<TMDBTv> => {
  const response = await fetchFromTMDB<TMDBTv>(`/tv/${tvId}`);
  return response;
};

/**
 * Devuelve los créditos (cast y crew) de una serie.
 */
export const getTvCredits = async (tvId: number) => {
  const response = await fetchFromTMDB<any>(`/tv/${tvId}/credits`);
  return response;
};
