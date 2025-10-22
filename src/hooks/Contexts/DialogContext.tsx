import { IDialogActionButtons } from 'components';
import { createContext, PropsWithChildren } from 'react';

const DialogContext = createContext<IDialogContext | undefined>(undefined);

export default DialogContext;

export interface IDialogConfig extends IDialog {
  isDirty?: () => boolean;
  isInvalid?: () => boolean;
  dirtyMessage?: string;
  disableBackdropClose?: boolean;
}

export interface IDialogState extends IDialogConfig {
  open: boolean;
}

interface IDialogContext {
  dialog: IDialogState | null;
  openDialog: (config: IDialogConfig) => void;
  closeDialog: (forceClose?: boolean) => void;
  confirmDialog: () => void;
  updateDialog: (next: Partial<IDialogState>) => void;
}

interface IDialog extends IBaseDialog {
  onDialogConfirm: () => void;
  hideDefaultActions?: boolean;
}

export interface IBaseDialog extends PropsWithChildren, IDialogActionButtons {
  title?: string;
  message?: string;
}
