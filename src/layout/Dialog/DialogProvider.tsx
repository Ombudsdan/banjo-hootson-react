import { useCallback, useState, useEffect } from 'react';
import { useBackdrop } from 'hooks';
import { DialogState, IDialogConfig, IDialogProvider } from 'model/dialog';
import DialogContext from './DialogContext';

export const DialogProvider = ({ children }: IDialogProvider) => {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const { openBackdrop, closeBackdrop, addBackdropClickListener, removeBackdropClickListener } = useBackdrop();

  const openDialog = useCallback(
    (config: IDialogConfig) =>
      setDialog({
        ...config,
        open: true,
        onClose: config.onClose ?? (() => {})
      }),
    []
  );

  const confirmDialog = useCallback(() => {
    if (dialog && dialog.onConfirm) {
      dialog.onConfirm();
    }

    // TODO: only close the dialog if onClose doesn't prevent it
    setDialog(null);
  }, [dialog]);

  const closeDialog = useCallback(() => {
    if (dialog && dialog.onClose) {
      dialog.onClose();
    }

    // TODO: only close the dialog if onClose doesn't prevent it
    setDialog(null);
  }, [dialog]);

  // Sync backdrop state with dialog state
  useEffect(() => {
    dialog && dialog.open ? openBackdrop() : closeBackdrop();
  }, [dialog]);

  // Register backdrop click listener to close dialog
  useEffect(() => {
    if (!dialog || !dialog.open) {
      return;
    }

    addBackdropClickListener(() => closeDialog());

    return () => removeBackdropClickListener(() => closeDialog());
  }, [dialog, addBackdropClickListener, removeBackdropClickListener, closeDialog]);

  return (
    <DialogContext.Provider value={{ dialog, openDialog, closeDialog, confirmDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
