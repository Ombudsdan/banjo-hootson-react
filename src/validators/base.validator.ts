import { isEmpty } from 'utils';

/**
 * Abstract base class for implementing specific validation logic.
 *
 * `BaseValidator` provides common utilities for performing and managing validation,
 * such as handling error message mappings and extracting human-readable messages.
 * Subclasses must implement the {@link validate} method to define their own
 * validation rules.
 *
 * @abstract
 */
export default abstract class BaseValidator {
  protected static errorMessageMap: Map<string, string>;

  /**
   * Executes validation checks based on a configuration record of validation flags.
   *
   * - If the input value is empty:
   *   - Returns `{ isRequired: true }` if the `isRequired` flag is set in the config.
   *   - Otherwise, skips validation and returns `null`.
   * - Otherwise, evaluates all configured validation rules using `BaseValidator.evaluateValidation`.
   *
   * @protected
   * @param value - The value to validate.
   * @param config - A record mapping validation rule names to boolean flags.
   * @returns An object containing the keys of failed validations, or `null` if all pass.
   */
  protected static executeValidation(value: unknown, config: ValidationConfigRecord): IValidation['errors'] {
    // Handle required field check
    if (isEmpty(value)) {
      return config.isRequired ? ({ isRequired: true } as ValidationConfigRecord) : null;
    }

    // Evaluate other validation rules
    return BaseValidator.evaluateValidation(config);
  }

  /**
   * Evaluates a set of validation rules and returns the failed ones.
   *
   * - Iterates over the `config` object, which maps validation rule names to boolean flags.
   * - Collects all rules where the value is `true` (indicating a valid state).
   * - Returns an object containing only the invalid/failed rules, or `null` if all rules pass.
   *
   * @private
   * @param config - A record mapping validation rule names to boolean flags.
   * @returns An object of failed validation rules, or `null` if no rules failed.
   */
  private static evaluateValidation(config: ValidationConfigRecord): IValidation['errors'] {
    const invalidRules = Object.entries(config).filter(([_, isValid]) => !isValid);
    return invalidRules.length ? (Object.fromEntries(invalidRules) as ValidationConfigRecord) : null;
  }

  /**
   * Performs validation for the given value and optional arguments.
   *
   * This method must be implemented by subclasses. It should return either
   * a map of validation errors or `null` when the input passes all checks.
   *
   * @abstract
   * @param {*} _value - The value to validate.
   * @param {Record<string, any>} [_args] - Optional additional parameters for validation.
   * @returns {IValidation['errors']} A record of validation errors or `null` if valid.
   * @throws {Error} Always throws unless overridden in a subclass.
   */
  static validate(_value: any, _args?: Record<string, any>): IValidation['errors'] {
    throw new Error(`'validate' method must be implemented in subclass.`);
  }

  /**
   * Converts a validation error record into an array of readable error messages.
   *
   * Uses the `errorMessageMap` to resolve human-friendly messages for each
   * validation key. If no message exists for a key, a generic fallback is used.
   *
   * @param {IValidation['errors']} errors - A record of validation errors or `null`.
   * @returns {IValidation['errorMessages']} An array of descriptive error messages.
   */
  static getErrorMessages(errors: IValidation['errors']): IValidation['errorMessages'] {
    return errors ? Object.keys(errors).map(key => this.errorMessageMap.get(key) || `Invalid input: ${key}.`) : [];
  }
}

/**
 * A record mapping validation rule identifiers to boolean flags indicating validity.
 *
 * `true` means the rule failed (invalid); `false` means it passed (valid).
 *
 * @typedef {Object} ValidationConfigRecord
 * @type {Record<string, boolean>}
 */
type ValidationConfigRecord = Record<string, boolean> & { isRequired?: boolean };

/**
 * Interface describing the structure of a validation result.
 *
 * @interface IValidation
 * @property {ValidationConfigRecord | null} errors - A map of failed validation keys or `null` if valid.
 * @property {string[]} errorMessages - A list of user-friendly error messages corresponding to the failed keys.
 */
export interface IValidation {
  errors: ValidationConfigRecord | null;
  errorMessages: string[];
}
