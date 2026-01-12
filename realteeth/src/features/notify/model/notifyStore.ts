import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AlertType } from '@shared/ui/alert/alert.type';

export type NotifyStore = {
  id: string;
  message: string;
  type: AlertType;
  open: (id: string, message: string, type: AlertType) => void;
  close: () => void;
};

export const useNotifyStore = create<NotifyStore>()(
  devtools((set) => ({
    id: '',
    message: '',
    type: 'info',
    open: (id: string, message: string, type: AlertType) => set(() => ({ id, message, type })),
    close: () => set(() => ({ id: '', message: '', type: 'info' })),
  }))
);
