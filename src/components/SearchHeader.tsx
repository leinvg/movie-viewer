// src/components/SearchHeader.tsx

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchInput from "./SearchInput";
import { useRouter } from "next/navigation";

interface Props {
  initialQuery?: string;
}

export default function SearchHeader({ initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => {
    setQ("");
  };

  return (
    <Header>
      <SearchInput
        value={q}
        onChange={setQ}
        onSubmit={handleSubmit}
        onClear={handleClear}
        placeholder="Buscar películas o series"
      />
    </Header>
  );
}
