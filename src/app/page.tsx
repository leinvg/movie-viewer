// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="container mx-auto">
      <div className="relative w-full h-full flex flex-col justify-end">
        {/* Hero Image */}
        <div className="absolute top-0 w-full h-9/12 md:h-8/12">
          {/* Mobile - Light */}
          <Image
            src="/hero-mobile.jpg"
            alt="Hero background light"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover sm:hidden dark:hidden"
          />
          {/* Mobile - Dark */}
          <Image
            src="/hero-mobile-dark.jpg"
            alt="Hero background dark"
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover hidden dark:block sm:dark:hidden"
          />

          {/* Tablet - Light */}
          <Image
            src="/hero-tablet.jpg"
            alt="Hero background"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-cover object-bottom hidden sm:block lg:hidden dark:hidden"
          />
          {/* Tablet - Dark */}
          <Image
            src="/hero-tablet-dark.jpg"
            alt="Hero background"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-cover hidden sm:dark:block lg:dark:hidden"
          />

          {/* Desktop - Light */}
          <Image
            src="/hero-desktop.jpg"
            alt="Hero background"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover hidden lg:block dark:hidden"
          />
          {/* Desktop - Dark */}
          <Image
            src="/hero-desktop-inverse.jpg"
            alt="Hero background"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover hidden lg:dark:block"
          />

          {/* Gradiente overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,transparent_45%,var(--bg-primary)_90%)] md:bg-[radial-gradient(circle_at_50%_-10%,transparent_0%,transparent_40%,var(--bg-primary)_80%)]" />
        </div>

        <section className="z-10 bg-gradient-to-b from-transparent to-bg-primary to-40% md:to-35% flex flex-col items-center gap-8 md:gap-10 pt-20">
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
            <p className="font-medium dark:font-normal md:text-lg text-fg-secondary">
              Elige tus títulos favoritos y descubre dónde verlos.
            </p>
          </div>
          <div className="w-full max-w-lg md:max-w-2xl flex flex-col items-center gap-6">
            <SearchBox />
          </div>
        </section>
      </div>
    </div>
  );
}
