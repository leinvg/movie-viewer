// src/app/favorites/error.tsx

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en página de favoritos:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full p-6 bg-surface rounded-lg border border-line">
        <h2 className="text-xl font-bold text-foreground mb-2">
          Oops! Algo salió mal
        </h2>
        <p className="text-foreground-secondary text-sm mb-4">
          {error.message || "Ha ocurrido un error inesperado"}
        </p>
        <button
          onClick={reset}
          className="w-full py-2.5 px-4 bg-surface-hover rounded-lg text-foreground font-medium transition-all hover:bg-line focus-visible:ring-2 focus-visible:ring-line-focus outline-none"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
