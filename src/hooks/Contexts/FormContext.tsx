import { createContext } from 'react';
import { IValidation } from 'validators';

// Generic form context. TFields represents the shape of form fields by id.
// NOTE: We intentionally use `any` here to allow providers to supply IFormContext<TFields>
// without running into variance issues across consumer sites. Consumers should use the
// generic useForm<TFields>() hook, which narrows this back to the precise TFields.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export default FormContext;

export interface IFormContext<TFields extends object = FormFieldRecord> {
  fields: Partial<TFields>;
  // Initial values captured on first set for each field, used for dirty detection
  // Not guaranteed to include keys that were never set
  // Consumers typically call isFormDirty() rather than reading this directly
  // but we expose it for debugging if needed
  // initialFields?: FormField;
  isSubmitted: boolean;
  touched: Record<string, boolean>;
  isSaving: boolean;
  fieldValidation: FieldValidationRecord;

  isFormDirty: () => boolean;

  getFormFields(): Partial<TFields>;

  setField: (fieldName: keyof TFields & string, value: TFields[keyof TFields]) => void;
  setFields: (fields: Partial<TFields>) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setTouched: (inputName: string, touched: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setFieldValidation?: (fieldName: string, validations: IValidation) => void;

  resetFields: () => void;
  resetIsSubmitted: () => void;
  resetTouched: () => void;
  resetIsSaving: () => void;
}

export type FormFieldRecord = Record<string, unknown>;

export type FieldValidationRecord = Record<string, IValidation>;
