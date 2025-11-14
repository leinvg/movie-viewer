
import FavoritesList from "@/components/FavoritesList";
import SearchHeader from "@/components/SearchHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function FavoritesPage() {
  return (
    <main className="flex-1">
      <SearchHeader initialQuery={""} />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tus Favoritos</h1>
        <ErrorBoundary>
          <FavoritesList />
        </ErrorBoundary>
      </div>
    </main>
  );
}
