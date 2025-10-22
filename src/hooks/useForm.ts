import { useContext } from 'react';
import { FormContext, FormFieldsRecord, IFormContext } from 'hooks';

export default function useForm<TFields extends object = FormFieldsRecord>(): IFormContext<TFields> {
  const ctx = useContext(FormContext) as IFormContext<TFields> | undefined;
  if (!ctx) throw new Error('useForm must be used inside a FormProvider');
  return ctx;
}
