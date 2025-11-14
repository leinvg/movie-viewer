import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TMDBMedia } from '@/types';

export type Theme = 'light' | 'dark';
export type Region = 'PE' | 'BO' | 'CL' | 'CO' | 'EC';

interface AppState {
  // Tema
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Región (para watch providers)
  region: Region;
  setRegion: (region: Region) => void;

  // Favoritos
  favorites: TMDBMedia[];
  addFavorite: (media: TMDBMedia) => void;
  removeFavorite: (media: TMDBMedia) => void;
  isFavorite: (media: TMDBMedia) => boolean;
  clearFavorites: () => void;
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Tema - light por defecto
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      // Región - PE por defecto
      region: 'PE',
      setRegion: (region) => set({ region }),

      // Favoritos
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
        return get().favorites.some((fav) => `${fav.media_type}_${fav.id}` === key);
      },
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'app-store', // localStorage key
      version: 1,
    }
  )
);

export default useAppStore;
