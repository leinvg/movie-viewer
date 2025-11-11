// src/app/layout.tsx

import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Moviewer",
  description: "A streaming platform recommender (TMDB API and JustWatch).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-black text-white antialiased flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
