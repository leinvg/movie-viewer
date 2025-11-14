// Hook genérico para sincronizar cualquier valor con localStorage

import { useEffect, useState } from "react";

/**
 * Hook personalizado genérico para sincronizar estado con localStorage
 * - Persiste valor automáticamente
 * - Sincroniza entre pestañas/ventanas
 * - Type-safe con generics
 *
 * @template T - Tipo del valor a sincronizar
 * @param key - Clave en localStorage
 * @param initialValue - Valor inicial si no existe en storage
 */
export const useLocalStorageSync = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Guardar cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to save to localStorage: ${key}`);
    }
  }, [value, key]);

  // Escuchar cambios desde otras pestañas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {
          console.error(`Failed to parse storage value: ${key}`);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return { value, setValue };
};
