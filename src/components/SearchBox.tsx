// src/components/SearchBox.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onSubmit={handleSubmit}
      onClear={handleClear}
      placeholder="Buscar títulos..."
    />
  );
}
