// src/components/ThemeProvider.tsx

"use client";

import { useEffect } from "react";
import useAppStore from "@/store/appStore";

/** Componente que sincroniza el tema del store con el DOM. */
export function ThemeProvider() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
