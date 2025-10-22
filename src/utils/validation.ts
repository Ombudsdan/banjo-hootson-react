/**
 * Validation utilities
 * Ported from Angular implementation for cross-framework parity.
 * Exposes composable validator functions plus helpers to aggregate results and derive messages.
 */

function patternValidator(regex: RegExp, key: string): ValidatorFn {
  return (value: string) => {
    if (!value) return null;
    return regex.test(value) ? null : { [key]: true };
  };
}

function maxLengthValidator(max: number): ValidatorFn {
  return (value: string) => {
    if (!value) return null;
    return value.length <= max ? null : { maxlength: true };
  };
}

function minLengthValidator(min: number): ValidatorFn {
  return (value: string) => {
    if (!value) return null;
    return value.length >= min ? null : { minlength: true };
  };
}

function requiredValidator(): ValidatorFn {
  return (value: string) => {
    return value ? null : { required: true };
  };
}

function noFutureDateValidator(): ValidatorFn {
  return (value: string) => {
    if (!value) return null;
    const selectedDate = new Date(value);
    selectedDate.setUTCHours(0, 0, 0, 0);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return selectedDate > today ? { futureDate: true } : null;
  };
}

function validFirstCharValidator(): ValidatorFn {
  return (value: string) => {
    if (!value) return null;
    return /^[@a-zA-Z0-9_\-.].*$/.test(value)
      ? null
      : { invalidFirstChar: true };
  };
}

function validRemainingCharsValidator(): ValidatorFn {
  return (value: string) => {
    if (!value || value.length <= 1) return null;
    return /^[a-zA-Z0-9_\-.]*$/.test(value.substring(1))
      ? null
      : { invalidRemainingChars: true };
  };
}

function emailValidator(): ValidatorFn {
  // Simplified email regex similar to Angular's default Validators.email implementation intent
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string) => {
    if (!value) return null;
    return emailRegex.test(value) ? null : { email: true };
  };
}

export const Validation = {
  required: requiredValidator(),
  minLength: (min: number) => minLengthValidator(min),
  maxLength: (max: number) => maxLengthValidator(max),
  namePattern: patternValidator(/^[a-zA-Z0-9\s\-']+$/, "pattern"),
  usernamePattern: patternValidator(
    /^[@a-zA-Z0-9_\-.][a-zA-Z0-9_\-.]*$/,
    "pattern"
  ),
  validFirstChar: validFirstCharValidator(),
  validRemainingChars: validRemainingCharsValidator(),
  noFutureDate: () => noFutureDateValidator(),
  email: emailValidator(),
};

export interface FieldValidationResult {
  dirty: boolean;
  touched: boolean;
  errors: ValidationErrorMap | null;
}

export function runValidators(
  value: string,
  validators: ValidatorFn[]
): ValidationErrorMap | null {
  const aggregate: ValidationErrorMap = {};
  for (const v of validators) {
    const result = v(value);
    if (result) Object.assign(aggregate, result);
  }
  return Object.keys(aggregate).length ? aggregate : null;
}

export function firstErrorMessage(
  errors: ValidationErrorMap | null,
  messages: Record<string, string>
): string {
  if (!errors) return "";
  for (const key of Object.keys(messages)) {
    if (errors[key]) return messages[key];
  }
  return "";
}

export type ValidationErrorMap = Record<string, boolean>;
export type ValidatorFn = (value: string) => ValidationErrorMap | null;
