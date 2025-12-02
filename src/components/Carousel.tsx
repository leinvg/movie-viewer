// src/components/Carousel.tsx

"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { TMDBMedia } from "@/types";

interface CarouselProps {
  items: TMDBMedia[];
  title?: string;
  showDots?: boolean;
  onCardClick?: (media: TMDBMedia) => void;
}

export default function Carousel({
  items,
  title,
  showDots = false,
  onCardClick,
}: CarouselProps) {
  const [slidesToScroll, setSlidesToScroll] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const width = window.innerWidth;

      if (width >= 1536) setSlidesToScroll(7);
      else if (width >= 1280) setSlidesToScroll(6);
      else if (width >= 1024) setSlidesToScroll(5);
      else if (width >= 768) setSlidesToScroll(4);
      else if (width >= 500) setSlidesToScroll(3);
      else setSlidesToScroll(2);
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
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-4 md:py-8 overflow-hidden">
      {(title || showDots) && (
        <div className="flex items-center justify-between px-6 md:px-10">
          {title && (
            <h2 className="md:text-lg font-semibold text-foreground">
              {title}
            </h2>
          )}
          {showDots && (
            <div className="hidden md:flex gap-2 pr-0.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`size-2 rounded-full transition-all cursor-pointer ${
                    index === selectedIndex
                      ? "bg-foreground"
                      : "bg-foreground-tertiary hover:bg-foreground-secondary"
                  }`}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Carrusel con flechas absolutas */}
      <div className="relative group px-4 md:px-8">
        {/* Flecha izquierda */}
        {canScrollPrev && (
          <div className="absolute hidden md:flex items-center pr-2 left-0 top-1/2 -translate-y-1/2 z-10 h-full bg-gradient-to-r from-canvas from-90% to-transparent opacity-0 group-hover:opacity-100">
            <button
              onClick={scrollPrev}
              className="px-1 h-2/5 items-center rounded-lg bg-surface text-foreground transition-all cursor-pointer hover:bg-surface-hover active:scale-95"
              aria-label="Anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-6 fill-none stroke-current stroke-[3px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Contenedor del carrusel */}
        <div className="md:overflow-hidden" ref={emblaRef}>
          <div className="flex py-4">
            {items.map((media) => (
              <div
                key={`${media.media_type}_${media.id}`}
                className="min-w-36 flex-[0_0_44%] px-1.5 md:px-2 sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.66%] 2xl:flex-[0_0_14.28%]"
              >
                <MediaCard media={media} onCardClick={onCardClick} />
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        {canScrollNext && (
          <div className="absolute hidden md:flex items-center pl-2 right-0 top-1/2 -translate-y-1/2 z-10 h-full bg-gradient-to-l from-canvas from-90% to-transparent opacity-0 group-hover:opacity-100">
            <button
              onClick={scrollNext}
              className="px-1 h-2/5 items-center rounded-lg bg-surface text-foreground hover:bg-surface-hover transition-all cursor-pointer active:scale-95"
              aria-label="Siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-6 fill-none stroke-current stroke-[3px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
