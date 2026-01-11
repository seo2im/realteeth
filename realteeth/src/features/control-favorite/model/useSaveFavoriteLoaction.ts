import { useState, useCallback } from 'react';
import type { FavoriteLocation } from '../../../entities/favorite/model/type';

const STORAGE_KEY = 'favorite_locations';

function getInitialFavorites(): FavoriteLocation[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored as string) as FavoriteLocation[];
    } catch (error) {
      console.error('Failed to parse favorite locations:', error);
    }
  }
  return [];
}

export function useSaveFavoriteLocation() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>(getInitialFavorites());
  // 즐겨찾기 저장
  const saveFavorite = useCallback((location: FavoriteLocation) => {
    setFavorites((prev) => {
      // 이미 존재하는 경우 중복 방지
      const exists = prev.some((item) => item.id === location.id);
      if (exists) {
        return prev;
      }
      const updated = [...prev, location];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 즐겨찾기 삭제
  const deleteFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 모든 즐겨찾기 삭제
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const changeNameFavorite = useCallback((id: string, newName: string) => {
    setFavorites((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, name: newName } : item));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 특정 즐겨찾기 존재 여부 확인
  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((item) => item.id === id);
    },
    [favorites]
  );

  return {
    favorites,
    saveFavorite,
    deleteFavorite,
    clearFavorites,
    isFavorite,
    changeNameFavorite,
  };
}
