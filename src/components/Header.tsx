// src/components/Header.tsx

"use client";

import SearchBar from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK_BASE =
  "p-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-border-focus hover:text-foreground";

const PAGE_TITLES: Record<string, string> = {
  "/": "Inicio",
  "/favorites": "Favoritos",
  "/search": "Resultados",
};

interface HeaderProps {
  initialQuery?: string;
}

export default function Header({ initialQuery }: HeaderProps) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Buscar";

  const isHomePage = pathname === "/";
  const isFavoritesPage = pathname === "/favorites";

  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-6 pt-4 flex flex-col gap-2 items-center">
      <div className="flex gap-1.5 backdrop-blur-lg bg-surface rounded-full p-1.5 text-foreground-secondary hover:inset-ring hover:inset-ring-border transition-all">
        <Link
          href="/"
          className={`${LINK_BASE} ${isHomePage ? "bg-background text-foreground" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[1.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        <h1 className="flex items-center px-2 text-sm font-medium text-foreground-secondary">
          {title}
        </h1>
        <Link
          href="/favorites"
          className={`${LINK_BASE} ${isFavoritesPage ? "bg-background text-foreground" : ""}`}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[1.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[1.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </Link>
      </div>
      <SearchBar initialQuery={initialQuery} />
    </header>
  );
}
