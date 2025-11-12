// src/app/page.tsx

import SearchBox from "@/components/SearchBox";

export default async function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Movie Viewer</h1>
        <SearchBox />
      </div>
    </main>
  );
}
