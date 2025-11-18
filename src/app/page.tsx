// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import FavoritesLink from "@/components/FavoritesLink";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <>
      <Header variant="minimal" />
      <main className="flex-1 flex">
      <div className="container mx-auto px-8 md:px-12 flex">
        <section className="py-30 w-full flex flex-col items-center justify-center 2xl:py-64 gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
            <h1 className="text-3xl md:text-4xl leading-tight tracking-tight font-medium">
              Guía de <span className="hidden md:inline">Plataformas </span>
              Streaming
            </h1>
            <p className="md:text-lg dark:text-stone-100/70">
              Elige tus títulos favoritos y descubre dónde verlos.
            </p>
          </div>
          <div className="w-full max-w-lg md:max-w-2xl flex flex-col items-center gap-6">
            <SearchBox />
            <FavoritesLink />
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
