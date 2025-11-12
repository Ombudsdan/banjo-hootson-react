import { ValidationRuleService } from 'services';
import { BaseValidator } from '.';

export default class ConfirmPasswordValidator extends BaseValidator {
  protected static _inputLabel = 'Confirm Password';

  static readonly errorMessageMap = new Map<ConfirmPasswordValidatorKey, string>([
    ['isMatchingPassword', 'Password and Confirm Password do not match']
  ]);

  static validate(value: string, args?: { password: string }) {
    return ConfirmPasswordValidator.executeValidation(value, {
      isRequired: ValidationRuleService.isRequired(value),
      isMatchingPassword: ConfirmPasswordValidator.isMatchingPassword(value, args?.password ?? '')
    });
  }

  private static isMatchingPassword(value: string, password: string): boolean {
    return value === password;
  }
}

type ConfirmPasswordValidatorKey = 'isMatchingPassword' | keyof typeof ValidationRuleService;
