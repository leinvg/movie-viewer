// src/services/tmdb/helpers.ts

import { TMDB_IMAGE_BASE_URL } from "./config";
import { TmdbImageSize } from "@/types";

export function getImagePath(
  path: string | null | undefined,
  size: TmdbImageSize = TmdbImageSize.W500
): string | null {
  return path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : null;
}
