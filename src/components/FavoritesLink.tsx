// src/components/FavoritesLink.tsx

"use client";

import Link from "next/link";
import useAppStore from "@/store/appStore";

export default function FavoritesLink() {
  const { favorites } = useAppStore();

  if (favorites.length === 0) return null;

  return (
    <Link
      href="/favorites"
      className="inline-flex items-center gap-1 text-sm text-stone-100/70 hover:text-stone-100 transition-colors"
    >
      Ver mis {favorites.length} favoritos
      <span className="text-lg">→</span>
    </Link>
  );
}
