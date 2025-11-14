// src/components/SearchResults.tsx

"use client";

import { useEffect, useState } from "react";
import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import { TMDBMedia } from "@/types";

interface Props {
  initialResults: TMDBMedia[];
  initialHasMore: boolean;
  initialNextPage: number;
  query: string;
}

export default function SearchResults({
  initialResults,
  initialHasMore,
  initialNextPage,
  query,
}: Props) {
  const [results, setResults] = useState<TMDBMedia[]>(initialResults || []);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [nextPage, setNextPage] = useState<number>(initialNextPage || 1);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);

  // Reset internal state when query or initialResults change
  useEffect(() => {
    setResults(initialResults || []);
    setHasMore(initialHasMore);
    setNextPage(initialNextPage || 1);
  }, [query, initialResults, initialHasMore, initialNextPage]);

  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&page=${nextPage}&limit=12`
      );
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setResults((cur) => [...cur, ...data.results]);
      setHasMore(data.hasMore);
      setNextPage(data.nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((m) => (
          <MediaCard
            key={`${m.media_type}_${m.id}`}
            media={m}
            onCardClick={setSelectedMedia}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        {hasMore ? (
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Ver más"}
          </button>
        ) : (
          <div className="text-gray-400">No hay más resultados.</div>
        )}
      </div>
    </section>
  );
}
