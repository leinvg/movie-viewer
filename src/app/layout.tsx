// src/app/layout.tsx

import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Moviewer",
  description: "Guía de plataformas de streaming (TMDB y JustWatch).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} scroll-smooth antialiased`}
    >
      <body className="bg-neutral-100 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 overflow-x-hidden transition-colors flex flex-col min-h-dvh">
        <ThemeProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
