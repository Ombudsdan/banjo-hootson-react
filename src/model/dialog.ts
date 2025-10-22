import { PropsWithChildren } from 'react';
import { createEnum, ValueOf } from 'utils';

export const DialogConfirm = createEnum({
  PRIMARY: 'primary',
  DANGER: 'danger'
});

export type DialogConfirmType = ValueOf<typeof DialogConfirm>;

export interface IDialog extends PropsWithChildren {
  title?: string;
  message?: string;
  confirmType?: DialogConfirmType;
  confirmText?: string;
  confirmLoadingText?: string;
  cancelText?: string;
  isLoading?: boolean;
  hideDefaultActions?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export interface IDialogConfig extends Omit<IDialog, 'onClose'>, Partial<Pick<IDialog, 'onClose'>> {}

export interface DialogState extends IDialog {
  open: boolean;
}

export interface DialogContextValue {
  dialog: DialogState | null;
  openDialog: (config: IDialogConfig) => void;
  closeDialog: () => void;
  confirmDialog: () => void;
}

export interface IDialogProvider extends PropsWithChildren {}
