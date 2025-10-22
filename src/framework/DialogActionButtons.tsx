import { DialogConfirm, DialogConfirmType } from 'enums';
import { MouseEventHandler } from 'react';

/**
 * Action buttons for dialogs. Supports plain dialogs (Confirm + Cancel) and form dialogs (Submit + Cancel).
 * Validates configuration to prevent incompatible props for the chosen dialog mode.
 */
export default function DialogActionButtons(props: IDialogActionButtons & { isFormDialog?: boolean }) {
  const {
    isFormDialog,
    confirmType = DialogConfirm.PRIMARY,
    confirmText = 'Confirm',
    confirmLoadingText = 'Confirming...',
    cancelText = 'Cancel',
    isLoading,
    onClose,
    onConfirm
  } = props;

  validateConfiguration();

  const confirmButtonProps = { confirmType, confirmText, isLoading, confirmLoadingText };

  return (
    <div className="dialog__action-buttons">
      {isFormDialog && <FormDialogConfirmButton {...confirmButtonProps} />}
      {!isFormDialog && !!onConfirm && <DialogConfirmButton {...confirmButtonProps} onConfirm={onConfirm} />}
      <CloseButton cancelText={cancelText} onClose={onClose} isLoading={isLoading} />
    </div>
  );

  /** Validates that the configuration of the DialogActionButtons is correct
   * based on whether it is used in a form dialog or not. */
  function validateConfiguration() {
    if (!isFormDialog && !onConfirm) {
      throw new Error('DialogActionButtons: onConfirm handler must be provided for non-form dialogs.');
    }

    if (isFormDialog === true && !!onConfirm) {
      throw new Error(
        'DialogActionButtons: Invalid Configuration - either onConfirm handler should not be provided for form dialogs or isFormDialog should be false.'
      );
    }

    if (isFormDialog === false && !!onConfirm) {
      throw new Error(
        'DialogActionButtons: Invalid Configuration - either onConfirm handler should not be provided for form dialogs or isFormDialog should be false.'
      );
    }
  }
}

function FormDialogConfirmButton({
  confirmType,
  isLoading,
  confirmText,
  confirmLoadingText
}: IFormDialogConfirmButton) {
  return (
    <button type="submit" className={`button button--${confirmType}`} autoFocus disabled={isLoading}>
      {isLoading ? confirmLoadingText : confirmText}
    </button>
  );
}

function DialogConfirmButton({
  confirmType,
  isLoading,
  confirmText,
  confirmLoadingText,
  onConfirm
}: IDialogConfirmButton) {
  return (
    <button
      type="button"
      className={`button button--${confirmType}`}
      onClick={onConfirm}
      autoFocus
      disabled={isLoading}
    >
      {isLoading ? confirmLoadingText : confirmText}
    </button>
  );
}

function CloseButton({ cancelText, isLoading, onClose }: ICloseButton) {
  if (!onClose) {
    throw new Error('DialogActionButtons: onClose handler must be provided for CloseButton.');
  }

  return (
    <button type="button" className="button button--tertiary" onClick={onClose} disabled={isLoading}>
      {cancelText}
    </button>
  );
}

/** Props for {@link DialogActionButtons}. */
export interface IDialogActionButtons extends IPrimaryButton, ICloseButton {
  isLoading?: boolean;
}

/** Base Props for the Primary Buttons, either {@link DialogConfirmButton} for non-form dialogs or {@link FormDialogConfirmButton} for form dialogs */
interface IPrimaryButton {
  confirmType?: DialogConfirmType;
  confirmText?: string;
  confirmLoadingText?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

/** Props for {@link CloseButton}. */
interface ICloseButton extends Pick<IDialogActionButtons, 'isLoading'> {
  cancelText?: string;
  onClose?: () => void;
}

/** Props for {@link DialogConfirmButton}. */
interface IDialogConfirmButton extends Omit<IPrimaryButton, 'onClick'>, Pick<IDialogActionButtons, 'isLoading'> {
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

/** Props for {@link FormDialogConfirmButton}. */
interface IFormDialogConfirmButton extends Omit<IPrimaryButton, 'onClick'>, Pick<IDialogActionButtons, 'isLoading'> {}
