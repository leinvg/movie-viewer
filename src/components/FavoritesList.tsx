"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import { TMDBMedia } from "@/types";
import useAppStore from "@/store/appStore";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";
import {
  aggregateProviders,
  getRecommendedProviders,
  getOtherProviders,
  type ProviderStat,
} from "@/utils/providerAggregator";

// Helper para obtener badges de tipo de servicio
const getServiceTypeBadges = (types: Set<'flatrate' | 'rent' | 'buy'>) => {
  const badges: { label: string; color: string }[] = [];
  
  if (types.has('flatrate')) {
    badges.push({ label: 'Suscripción', color: 'bg-green-600 dark:bg-green-700' });
  }
  if (types.has('rent')) {
    badges.push({ label: 'Renta', color: 'bg-blue-600 dark:bg-blue-700' });
  }
  if (types.has('buy')) {
    badges.push({ label: 'Compra', color: 'bg-purple-600 dark:bg-purple-700' });
  }
  
  return badges;
};

export default function FavoritesList() {
  const { favorites, region } = useAppStore();
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [providerStats, setProviderStats] = useState<ProviderStat[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);

  // Cargar proveedores cuando cambien favoritos o región
  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setProviderStats([]);
      return;
    }

    let mounted = true;
    const cacheKey = (type: string, id: number, reg: string) => `mv_providers_${type}_${id}_${reg}`;

    const fetchProvidersFor = async (
      m: TMDBMedia
    ): Promise<WatchProvidersResponse | null> => {
      const key = cacheKey(m.media_type, m.id, region);
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
          region
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
  }, [favorites, region]);

  if (!favorites.length)
    return <div className="text-gray-600 dark:text-gray-500">No tienes favoritos aún.</div>;

  const recommended = getRecommendedProviders(providerStats);
  const other = getOtherProviders(providerStats);

  return (
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Recomendación de plataformas (región:{" "}
          {region})
        </h3>
        {providersLoading ? (
          <p className="text-sm text-gray-400">
            Calculando plataformas recomendadas...
          </p>
        ) : providerStats.length ? (
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600 dark:text-gray-300">Recomendadas:</span>
              {recommended.map((r) => {
                const badges = getServiceTypeBadges(r.types);
                return (
                  <div
                    key={`rec-${r.id}`}
                    className="flex flex-col gap-1 bg-indigo-100 dark:bg-indigo-700/20 px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-600/30"
                  >
                    <div className="flex items-center gap-2">
                      {r.logo ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${r.logo}`}
                          alt={r.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded" />
                      )}
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{r.name}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">({r.count})</span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded-full text-white ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {other.length > 0 && (
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Otras plataformas:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {other.map((p) => {
                    const badges = getServiceTypeBadges(p.types);
                    return (
                      <div
                        key={`p-${p.id}`}
                        className="flex flex-col gap-1 bg-gray-100 dark:bg-gray-800/40 px-2 py-1.5 rounded border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          {p.logo ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w92${p.logo}`}
                              alt={p.name}
                              width={20}
                              height={20}
                              className="rounded"
                            />
                          ) : (
                            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
                          )}
                          <span className="text-sm text-gray-900 dark:text-white">{p.name}</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">({p.count})</span>
                        </div>
                        <div className="flex gap-1 flex-wrap ml-7">
                          {badges.map((badge, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-1.5 py-0.5 rounded text-white ${badge.color}`}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
