import { ValidationRuleService } from 'services';
import { BaseValidator } from '.';
import { isFutureDate } from 'utils';

export default class PlushieBirthDateValidator extends BaseValidator {
  protected static _inputLabel = 'Plushie birth date';

  static readonly errorMessageMap = new Map<PlushieBirthDateValidatorKey, string>([
    ['isPastDate', `${this._inputLabel} cannot be in the future`]
  ]);

  static validate(value: string) {
    return PlushieBirthDateValidator.executeValidation(value, {
      isPastDate: PlushieBirthDateValidator.isPastDate(value)
    });
  }

  private static isPastDate(value: string): boolean {
    // Empty value is handled by 'required' validator
    if (!value) return true;

    return !isFutureDate(value);
  }
}

type PlushieBirthDateValidatorKey = 'isPastDate' | keyof typeof ValidationRuleService;
