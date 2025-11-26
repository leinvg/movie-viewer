// src/store/appStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TMDBMedia } from "@/types";

export type Region = "PE" | "BO" | "CL" | "CO" | "EC";

interface AppState {
  region: Region;
  setRegion: (region: Region) => void;

  favorites: TMDBMedia[];
  addFavorite: (media: TMDBMedia) => void;
  removeFavorite: (media: TMDBMedia) => void;
  isFavorite: (media: TMDBMedia) => boolean;
  clearFavorites: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      region: "PE",
      setRegion: (region) => set({ region }),

      favorites: [],
      addFavorite: (media) =>
        set((state) => ({
          favorites: get().isFavorite(media)
            ? state.favorites
            : [...state.favorites, media],
        })),

      removeFavorite: (media) =>
        set((state) => {
          const key = `${media.media_type}_${media.id}`;
          return {
            favorites: state.favorites.filter(
              (fav) => `${fav.media_type}_${fav.id}` !== key
            ),
          };
        }),

      isFavorite: (media) => {
        const key = `${media.media_type}_${media.id}`;
        return get().favorites.some(
          (fav) => `${fav.media_type}_${fav.id}` === key
        );
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "app-store",
      version: 1,
    }
  )
);

export default useAppStore;
