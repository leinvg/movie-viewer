// src/components/TrendingCarousel.tsx

"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import MediaModal from "./MediaModal";
import { TMDBMedia } from "@/types";

interface TrendingCarouselProps {
  items: TMDBMedia[];
}

/**
 * Carrusel de trending del día con:
 * - 24 items únicos
 * - Flechas de navegación visibles solo en hover
 * - Dots indicadores de slice
 * - Título "Trending del día"
 */
export default function TrendingCarousel({ items }: TrendingCarouselProps) {
  const [slidesToScroll, setSlidesToScroll] = useState(3);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const updateScroll = () => {
      const width = window.innerWidth;

      if (width >= 1536) setSlidesToScroll(8);
      else if (width >= 1280) setSlidesToScroll(7);
      else if (width >= 1024) setSlidesToScroll(6);
      else if (width >= 768) setSlidesToScroll(5);
      else if (width >= 500) setSlidesToScroll(4);
      else setSlidesToScroll(3);
    };

    updateScroll();
    window.addEventListener("resize", updateScroll);
    return () => window.removeEventListener("resize", updateScroll);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />

      <section className="max-w-7xl mx-auto px-4 space-y-3">
        {/* Header con título y dots */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Trending del día
          </h2>

          {/* Dots indicadores */}
          <div className="flex gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-6 bg-indigo-600 dark:bg-indigo-500"
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Ir al grupo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carrusel con flechas en hover */}
        <div className="relative group">
          {/* Flecha izquierda - visible solo en hover */}
          <button
            onClick={scrollPrev}
            className="hidden md:group-hover:flex absolute left-0 top-0 z-10 h-full w-12 items-center justify-center bg-gradient-to-r from-white/90 dark:from-gray-950/90 to-transparent hover:from-white dark:hover:from-gray-950 transition-all"
            aria-label="Anterior"
          >
            <svg
              className="w-8 h-8 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {items.map((media) => (
                <div
                  key={`${media.media_type}_${media.id}`}
                  className="flex-[0_0_33.33%] min-w-0 px-2 xs:flex-[0_0_25%] sm:flex-[0_0_20%] md:flex-[0_0_16.66%] lg:flex-[0_0_14.28%] xl:flex-[0_0_12.5%]"
                >
                  <MediaCard media={media} onCardClick={setSelectedMedia} />
                </div>
              ))}
            </div>
          </div>

          {/* Flecha derecha - visible solo en hover */}
          <button
            onClick={scrollNext}
            className="hidden md:group-hover:flex absolute right-0 top-0 z-10 h-full w-12 items-center justify-center bg-gradient-to-l from-white/90 dark:from-gray-950/90 to-transparent hover:from-white dark:hover:from-gray-950 transition-all"
            aria-label="Siguiente"
          >
            <svg
              className="w-8 h-8 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
