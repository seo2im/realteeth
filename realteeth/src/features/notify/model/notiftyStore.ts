import { create } from 'zustand';
import type { AlertType } from '../../../shared/ui/alert/alert.type';

export type NotifyStore = {
  id: string;
  message: string;
  type: AlertType;
  open: (id: string, message: string, type: AlertType) => void;
  close: () => void;
};

export const useNotifyStore = create<NotifyStore>()((set) => ({
  id: '',
  message: '',
  type: 'info',
  open: (id: string, message: string, type: AlertType) => set(() => ({ id, message, type })),
  close: () => set(() => ({ id: '', message: '', type: 'info' })),
}));

export default useNotifyStore;
