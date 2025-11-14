"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import { TMDBMedia } from "@/types";
import { useFavorites } from "@/hooks";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";
import {
  aggregateProviders,
  getRecommendedProviders,
  getOtherProviders,
  type ProviderStat,
} from "@/utils/providerAggregator";
import { APP_CONFIG } from "@/config";

export default function FavoritesList() {
  const { favorites } = useFavorites();
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [providerStats, setProviderStats] = useState<ProviderStat[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);

  // Cargar proveedores cuando cambien favoritos
  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setProviderStats([]);
      return;
    }

    let mounted = true;
    const cacheKey = (type: string, id: number) => `mv_providers_${type}_${id}`;

    const fetchProvidersFor = async (
      m: TMDBMedia
    ): Promise<WatchProvidersResponse | null> => {
      const key = cacheKey(m.media_type, m.id);
      const cached = sessionStorage.getItem(key);
      if (cached) return JSON.parse(cached);

      try {
        const endpoint = `/api/media/${m.media_type}/${m.id}/providers`;
        const res = await fetch(endpoint);
        if (!res.ok) return null;
        const json = await res.json();
        sessionStorage.setItem(key, JSON.stringify(json));
        return json as WatchProvidersResponse;
      } catch (e) {
        console.warn("failed to fetch providers:", e);
        return null;
      }
    };

    const run = async () => {
      setProvidersLoading(true);
      try {
        const responses = await Promise.all(
          favorites.map((it) => fetchProvidersFor(it))
        );
        const stats = aggregateProviders(
          favorites,
          responses,
          APP_CONFIG.streaming.DEFAULT_REGION
        );
        if (mounted) setProviderStats(stats);
      } finally {
        if (mounted) setProvidersLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [favorites]);

  if (!favorites.length)
    return <div className="text-gray-500">No tienes favoritos aún.</div>;

  const recommended = getRecommendedProviders(providerStats);
  const other = getOtherProviders(providerStats);

  return (
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Recomendación de plataformas (región:{" "}
          {APP_CONFIG.streaming.DEFAULT_REGION})
        </h3>
        {providersLoading ? (
          <p className="text-sm text-gray-400">
            Calculando plataformas recomendadas...
          </p>
        ) : providerStats.length ? (
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Recomendadas:</span>
              {recommended.map((r) => (
                <div
                  key={`rec-${r.id}`}
                  className="flex items-center gap-2 bg-indigo-700/20 px-3 py-1 rounded-full"
                >
                  {r.logo ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${r.logo}`}
                      alt={r.name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-700 rounded" />
                  )}
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-400">{r.count}</span>
                </div>
              ))}
            </div>

            {other.length > 0 && (
              <div className="mt-3 sm:mt-0 sm:ml-6">
                <span className="text-sm text-gray-400">Otras plataformas:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {other.map((p) => (
                    <div
                      key={`p-${p.id}`}
                      className="flex items-center gap-2 bg-gray-800/40 px-2 py-1 rounded"
                    >
                      {p.logo ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${p.logo}`}
                          alt={p.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-700 rounded" />
                      )}
                      <span className="text-sm">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No se encontraron plataformas para tus favoritos en la región
            seleccionada.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((m) => (
          <MediaCard
            key={`${m.media_type}_${m.id}`}
            media={m}
            onCardClick={setSelectedMedia}
          />
        ))}
      </div>
    </>
  );
}
