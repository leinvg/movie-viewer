// src/app/search/page.tsx

import SearchHeader from "@/components/SearchHeader";
import SearchResults from "@/components/SearchResults";
import { fetchFilteredSearch } from "@/services/tmdb";
import { SearchMediaResult } from "@/types";

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q || "").trim();

  let initial: SearchMediaResult = { results: [], hasMore: false, nextPage: 1 };
  if (q) {
    // Use centralized service that applies filtering and pagination rules.
    initial = await fetchFilteredSearch(q, 1, 12, { maxPagesToScan: 6 });
  }

  return (
    <main className="min-h-screen">
      <SearchHeader initialQuery={q} />
      <div className="p-4 max-w-7xl mx-auto">
        {q ? (
          <SearchResults
            initialResults={initial.results}
            initialHasMore={initial.hasMore}
            initialNextPage={initial.nextPage}
            query={q}
          />
        ) : (
          <div className="text-center py-24 text-gray-400">
            Escribe algo en el buscador para empezar.
          </div>
        )}
      </div>
    </main>
  );
}
