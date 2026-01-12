import { useState, useCallback } from 'react';
import type { FavoriteLocation } from '@entities/favorite';
import { useNotify } from '@features/notify';

const STORAGE_KEY = 'favorite_locations';
const MAX_FAVORITES = 6;
export const SAVE_RESULT = {
  FAVORITE_SAVED_SUCCESS: 'favorite_saved',
  FAVORITE_SAVED_FAILED_MAX_LIMIT: 'favorite_saved_failed',
  FAVORITE_SAVED_FAILED_ALREADY_EXISTS: 'favorite_saved_failed_already_exists',
};

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
  const { show } = useNotify();
  // 즐겨찾기 저장
  const saveFavorite = useCallback(
    (location: FavoriteLocation) => {
      setFavorites((prev) => {
        // 이미 존재하는지 확인
        const existing = prev.find((item) => item.id === location.id);
        if (existing) {
          show({ id: 'favorite_exists', type: 'danger', message: '이미 추가된 장소입니다.' });
          return prev;
        }
        // 최대 개수 초과 확인
        if (prev.length >= MAX_FAVORITES) {
          show({
            id: 'favorite_max_limit',
            type: 'danger',
            message: '최대 6개까지 즐겨찾기할 수 있습니다.',
          });
          return prev;
        }
        const updated = [...prev, location];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        show({ id: 'favorite_saved', type: 'success', message: '즐겨찾기에 추가되었습니다!' });
        return updated;
      });
    },
    [show]
  );

  const patchFavorite = useCallback((location: FavoriteLocation) => {
    setFavorites((prev) => {
      const updated = prev.map((item) =>
        item.id === location.id ? { ...item, ...location } : item
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // 즐겨찾기 삭제
  const deleteFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      show({ id: 'favorite_deleted', type: 'warning', message: '즐겨찾기에서 삭제되었습니다.' });
    },
    [show]
  );

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
    patchFavorite,
  };
}
