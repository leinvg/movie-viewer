// Generic hook for fetching data from API endpoints

import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Generic hook for fetching data from any API endpoint.
 * Handles loading states, errors, and cleanup automatically.
 * 
 * @param endpoint - API endpoint to fetch from (null to skip fetch)
 * @returns Object with data, loading state, and error
 * 
 * @example
 * const { data: movie } = useFetchTMDB<TMDBMovie>(
 *   type && id ? `/api/media/${type}/${id}` : null
 * );
 */
export const useFetchTMDB = <T>(
  endpoint: string | null
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!endpoint) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`Failed to fetch from ${endpoint}`);

        const json = await res.json();
        if (mounted) setData(json);
      } catch (err: unknown) {
        if (mounted)
          setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
};
