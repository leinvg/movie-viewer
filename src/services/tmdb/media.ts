// Servicio genérico para películas y series (elimina duplicación)

import { fetchFromTMDB } from "./client";
import { TMDBMedia } from "@/types";
import { CreditsResponse } from "@/types/creditsTypes";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";

type MediaType = "movie" | "tv";

/**
 * Obtiene detalles de una película o serie por ID.
 * @param type Tipo de media: 'movie' o 'tv'
 * @param id ID del media
 */
export const getMediaDetails = async <T extends TMDBMedia = TMDBMedia>(
  type: MediaType,
  id: number
): Promise<T> => {
  const response = await fetchFromTMDB<T>(`/${type}/${id}`);
  return response;
};

/**
 * Obtiene los créditos (cast y crew) de una película o serie.
 * @param type Tipo de media: 'movie' o 'tv'
 * @param id ID del media
 */
export const getMediaCredits = async (
  type: MediaType,
  id: number
): Promise<CreditsResponse> => {
  const response = await fetchFromTMDB<CreditsResponse>(
    `/${type}/${id}/credits`
  );
  return response;
};

/**
 * Obtiene los proveedores de watch/streaming de una película o serie.
 * @param type Tipo de media: 'movie' o 'tv'
 * @param id ID del media
 */
export const getMediaProviders = async (
  type: MediaType,
  id: number
): Promise<WatchProvidersResponse> => {
  const response = await fetchFromTMDB<WatchProvidersResponse>(
    `/${type}/${id}/watch/providers`
  );
  return response;
};
