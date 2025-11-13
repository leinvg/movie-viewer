// src/components/SearchBox.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas o series"
        className="w-full rounded-lg px-4 py-3 bg-gray-900 text-white placeholder-gray-400 outline-none"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700"
      >
        🔍
      </button>
    </form>
  );
}
