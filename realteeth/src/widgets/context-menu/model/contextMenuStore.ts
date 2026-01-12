import { create } from 'zustand';

export type ContextMenuState = {
  x: number;
  y: number;
  id: string;
  open: (payload: { x: number; y: number; id: string }) => void;
  close: () => void;
  setPosition: (x: number, y: number) => void;
};

export const useContextMenuStore = create<ContextMenuState>()((set) => ({
  x: 0,
  y: 0,
  id: '',
  open: ({ x, y, id }) => set({ x, y, id }),
  close: () => set({ x: 0, y: 0, id: '' }),
  setPosition: (x, y) => set({ x, y }),
}));
