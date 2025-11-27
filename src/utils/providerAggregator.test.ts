// Tests para la utilidad de agregación de proveedores

import { describe, it, expect } from "vitest";
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

describe("providerAggregator", () => {
  describe("aggregateProviders", () => {
    it("should aggregate providers from multiple movies", () => {
      const result = aggregateProviders(
        [mockMovie, mockMovie2],
        [mockProviderResponse, mockProviderResponse2],
        "PE"
      );

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(8);
      expect(result[0].name).toBe("Netflix");
      expect(result[0].count).toBe(2);
      expect(result[1].id).toBe(1);
      expect(result[1].count).toBe(1);
    });

    it("should return empty array for unavailable region", () => {
      const result = aggregateProviders(
        [mockMovie],
        [mockProviderResponse],
        "XX"
      );

      expect(result).toHaveLength(0);
    });

    it("should handle null/undefined provider responses", () => {
      const result = aggregateProviders(
        [mockMovie, mockMovie2],
        [mockProviderResponse, null],
        "PE"
      );

      expect(result).toHaveLength(2);
      expect(result[0].count).toBe(1);
    });

    it("should sort providers by count DESC, then name ASC", () => {
      const unsorted: ProviderStat[] = [
        { id: 3, name: "Zebra", logo: null, count: 1, mediaIds: [1], types: new Set(["flatrate"]) },
        { id: 1, name: "Apple", logo: null, count: 2, mediaIds: [1, 2], types: new Set(["flatrate"]) },
        { id: 2, name: "Banana", logo: null, count: 2, mediaIds: [1, 2], types: new Set(["flatrate"]) },
      ];

      const sorted = unsorted.sort(
        (a, b) => b.count - a.count || a.name.localeCompare(b.name)
      );

      expect(sorted[0].name).toBe("Apple");
      expect(sorted[1].name).toBe("Banana");
      expect(sorted[2].name).toBe("Zebra");
    });
  });

  describe("getRecommendedProviders", () => {
    it("should return providers with maximum count", () => {
      const stats: ProviderStat[] = [
        { id: 1, name: "Netflix", logo: null, count: 3, mediaIds: [1, 2, 3], types: new Set(["flatrate"]) },
        { id: 2, name: "Amazon", logo: null, count: 3, mediaIds: [1, 2, 3], types: new Set(["flatrate"]) },
        { id: 3, name: "Disney+", logo: null, count: 2, mediaIds: [1, 2], types: new Set(["flatrate"]) },
      ];

      const recommended = getRecommendedProviders(stats);

      expect(recommended).toHaveLength(2);
      expect(recommended[0].count).toBe(3);
      expect(recommended[1].count).toBe(3);
    });

    it("should return empty array for empty input", () => {
      const recommended = getRecommendedProviders([]);
      expect(recommended).toHaveLength(0);
    });
  });

  describe("getOtherProviders", () => {
    it("should return providers that are not recommended", () => {
      const stats: ProviderStat[] = [
        { id: 1, name: "Netflix", logo: null, count: 3, mediaIds: [1, 2, 3], types: new Set(["flatrate"]) },
        { id: 2, name: "Amazon", logo: null, count: 3, mediaIds: [1, 2, 3], types: new Set(["flatrate"]) },
        { id: 3, name: "Disney+", logo: null, count: 2, mediaIds: [1, 2], types: new Set(["flatrate"]) },
      ];

      const others = getOtherProviders(stats);

      expect(others).toHaveLength(1);
      expect(others[0].name).toBe("Disney+");
      expect(others[0].count).toBe(2);
    });
  });
});
