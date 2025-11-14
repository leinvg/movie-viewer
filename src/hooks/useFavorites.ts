// Hook para sincronizar favoritos con localStorage y eventos personalizados

import { useEffect, useState } from "react";
import { TMDBMedia } from "@/types";

/**
 * Hook personalizado para gestionar favoritos con sincronización automática
 * - Lee y escucha cambios en localStorage
 * - Proporciona métodos para CRUD de favoritos
 * - Sincroniza entre pestañas/ventanas
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<TMDBMedia[]>([]);

  // Leer favoritos del localStorage
  const getFavoritesFromStorage = (): TMDBMedia[] => {
    try {
      const raw = localStorage.getItem("mv_favorites");
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  // Inicializar y escuchar cambios
  useEffect(() => {
    setFavorites(getFavoritesFromStorage());

    const onStorage = () => {
      setFavorites(getFavoritesFromStorage());
    };

    const onCustom = () => {
      setFavorites(getFavoritesFromStorage());
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("mv_favorites_changed", onCustom as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("mv_favorites_changed", onCustom as EventListener);
    };
  }, []);

  // Generar key único para un media
  const getMediaKey = (media: TMDBMedia): string => `${media.media_type}_${media.id}`;

  // Verificar si un media es favorito
  const isFavorited = (media: TMDBMedia): boolean => {
    const key = getMediaKey(media);
    return favorites.some((fav) => getMediaKey(fav) === key);
  };

  // Guardar favoritos en localStorage y emitir evento
  const saveFavoritesAndNotify = (items: TMDBMedia[]) => {
    localStorage.setItem("mv_favorites", JSON.stringify(items));
    window.dispatchEvent(new Event("mv_favorites_changed"));
  };

  // Añadir a favoritos
  const addFavorite = (media: TMDBMedia) => {
    if (!isFavorited(media)) {
      saveFavoritesAndNotify([...favorites, media]);
    }
  };

  // Quitar de favoritos
  const removeFavorite = (media: TMDBMedia) => {
    const key = getMediaKey(media);
    const filtered = favorites.filter((fav) => getMediaKey(fav) !== key);
    saveFavoritesAndNotify(filtered);
  };

  // Alternar favorito
  const toggleFavorite = (media: TMDBMedia) => {
    if (isFavorited(media)) {
      removeFavorite(media);
    } else {
      addFavorite(media);
    }
  };

  return {
    favorites,
    isFavorited,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};
