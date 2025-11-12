"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialQuery?: string;
}

export default function SearchHeader({ initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = q.trim();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={submit} className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar películas o series"
            className="w-full rounded-lg px-4 py-3 bg-gray-800 text-white placeholder-gray-400 outline-none"
          />
          <button
            type="button"
            onClick={() => submit()}
            className="px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700"
          >
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}
