import { useCallback, useState, useEffect, PropsWithChildren } from 'react';
import { useBackdrop, IDialogConfig, IDialogState, DialogContext } from 'hooks';
import { checkHasObjectChanged } from 'utils';

const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialog, setDialog] = useState<IDialogState | null>(null);
  const { openBackdrop, closeBackdrop, addBackdropClickListener, removeBackdropClickListener } = useBackdrop();

  const openDialog = useCallback(handleDialogOpen, []);

  const updateDialog = useCallback(handleDialogUpdate, []);

  const confirmDialog = useCallback(handleDialogConfirm, [dialog]);

  const closeDialog = useCallback(handleDialogClose, [dialog]);

  useEffect(syncBackdropState, [dialog]);

  useEffect(registerBackdropClickListener, [
    dialog,
    addBackdropClickListener,
    removeBackdropClickListener,
    closeDialog
  ]);

  return (
    <DialogContext.Provider
      value={{
        dialog,
        openDialog,
        updateDialog,
        confirmDialog,
        closeDialog
      }}
    >
      {children}
    </DialogContext.Provider>
  );

  /** Open a new dialog with the provided configuration */
  function handleDialogOpen(config: IDialogConfig) {
    setDialog({ ...config, open: true });
  }

  /** Update the dialog state */
  function handleDialogUpdate(next: Partial<IDialogState>) {
    setDialog(prev => {
      // Only update when values actually change to avoid render loops
      if (!prev || !checkHasObjectChanged(prev, next)) return prev;

      return { ...prev, ...next } as IDialogState;
    });
  }

  /** Confirm the dialog primaryaction */
  function handleDialogConfirm() {
    if (!dialog) return;

    dialog.onDialogConfirm();
    setDialog(null);
  }

  /** Close the dialog */
  function handleDialogClose() {
    if (!dialog) return;

    setDialog(null);
  }

  /** Sync backdrop state with dialog state */
  function syncBackdropState() {
    return dialog && dialog.open ? openBackdrop() : closeBackdrop();
  }

  /** Register backdrop click listener to close dialog */
  function registerBackdropClickListener() {
    if (!dialog || !dialog.open) return;

    const onBackdropClick = () => {
      if (dialog?.disableBackdropClose) return;
      closeDialog();
    };

    addBackdropClickListener(onBackdropClick);
    return () => removeBackdropClickListener(onBackdropClick);
  }
};

export default DialogProvider;

type DialogProviderProps = PropsWithChildren;
