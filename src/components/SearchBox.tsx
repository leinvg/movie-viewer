// src/components/SearchBox.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

const SUFFIXES = [" por película…", " por serie…", " por persona…"];
const BASE_TEXT = "Buscar";
const ANIMATION_CONFIG = {
  initialDelay: 500,
  typingSpeed: 50,
  erasingSpeed: 30,
  pauseAfterTyping: 1000,
  pauseBetweenCycles: 300,
};

interface SearchBoxProps {
  initialQuery?: string;
}

export default function SearchBox({ initialQuery = "" }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const [placeholder, setPlaceholder] = useState(BASE_TEXT);
  const router = useRouter();

  useEffect(() => {
    if (query) return;

    let currentIndex = 0;
    let currentLength = 0;
    let isErasing = false;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      const suffix = SUFFIXES[currentIndex];

      if (!isErasing) {
        if (currentLength < suffix.length) {
          currentLength++;
          setPlaceholder(BASE_TEXT + suffix.slice(0, currentLength));
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.typingSpeed);
        } else {
          isErasing = true;
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.pauseAfterTyping);
        }
      } else {
        if (currentLength > 0) {
          currentLength--;
          setPlaceholder(BASE_TEXT + suffix.slice(0, currentLength));
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.erasingSpeed);
        } else {
          currentIndex = (currentIndex + 1) % SUFFIXES.length;
          isErasing = false;
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.pauseBetweenCycles);
        }
      }
    };

    timeoutId = setTimeout(animate, ANIMATION_CONFIG.initialDelay);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <SearchInput
      value={query}
      onChange={setQuery}
      onSubmit={handleSubmit}
      onClear={() => setQuery("")}
      placeholder={placeholder}
    />
  );
}
