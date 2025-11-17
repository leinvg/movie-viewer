import FavoritesList from "@/components/FavoritesList";
import SearchHeader from "@/components/SearchHeader";
import RegionSelector from "@/components/RegionSelector";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function FavoritesPage() {
  return (
    <main className="flex-1">
      <SearchHeader />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tus Favoritos
          </h1>
          <RegionSelector />
        </div>
        <ErrorBoundary>
          <FavoritesList />
        </ErrorBoundary>
      </div>
    </main>
  );
}
