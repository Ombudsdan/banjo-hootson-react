import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from 'validators';

const INPUT_LABEL = 'Instagram account username';
const MAX_CHAR_LENGTH = 30;

export default class InstagramAccountValidator extends BaseValidator {
  protected static errorMessageMap: Map<InstagramAccountValidatorKey, string> = new Map([
    ['isValidUsername', ValidationMessageService.isValidUsername(INPUT_LABEL)],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(INPUT_LABEL, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return InstagramAccountValidator.executeValidation(value, {
      isValidUsername: ValidationRuleService.isValidUsername(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

export type InstagramAccountValidatorKey = keyof typeof ValidationRuleService;
