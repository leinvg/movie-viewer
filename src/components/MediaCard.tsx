// src/components/MediaCard.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TMDBMedia, TmdbImageSize } from "@/types";
import { getImagePath } from "@/services/tmdb";
import { isFavorited, toggleFavorite } from "@/services/local/favorites";

interface MediaCardProps {
  media: TMDBMedia;
  onCardClick?: (media: TMDBMedia) => void;
}

/** Tarjeta visual de película o serie */
export default function MediaCard({ media, onCardClick }: MediaCardProps) {
  const title = "title" in media ? media.title : media.name;
  const img = getImagePath(media.poster_path, TmdbImageSize.W300);
  const [fav, setFav] = useState<boolean>(false);

  useEffect(() => {
    setFav(isFavorited(media));
    const onFav = () => setFav(isFavorited(media));
    window.addEventListener("mv_favorites_changed", onFav as EventListener);
    return () => window.removeEventListener("mv_favorites_changed", onFav as EventListener);
  }, [media]);

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(media);
    // read actual state from storage to avoid race/ordering issues
    setFav(isFavorited(media));
  };

  return (
    <div
      onClick={() => onCardClick?.(media)}
      className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 relative cursor-pointer hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow"
    >
      {img ? (
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 130px, 160px"
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">❌</div>
      )}

      <button
        onClick={onToggle}
        aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
        className={`absolute top-2 right-2 z-10 px-2 py-1 rounded-md text-sm font-semibold transition-opacity ${
          fav ? "bg-yellow-400 text-black" : "bg-black/40 text-white"
        }`}
      >
        {fav ? "★" : "☆"}
      </button>
    </div>
  );
}
