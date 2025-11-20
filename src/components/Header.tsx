// src/components/Header.tsx

"use client";

import { useRouter } from "next/navigation";
import useAppStore from "@/store/appStore";
import SearchBox from "./SearchBox";
import FavoritesLink from "@/components/FavoritesLink";
import Link from "next/link";

interface HeaderProps {
  initialQuery?: string;
}

export default function Header({ initialQuery }: HeaderProps) {
  return (
    <header className="fixed left-1/2 -translate-x-1/2 w-full z-50 max-w-125 top-4">
      <div className="mx-4 flex rounded-full items-center dark:bg-neutral-900/80 p-2 backdrop-blur-md gap-2  border-neutral-300 dark:border-neutral-800 shadow-xl ring-1 ring-neutral-300 dark:ring-neutral-700">
        <Link
          href="/"
          className="inline-flex p-4.5 dark:bg-neutral-800 rounded-full items-end text-sm text-stone-900/60 bg-neutral-200 dark:text-stone-100/70 hover:text-stone-900 dark:hover:text-stone-100 font-medium dark:font-normal transition-colors gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="size-5 stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <div className="flex-1">
          <SearchBox initialQuery={initialQuery} />
        </div>
        {/* <FavoritesLink /> */}
      </div>
    </header>
  );
}
