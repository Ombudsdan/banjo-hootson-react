import { createContext } from 'react';
import { IValidation } from 'validators';

const FormContext = createContext<IFormContext | undefined>(undefined);

export default FormContext;

export interface IFormContext {
  fields: FormField;
  // Initial values captured on first set for each field, used for dirty detection
  // Not guaranteed to include keys that were never set
  // Consumers typically call isFormDirty() rather than reading this directly
  // but we expose it for debugging if needed
  // initialFields?: FormField;
  isSubmitted: boolean;
  touched: Record<string, boolean>;
  isSaving: boolean;
  fieldValidation: FieldValidation;

  isFormDirty: () => boolean;

  getFormFields: () => FormField;

  setField: (fieldName: string, value: any) => void;
  setFields: (fields: FormField) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  setTouched: (inputName: string, touched: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setFieldValidation?: (fieldName: string, validations: IValidation) => void;

  resetFields: () => void;
  resetIsSubmitted: () => void;
  resetTouched: () => void;
  resetIsSaving: () => void;
}

export type FormField = Record<string, any>;
export type FieldValidation = Record<string, IValidation>;
