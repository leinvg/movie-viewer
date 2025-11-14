// src/services/tmdb/search.test.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { searchMedia, fetchFilteredSearch } from "./search";

type TestResult = { name: string; status: "✓" | "✗"; message?: string };
const results: TestResult[] = [];

function logTest(name: string, status: "✓" | "✗", message?: string) {
  results.push({ name, status, message });
  console.log(`${status} ${name}${message ? " - " + message : ""}`);
}

(async () => {
  try {
    console.log("\n=== Test 1: searchMedia basic (happy path) ===");
    const basic = await searchMedia("Avatar", 1, 5);
    if (basic.results.length > 0 && basic.results[0].media_type) {
      logTest("searchMedia returns results", "✓", `${basic.results.length} items`);
    } else {
      logTest("searchMedia returns results", "✗", "No results");
    }

    console.log("\n=== Test 2: fetchFilteredSearch basic (happy path) ===");
    const filtered = await fetchFilteredSearch("Avatar", 1, 5);
    if (filtered.results.length > 0) {
      const valid = filtered.results.every((m) => m.poster_path && m.backdrop_path);
      if (valid) {
        logTest("fetchFilteredSearch filters poster/backdrop", "✓", `${filtered.results.length} valid items`);
      } else {
        logTest("fetchFilteredSearch filters poster/backdrop", "✗", "Some items missing poster/backdrop");
      }
    } else {
      logTest("fetchFilteredSearch filters poster/backdrop", "✗", "No results");
    }

    console.log("\n=== Test 3: fetchFilteredSearch respects limit ===");
    const limited = await fetchFilteredSearch("the", 1, 3);
    if (limited.results.length <= 3) {
      logTest("fetchFilteredSearch respects limit", "✓", `${limited.results.length} items ≤ 3`);
    } else {
      logTest("fetchFilteredSearch respects limit", "✗", `${limited.results.length} items > 3`);
    }

    console.log("\n=== Test 4: fetchFilteredSearch with empty query ===");
    const empty = await fetchFilteredSearch("", 1, 5);
    if (empty.results.length === 0 && !empty.hasMore) {
      logTest("fetchFilteredSearch handles empty query", "✓", "Returns empty result");
    } else {
      logTest("fetchFilteredSearch handles empty query", "✗", `Got ${empty.results.length} results`);
    }

    console.log("\n=== Test 5: fetchFilteredSearch pagination state ===");
    const page2 = await fetchFilteredSearch("Star Wars", 1, 12);
    if (typeof page2.nextPage === "number" && typeof page2.hasMore === "boolean") {
      logTest("fetchFilteredSearch pagination fields", "✓", `nextPage: ${page2.nextPage}, hasMore: ${page2.hasMore}`);
    } else {
      logTest("fetchFilteredSearch pagination fields", "✗", "Missing or invalid pagination fields");
    }

    console.log("\n=== Summary ===");
    const passed = results.filter((r) => r.status === "✓").length;
    const total = results.length;
    console.log(`${passed}/${total} tests passed`);
  } catch (err) {
    console.error("Test error:", err);
    process.exit(1);
  }
})();
