// Tests para la utilidad de agregación de proveedores

import {
  aggregateProviders,
  getRecommendedProviders,
  getOtherProviders,
  type ProviderStat,
} from "./providerAggregator";
import { TMDBMovie } from "@/types";
import { WatchProvidersResponse } from "@/types/watchProviderTypes";

// Mock data
const mockMovie: TMDBMovie = {
  id: 1,
  media_type: "movie",
  title: "Test Movie",
  original_title: "Test Movie",
  release_date: "2024-01-01",
  video: false,
  backdrop_path: null,
  poster_path: null,
  adult: false,
  genre_ids: [28],
  original_language: "en",
  overview: "Test",
  popularity: 100,
  vote_average: 8.5,
  vote_count: 1000,
};

const mockMovie2: TMDBMovie = {
  ...mockMovie,
  id: 2,
  title: "Test Movie 2",
};

const mockProviderResponse: WatchProvidersResponse = {
  id: 1,
  results: {
    PE: {
      flatrate: [
        {
          logo_path: "/netflix.png",
          provider_id: 8,
          provider_name: "Netflix",
          display_priority: 1,
        },
      ],
      buy: [
        {
          logo_path: "/amazon.png",
          provider_id: 1,
          provider_name: "Amazon Prime",
          display_priority: 2,
        },
      ],
    },
  },
};

const mockProviderResponse2: WatchProvidersResponse = {
  id: 2,
  results: {
    PE: {
      flatrate: [
        {
          logo_path: "/netflix.png",
          provider_id: 8,
          provider_name: "Netflix",
          display_priority: 1,
        },
      ],
    },
  },
};

// Tests
console.log("=== providerAggregator.test.ts ===\n");

// Test 1: aggregateProviders básico
console.log("Test 1: aggregateProviders con 2 películas y Netflix + Amazon");
const result1 = aggregateProviders(
  [mockMovie, mockMovie2],
  [mockProviderResponse, mockProviderResponse2],
  "PE"
);
const test1Pass =
  result1.length === 2 &&
  result1[0].id === 8 &&
  result1[0].count === 2 &&
  result1[1].id === 1 &&
  result1[1].count === 1;
console.log(test1Pass ? "✓ PASS" : "✗ FAIL");
console.log(`  Resultado: ${result1.length} proveedores`);
console.log(`  Netflix: count=${result1[0].count}, Amazon: count=${result1[1].count}\n`);

// Test 2: aggregateProviders con región no encontrada
console.log(
  "Test 2: aggregateProviders con región no disponible (debe retornar vacío)"
);
const result2 = aggregateProviders(
  [mockMovie],
  [mockProviderResponse],
  "XX"
);
const test2Pass = result2.length === 0;
console.log(test2Pass ? "✓ PASS" : "✗ FAIL");
console.log(`  Resultado: ${result2.length} proveedores\n`);

// Test 3: aggregateProviders con null response
console.log("Test 3: aggregateProviders manejando null/undefined responses");
const result3 = aggregateProviders(
  [mockMovie, mockMovie2],
  [mockProviderResponse, null],
  "PE"
);
const test3Pass =
  result3.length > 0 &&
  result3.every((p) => p.count > 0);
console.log(test3Pass ? "✓ PASS" : "✗ FAIL");
console.log(`  Resultado: ${result3.length} proveedores procesados\n`);

// Test 4: getRecommendedProviders
console.log("Test 4: getRecommendedProviders (máximo count)");
const providers: ProviderStat[] = [
  { id: 8, name: "Netflix", logo: null, count: 3, mediaIds: [1, 2, 3] },
  { id: 1, name: "Amazon", logo: null, count: 3, mediaIds: [1, 2, 3] },
  { id: 9, name: "Disney+", logo: null, count: 2, mediaIds: [1, 2] },
];
const recommended = getRecommendedProviders(providers);
const test4Pass =
  recommended.length === 2 &&
  recommended.every((p) => p.count === 3);
console.log(test4Pass ? "✓ PASS" : "✗ FAIL");
console.log(`  Resultado: ${recommended.length} recomendados (count=3)\n`);

// Test 5: getOtherProviders
console.log("Test 5: getOtherProviders (excluye recomendados)");
const other = getOtherProviders(providers);
const test5Pass =
  other.length === 1 &&
  other[0].id === 9 &&
  other[0].count === 2;
console.log(test5Pass ? "✓ PASS" : "✗ FAIL");
console.log(`  Resultado: ${other.length} otros (Disney+ con count=2)\n`);

// Test 6: Ordenamiento por count (desc) y nombre (asc)
console.log("Test 6: Ordenamiento por count DESC, luego nombre ASC");
const unsorted: ProviderStat[] = [
  { id: 3, name: "Zebra", logo: null, count: 1, mediaIds: [1] },
  { id: 1, name: "Apple", logo: null, count: 2, mediaIds: [1, 2] },
  { id: 2, name: "Banana", logo: null, count: 2, mediaIds: [1, 2] },
];
const sorted = unsorted.sort(
  (a, b) => b.count - a.count || a.name.localeCompare(b.name)
);
const test6Pass =
  sorted[0].name === "Apple" &&
  sorted[1].name === "Banana" &&
  sorted[2].name === "Zebra";
console.log(test6Pass ? "✓ PASS" : "✗ FAIL");
console.log(
  `  Resultado: ${sorted.map((p) => p.name).join(", ")}\n`
);

// Resumen
const passed = [test1Pass, test2Pass, test3Pass, test4Pass, test5Pass, test6Pass]
  .filter(Boolean).length;
console.log(`=== SUMMARY: ${passed}/6 tests passed ===`);
