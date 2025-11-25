// src/app/page.tsx

export default async function Home() {
  return (
    <div className="flex flex-col justify-center w-full">
      <section className="text-center px-8 md:px-16">
        <h1 className="mb-3 md:mb-6 text-3xl leading-tight tracking-tight font-medium md:text-6xl">
          Guía de Plataformas Streaming
        </h1>
        <p className="text-foreground-secondary font-medium md:text-xl dark:font-normal">
          Elige tus títulos favoritos y descubre dónde verlos.
        </p>
      </section>
    </div>
  );
}
