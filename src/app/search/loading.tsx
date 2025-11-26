"use client";

export default function LoadingSearch() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Buscando...</h2>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-4 h-20" />
        ))}
      </div>
    </div>
  );
}
