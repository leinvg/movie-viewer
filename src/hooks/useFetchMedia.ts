// Hook para fetchar detalles + créditos de una película o serie

import { useEffect, useState } from "react";
import { TMDBMedia } from "@/types";

interface UseFetchMediaResult {
  media: TMDBMedia | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook personalizado para fetchar solo los detalles de una película o serie
 * Créditos se deben solicitar por separado cuando el cliente los necesite.
 */
export const useFetchMedia = (
  type: "movie" | "tv" | null,
  id: number | null
): UseFetchMediaResult => {
  const [media, setMedia] = useState<TMDBMedia | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!type || !id) {
      setMedia(null);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/media/${type}/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch ${type} details`);

        const mediaData = await res.json();
        if (mounted) setMedia(mediaData);
      } catch (err: unknown) {
        if (mounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [type, id]);

  return { media, loading, error };
};
