// src/contexts/MediaModalContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import MediaModal from "@/components/MediaModal";
import { TMDBMedia } from "@/types";

interface MediaModalContextType {
  openModal: (media: TMDBMedia) => void;
  closeModal: () => void;
}

const MediaModalContext = createContext<MediaModalContextType | undefined>(
  undefined
);

export function MediaModalProvider({ children }: { children: ReactNode }) {
  const [selectedMedia, setSelectedMedia] = useState<TMDBMedia | null>(null);

  const openModal = (media: TMDBMedia) => setSelectedMedia(media);
  const closeModal = () => setSelectedMedia(null);

  return (
    <MediaModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <MediaModal media={selectedMedia} onClose={closeModal} />
    </MediaModalContext.Provider>
  );
}

export function useMediaModal() {
  const context = useContext(MediaModalContext);
  if (!context) {
    throw new Error("useMediaModal must be used within MediaModalProvider");
  }
  return context;
}
