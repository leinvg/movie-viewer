// src/app/page.tsx

import HomeCarousels from "@/components/HomeCarousels";
import {
  getTrendingMovies,
  getTrendingTv,
  getUpcomingMovies,
} from "@/services/tmdb";

export default async function Home() {
  // Fetch data in parallel
  const [trendingMovies, trendingTv, upcomingMovies] = await Promise.all([
    getTrendingMovies(20),
    getTrendingTv(20),
    getUpcomingMovies(20),
  ]);

  return (
    <div className="flex flex-col justify-center w-full">
      <section className="text-center px-8 py-24 md:py-32 md:px-16">
        <h1 className="mb-4 sm:mb-6 md:mb-8 text-4xl sm:text-5xl leading-tight tracking-tight font-medium md:text-6xl">
          Guía de Plataformas Streaming
        </h1>
        <p className="text-foreground-secondary font-medium sm:text-xl dark:font-normal">
          Elige tus títulos favoritos y descubre dónde verlos.
        </p>
      </section>

      <HomeCarousels
        trendingMovies={trendingMovies}
        trendingTv={trendingTv}
        upcomingMovies={upcomingMovies}
      />
    </div>
  );
}
