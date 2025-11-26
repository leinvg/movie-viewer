// src/components/Header.tsx

"use client";

import Link from "next/link";
import useAppStore from "@/store/appStore";
import SearchBar from "./SearchBar";

const NAV_LINK =
  "flex items-center w-full justify-center gap-2 py-2.5 px-3.5 bg-surface rounded-lg outline-none transition-all hover:text-foreground hover:bg-surface-hover focus-visible:ring-2 focus-visible:bg-surface-hover";

function FavoritesButton() {
  const { favorites } = useAppStore();
  const favCount = favorites.length;

  return (
    <Link href="/favorites" className={NAV_LINK} aria-label="Favoritos">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-5 stroke-current stroke-[1.5px] fill-none"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      {favCount > 0 && <span className="text-sm font-medium">{favCount}</span>}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex flex-wrap xs:flex-nowrap w-full gap-2 p-2 bg-canvas border-b border-line transition-all sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg sm:border-x sm:rounded-b-2xl md:text-foreground-secondary">
      <div className="flex-1 flex order-1 sm:flex-initial">
        <Link href="/" className={NAV_LINK} aria-label="Inicio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 stroke-current stroke-[1.5px] fill-none"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
      </div>

      <div className="w-full order-3 xs:order-2">
        <SearchBar />
      </div>

      <div className="flex-1 flex order-2 justify-end xs:flex-initial xs:order-3">
        <FavoritesButton />
      </div>
    </header>
  );
}
