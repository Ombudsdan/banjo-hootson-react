import { ValidationRuleService } from 'services';
import { BaseValidator } from '.';

export default class TermsAndConditionsValidator extends BaseValidator {
  protected static _inputLabel = 'Terms and Conditions';

  static readonly errorMessageMap = new Map<TermsAndConditionsValidatorKey, string>([]);

  static validate(value: boolean) {
    return TermsAndConditionsValidator.executeValidation(value, {});
  }
}

type TermsAndConditionsValidatorKey = keyof typeof ValidationRuleService;
