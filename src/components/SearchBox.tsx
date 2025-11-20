// src/components/SearchBox.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAppStore from "@/store/appStore";

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
  const { favorites } = useAppStore();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="group relative w-full">
      <div className="flex items-center bg-surface dark:bg-surface-dark hover:bg-hover dark:hover:bg-hover-dark focus-within:bg-hover dark:focus-within:bg-hover-dark rounded-full text-soft dark:text-soft-dark hover:text-base dark:hover:text-base-dark focus-within:text-base dark:focus-within:text-base-dark">
        <button
          type="submit"
          aria-label="Buscar"
          title="Buscar"
          className="mx-2 p-2.5 rounded-full transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-focus dark:focus-visible:ring-focus-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[2px]"
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
          className="w-full py-4 text-base dark:text-base-dark placeholder-soft dark:placeholder-soft-dark outline-none inset-ring-neutral-300 dark:inset-ring-neutral-700 transition-all"
          autoComplete="off"
          enterKeyHint="search"
        />
        <div className="border-l-2 h-7 border-neutral-400 dark:border-neutral-600"></div>
        <Link
          href="/favorites"
          aria-label="Ir a favoritos"
          title="Ir a favoritos"
          className="relative flex gap-1 mx-2 p-2.5 rounded-full transition-all text-soft dark:text-soft-dark hover:text-base dark:hover:text-base-dark cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-focus dark:focus-visible:ring-focus-dark"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </Link>
      </div>
      {favorites.length > 0 && (
        <span className="absolute top-3 right-2 translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-1.5 h-5 min-w-5 bg-neutral-800 dark:bg-neutral-200 text-base-dark dark:text-base text-xs dark:font-bold rounded-full">
          {favorites.length}
        </span>
      )}
    </form>
  );
}
