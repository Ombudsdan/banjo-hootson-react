import { ValidationRuleService } from 'services';
import { isArrayEmpty } from 'utils';
import { BaseValidator } from 'validators';

export default class PlushieInstagramAccountListValidator extends BaseValidator {
  protected static errorMessageMap: Map<PlushieInstagramAccountListValidatorKey, string> = new Map([
    ['hasNoAccounts', 'At least one Instagram username must be provided.']
  ]);

  static validate(value: string[]) {
    return PlushieInstagramAccountListValidator.executeValidation(value, {
      hasNoAccounts: PlushieInstagramAccountListValidator.hasNoAccounts(value)
    });
  }

  /**
   * Checks whether the provided account list is empty.
   *
   * Utility method used to validate that at least one account
   * has been supplied. Internally delegates to `isArrayEmpty()`
   * for the actual emptiness check.
   *
   * @private
   * @param value - The array of account identifiers or values to evaluate.
   * @returns `true` if no accounts are present (array is empty), otherwise `false`.
   */
  private static hasNoAccounts(value: string[]): boolean {
    return isArrayEmpty(value);
  }
}

type PlushieInstagramAccountListValidatorKey = 'hasNoAccounts' | keyof typeof ValidationRuleService;
