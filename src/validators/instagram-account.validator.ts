import { validationMessages, ValidatorService } from 'services';
import { BaseValidator } from 'validators';

const INPUT_LABEL = 'Instagram account username';
const MAX_CHAR_LENGTH = 30;

export default class InstagramAccountValidator extends BaseValidator {
  protected static errorMessageMap: Map<InstagramAccountValidatorKey, string> = new Map([
    ['isValidUsername', validationMessages.isValidUsername(INPUT_LABEL)],
    ['isValidMaxLength', validationMessages.isValidMaxLength(INPUT_LABEL, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return InstagramAccountValidator.executeValidation(value, {
      isValidUsername: ValidatorService.isValidUsername(value),
      isValidMaxLength: ValidatorService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

export type InstagramAccountValidatorKey = keyof typeof ValidatorService;
