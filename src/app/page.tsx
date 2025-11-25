// src/app/page.tsx

import Header from "@/components/Header";

export default async function Home() {
  return (
    <div className="w-full mx-auto">
      <div className="relative w-full h-full flex flex-col justify-center">
        <section className="z-10 flex flex-col items-center gap-8 md:gap-10 pt-30">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
          <div className="px-4 flex flex-col items-center gap-2 md:gap-3 text-center">
            <h1 className="text-3xl md:text-4xl leading-tight tracking-tight font-medium">
              Guía de <span className="hidden md:inline">Plataformas </span>
              Streaming
            </h1>
            <p className="font-medium md:text-lg text-foreground-secondary">
              Elige tus títulos favoritos y descubre dónde verlos.
            </p>
          </div>
          <div className="w-full max-w-lg md:max-w-2xl flex flex-col items-center gap-6">
            <Header />
          </div>
        </section>
      </div>
    </div>
  );
}
