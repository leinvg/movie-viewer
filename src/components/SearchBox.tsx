"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
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
