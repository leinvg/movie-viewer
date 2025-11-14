// src/services/tmdb/tv.ts
import { fetchFromTMDB } from "./client";
import { TMDBTv } from "@/types";
import { CreditsResponse } from "@/types/creditsTypes";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";

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
export const getTvCredits = async (tvId: number): Promise<CreditsResponse> => {
  const response = await fetchFromTMDB<CreditsResponse>(`/tv/${tvId}/credits`);
  return response;
};

/**
 * Devuelve los proveedores de watch/providers de una serie.
 */
export const getTvProviders = async (tvId: number): Promise<WatchProvidersResponse> => {
  const response = await fetchFromTMDB<WatchProvidersResponse>(`/tv/${tvId}/watch/providers`);
  return response;
};
