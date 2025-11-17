// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import { getTrendingAll } from "@/services/tmdb";

export default async function Home() {
  const trending = await getTrendingAll();

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-neutral-950">
        <div className="flex items-center justify-center px-4 py-24">
          <div className="w-full max-w-2xl">
            <SearchBox />
          </div>
        </div>
        <div className="pb-12">
          <Carousel
            items={trending.results}
            title="Trending del día"
            showDots
          />
        </div>
      </main>
    </>
  );
}
