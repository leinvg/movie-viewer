// src/components/MediaCard.tsx

import Image from "next/image";
import { TMDBMedia, TmdbImageSize } from "@/types";
import { getImagePath } from "@/services/tmdb";

interface MediaCardProps {
  media: TMDBMedia;
}

/** Tarjeta visual de película o serie */
export default function MediaCard({ media }: MediaCardProps) {
  const title = "title" in media ? media.title : media.name;
  const img = getImagePath(media.poster_path, TmdbImageSize.W300);

  return (
    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 relative">
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
        <div className="flex items-center justify-center h-full text-gray-400">
          ❌
        </div>
      )}
    </div>
  );
}
