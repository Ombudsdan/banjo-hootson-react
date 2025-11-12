import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from '.';

const MAX_CHAR_LENGTH = 80;

export default class PlushieNameValidator extends BaseValidator {
  protected static _inputLabel = 'Plushie name';

  static readonly errorMessageMap = new Map<PlushieNameValidatorKey, string>([
    ['hasValidNameCharacters', ValidationMessageService.hasValidNameCharacters(this.inputLabel)],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return PlushieNameValidator.executeValidation(value, {
      hasValidNameCharacters: ValidationRuleService.hasValidNameCharacters(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

type PlushieNameValidatorKey = keyof typeof ValidationRuleService;
