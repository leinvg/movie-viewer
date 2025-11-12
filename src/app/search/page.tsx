// src/app/search/page.tsx

import SearchHeader from "@/components/SearchHeader";
import SearchResults from "@/components/SearchResults";
import { searchMedia, SearchMediaResult } from "@/services/tmdb/search";

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = (params.q || "").trim();

  // Helper: fetch filtered results that include required fields
  async function fetchFiltered(initialPage: number, limit: number) {
    let aggregatedResults: SearchMediaResult = { results: [], hasMore: false, nextPage: initialPage };
    let page = initialPage;
    let keepGoing = true;

    while (aggregatedResults.results.length < limit && keepGoing) {
      try {
        const chunk = await searchMedia(q, page, limit);
        // filter required fields
        const filtered = chunk.results.filter(
          (m) => m.poster_path && m.backdrop_path && Array.isArray((m as any).genre_ids) && (m as any).genre_ids.length > 0
        );
        aggregatedResults.results.push(...filtered);
        aggregatedResults.hasMore = chunk.hasMore;
        aggregatedResults.nextPage = chunk.nextPage;
        // decide whether to continue
        if (!chunk.hasMore) keepGoing = false;
        page = chunk.nextPage;
      } catch (err) {
        console.error("Search error:", err);
        keepGoing = false;
      }
    }

    // trim to requested limit
    aggregatedResults.results = aggregatedResults.results.slice(0, limit);
    return aggregatedResults;
  }

  let initial: SearchMediaResult = { results: [], hasMore: false, nextPage: 1 };
  if (q) {
    initial = await fetchFiltered(1, 12);
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
