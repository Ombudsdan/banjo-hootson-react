import { ReactNode, useCallback, useMemo, useState } from 'react';
import { FormContext, FieldValidationRecord, IFormContext } from 'hooks';
import { IValidation } from 'validators';
import { areJsonEqual } from 'utils';

export default function FormProvider<TFields extends object = Record<string, unknown>>({
  children
}: {
  children: ReactNode;
}) {
  // Store raw records internally for simpler dynamic key operations
  const [rawFields, setRawFields] = useState<FormFieldsRecord>({});
  const [rawInitialFields, setRawInitialFields] = useState<FormFieldsRecord>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldValidation, setFieldValidation] = useState<FieldValidationRecord>({});

  // Expose typed view to consumers
  const fields = rawFields as Partial<TFields>;

  const getFormFieldsCallback = useCallback(getFormFields, [rawFields]);
  const isFormDirty = useCallback(getIsFormDirty, [rawFields, rawInitialFields]);
  const setFieldCallback = useCallback(updateField, []);
  const setFieldsCallback = useCallback(updateFields, []);
  const setTouchedCallback = useCallback(updateTouched, []);
  const setIsSubmittedCallback = useCallback((next: boolean) => setIsSubmitted(next), []);
  const setIsSavingCallback = useCallback((next: boolean) => setIsSaving(next), []);
  const setFieldValidationCallback = useCallback(updateValidation, []);
  const resetFieldsCallback = useCallback(resetFields, []);
  const resetTouchedCallback = useCallback(() => setTouched({}), []);
  const resetIsSubmittedCallback = useCallback(() => setIsSubmitted(false), []);
  const resetIsSavingCallback = useCallback(() => setIsSaving(false), []);

  // Memoize context value to keep reference stable between relevant state changes only
  const contextValue: IFormContext<TFields> = useMemo(
    () => ({
      fields,
      touched,
      isSubmitted,
      isSaving,
      fieldValidation,
      getFormFields: getFormFieldsCallback,
      isFormDirty,
      setField: setFieldCallback,
      setFields: setFieldsCallback,
      setTouched: setTouchedCallback,
      setIsSubmitted: setIsSubmittedCallback,
      setIsSaving: setIsSavingCallback,
      setFieldValidation: setFieldValidationCallback,
      resetFields: resetFieldsCallback,
      resetTouched: resetTouchedCallback,
      resetIsSubmitted: resetIsSubmittedCallback,
      resetIsSaving: resetIsSavingCallback
    }),
    [
      fields,
      touched,
      isSubmitted,
      isSaving,
      fieldValidation,
      getFormFieldsCallback,
      isFormDirty,
      setFieldCallback,
      setFieldsCallback,
      setTouchedCallback,
      setIsSubmittedCallback,
      setIsSavingCallback,
      setFieldValidationCallback,
      resetFieldsCallback,
      resetTouchedCallback,
      resetIsSubmittedCallback,
      resetIsSavingCallback
    ]
  );

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;

  /**
   * Returns the current set of form field values as a partial of TFields.
   * Undefined values are omitted so consumers can treat the result as
   * "only the fields that have been set".
   *
   * @returns Partial<TFields> containing only keys with defined values.
   */
  function getFormFields() {
    const acc: FormFieldsRecord = {};
    for (const [key, value] of Object.entries(rawFields)) {
      if (value !== undefined) acc[key] = value;
    }
    return acc as Partial<TFields>;
  }

  /**
   * Computes whether the form has diverged from its initial values.
   * Initial values are captured lazily per field on the first write.
   *
   * @returns true if any field differs from its initial value; false otherwise.
   */
  function getIsFormDirty() {
    const keys = new Set([...Object.keys(rawInitialFields), ...Object.keys(rawFields)]);
    for (const key of keys) {
      const curr = rawFields[key];
      const init = rawInitialFields[key];
      if (!areJsonEqual(curr, init)) return true;
    }
    return false;
  }

  /**
   * Sets a single field value and captures the initial value for that field
   * if it has not yet been recorded for dirty checking.
   *
   * @param fieldName - The TFields key to update.
   * @param value - The value to assign to the field.
   */
  function updateField(fieldName: keyof TFields & string, value: TFields[keyof TFields]) {
    setRawFields(prev => (prev[fieldName] === value ? prev : { ...prev, [fieldName]: value }));
    setRawInitialFields(prevInit => {
      if (Object.prototype.hasOwnProperty.call(prevInit, fieldName)) return prevInit;
      return { ...prevInit, [fieldName]: value };
    });
  }

  /**
   * Merges a set of field values into the current state and records initial
   * values for any fields that have not yet been initialized.
   *
   * @param nextFields - Partial set of fields to merge into form state.
   */
  function updateFields(nextFields: Partial<TFields>) {
    setRawFields(prev => ({ ...prev, ...(nextFields as FormFieldsRecord) }));
    setRawInitialFields(prevInit => {
      let mutated = false;
      const draft: FormFieldsRecord = { ...prevInit };
      for (const [k, v] of Object.entries(nextFields as FormFieldsRecord)) {
        if (!Object.prototype.hasOwnProperty.call(draft, k)) {
          draft[k] = v;
          mutated = true;
        }
      }
      return mutated ? draft : prevInit;
    });
  }

  /**
   * Marks a form input as touched or untouched. Useful for UX around
   * when to display validation messages.
   *
   * @param inputName - The logical input identifier.
   * @param touch - Whether the input has been interacted with.
   */
  function updateTouched(inputName: string, touch: boolean) {
    setTouched(prev => ({ ...prev, [inputName]: touch }));
  }

  /**
   * Updates validation state for a single field. If `next` is null/undefined
   * and a current entry exists, the field validation is removed from the map.
   *
   * @param fieldName - The field identifier.
   * @param next - The new validation state to store for the field.
   */
  function updateValidation(fieldName: string, next: IValidation) {
    setFieldValidation(prev => {
      const curr = prev[fieldName];
      if (curr === next) return prev;
      const sameErrors = areJsonEqual(curr?.errors, next?.errors);
      const sameMessages = areJsonEqual(curr?.errorMessages, next?.errorMessages);
      if (sameErrors && sameMessages) return prev;
      if (curr && !next) {
        // Explicitly remove field entry when next is null/undefined
        const rest = { ...prev } as FieldValidationRecord;
        delete rest[fieldName];
        return rest;
      }
      return { ...prev, [fieldName]: next } as FieldValidationRecord;
    });
  }

  /**
   * Resets all field values and their captured initial values.
   * Note: this does not modify touched, submitted, or saving flags.
   */
  function resetFields() {
    setRawFields({});
    setRawInitialFields({});
  }
}

export type FormFieldsRecord = Record<string, unknown>;
