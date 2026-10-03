import React, { createContext, useContext, useState, useEffect } from 'react';

interface PhotoContextType {
  photoUrl: string;
  setPhotoUrl: (url: string) => void;
  resetPhoto: () => void;
  isCustomPhoto: boolean;
  openPhotoModal: () => void;
  closePhotoModal: () => void;
  isPhotoModalOpen: boolean;
}

const DEFAULT_PHOTO = '/profile.jpg';
const STORAGE_KEY = 'sai_teja_portfolio_photo';

const PhotoContext = createContext<PhotoContextType>({
  photoUrl: DEFAULT_PHOTO,
  setPhotoUrl: () => {},
  resetPhoto: () => {},
  isCustomPhoto: false,
  openPhotoModal: () => {},
  closePhotoModal: () => {},
  isPhotoModalOpen: false,
});

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photoUrl, setPhotoState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved;
    }
    return DEFAULT_PHOTO;
  });

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const setPhotoUrl = (url: string) => {
    setPhotoState(url);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const resetPhoto = () => {
    setPhotoState(DEFAULT_PHOTO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear localStorage', e);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photoUrl,
        setPhotoUrl,
        resetPhoto,
        isCustomPhoto: photoUrl !== DEFAULT_PHOTO,
        openPhotoModal: () => setIsPhotoModalOpen(true),
        closePhotoModal: () => setIsPhotoModalOpen(false),
        isPhotoModalOpen,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const useProfilePhoto = () => useContext(PhotoContext);
