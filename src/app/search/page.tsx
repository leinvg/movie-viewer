// src/app/search/page.tsx

import Header from "@/components/Header";
import SearchResults from "@/components/SearchResults";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { fetchFilteredSearch } from "@/services/tmdb";
import { SearchMediaResult } from "@/types";
import { APP_CONFIG } from "@/config";

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q || "").trim();

  let initial: SearchMediaResult = { results: [], hasMore: false, nextPage: 1 };
  if (q) {
    initial = await fetchFilteredSearch(
      q,
      1,
      APP_CONFIG.streaming.DEFAULT_SEARCH_LIMIT,
      {
        maxPagesToScan: APP_CONFIG.streaming.MAX_PAGES_SCAN,
      }
    );
  }

  return (
    <main className="flex-1">
      <Header initialQuery={q} />
      <div className="pt-40 p-4 max-w-7xl mx-auto">
        {q ? (
          <ErrorBoundary>
            <SearchResults
              initialResults={initial.results}
              initialHasMore={initial.hasMore}
              initialNextPage={initial.nextPage}
              query={q}
            />
          </ErrorBoundary>
        ) : (
          <div className="text-center py-24 text-gray-400">
            Escribe algo en el buscador para empezar.
          </div>
        )}
      </div>
    </main>
  );
}
