// src/services/tmdb/tmdbSearch.ts

import { fetchFromTMDB } from "./client";
import {
  TMDBListResponse,
  TMDBMultiMedia,
  TMDBMedia,
  TMDBPerson,
} from "@/types";

// Definimos el tipo de respuesta simplificado que se ajusta a tus necesidades.
// Ya no es la respuesta paginada estándar de TMDB.
export interface SearchMediaResult {
  results: TMDBMedia[];
  hasMore: boolean;
  nextPage: number;
}

// comentario prueba

/**
 * Busca medios (películas/series) en TMDB usando el endpoint 'multi'.
 * Expande resultados 'person' para incluir sus 'known_for'.
 *
 * @param query Texto de búsqueda.
 * @param page Página de TMDB para iniciar la búsqueda.
 * @param limit Límite de resultados a devolver por llamada.
 * @returns Lista de medios únicos, indicador de si hay más resultados, y la siguiente página a solicitar.
 */
export async function searchMedia(
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<SearchMediaResult> {
  // 1. Manejo de Query Vacía
  if (!query.trim()) return { results: [], hasMore: false, nextPage: 1 };

  try {
    const allResults: TMDBMedia[] = [];
    const seen = new Set<string>(); // Para desduplicación
    let tmdbPage = page;
    let hasMore = true;

    // 2. Loop para obtener suficientes resultados hasta alcanzar el 'limit'
    while (allResults.length < limit && hasMore) {
      const data = await fetchFromTMDB<TMDBListResponse<TMDBMultiMedia>>(
        `/search/multi?query=${encodeURIComponent(
          query
        )}&include_adult=false&page=${tmdbPage}`
      );

      // Si no hay más páginas en TMDB, detenemos el loop
      if (tmdbPage >= data.total_pages) {
        hasMore = false;
      }

      // 3. Procesamiento y Expansión de Resultados de la Página Actual
      const expandedAndFiltered = data.results.flatMap((item) => {
        // Filtrar inmediatamente si no es un tipo que queremos
        if (item.media_type === "movie" || item.media_type === "tv") {
          // Tipamos con un 'type guard' simple
          return [item as TMDBMedia];
        }

        // Expandir known_for de personas
        if (item.media_type === "person" && (item as TMDBPerson).known_for) {
          const person = item as TMDBPerson;
          // Solo queremos los known_for que son media (movie o tv)
          return person.known_for.filter(
            (kf) => kf.media_type === "movie" || kf.media_type === "tv"
          );
        }

        return []; // Descartar otros tipos (por ejemplo, personas sin known_for, si existiera)
      });

      // 4. Desduplicación y Aplicación del Límite
      for (const item of expandedAndFiltered) {
        // Usamos la propiedad discriminante 'media_type' y 'id' para la clave única
        const key = `${item.media_type}_${item.id}`;

        if (!seen.has(key)) {
          seen.add(key);
          allResults.push(item);

          // Si ya alcanzamos el límite deseado, salimos del loop de resultados y de la página
          if (allResults.length === limit) {
            break;
          }
        }
      }

      // Avanzamos a la siguiente página de TMDB si no hemos alcanzado el límite
      if (allResults.length < limit && data.results.length > 0) {
        tmdbPage++;
      } else {
        // Si alcanzamos el límite en esta página, la siguiente búsqueda comenzará desde esta misma página.
        // Esto asegura que los resultados extra que ignoramos ahora se vean en la siguiente llamada.
        // Sin embargo, para una carga simple de 'Ver Más', lo más fácil es simplemente incrementar la página.
        tmdbPage++;
      }
    }

    // 5. Retorno Final
    return {
      // Devolvemos solo los resultados hasta el límite
      results: allResults.slice(0, limit),
      // Si salimos del loop porque alcanzamos el límite, hay más. Si salimos por 'hasMore=false', no hay más.
      hasMore: allResults.length >= limit || hasMore,
      nextPage: tmdbPage,
    };
  } catch (error: any) {
    // Manejo de errores de TMDB (client.ts)
    if (error.type === "RATE_LIMIT") throw error;
    throw new Error(`Error en búsqueda TMDB: ${error.message}`);
  }
}
