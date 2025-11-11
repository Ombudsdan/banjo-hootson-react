import { ValidationRuleService } from 'services';
import { BaseValidator } from 'validators';

export default class PlushieInstagramAccountListValidator extends BaseValidator {
  protected static _inputLabel = 'Plushie Instagram account list';

  protected static errorMessageMap: Map<PlushieInstagramAccountListValidatorKey, string> = new Map([
    ['isRequired', 'At least one Instagram username must be provided.']
  ]);

  static validate(value: Array<{ username: string }>) {
    return PlushieInstagramAccountListValidator.executeValidation(value, {
      isRequired: ValidationRuleService.isRequired(value)
    });
  }
}

type PlushieInstagramAccountListValidatorKey = keyof typeof ValidationRuleService;
