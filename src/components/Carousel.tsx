// src/components/Carousel.tsx

"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { TMDBMedia } from "@/types/mediaTypes";

interface CarouselProps {
  items: TMDBMedia[];
  title?: string;
}

/** Carrusel con Embla, sincronizado con breakpoints */
export default function Carousel({ items, title }: CarouselProps) {
  const [slidesToScroll, setSlidesToScroll] = useState(3);

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
    loop: true,
    align: "start",
    slidesToScroll,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="space-y-2 **:data-carousel-container:px-[4%] **:data-carousel-container:xl:px-[3%] **:data-carousel-item:px-[0.8%] **:data-carousel-item:xs:px-[0.6%] **:data-carousel-item:md:px-[0.4%] **:data-carousel-item:xl:px-[0.3%] **:data-carousel-item:2xl:px-[0.2%]">
      {title && (
        <div data-carousel-container>
          <h2 data-carousel-item className="text-lg font-bold">
            {title}
          </h2>
        </div>
      )}

      <div className="relative group text-white **:data-carousel-nav-btn:hidden **:data-carousel-nav-btn:md:group-hover:flex **:data-carousel-nav-btn:justify-center **:data-carousel-nav-btn:items-center **:data-carousel-nav-btn:absolute **:data-carousel-nav-btn:z-10 **:data-carousel-nav-btn:top-0 **:data-carousel-nav-btn:bg-black/50 **:data-carousel-nav-btn:hover:bg-black/70 **:data-carousel-nav-btn:w-[4%] **:data-carousel-nav-btn:xl:w-[3%] **:data-carousel-nav-btn:h-full **:data-carousel-nav-btn:cursor-pointer **:data-carousel-nav-btn:transition-colors **:data-carousel-nav-icon:size-[80%] **:data-carousel-nav-icon:stroke-2 **:data-carousel-nav-icon:stroke-current **:data-carousel-nav-icon:fill-none **:data-carousel-nav-icon:transition-transform **:data-carousel-nav-icon:group-hover/button:scale-110">
        <button
          onClick={scrollPrev}
          data-carousel-nav-btn
          className="left-0 group/button"
        >
          <svg data-carousel-nav-icon viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div data-carousel-container className="overflow-hidden" ref={emblaRef}>
          <div className="flex min-w-70">
            {items.map((media) => (
              <div
                key={media.id}
                data-carousel-item
                className="min-w-[33.3%] xs:min-w-[25%] md:min-w-[20%] lg:min-w-[16.6%] xl:min-w-[14.3%] 2xl:min-w-[12.5%]"
              >
                <MediaCard media={media} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          data-carousel-nav-btn
          className="right-0 group/button"
        >
          <svg data-carousel-nav-icon viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
