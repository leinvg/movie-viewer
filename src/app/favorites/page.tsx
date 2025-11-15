import FavoritesList from "@/components/FavoritesList";
import SearchHeader from "@/components/SearchHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function FavoritesPage() {
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900">
      <SearchHeader />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Tus Favoritos
        </h1>
        <ErrorBoundary>
          <FavoritesList />
        </ErrorBoundary>
      </div>
    </main>
  );
}
