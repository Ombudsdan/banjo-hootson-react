import { FormEvent, PropsWithChildren } from 'react';
import {
  FormProvider,
  PageValidationAlertErrorsRecord,
  useForm,
  usePageAlerts,
  useValidationAlert,
  IFormContext,
  FormFieldsRecord
} from 'hooks';

/** Wrapper `Form` component that provides context so hooks can be used safely inside */
export default function FormOutlet<TFields extends object = FormFieldsRecord>(props: IForm<TFields>) {
  return (
    <FormProvider<TFields>>
      <FormContent<TFields> {...props} />
    </FormProvider>
  );
}

/**
 * Since the useForm hook is used, the form state must wrap the form content.
 * To achieve this, we separate out the content `FormContent` from the form wrapper `Form`.
 */
function FormContent<TFields extends object = FormFieldsRecord>({
  children,
  onSubmit,
  onSubmitFailure,
  onSubmitFinally,
  disablePageValidation
}: IForm<TFields>) {
  const { dismissAllAlerts } = usePageAlerts();
  const {
    setIsSubmitted,
    isSaving,
    setIsSaving,
    fields,
    getFormFields,
    touched,
    isSubmitted,
    fieldValidation
  } = useForm<TFields>();
  const { setValidationAlert, clearValidationAlert } = useValidationAlert();

  return <form onSubmit={submit}>{children}</form>;

  async function submit(e: FormEvent<HTMLFormElement>) {
    if (isSaving) return;

    triggerSubmitEvent(e);

    if (!validateForm()) return;

    setIsSaving(true);

    try {
      await onSubmit(e, {
        fields,
        getFormFields,
        touched,
        isSubmitted,
        isSaving,
        fieldValidation
      });
    } catch (err) {
      onSubmitFailure(err as Error);
    } finally {
      onSubmitFinally?.();
      setIsSaving(false);
    }
  }

  function validateForm(e?: FormEvent) {
    if (e) triggerSubmitEvent(e);

    const validators = Object.entries(fieldValidation);
    const isValid = validators.every(([, validation]) => !validation?.errors);

    if (!disablePageValidation && !isValid) {
      const validationErrors = validators
        .filter(([, validation]) => validation.errorMessages?.length)
        .reduce((acc, [inputId, validation]) => {
          acc[inputId] = validation.errorMessages;
          return acc;
        }, {} as PageValidationAlertErrorsRecord);

      setValidationAlert(validationErrors);
    }

    return isValid;
  }

  function triggerSubmitEvent(e: FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
    clearValidationAlert();
    dismissAllAlerts();
  }
}

interface IForm<TFields extends object = FormFieldsRecord> extends PropsWithChildren {
  onSubmit: (e: FormEvent<HTMLFormElement>, form: FormSubmitContext<TFields>) => void | Promise<void>;
  onSubmitFailure: (err: Error) => void;
  onSubmitFinally?: () => void;
  disablePageValidation?: boolean;
}

export type FormSubmitContext<TFields extends object = FormFieldsRecord> = Pick<
  IFormContext<TFields>,
  'fields' | 'getFormFields' | 'touched' | 'isSubmitted' | 'isSaving' | 'fieldValidation'
>;
