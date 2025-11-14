// Hook para fetchar detalles + créditos de una película o serie

import { useEffect, useState } from "react";
import { TMDBMedia } from "@/types";
import { CreditsResponse } from "@/types/creditsTypes";

interface UseFetchMediaResult {
  media: TMDBMedia | null;
  credits: CreditsResponse | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook personalizado para fetchar detalles + créditos en paralelo
 * - Maneja loading y error states
 * - Hace requests paralelos para optimizar
 * - Type-safe con discriminated unions
 */
export const useFetchMedia = (
  type: "movie" | "tv" | null,
  id: number | null
): UseFetchMediaResult => {
  const [media, setMedia] = useState<TMDBMedia | null>(null);
  const [credits, setCredits] = useState<CreditsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!type || !id) {
      setMedia(null);
      setCredits(null);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch detalles y créditos en paralelo
        const [mediaResponse, creditsResponse] = await Promise.all([
          fetch(`/api/media/${type}/${id}`),
          fetch(`/api/media/${type}/${id}/credits`),
        ]);

        if (!mediaResponse.ok) {
          throw new Error(`Failed to fetch ${type} details`);
        }

        const mediaData = await mediaResponse.json();
        if (mounted) setMedia(mediaData);

        // Créditos son opcionales
        if (creditsResponse.ok) {
          const creditsData = await creditsResponse.json();
          if (mounted) setCredits(creditsData);
        }
      } catch (err: unknown) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setMedia(null);
          setCredits(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [type, id]);

  return { media, credits, loading, error };
};
