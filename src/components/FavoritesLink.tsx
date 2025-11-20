// src/components/FavoritesLink.tsx

"use client";

import Link from "next/link";
import useAppStore from "@/store/appStore";

export default function FavoritesLink() {
  const { favorites } = useAppStore();

  return (
    <Link
      href="/favorites"
      className="relative p-3.5 rounded-full text-soft dark:text-soft-dark hover:text-base dark:hover:text-base-dark transition-colors outline-none focus-visible:ring-2 focus-visible:ring-focus dark:focus-visible:ring-focus-dark"
      aria-label="Ir a favoritos"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-6 fill-none stroke-current stroke-[1.5px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
      {favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center size-5 bg-indigo-600 text-white text-xs font-bold rounded-full">
          {favorites.length}
        </span>
      )}
    </Link>
  );
}
