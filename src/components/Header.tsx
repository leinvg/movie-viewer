"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode; // centro del header (por ejemplo el input de búsqueda)
}

const FAVORITES_KEY = "mv_favorites";

export default function Header({ children }: Props) {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        const arr = raw ? JSON.parse(raw) : [];
        setCount(Array.isArray(arr) ? arr.length : 0);
      } catch {
        setCount(0);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) read();
    };
    const onCustom = () => read();
    window.addEventListener("storage", onStorage);
    window.addEventListener("mv_favorites_changed", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mv_favorites_changed", onCustom as EventListener);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-950 to-gray-900 border-b border-indigo-900/30 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
        <div
          className="font-bold text-2xl cursor-pointer hover:text-indigo-400 transition-colors"
          onClick={() => router.push("/")}
        >
          moviewer
        </div>

        <div className="flex-1">{children}</div>

        <button
          onClick={() => router.push("/favorites")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
          aria-label="Ir a favoritos"
        >
          <span>⭐</span>
          <span>Favoritos</span>
          <span className="bg-indigo-800 px-2 py-0.5 rounded text-xs font-bold">{count}</span>
        </button>
      </div>
    </header>
  );
}
