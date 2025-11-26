// src/components/SearchBar.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_PLACEHOLDER = "Buscar";
const SUFFIXES = [" películas", " series", " personas"];
const ANIMATION_CONFIG = {
  initialDelay: 500,
  typingSpeed: 60,
  erasingSpeed: 40,
  pauseAfterTyping: 1000,
  pauseBetweenCycles: 300,
};
const BUTTON_BASE =
  "absolute mx-1.5 p-2 rounded-full transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border-focus";

interface SearchBarProps {
  initialQuery?: string;
}

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [placeholder, setPlaceholder] = useState(BASE_PLACEHOLDER);
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
          setPlaceholder(BASE_PLACEHOLDER + suffix.slice(0, currentLength));
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.typingSpeed);
        } else {
          isErasing = true;
          timeoutId = setTimeout(animate, ANIMATION_CONFIG.pauseAfterTyping);
        }
      } else {
        if (currentLength > 0) {
          currentLength--;
          setPlaceholder(BASE_PLACEHOLDER + suffix.slice(0, currentLength));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full overflow-hidden rounded-lg text-foreground-secondary bg-surface transition-all hover:bg-surface-hover hover:text-foreground focus-within:bg-surface-hover focus-within:text-foreground"
    >
      <button
        type="submit"
        aria-label="Buscar"
        title="Buscar"
        className={`${BUTTON_BASE} z-10`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-5 fill-none stroke-current stroke-[1.5px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-12 py-2 bg-transparent placeholder-foreground-secondary outline-none transition-all ${
          query ? "pr-12" : "pr-4"
        }`}
        autoComplete="off"
        enterKeyHint="search"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Limpiar búsqueda"
          title="Limpiar"
          className={`${BUTTON_BASE} right-0 text-foreground-secondary hover:text-foreground`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[1.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </form>
  );
}
