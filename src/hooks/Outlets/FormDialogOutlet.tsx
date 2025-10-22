import { FormEvent, useEffect } from 'react';
import { FormOutlet, FormSubmitContext, IFormDialogState, useForm, useFormDialog } from 'hooks';
import { DialogActionButtons, DialogBodyText, DialogContainer, DialogTitle } from 'framework';

const DEFAULT_FORM_DIALOG_TITLE_ID = 'form-dialog-title';
const DEFAULT_FORM_DIALOG_BODY_TEXT_ID = 'form-dialog-body-text';

export default function FormDialogOutlet() {
  const { formDialog, closeFormDialog } = useFormDialog();

  if (!formDialog || !formDialog.open) return null;

  const { onFormDialogConfirm: onConfirm, onFormDialogConfirmFailure: onConfirmFailure } = formDialog;

  return (
    <DialogContainer
      onClose={closeFormDialog}
      titleId={DEFAULT_FORM_DIALOG_TITLE_ID}
      bodyTextId={DEFAULT_FORM_DIALOG_BODY_TEXT_ID}
    >
      <FormOutlet onSubmit={handleSubmit} onSubmitFailure={handleSubmitFailure} disablePageValidation={true}>
        <FormDialogContent {...formDialog} />
      </FormOutlet>
    </DialogContainer>
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>, form: FormSubmitContext) {
    await onConfirm(e, form);
    closeFormDialog(true);
  }

  function handleSubmitFailure(err: Error) {
    if (onConfirmFailure) {
      onConfirmFailure(err);
    } else {
      console.error('FormDialog submission failed:', err);
    }
  }
}

/**
 * Since the useForm hook is used, the form state must wrap the form content.
 * To achieve this, we separate out the content `FormDialogContent` from the form wrapper `FormDialog`.
 */
function FormDialogContent(formDialog: IFormDialogState) {
  const { closeFormDialog, updateFormDialog } = useFormDialog();
  const { isFormDirty, fieldValidation } = useForm();

  useEffect(() => {
    updateFormDialog({
      isInvalid: () => Object.values(fieldValidation).some(v => !!v?.errors),
      isDirty: () => isFormDirty()
    });
  }, [fieldValidation, isFormDirty, updateFormDialog]);

  const { title, message, children, confirmType, confirmText, confirmLoadingText, cancelText, isLoading } = formDialog;
  const actionButtonsProps = { confirmType, confirmText, confirmLoadingText, cancelText, isLoading };

  return (
    <>
      {title && <DialogTitle title={title} id={DEFAULT_FORM_DIALOG_TITLE_ID} />}
      {message && <DialogBodyText text={message} id={DEFAULT_FORM_DIALOG_BODY_TEXT_ID} />}
      {children}
      <DialogActionButtons {...actionButtonsProps} isFormDialog onClose={closeFormDialog} />
    </>
  );
}
