import MovieCarousel from "@/components/MovieCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">🎬 Películas en Tendencia</h1>
      <MovieCarousel />
    </main>
  );
}
