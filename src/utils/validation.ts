import { ValidationErrorRecord, ValidatorService, ValidatorFn } from 'services';
import { isFutureDate, toLowercase } from 'utils';

export function isValidRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}

export function isValueInArray<T>(value: T, existingValues?: T[]): boolean {
  const list = existingValues ?? [];
  const normalisedValue = typeof value === 'string' ? toLowercase((value as unknown) as string) : value;
  const normalisedArray = list.map(v => (typeof v === 'string' ? toLowercase((v as unknown) as string) : v));
  return normalisedArray.includes(normalisedValue);
}

export function hasMultipleAtSymbols(value: string): boolean {
  return (value.match(/@/g) || []).length !== 1;
}

export function getEmailParts(value: string): [string, string] | [null, null] {
  const parts = value.split('@');
  if (parts.length === 2) {
    return [parts[0], parts[1]];
  }
  return [null, null];
}

/**
 * Validation utilities
 * Ported from Angular implementation for cross-framework parity.
 * Exposes composable validator functions plus helpers to aggregate results and derive messages.
 */

export const Validation = {
  required: requiredValidator(),
  minLength: (min: number) => minLengthValidator(min),
  maxLength: (max: number) => maxLengthValidator(max),
  namePattern: patternValidator(/^[a-zA-Z0-9\s\-']+$/, 'pattern'),
  usernamePattern: patternValidator(/^[@a-zA-Z0-9_\-.][a-zA-Z0-9_\-.]*$/, 'pattern'),
  validFirstChar: validFirstCharValidator(),
  validRemainingChars: validRemainingCharsValidator(),
  noFutureDate: () => noFutureDateValidator(),
  email: emailValidator()
};

export function runValidators(value: string, validators: ValidatorFn[]): ValidationErrorRecord | null {
  const aggregate: ValidationErrorRecord = {};
  for (const v of validators) {
    const result = v(value);
    if (result) Object.assign(aggregate, result);
  }
  return Object.keys(aggregate).length ? aggregate : null;
}

export function firstErrorMessage(errors: ValidationErrorRecord | null, messages: Record<string, string>): string {
  if (!errors) return '';
  for (const key of Object.keys(messages)) {
    if (errors[key]) return messages[key];
  }
  return '';
}

// Deprecated functions below
// I have since implemented BaseValidator and specific validator classes

function patternValidator(regex: RegExp, key: string): ValidatorFn {
  return (value: string) => (!value || isValidRegex(value, regex) ? null : { [key]: true });
}

function maxLengthValidator(max: number): ValidatorFn {
  return (value: string) => (!value || ValidatorService.isValidMaxLength(value, max) ? null : { maxlength: true });
}

function minLengthValidator(min: number): ValidatorFn {
  return (value: string) => (!value || ValidatorService.isValidMinLength(value, min) ? null : { minlength: true });
}

function requiredValidator(): ValidatorFn {
  return (value: string) => (!value || ValidatorService.isRequired(value) ? null : { required: true });
}

function noFutureDateValidator(): ValidatorFn {
  return (value: string) => (!value || isFutureDate(value) ? null : { futureDate: true });
}

function validFirstCharValidator(): ValidatorFn {
  return (value: string) => (!value || isValidRegex(value, /^[@a-zA-Z0-9]/) ? null : { invalidFirstChar: true });
}

function validRemainingCharsValidator(): ValidatorFn {
  return (value: string) =>
    !value || value.length <= 1 || isValidRegex(value.substring(1), /^[a-zA-Z0-9_\-.]+$/)
      ? null
      : { invalidRemainingChars: true };
}

function emailValidator(): ValidatorFn {
  return (value: string) => (!value || isValidRegex(value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? null : { email: true });
}
