import { Dialog } from 'components';
import { useDialog } from 'hooks';

export default function DialogOutlet() {
  const { dialog, closeDialog, confirmDialog } = useDialog();

  if (!dialog || !dialog.open) return null;

  return (
    <Dialog
      title={dialog.title}
      message={dialog.message}
      confirmText={dialog.confirmText}
      cancelText={dialog.cancelText}
      confirmType={dialog.confirmType}
      onConfirm={confirmDialog}
      onClose={closeDialog}
    >
      {dialog.children}
    </Dialog>
  );
}
