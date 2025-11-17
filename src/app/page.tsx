// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import { getTrendingAll } from "@/services/tmdb";

export default async function Home() {
  const trending = await getTrendingAll();

  return (
    <>
      <main className="flex-1 h-full flex flex-col pt-30">
        <div className="container mx-auto flex items-center justify-center px-4 py-24">
          <div className="flex flex-col items-center w-full max-w-2xl">
            <h1 className="text-center text-5xl tracking-tight font-medium text-white">
              Guía de Streaming
            </h1>
            <p className="mt-5 mb-12 text-center tracking-wide text-white/70">
              Elige tus favoritas y encuentra dónde verlas.
            </p>
            <SearchBox />
          </div>
        </div>
        {/* <div className="pb-12">
          <Carousel
            items={trending.results}
            title="Trending del día"
            showDots
          />
        </div> */}
      </main>
    </>
  );
}
