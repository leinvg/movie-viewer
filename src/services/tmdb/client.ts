// src/services/tmdb/client.ts

import { TMDB_BASE_URL, TMDB_LANGUAGE } from "./config";

export type RateLimitError = {
  type: "RATE_LIMIT";
  retryAfter: number;
  message: string;
};

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

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get("Retry-After") || "10", 10);
    const error: RateLimitError = {
      type: "RATE_LIMIT",
      retryAfter,
      message: `Límite de tasa alcanzado. Reintenta en ${retryAfter} segundos.`,
    };
    throw error;
  }

  if (!res.ok) {
    const errorBody = await res.text();
    const preview = errorBody.substring(0, 120);
    throw new Error(`TMDB Error ${res.status} en ${endpoint}: ${preview}...`);
  }

  return res.json() as Promise<T>;
}
