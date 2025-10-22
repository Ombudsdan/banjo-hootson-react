import { useCallback, useState, useEffect, PropsWithChildren } from 'react';
import { useBackdrop } from 'hooks';
import { IFormDialogConfig, IFormDialogState, FormDialogContext } from 'hooks';
import { checkHasValueChanged, checkHasObjectChanged } from 'utils';

const DEFAULT_DIRTY_TRACKER_MESSAGE = 'You have unsaved changes that will be lost. Are you sure you want to leave?';

const FormDialogProvider = ({ children }: IFormDialogProvider) => {
  const [formDialog, setFormDialog] = useState<IFormDialogState | null>(null);
  const { openBackdrop, closeBackdrop } = useBackdrop();

  const openFormDialog = useCallback(handleDialogOpen, []);

  const updateFormDialog = useCallback(handleFormDialogUpdate, []);

  const closeFormDialog = useCallback(handleFormDialogClose, [formDialog]);

  // Sync backdrop state with dialog state
  useEffect(syncBackdropState, [formDialog]);

  return (
    <FormDialogContext.Provider
      value={{
        formDialog,
        openFormDialog,
        closeFormDialog,
        updateFormDialog
      }}
    >
      {children}
    </FormDialogContext.Provider>
  );

  function handleDialogOpen(config: IFormDialogConfig) {
    setFormDialog({ ...config, open: true });
  }

  function handleFormDialogUpdate(next: Partial<IFormDialogState>) {
    setFormDialog(prev => {
      // Only update when values actually change to avoid render loops
      if (!prev || !hasFormDialogChanged(prev, next)) return prev;

      return { ...prev, ...next } as IFormDialogState;
    });
  }

  function hasFormDialogChanged(prev: any, next: any) {
    return (
      checkHasValueChanged('isInvalid', prev, next) ||
      checkHasValueChanged('isDirty', prev, next) ||
      checkHasObjectChanged(prev, next)
    );
  }

  function handleFormDialogClose(forceClose?: boolean) {
    if (!formDialog) return;

    if (forceClose) {
      handleClose();
      return;
    }

    let shouldClose = true;

    // Prevent closing if dialog reports invalid state (e.g., form has validation errors)
    if (formDialog?.disableCloseWhenInvalid && checkIsInvalid()) {
      shouldClose = false;
    } else if (checkIsDirty()) {
      shouldClose = window.confirm(formDialog?.dirtyMessage || DEFAULT_DIRTY_TRACKER_MESSAGE);
    }

    if (shouldClose) handleClose();
  }

  function checkIsDirty() {
    return !!(formDialog && typeof formDialog.isDirty === 'function' && formDialog.isDirty());
  }

  function checkIsInvalid() {
    return !!(formDialog && typeof formDialog.isInvalid === 'function' && formDialog.isInvalid());
  }

  function syncBackdropState() {
    return formDialog && formDialog.open ? openBackdrop() : closeBackdrop();
  }

  function handleClose() {
    setFormDialog(null);
  }
};

export default FormDialogProvider;

export interface IFormDialogProvider extends PropsWithChildren {}
