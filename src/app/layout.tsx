// src/app/layout.tsx

import type { Metadata } from "next";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased flex flex-col overflow-x-hidden">
        <ThemeProvider />
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
