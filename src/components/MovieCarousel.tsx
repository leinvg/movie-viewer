"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { useMovies } from "@/hooks/useMovies";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MovieCarousel() {
  const { movies, loading } = useMovies();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
    ClassNames(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Fondo dinámico con el backdrop del slide activo */}
      {movies[selectedIndex]?.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={`https://image.tmdb.org/t/p/w780${movies[selectedIndex].backdrop_path}`}
            alt={movies[selectedIndex].title}
            fill
            className="object-cover brightness-40"
            priority
          />
          {/* Overlay degradado para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      )}

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={movie.id}
                className={`flex-[0_0_70%] sm:flex-[0_0_25%] mx-2 transition-all duration-500 ease-in-out ${
                  isActive ? "scale-105 opacity-100" : "scale-90 opacity-60"
                }`}
              >
                {/* Poster */}
                <div className="rounded-xl overflow-hidden shadow-lg relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="rounded-xl object-cover"
                  />
                </div>

                {/* Texto solo para el slide activo */}
                {isActive ? (
                  <div className="mt-4 text-center text-white space-y-2 px-2">
                    <h2 className="text-2xl font-semibold leading-snug">
                      {movie.title}
                    </h2>
                    {movie.original_title !== movie.title && (
                      <p className="text-sm italic text-gray-300">
                        {movie.original_title}
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      📅 {movie.release_date} &nbsp;•&nbsp; 🔥{" "}
                      {movie.popularity.toFixed(0)} &nbsp;•&nbsp; ⭐{" "}
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-200 line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-center text-gray-200 text-sm truncate">
                    {movie.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === selectedIndex
                ? "bg-white"
                : "bg-gray-500/50 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        ◀
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition"
      >
        ▶
      </button>
    </div>
  );
}
