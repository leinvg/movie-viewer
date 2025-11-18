// src/components/MediaModal.tsx

"use client";

import { useEffect } from "react";
import { TMDBMedia, TMDBMovie, TMDBTv } from "@/types";
import Image from "next/image";
import { getImagePath } from "@/services/tmdb";
import { TmdbImageSize } from "@/types";
import { useFetchMedia } from "@/hooks";
import { APP_CONFIG } from "@/config";

interface MediaModalProps {
  media: TMDBMedia | null;
  onClose: () => void;
}

export default function MediaModal({ media, onClose }: MediaModalProps) {
  const mediaType = (media?.media_type as "movie" | "tv" | null) || null;
  const { media: detailedMedia, credits } = useFetchMedia(
    mediaType,
    media?.id ?? null
  );

  useEffect(() => {
    // Solo bloquear scroll si el modal está abierto
    if (!media) return;

    // Guardar el valor actual de overflow antes de bloquearlo
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalPadding = window.getComputedStyle(document.body).paddingRight;

    // Bloquear scroll y compensar por la barra de scroll
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      // Restaurar el estado original
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
    };
  }, [media]);

  if (!media) return null;

  const displayMedia = (detailedMedia || media) as TMDBMedia;
  const isMovie = displayMedia.media_type === "movie";
  const movie = displayMedia as TMDBMovie;
  const tv = displayMedia as TMDBTv;
  const title = isMovie ? movie.title : tv.name;
  const original = isMovie ? movie.original_title : tv.original_name;
  const releaseDate = isMovie ? movie.release_date : tv.first_air_date;
  const backdropUrl = getImagePath(
    displayMedia.backdrop_path,
    TmdbImageSize.W780
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="absolute inset-x-0 bottom-0 top-20 bg-gray-950 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex-1 w-full">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="fixed top-4 right-4 z-50 bg-black/80 hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
          >
            ✕
          </button>

          {backdropUrl && (
            <div className="relative w-full h-64 md:h-80 flex-shrink-0">
              <Image
                src={backdropUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            {original !== title && (
              <p className="text-gray-400 text-sm mb-4">{original}</p>
            )}

            {/* Metadata row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-300">
              {releaseDate && (
                <div>
                  <span className="font-semibold">Lanzamiento:</span>{" "}
                  {releaseDate}
                </div>
              )}
              {displayMedia.vote_average > 0 && (
                <div>
                  <span className="font-semibold">Calificación:</span>{" "}
                  {displayMedia.vote_average.toFixed(1)}/10
                </div>
              )}
              {displayMedia.vote_count > 0 && (
                <div>
                  <span className="font-semibold">Votos:</span>{" "}
                  {displayMedia.vote_count.toLocaleString()}
                </div>
              )}
              {displayMedia.original_language && (
                <div>
                  <span className="font-semibold">Idioma:</span>{" "}
                  {displayMedia.original_language.toUpperCase()}
                </div>
              )}
            </div>

            {/* Genres */}
            {displayMedia.genre_ids && displayMedia.genre_ids.length > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-sm">Géneros:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {displayMedia.genre_ids.map((gid) => (
                    <span
                      key={gid}
                      className="bg-indigo-600/30 text-indigo-200 px-3 py-1 rounded-full text-xs"
                    >
                      {gid}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Popularity */}
            {displayMedia.popularity > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-sm">Popularidad:</span>
                <div className="mt-2 bg-gray-800 rounded-full h-2 w-32">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(displayMedia.popularity * 2, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Synopsis */}
            {displayMedia.overview && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {displayMedia.overview}
                </p>
              </div>
            )}

            {/* Series-only info */}
            {!isMovie && tv.origin_country && tv.origin_country.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="font-semibold text-sm">Países de origen:</span>
                <p className="text-gray-300 mt-2">
                  {tv.origin_country.join(", ")}
                </p>
              </div>
            )}

            {/* Movie-only info */}
            {isMovie && typeof movie.video !== "undefined" && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <span className="font-semibold text-sm">Contiene video:</span>
                <p className="text-gray-300 mt-2">
                  {movie.video ? "Sí" : "No"}
                </p>
              </div>
            )}

            {/* Cast */}
            {credits?.cast && credits.cast.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Elenco</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {credits.cast
                    .slice(0, APP_CONFIG.credits.DISPLAY_LIMIT)
                    .map((person) => (
                      <div key={`cast-${person.id}`} className="text-center">
                        {person.profile_path ? (
                          <div className="relative w-full aspect-[2/3] mb-2 rounded-lg overflow-hidden">
                            <Image
                              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-[2/3] mb-2 rounded-lg bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No foto</span>
                          </div>
                        )}
                        <p className="text-sm font-semibold text-white truncate">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {person.character}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Crew */}
            {credits?.crew && credits.crew.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Equipo</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {credits.crew
                    .filter((person) =>
                      person.job
                        ? (
                            APP_CONFIG.credits
                              .PRIORITY_JOBS as unknown as string[]
                          ).includes(person.job)
                        : false
                    )
                    .slice(0, APP_CONFIG.credits.DISPLAY_LIMIT)
                    .map((person) => (
                      <div
                        key={`crew-${person.id}-${person.job}`}
                        className="text-center"
                      >
                        {person.profile_path ? (
                          <div className="relative w-full aspect-[2/3] mb-2 rounded-lg overflow-hidden">
                            <Image
                              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-[2/3] mb-2 rounded-lg bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No foto</span>
                          </div>
                        )}
                        <p className="text-sm font-semibold text-white truncate">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {person.job}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
