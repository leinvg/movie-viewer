// Loading skeleton para tarjetas mientras se cargan

"use client";

/**
 * Tarjeta esqueleto para mostrar durante loading
 * Mejora UX evitando flashes en blanco
 */
export function SkeletonCard() {
  return (
    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 animate-pulse relative">
      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800" />
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-700 rounded-md" />
    </div>
  );
}

/**
 * Grid esqueleto para mostrar durante carga inicial
 */
export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
