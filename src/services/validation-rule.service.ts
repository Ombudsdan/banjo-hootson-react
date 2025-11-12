import { isValidRegex } from 'utils';

/**
 * Provides reusable validation rule utilities for form input validation.
 *
 * This service contains static methods for performing common input checks such as
 * required fields, length constraints, and username formatting. It is designed
 * to be used in conjunction with form validation logic or reactive form builders.
 *
 * @example
 * ```ts
 * ValidationRuleService.isRequired('hello');        // true
 * ValidationRuleService.isValidMinLength('abc', 2); // true
 * ValidationRuleService.isValidMaxLength('abc', 5); // true
 * ValidationRuleService.isValidUsername('user_01'); // true
 * ```
 */
export default class ValidationRuleService {
  /**
   * Checks whether a value is present and truthy.
   *
   * This is a general-purpose check used to validate required fields.
   *
   * @param value - The value to check.
   * @returns `true` if the value is not `null`, `undefined`, `false`, `0`, `''`, or any other falsy value; otherwise `false`.
   *
   * @example
   * ```ts
   * ValidationRuleService.isRequired('hello'); // true
   * ValidationRuleService.isRequired('');      // false
   * ValidationRuleService.isRequired(null);    // false
   * ```
   */
  static isRequired(value: unknown): boolean {
    return !!value;
  }

  /**
   * Checks whether a string does not exceed a maximum length.
   *
   * @param value - The string to validate.
   * @param max - The maximum allowed number of characters.
   * @returns `true` if the string length is less than or equal to `max`, otherwise `false`.
   *
   * @example
   * ```ts
   * ValidationRuleService.isValidMaxLength('hello', 10); // true
   * ValidationRuleService.isValidMaxLength('longword', 5); // false
   * ```
   */
  static isValidMaxLength(value: string, max: number): boolean {
    return value.length <= max;
  }

  /**
   * Checks whether a string meets a minimum length requirement.
   *
   * @param value - The string to validate.
   * @param min - The minimum number of characters required.
   * @returns `true` if the string length is greater than or equal to `min`, otherwise `false`.
   *
   * @example
   * ```ts
   * ValidationRuleService.isValidMinLength('hello', 3); // true
   * ValidationRuleService.isValidMinLength('hi', 3);    // false
   * ```
   */
  static isValidMinLength(value: string, min: number): boolean {
    return value.length >= min;
  }

  /**
   * Checks whether a string conforms to a valid username format.
   *
   * The username must:
   * - Start with a letter or `@` symbol.
   * - Contain only letters, numbers, underscores (`_`), periods (`.`), or hyphens (`-`).
   *
   * @param value - The string to validate.
   * @returns `true` if the string matches the username pattern, otherwise `false`.
   *
   * @example
   * ```ts
   * ValidationRuleService.isValidUsername('user_01');  // true
   * ValidationRuleService.isValidUsername('@handle');  // true
   * ValidationRuleService.isValidUsername('123name');  // false
   * ```
   */
  static isValidUsername(value: string): boolean {
    return isValidRegex(value, /^[@a-zA-Z0-9][a-zA-Z0-9_.-]*$/);
  }

  /**
   * Checks whether a given string contains only valid name characters.
   *
   * Valid characters include:
   * - Uppercase and lowercase English letters (A–Z, a–z)
   * - Digits (0–9)
   * - Spaces
   * - Hyphens (-)
   * - Apostrophes (')
   *
   * @param value - The string to validate.
   * @returns `true` if the string contains only valid characters; otherwise, `false`.
   *
   * @example
   * ```ts
   * ValidationRuleService.hasValidNameCharacters("Mr Fluffington");   // true — letters and space only
   * ValidationRuleService.hasValidNameCharacters("O'Malley Jr");      // true — includes apostrophe and space
   * ValidationRuleService.hasValidNameCharacters("Plushie-3000");     // true — includes hyphen and digits
   *
   * ValidationRuleService.hasValidNameCharacters("Mr. Fluffington");  // false — period (.) not allowed
   * ValidationRuleService.hasValidNameCharacters("Fluff@Home");       // false — @ symbol not allowed
   * ValidationRuleService.hasValidNameCharacters("Mr Fluffington!");  // false — exclamation mark not allowed
   * ```
   */
  static hasValidNameCharacters(value: string): boolean {
    return isValidRegex(value, /^[a-zA-Z0-9\s\-']+$/);
  }
}
