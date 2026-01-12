import { useCallback } from 'react';
import { useNotifyStore } from './notifyStore';
import type { AlertType } from '@shared/ui/alert/alert.type';

export function useNotify() {
  const open = useNotifyStore((state) => state.open);
  const close = useNotifyStore((state) => state.close);
  const show = useCallback(
    ({ id, message, type }: { id: string; message: string; type: AlertType }) => {
      open(id, message, type);
    },
    [open]
  );
  const hide = useCallback(() => {
    close();
  }, [close]);

  return {
    show,
    hide,
  };
}
