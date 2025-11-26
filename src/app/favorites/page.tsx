// src/app/favorites/page.tsx

import FavoritesList from "@/components/FavoritesList";
import RegionSelector from "@/components/RegionSelector";

export default function FavoritesPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tus Favoritos
        </h1>
        <RegionSelector />
      </div>
      <FavoritesList />
    </div>
  );
}
