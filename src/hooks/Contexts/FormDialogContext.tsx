import { createContext, FormEvent } from 'react';
import { IBaseDialog } from '.';
import { FormSubmitContext } from 'hooks/Outlets';

const FormDialogContext = createContext<IFormDialogContext | undefined>(undefined);

export default FormDialogContext;

export interface IFormDialogConfig extends IFormDialog {
  isDirty?: () => boolean;
  isInvalid?: () => boolean;
  dirtyMessage?: string;
}

export interface IFormDialogState extends IFormDialog, IFormDialogConfig {
  open: boolean;
}

interface IFormDialogContext {
  formDialog: IFormDialogState | null;
  openFormDialog: (config: IFormDialogConfig) => void;
  closeFormDialog: (forceClose?: boolean) => void;
  updateFormDialog: (next: Partial<IFormDialogState>) => void;
}

interface IFormDialog extends IBaseDialog {
  onFormDialogConfirm: (e: FormEvent<HTMLFormElement>, form: FormSubmitContext) => void | Promise<void>;
  onFormDialogConfirmFailure?: (err: Error) => void;
  disableCloseWhenInvalid?: boolean;
}
