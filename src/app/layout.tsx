// src/app/layout.tsx

import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-dvh overflow-x-hidden bg-canvas text-foreground transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 md:px-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
