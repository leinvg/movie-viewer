'use client';

import { useEffect } from 'react';
import useAppStore from '@/store/appStore';

/**
 * Componente que sincroniza el tema del store con el DOM
 * Debe ejecutarse una sola vez en el root layout
 */
export function ThemeProvider() {
  const { theme } = useAppStore();

  useEffect(() => {
    // Aplicar tema al renderizar por primera vez
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}
