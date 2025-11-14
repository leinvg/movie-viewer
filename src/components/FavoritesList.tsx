"use client";

import { useEffect, useState } from "react";
import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import { getFavorites } from "@/services/local/favorites";
import { TMDBMedia } from "@/types";

export default function FavoritesList() {
  const [items, setItems] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);

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

  if (!items.length) return <div className="text-gray-500">No tienes favoritos aún.</div>;

  return (
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
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
