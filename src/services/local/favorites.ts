// src/services/local/favorites.ts

import { TMDBMedia } from "@/types";

const KEY = "mv_favorites";

export function getFavorites(): TMDBMedia[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveFavorites(items: TMDBMedia[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    // notify same-tab listeners
    window.dispatchEvent(new Event("mv_favorites_changed"));
  } catch {}
}

export function isFavorited(item: TMDBMedia) {
  const arr = getFavorites();
  return arr.some((i) => `${i.media_type}_${i.id}` === `${item.media_type}_${item.id}`);
}

export function addFavorite(item: TMDBMedia) {
  const arr = getFavorites();
  const key = `${item.media_type}_${item.id}`;
  if (!arr.some((i) => `${i.media_type}_${i.id}` === key)) {
    arr.push(item);
    saveFavorites(arr);
  }
}

export function removeFavorite(item: TMDBMedia) {
  const arr = getFavorites();
  const key = `${item.media_type}_${item.id}`;
  const filtered = arr.filter((i) => `${i.media_type}_${i.id}` !== key);
  saveFavorites(filtered);
}

export function toggleFavorite(item: TMDBMedia) {
  if (isFavorited(item)) removeFavorite(item);
  else addFavorite(item);
}
