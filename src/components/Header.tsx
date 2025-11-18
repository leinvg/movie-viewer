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

export default function Header({
  variant = "minimal",
  initialQuery,
}: HeaderProps) {
  const router = useRouter();
  const { favorites } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex">
      <div className="container mx-auto pt-20 flex justify-center">
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

        {variant === "minimal" && (
          <div className="px-2 py-2 flex items-center gap-2 inset-ring inset-ring-neutral-700 rounded-full bg-neutral-900/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => router.push("/")}
              aria-label="Ir a la página principal"
              className="p-2.5 bg-neutral-200 text-stone-900 rounded-full transition-all cursor-pointer outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-[2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
