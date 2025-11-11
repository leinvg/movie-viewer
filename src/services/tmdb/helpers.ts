// src/services/tmdb/helpers.ts

import { TMDB_IMAGE_BASE_URL } from "./config";
import { TmdbImageSize } from "@/types";

/**
 * Genera la URL completa para una imagen de TMDB.
 *
 * @param path Path relativo de la imagen (e.g., "/abc123.jpg").
 * @param [size=TmdbImageSize.W500] Tamaño de la imagen deseado.
 * @returns La URL completa de la imagen o null.
 */
export function getImagePath(
  path: string | null | undefined,
  size: TmdbImageSize = TmdbImageSize.W500
): string | null {
  return path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : null;
}
