import { DialogActionButtons, DialogBodyText, DialogContainer, DialogTitle } from 'components';
import { useDialog } from 'hooks';

const DEFAULT_DIALOG_TITLE_ID = 'dialog-title';
const DEFAULT_DIALOG_BODY_TEXT_ID = 'dialog-body-text';

export default function DialogOutlet() {
  const { dialog, closeDialog } = useDialog();

  if (!dialog || !dialog.open) return null;

  const {
    title,
    message,
    hideDefaultActions,
    children,
    confirmType,
    confirmText,
    confirmLoadingText,
    cancelText,
    isLoading,
    onDialogConfirm
  } = dialog;
  const actionButtonsProps = { confirmType, confirmText, confirmLoadingText, cancelText, isLoading };

  return (
    <DialogContainer onClose={handleClose} titleId={DEFAULT_DIALOG_TITLE_ID} bodyTextId={DEFAULT_DIALOG_BODY_TEXT_ID}>
      {title && <DialogTitle title={title} id={DEFAULT_DIALOG_TITLE_ID} />}
      {message && <DialogBodyText text={message} id={DEFAULT_DIALOG_BODY_TEXT_ID} />}
      {children}
      {!hideDefaultActions && (
        <DialogActionButtons {...actionButtonsProps} onClose={handleClose} onConfirm={handleConfirmClick} />
      )}
    </DialogContainer>
  );

  function handleConfirmClick() {
    onDialogConfirm();
    closeDialog();
  }

  function handleClose() {
    closeDialog();
  }
}
