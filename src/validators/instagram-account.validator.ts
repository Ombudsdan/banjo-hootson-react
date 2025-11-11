import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from 'validators';

const MAX_CHAR_LENGTH = 30;

export default class InstagramAccountValidator extends BaseValidator {
  protected static _inputLabel = 'Instagram account username';

  protected static errorMessageMap: Map<InstagramAccountValidatorKey, string> = new Map([
    ['isValidUsername', ValidationMessageService.isValidUsername(this.inputLabel)],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return InstagramAccountValidator.executeValidation(value, {
      isValidUsername: ValidationRuleService.isValidUsername(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

export type InstagramAccountValidatorKey = keyof typeof ValidationRuleService;
