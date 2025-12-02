// src/components/HomeCarousels.tsx

"use client";

import Carousel from "./Carousel";
import { TMDBMedia, TMDBListResponse } from "@/types";
import { useMediaModal } from "@/contexts/MediaModalContext";

interface HomeCarouselsProps {
  trendingMovies: TMDBListResponse<TMDBMedia>;
  trendingTv: TMDBListResponse<TMDBMedia>;
  upcomingMovies: TMDBListResponse<TMDBMedia>;
}

export default function HomeCarousels({
  trendingMovies,
  trendingTv,
  upcomingMovies,
}: HomeCarouselsProps) {
  const { openModal } = useMediaModal();

  return (
    <>
      {/* Trending Movies carousel */}
      {trendingMovies.results.length > 0 && (
        <Carousel
          items={trendingMovies.results}
          title="Tendencias de hoy: Películas"
          showDots
          onCardClick={openModal}
        />
      )}

      {/* Trending TV carousel */}
      {trendingTv.results.length > 0 && (
        <Carousel
          items={trendingTv.results}
          title="Tendencias de hoy: Series"
          showDots
          onCardClick={openModal}
        />
      )}

      {/* Upcoming movies carousel */}
      {upcomingMovies.results.length > 0 && (
        <Carousel
          items={upcomingMovies.results}
          title="Próximos Estrenos"
          showDots
          onCardClick={openModal}
        />
      )}
    </>
  );
}
