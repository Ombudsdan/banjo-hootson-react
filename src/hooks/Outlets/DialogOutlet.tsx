import { Dialog } from 'components';
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
    <Dialog.Container onClose={handleClose} titleId={DEFAULT_DIALOG_TITLE_ID} bodyTextId={DEFAULT_DIALOG_BODY_TEXT_ID}>
      {title && <Dialog.Title title={title} id={DEFAULT_DIALOG_TITLE_ID} />}
      {message && <Dialog.BodyText text={message} id={DEFAULT_DIALOG_BODY_TEXT_ID} />}
      {children}
      {!hideDefaultActions && (
        <Dialog.ActionButtons {...actionButtonsProps} onClose={handleClose} onConfirm={handleConfirmClick} />
      )}
    </Dialog.Container>
  );

  function handleConfirmClick() {
    onDialogConfirm();
    closeDialog();
  }

  function handleClose() {
    closeDialog();
  }
}
