// src/app/page.tsx

import Carousel from "@/components/Carousel";
import {
  getTrendingAll,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
} from "@/services/tmdb";

export default async function Home() {
  const [trending, popularMovies, popularTv, upcomingMovies] =
    await Promise.all([
      getTrendingAll(2),
      getPopularMovies(2),
      getPopularTV(2),
      getUpcomingMovies(1),
    ]);

  return (
    <main className="space-y-8">
      {/* <Carousel items={trending.results} title="Tendencias del día" />
      <Carousel items={upcomingMovies.results} title="Próximos estrenos" />
      <Carousel items={popularMovies.results} title="Películas populares" />
      <Carousel items={popularTv.results} title="Series populares" /> */}
    </main>
  );
}
