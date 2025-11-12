// src/services/tmdb/search.test.ts

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { searchMedia } from "./search";

(async () => {
  try {
    const result = await searchMedia("Matrix", 1, 5);
    console.log(result);
  } catch (err) {
    console.error("Error:", err);
  }
})();
