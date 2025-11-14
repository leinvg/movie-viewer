// Utilidad pura para agregar y ordenar proveedores desde favoritos

import { TMDBMedia } from "@/types";
import { WatchProvidersResponse, WatchProvider } from "@/types/watchProviderTypes";

/** Estadísticas de un proveedor de streaming */
export interface ProviderStat {
  id: number;
  name: string;
  logo: string | null;
  count: number;
  mediaIds: number[];
}

/**
 * Agrega proveedores desde múltiples respuestas de TMDB
 * Lógica pura, testeable, sin side effects
 *
 * @param favorites - Lista de media favoritos
 * @param providerResponses - Respuestas de API de proveedores
 * @param region - Código de región (ej: 'PE', 'MX', 'BR')
 * @returns Array de proveedores ordenados por cantidad de títulos
 */
export const aggregateProviders = (
  favorites: TMDBMedia[],
  providerResponses: (WatchProvidersResponse | null)[],
  region: string = "PE"
): ProviderStat[] => {
  const map = new Map<string, ProviderStat>();

  providerResponses.forEach((provResp, idx) => {
    const media = favorites[idx];
    if (!provResp || !provResp.results || !media) return;

    // Intentar por región exacta y en minúsculas
    const regionData =
      provResp.results[region] || provResp.results[region.toLowerCase()];
    if (!regionData) return;

    // Juntar todos los proveedores (flatrate, buy, rent)
    const providers: WatchProvider[] = [];
    if (Array.isArray(regionData.flatrate)) providers.push(...regionData.flatrate);
    if (Array.isArray(regionData.buy)) providers.push(...regionData.buy);
    if (Array.isArray(regionData.rent)) providers.push(...regionData.rent);

    // Agregar a la estadística
    providers.forEach((provider) => {
      const providerId = provider.provider_id;
      const key = String(providerId);

      if (!providerId) return;

      const existing = map.get(key);
      if (existing) {
        if (!existing.mediaIds.includes(media.id)) {
          existing.mediaIds.push(media.id);
          existing.count = existing.mediaIds.length;
        }
      } else {
        map.set(key, {
          id: providerId,
          name: provider.provider_name,
          logo: provider.logo_path ?? null,
          count: 1,
          mediaIds: [media.id],
        });
      }
    });
  });

  // Convertir a array y ordenar por count (desc) y nombre (asc)
  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
};

/**
 * Filtra proveedores recomendados (aquellos con el conteo máximo)
 * @param stats - Array de estadísticas de proveedores
 * @returns Proveedores recomendados
 */
export const getRecommendedProviders = (stats: ProviderStat[]): ProviderStat[] => {
  if (stats.length === 0) return [];
  const maxCount = stats[0].count;
  return stats.filter((p) => p.count === maxCount && maxCount > 0);
};

/**
 * Obtiene todos los proveedores excepto los recomendados
 * @param stats - Array de estadísticas de proveedores
 * @returns Otros proveedores
 */
export const getOtherProviders = (stats: ProviderStat[]): ProviderStat[] => {
  const recommended = getRecommendedProviders(stats);
  const recommendedIds = new Set(recommended.map((p) => p.id));
  return stats.filter((p) => !recommendedIds.has(p.id));
};
