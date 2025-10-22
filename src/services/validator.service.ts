import { isValidRegex } from 'utils';

export default class ValidatorService {
  /**
   * Checks if a string has a truthy value.
   *
   * @param value - The string to check.
   * @returns `true` if the string is not empty, `false` otherwise.
   */
  static isRequired(value: unknown): boolean {
    return !!value;
  }

  static isValidMaxLength(value: string, max: number): boolean {
    return value.length <= max;
  }

  /**
   * Checks if a string meets a minimum length requirement.
   *
   * @param value - The string to check.
   * @param min - Minimum required length.
   * @returns `true` if the string's length is greater than or equal to `min`.
   */
  static isValidMinLength(value: string, min: number): boolean {
    return value.length >= min;
  }

  static isValidUsername(value: string): boolean {
    return isValidRegex(value, /^[@a-zA-Z0-9][a-zA-Z0-9_.-]*$/);
  }
}

export const validationMessages: Record<MapBuilderType, (...args: any) => string> = {
  isRequired: label => `${label} is required.`,
  isValidMinLength: (label, minLength) => `${label} must be at least ${minLength} characters.`,
  isValidMaxLength: (label, maxLength) => `${label} must be no more than ${maxLength} characters.`,
  isValidUsername: label =>
    `${label} must start with a letter and contain only letters, numbers, periods, and underscores.`
};

type MapBuilderType = Exclude<keyof typeof ValidatorService, 'prototype'>;
export type ValidationErrorRecord = Record<string, boolean>;
export type ValidatorFn = (value: string) => ValidationErrorRecord | null;
