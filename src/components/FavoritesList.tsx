"use client";

import { useEffect, useState } from "react";
import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import { getFavorites } from "@/services/local/favorites";
import { TMDBMedia } from "@/types";

export default function FavoritesList() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [providerStats, setProviderStats] = useState<any[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setItems(getFavorites());
      } catch {
        setItems([]);
      }
    };
    read();
    const onStorage = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("mv_favorites_changed", onStorage as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mv_favorites_changed", onStorage as EventListener);
    };
  }, []);

  // Cuando cambian los favoritos, calcular recomendaciones por plataforma (región PE)
  useEffect(() => {
    if (!items || items.length === 0) {
      setProviderStats([]);
      return;
    }

    let mounted = true;
    const REGION = "PE"; // Perú
    const cacheKey = (type: string, id: number) => `mv_providers_${type}_${id}`;

    const fetchProvidersFor = async (m: any) => {
      const key = cacheKey(m.media_type, m.id);
      const cached = sessionStorage.getItem(key);
      if (cached) return JSON.parse(cached);

      try {
        const endpoint = `/api/media/${m.media_type}/${m.id}/providers`;
        const res = await fetch(endpoint);
        if (!res.ok) return null;
        const json = await res.json();
        sessionStorage.setItem(key, JSON.stringify(json));
        return json;
      } catch (e) {
        console.warn("failed providers", e);
        return null;
      }
    };

    const run = async () => {
      setProvidersLoading(true);
      try {
        const all = await Promise.all(items.map((it) => fetchProvidersFor(it)));

        const map = new Map<string, { id: number; name: string; logo?: string; count: number; mediaIds: number[] }>();

        all.forEach((provResp, idx) => {
          const media = items[idx];
          if (!provResp || !provResp.results) return;
          const country = provResp.results[REGION] || provResp.results[REGION.toLowerCase()];
          if (!country) return;

          const providerLists = [] as any[];
          if (Array.isArray(country.flatrate)) providerLists.push(...country.flatrate);
          if (Array.isArray(country.buy)) providerLists.push(...country.buy);
          if (Array.isArray(country.rent)) providerLists.push(...country.rent);

          providerLists.forEach((p) => {
            const pid = p.provider_id ?? p.provider_id ?? p.id ?? p.provider ?? null;
            const name = p.provider_name ?? p.provider_name ?? p.name ?? p.provider ?? "Desconocido";
            const logo = p.logo_path ?? p.logo_path ?? null;
            if (!pid) return;
            const key = String(pid);
            const existing = map.get(key);
            if (existing) {
              if (!existing.mediaIds.includes(media.id)) existing.mediaIds.push(media.id);
              existing.count = existing.mediaIds.length;
            } else {
              map.set(key, { id: pid, name, logo, count: 1, mediaIds: [media.id] });
            }
          });
        });

        const arr = Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
        if (mounted) setProviderStats(arr);
      } finally {
        if (mounted) setProvidersLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [items]);

  if (!items.length) return <div className="text-gray-500">No tienes favoritos aún.</div>;

  const topCount = providerStats.length ? providerStats[0].count : 0;
  const recommended = providerStats.filter((p) => p.count === topCount && topCount > 0);

  return (
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recomendación de plataformas (región: Perú)</h3>
        {providersLoading ? (
          <p className="text-sm text-gray-400">Calculando plataformas recomendadas...</p>
        ) : providerStats.length ? (
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Recomendadas:</span>
              {recommended.map((r) => (
                <div key={`rec-${r.id}`} className="flex items-center gap-2 bg-indigo-700/20 px-3 py-1 rounded-full">
                  {r.logo ? (
                    // logo w40
                    <img src={`https://image.tmdb.org/t/p/w92${r.logo}`} alt={r.name} className="w-6 h-6 rounded" />
                  ) : (
                    <div className="w-6 h-6 bg-gray-700 rounded" />
                  )}
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-400">{r.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-6">
              <span className="text-sm text-gray-400">Otras plataformas:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {providerStats.map((p) => (
                  <div key={`p-${p.id}`} className="flex items-center gap-2 bg-gray-800/40 px-2 py-1 rounded">
                    {p.logo ? (
                      <img src={`https://image.tmdb.org/t/p/w92${p.logo}`} alt={p.name} className="w-6 h-6 rounded" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-700 rounded" />
                    )}
                    <span className="text-sm">{p.name}</span>
                    <span className="text-xs text-gray-400">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No se encontraron plataformas para tus favoritos en la región seleccionada.</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((m) => (
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
