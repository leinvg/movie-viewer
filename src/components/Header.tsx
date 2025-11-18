// src/components/Header.tsx

"use client";

import { useRouter } from "next/navigation";
import useAppStore from "@/store/appStore";
import ThemeToggle from "./ThemeToggle";
import SearchBox from "./SearchBox";

interface HeaderProps {
  variant?: "minimal" | "full";
  initialQuery?: string;
}

export default function Header({ variant = "minimal", initialQuery }: HeaderProps) {
  const router = useRouter();
  const { favorites } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 sm:gap-4 md:gap-6">
        <div
          className="font-bold text-xl sm:text-2xl cursor-pointer hover:text-indigo-400 transition-colors flex-shrink-0"
          onClick={() => router.push("/")}
        >
          moviewer
        </div>

        {variant === "full" && (
          <>
            <div className="flex-1">
              <SearchBox initialQuery={initialQuery} />
            </div>

            <ThemeToggle />

            <button
              onClick={() => router.push("/favorites")}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 px-3 sm:px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
              aria-label="Ir a favoritos"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">Favoritos</span>
              <span className="hidden sm:inline bg-sky-800 px-2 py-0.5 rounded text-xs font-bold">
                {favorites.length}
              </span>
            </button>
          </>
        )}

        {variant === "minimal" && <div className="flex-1" />}
      </div>
    </header>
  );
}
