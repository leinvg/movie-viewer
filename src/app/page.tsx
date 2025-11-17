// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import { getTrendingAll } from "@/services/tmdb";

export default async function Home() {
  const trending = await getTrendingAll();

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 md:px-8">
        <section className="w-full py-[20vh] flex flex-col items-center 2xl:py-64">
          <div className="px-6 flex flex-col items-center gap-2 md:gap-3 mb-10 md:mb-12 text-center">
            <h1 className="text-3xl md:text-4xl leading-tight tracking-tight font-medium">
              Guía de <span className="hidden md:inline">Plataformas </span>
              Streaming
            </h1>
            <p className="md:text-lg dark:text-stone-100/70">
              Elige tus títulos favoritos y descubre dónde verlos.
            </p>
          </div>
          <div className="w-full max-w-lg md:max-w-2xl">
            <SearchBox />
          </div>
        </section>
      </div>
    </main>
  );
}
