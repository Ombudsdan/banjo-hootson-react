import { ValidationMessageService, ValidationRuleService } from 'services';
import { isOriginalValue, isValueInArray } from 'utils';
import { BaseValidator, InstagramAccountValidatorKey } from 'validators';

const MAX_CHAR_LENGTH = 30;

export default class PlushieInstagramAccountValidator extends BaseValidator {
  protected static _inputLabel = 'Instagram account username';

  protected static errorMessageMap: Map<PlushieInstagramAccountValidatorKey, string> = new Map([
    ['isValidUsername', ValidationMessageService.isValidUsername(this.inputLabel)],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)],
    ['isUniqueInstagramAccount', 'This Instagram username has already been added to your plushie accounts.']
  ]);

  static validate(value: string, args?: { existingAccounts?: string[]; originalValue?: string }) {
    const list = args?.existingAccounts ?? [];
    const originalValue = args?.originalValue;
    return PlushieInstagramAccountValidator.executeValidation(value, {
      isValidUsername: ValidationRuleService.isValidUsername(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH),
      isUniqueInstagramAccount: PlushieInstagramAccountValidator.isUniqueInstagramAccount(value, list, originalValue)
    });
  }

  /**
   * Checks whether a given Instagram username already exists in a list of existing usernames.
   *
   * Useful for preventing duplicate account entries during form validation or user registration.
   *
   * @private
   * @param value - The Instagram username to check for duplicates.
   * @param existingAccounts - An array of usernames to compare against.
   * @returns `true` if the username already exists in the array, otherwise `false`.
   */
  private static isUniqueInstagramAccount(value: string, existingAccounts: string[], originalValue?: string): boolean {
    // If the value matches the original (editing without change), treat as unique
    if (isOriginalValue(value, originalValue)) return true;

    // Otherwise ensure it's not already in the list
    return !isValueInArray(value, existingAccounts);
  }
}

type PlushieInstagramAccountValidatorKey =
  | 'isUniqueInstagramAccount'
  | InstagramAccountValidatorKey
  | keyof typeof ValidationRuleService;
