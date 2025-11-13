// src/types/searchTypes.ts

import { TMDBMedia } from "./mediaTypes";

/** Resultado de búsqueda usado por el servicio y la API interna */
export interface SearchMediaResult {
  results: TMDBMedia[];
  hasMore: boolean;
  nextPage: number;
}
