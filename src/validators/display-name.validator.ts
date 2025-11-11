import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from '.';

const MAX_CHAR_LENGTH = 50;

export default class DisplayNameValidator extends BaseValidator {
  protected static _inputLabel = 'Display name';

  static readonly errorMessageMap = new Map<DisplayNameValidatorKey, string>([
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return DisplayNameValidator.executeValidation(value, {
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

type DisplayNameValidatorKey = keyof typeof ValidationRuleService;
