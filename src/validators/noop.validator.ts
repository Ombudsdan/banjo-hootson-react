import BaseValidator from './base.validator';

/**
 * A validator that performs no validation and always returns `null`.
 *
 * This class serves as a no-op (no operation) implementation of {@link BaseValidator}.
 * It can be used as a placeholder or default validator when no actual validation
 * logic is required.
 *
 * @extends BaseValidator
 */
export default class NoopValidator extends BaseValidator {
  protected static _inputLabel = 'No operation';

  protected static errorMessageMap: Map<string, string> = new Map();

  static validate() {
    return null;
  }
}
