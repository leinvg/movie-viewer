"use client";

export default function LoadingFavorites() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Cargando favoritos...</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-4 h-48" />
        ))}
      </div>
    </div>
  );
}
