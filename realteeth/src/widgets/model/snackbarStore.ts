import { create } from 'zustand';

export type SnackbarState = {
  id: string;
  open: (id: string) => void;
  close: () => void;
};

export const useSnackbarStore = create<SnackbarState>()((set) => ({
  id: '',
  open: (id: string) => set(() => ({ id })),
  close: () => set(() => ({ id: '' })),
}));
export const SnackbarIDs = {
  FAVORITE_SAVED: 'favorite-saved',
};

export default useSnackbarStore;
