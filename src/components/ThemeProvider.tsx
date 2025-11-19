// src/components/ThemeProvider.tsx

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Componente que provee manejo de tema usando next-themes. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
