"use client";

import { useRouter } from "next/navigation";
import useAppStore from "@/store/appStore";
import ThemeToggle from "./ThemeToggle";
import RegionSelector from "./RegionSelector";

export default function Header({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { favorites } = useAppStore();

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

        {/* Controles de tema y región */}
        <div className="flex items-center gap-3">
          <RegionSelector />
          <ThemeToggle />
        </div>

        <button
          onClick={() => router.push("/favorites")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
          aria-label="Ir a favoritos"
        >
          <span>⭐</span>
          <span>Favoritos</span>
          <span className="bg-indigo-800 px-2 py-0.5 rounded text-xs font-bold">
            {favorites.length}
          </span>
        </button>
      </div>
    </header>
  );
}
