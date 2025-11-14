// src/app/page.tsx

import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <main className="flex-1">
      <Header />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">Movie Viewer</h1>
          <SearchBox />
        </div>
      </div>
    </main>
  );
}
