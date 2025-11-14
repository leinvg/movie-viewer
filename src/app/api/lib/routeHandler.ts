// Middleware compartido para rutas de API de media

import { NextResponse } from "next/server";
import { getMediaDetails, getMediaCredits, getMediaProviders } from "@/services/tmdb";
import { TMDBMedia } from "@/types";
import { CreditsResponse } from "@/types/creditsTypes";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";

type MediaType = "movie" | "tv";
type Operation = "details" | "credits" | "providers";

/**
 * Crea un handler tipado para rutas de API de media
 * Elimina duplicación en 6 rutas (movie/tv × 3 operaciones)
 *
 * @param type - Tipo de media ('movie' | 'tv')
 * @param operation - Operación a realizar ('details' | 'credits' | 'providers')
 */
export const createMediaRouteHandler =
  (type: MediaType, operation: Operation) =>
  async (
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    try {
      const resolvedParams = await params;
      const id = parseInt(resolvedParams.id, 10);

      // Validar ID
      if (isNaN(id)) {
        return NextResponse.json(
          { error: `Invalid ${type} ID` },
          { status: 400 }
        );
      }

      // Ejecutar operación según tipo
      let data: TMDBMedia | CreditsResponse | WatchProvidersResponse;

      switch (operation) {
        case "details":
          data = await getMediaDetails(type, id);
          break;
        case "credits":
          data = await getMediaCredits(type, id);
          break;
        case "providers":
          data = await getMediaProviders(type, id);
          break;
        default:
          return NextResponse.json(
            { error: "Invalid operation" },
            { status: 400 }
          );
      }

      return NextResponse.json(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
