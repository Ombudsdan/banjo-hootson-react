/**
 * Provides standardized validation message helpers for form fields.
 *
 * This utility class generates human-readable validation messages
 * based on common input validation rules (e.g. required fields, length limits, and formatting).
 *
 * @example
 * ```ts
 * ValidationMessage.isRequired('Username');
 * // "Username is required."
 *
 * ValidationMessage.isValidMinLength('Password', 8);
 * // "Password must be at least 8 characters."
 *
 * ValidationMessage.isValidUsername('Username');
 * // "Username must start with a letter and contain only letters, numbers, periods, and underscores."
 * ```
 */
export default class ValidationMessageService {
  /**
   * Returns a message indicating that the given field is required.
   *
   * @param label - The label or name of the field.
   * @returns A string stating that the field is required.
   */
  static isRequired(label: string): string {
    return `${label} is required.`;
  }

  /**
   * Returns a message indicating that the given field must meet a minimum length requirement.
   *
   * @param label - The label or name of the field.
   * @param minLength - The minimum number of characters required.
   * @returns A string stating the minimum character requirement.
   */
  static isValidMinLength(label: string, minLength: number): string {
    return `${label} must be at least ${minLength} characters.`;
  }

  /**
   * Returns a message indicating that the given field must not exceed a maximum length.
   *
   * @param label - The label or name of the field.
   * @param maxLength - The maximum number of characters allowed.
   * @returns A string stating the maximum character limit.
   */
  static isValidMaxLength(label: string, maxLength: number): string {
    return `${label} must be no more than ${maxLength} characters.`;
  }

  /**
   * Returns a message indicating that the given field must conform to a valid username format.
   *
   * The username must start with a letter and may only include letters, numbers, periods, and underscores.
   *
   * @param label - The label or name of the field.
   * @returns A string describing the username format requirement.
   */
  static isValidUsername(label: string): string {
    return `${label} must start with a letter and contain only letters, numbers, periods, and underscores.`;
  }

  /**
   * Returns a message indicating that the given field must contain only valid name characters.
   *
   * Valid characters include letters, numbers, spaces, hyphens, and apostrophes.
   *
   * @param label - The label or name of the field.
   * @returns A string describing the valid name character requirement.
   */
  static hasValidNameCharacters(label: string): string {
    return `${label} must only contain letters, numbers, spaces, hyphens, and apostrophes.`;
  }
}
