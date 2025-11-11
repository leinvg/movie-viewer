// src/services/tmdb/client.ts

import { TMDB_BASE_URL, TMDB_LANGUAGE } from "./config";

// --- Definición de Tipos de Error ---

/** Estructura de error para el límite de tasa (HTTP 429). */
export type RateLimitError = {
  type: "RATE_LIMIT";
  retryAfter: number;
  message: string;
};

// --- Función Principal ---

/**
 * Realiza solicitudes GET tipadas a la API de TMDB.
 *
 * @param endpoint Ruta del recurso (e.g., "/movie/popular").
 * @returns Datos JSON de la respuesta.
 */
export async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const token = process.env.TMDB_TOKEN;
  if (!token) throw new Error("Falta el token de autenticación TMDB.");

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("language", TMDB_LANGUAGE);

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Manejo de Rate Limit (HTTP 429)
  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get("Retry-After") || "10", 10);
    const error: RateLimitError = {
      type: "RATE_LIMIT",
      retryAfter,
      message: `Límite de tasa alcanzado. Reintenta en ${retryAfter} segundos.`,
    };
    throw error;
  }

  // Manejo de Errores Generales (4xx, 5xx)
  if (!res.ok) {
    const errorBody = await res.text();
    const preview = errorBody.substring(0, 120);
    throw new Error(`TMDB Error ${res.status} en ${endpoint}: ${preview}...`);
  }

  return res.json() as Promise<T>;
}
