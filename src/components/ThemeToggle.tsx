'use client';

import useAppStore from '@/store/appStore';
import { useEffect } from 'react';

/**
 * Componente que proporciona un botón para alternar entre tema claro y oscuro.
 * Sincroniza automáticamente con el atributo `dark` del documento.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  // Aplicar clase 'dark' al documento cuando cambia el tema
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      title={`Tema actual: ${theme === 'light' ? 'Claro' : 'Oscuro'}`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
