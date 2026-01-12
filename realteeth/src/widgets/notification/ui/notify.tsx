import { useNotifyStore } from '@features/notify/model/notifyStore';
import { Alert } from '@shared/ui/alert/alert';
import { Snackbar } from '@shared/ui/snackbar/snackbar';

export function Notify() {
  const id = useNotifyStore((state) => state.id);
  const type = useNotifyStore((state) => state.type);
  const message = useNotifyStore((state) => state.message);
  const close = useNotifyStore((state) => state.close);

  return (
    <div className="fixed h-screen w-screen">
      {id !== '' && (
        <Snackbar
          message={<Alert message={message} type={type} />}
          duration={3000}
          onClose={close}
        />
      )}
    </div>
  );
}
