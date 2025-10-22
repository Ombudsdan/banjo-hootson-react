import { ReactNode, useCallback, useMemo, useState } from 'react';
import { FormContext, FieldValidation, FormField } from 'hooks';
import { IValidation } from 'validators';
import { areJsonEqual } from 'utils';

export default function FormProvider({ children }: { children: ReactNode }) {
  const [fields, setFields] = useState<Record<string, any>>({});
  const [initialFields, setInitialFields] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<FieldValidation>({});

  // Stable callbacks to avoid identity churn triggering effects in consumers
  const getFormFields = useCallback(() => {
    return Object.entries(fields).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
  }, [fields]);

  const isFormDirty = useCallback(() => {
    const keys = new Set([...Object.keys(initialFields), ...Object.keys(fields)]);
    for (const key of keys) {
      const curr = fields[key];
      const init = initialFields[key];
      if (!areJsonEqual(curr, init)) return true;
    }
    return false;
  }, [fields, initialFields]);

  const setFieldCb = useCallback((fieldName: string, value: any) => {
    setFields(prev => (prev[fieldName] === value ? prev : { ...prev, [fieldName]: value }));
    setInitialFields(prevInit => {
      if (Object.prototype.hasOwnProperty.call(prevInit, fieldName)) return prevInit;
      return { ...prevInit, [fieldName]: value };
    });
  }, []);
  const setFieldsCb = useCallback((nextFields: FormField) => {
    setFields(prev => ({ ...prev, ...nextFields }));
    setInitialFields(prevInit => {
      let mutated = false;
      const draft: Record<string, any> = { ...prevInit };
      for (const [k, v] of Object.entries(nextFields)) {
        if (!Object.prototype.hasOwnProperty.call(draft, k)) {
          draft[k] = v;
          mutated = true;
        }
      }
      return mutated ? draft : prevInit;
    });
  }, []);
  const setTouchedCb = useCallback(
    (inputName: string, touch: boolean) => setTouched(prev => ({ ...prev, [inputName]: touch })),
    []
  );
  const setIsSubmittedCb = useCallback((next: boolean) => setIsSubmitted(next), []);
  const setIsSavingCb = useCallback((next: boolean) => setIsSaving(next), []);
  const setFieldValidationCb = useCallback((fieldName: string, next: IValidation) => {
    setFieldValidation(prev => {
      const curr = prev[fieldName];
      if (curr === next) return prev;
      const sameErrors = areJsonEqual(curr?.errors, next?.errors);
      const sameMessages = areJsonEqual(curr?.errorMessages, next?.errorMessages);
      if (sameErrors && sameMessages) return prev;
      if (curr && !next) {
        // Explicitly remove field entry when next is null/undefined
        const { [fieldName]: _, ...rest } = prev;
        return rest as FieldValidation;
      }
      return { ...prev, [fieldName]: next } as FieldValidation;
    });
  }, []);

  const resetFields = useCallback(() => {
    setFields({});
    setInitialFields({});
  }, []);
  const resetTouched = useCallback(() => setTouched({}), []);
  const resetIsSubmitted = useCallback(() => setIsSubmitted(false), []);
  const resetIsSaving = useCallback(() => setIsSaving(false), []);

  // Memoize context value to keep reference stable between relevant state changes only
  const ctxValue = useMemo(
    () => ({
      fields,
      touched,
      isSubmitted,
      isSaving,
      fieldValidation,
      getFormFields,
      isFormDirty,
      setField: setFieldCb,
      setFields: setFieldsCb,
      setTouched: setTouchedCb,
      setIsSubmitted: setIsSubmittedCb,
      setIsSaving: setIsSavingCb,
      setFieldValidation: setFieldValidationCb,
      resetFields,
      resetTouched,
      resetIsSubmitted,
      resetIsSaving
    }),
    [
      fields,
      touched,
      isSubmitted,
      isSaving,
      fieldValidation,
      getFormFields,
      isFormDirty,
      setFieldCb,
      setFieldsCb,
      setTouchedCb,
      setIsSubmittedCb,
      setIsSavingCb,
      setFieldValidationCb,
      resetFields,
      resetTouched,
      resetIsSubmitted,
      resetIsSaving
    ]
  );

  return <FormContext.Provider value={ctxValue}>{children}</FormContext.Provider>;
}
