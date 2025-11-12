import { useEffect, useMemo } from 'react';
import { useForm, useInputValidation } from '.';
import { BaseValidator, IValidation, NoopValidator } from 'validators';
import { isEmpty } from 'utils';
import { ValidationMessageService } from 'services';

/**
 * React hook that registers a form field with the global `useForm` context,
 * manages its local value, and automatically runs validation logic.
 *
 * This hook keeps `useForm` generic while consolidating per-input validation
 * and state management concerns, ensuring consistent behavior across form fields.
 *
 * @template TValue
 * @param {IUseFormField<TValue>} options - Field registration and validation configuration.
 * @returns {{
 *   value: TValue;
 *   setValue: (v: TValue) => void;
 *   touched: Record<string, boolean>;
 *   setTouched: (t: boolean) => void;
 *   validation: IValidation;
 *   showErrors: boolean;
 * }} Exposes the current value, mutators, and validation state for the field.
 *
 * @example
 * const nameField = useFormField({
 *   id: 'name',
 *   initialValue: '',
 *   validator: RequiredValidator
 * });
 *
 * <input
 *   value={nameField.value}
 *   onChange={e => nameField.setValue(e.target.value)}
 *   onBlur={() => nameField.setTouched(true)}
 * />
 * {nameField.showErrors && nameField.validation.errorMessages.map(msg => <span key={msg}>{msg}</span>)}
 */
export function useFormField<TValue = string>({
  id,
  initialValue,
  validator,
  args,
  additionalValidators = [],
  isRequired = false
}: IUseFormField<TValue>) {
  const { fields, setField, touched, setTouched, isSubmitted, setFieldValidation, setFields } = useForm();

  // Seed or update initial value when provided from outside (e.g., after async load)
  // - If the field is not yet set, set it to initialValue
  useEffect(() => {
    const curr = fields[id];
    const hasTouched = !!touched[id];

    // Only seed when the field hasn't been initialised yet and the user hasn't touched it
    if (!hasTouched && initialValue !== undefined && isEmpty(curr)) {
      // Use setFields so provider can capture initialFields for this id
      setFields({ [id]: initialValue });
    }
  }, [id, initialValue, touched[id]]);

  // Stable current value: prefer form state, fall back to provided initial value
  const value = (fields[id] ?? initialValue) as TValue;

  // Run validation on the current value
  // Provide a no-op validator when none is supplied so hooks order stays stable
  const effectivePrimaryValidator = useMemo(() => validator || NoopValidator, [validator]);

  const argsKey = useMemo(() => JSON.stringify(args ?? null), [args]);
  const stableArgs = useMemo(() => args, [argsKey]);

  // Run validation on the current value
  const baseValidation: IValidation = useInputValidation(value, effectivePrimaryValidator, stableArgs);

  // Inject required error if flagged and current value is empty & validator did not already mark required
  const primaryValidation: IValidation = useMemo(() => {
    const alreadyHasRequired = !!baseValidation.errors?.isRequired;
    // Treat boolean false as an "empty" value for required semantics (e.g., unchecked checkbox)
    const isValueEmpty = isEmpty(value) || (typeof value === 'boolean' && value === false);
    if (!isRequired || !isValueEmpty || alreadyHasRequired) return baseValidation;

    const nextErrors = { ...(baseValidation.errors || {}), isRequired: true };
    const nextMessages = [...(baseValidation.errorMessages || [])];

    const requiredMessage = effectivePrimaryValidator.inputLabel
      ? ValidationMessageService.isRequired(effectivePrimaryValidator.inputLabel)
      : 'This field is required.';
    nextMessages.unshift(requiredMessage);

    return { errors: nextErrors, errorMessages: nextMessages };
  }, [isRequired, baseValidation, value, effectivePrimaryValidator]);

  // Merge primary + additional validators in a readable way
  const additionalCount = additionalValidators.length;
  const validation: IValidation = useMemo(() => {
    if (!additionalCount) return primaryValidation;
    return mergeValidation(primaryValidation, additionalValidators, value, stableArgs);
  }, [primaryValidation, additionalCount, additionalValidators, value, argsKey]);

  // Stabilize dependencies and register only when validators exist
  const errorsKey = useMemo(() => JSON.stringify(validation.errors ?? null), [validation.errors]);
  const messagesKey = useMemo(() => JSON.stringify(validation.errorMessages ?? []), [validation.errorMessages]);

  useEffect(() => {
    if (!validator && additionalValidators.length === 0) return;
    setFieldValidation?.(id, validation);
  }, [id, errorsKey, messagesKey, setFieldValidation, validator, additionalCount]);

  const isTouched = !!touched[id];
  const showErrors = useMemo(
    () => (isSubmitted || isTouched) && validation.errorMessages.length > 0,
    [isSubmitted, isTouched, validation.errorMessages]
  );

  return {
    value,
    setValue: (newValue: TValue) => setField(id, newValue),
    getValue: (id: string) => fields[id] as TValue,
    touched,
    setTouched: (newValue: boolean) => setTouched(id, newValue),
    validation,
    showErrors
  } as const;
}

export default useFormField;

/**
 * Merge the results of the primary validator and one or more additional validators
 * into a single {@link IValidation} object.
 *
 * @param {IValidation} primaryValidation - Validation result from the primary validator.
 * @param {Array<typeof BaseValidator>} additionalValidators - Extra validators to run after the primary one.
 * @param {unknown} value - The value to validate.
 * @param {UseFormFieldArgsRecord} [args] - Optional arguments to pass to each validator.
 * @returns {IValidation} Combined validation result including merged errors and messages.
 *
 * @internal
 */
function mergeValidation(
  primaryValidation: IValidation,
  additionalValidators: Array<typeof BaseValidator>,
  value: unknown,
  args?: UseFormFieldArgsRecord
): IValidation {
  const errorMessages = [...(primaryValidation.errorMessages || [])];
  const errorObjects: ValidationErrorRecord[] = primaryValidation.errors ? [primaryValidation.errors] : [];

  additionalValidators.forEach(validator => {
    const errors = validator.validate(value, args);
    errorObjects.push(errors || {});
    errorMessages.push(...(validator.getErrorMessages(errors) || []));
  });

  // Merge error objects (shallow merge by keys)
  const validationErrors = Object.assign({}, ...errorObjects) as ValidationErrorRecord;
  const hasErrors = Object.keys(validationErrors).length > 0;

  return {
    errors: hasErrors ? validationErrors : null,
    errorMessages
  };
}

/**
 * Configuration object for {@link useFormField}.
 *
 * @template TValue
 * @interface IUseFormField
 * @property {string} id - Unique identifier for the form field.
 * @property {TValue} initialValue - Initial value assigned on registration.
 * @property {typeof BaseValidator} [validator] - Primary validator for this field.
 * @property {Array<typeof BaseValidator>} [additionalValidators] - Optional secondary validators.
 * @property {Record<string, any>} [args] - Optional parameters for the validator(s).
 */
interface IUseFormField<TValue> {
  id: string;
  initialValue: TValue;
  validator?: typeof BaseValidator;
  additionalValidators?: Array<typeof BaseValidator>;
  args?: UseFormFieldArgsRecord;
  /** When true marks the field required without needing a dedicated validator rule */
  isRequired?: boolean;
}

export type UseFormFieldArgsRecord = Record<string, unknown>;

type ValidationErrorRecord = Record<string, boolean>;
