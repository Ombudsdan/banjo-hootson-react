import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from '.';
import { isValidRegex } from 'utils';

const MIN_CHAR_LENGTH = 12;
const MAX_CHAR_LENGTH = 32;

export default class PasswordValidator extends BaseValidator {
  protected static _inputLabel = 'Password';

  static readonly errorMessageMap = new Map<PasswordValidatorKey, string>([
    ['isValidMinLength', ValidationMessageService.isValidMinLength(this.inputLabel, MIN_CHAR_LENGTH)],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)],
    [
      'hasOneOfEachRequiredCharacter',
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ],
    ['hasOnlyPermittedCharacters', 'Password contains invalid characters']
  ]);

  static validate(value: string) {
    return PasswordValidator.executeValidation(value, {
      isRequired: ValidationRuleService.isRequired(value),
      isValidMinLength: ValidationRuleService.isValidMinLength(value, MIN_CHAR_LENGTH),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH),
      hasOneOfEachRequiredCharacter: PasswordValidator.hasOneOfEachRequiredCharacter(value),
      hasOnlyPermittedCharacters: PasswordValidator.hasOnlyPermittedCharacters(value)
    });
  }

  /**
   * Checks for at least one of each required character type: lowercase, uppercase, number, special character.
   *
   * City names across the world can include:
   * - At least one lowercase (?=.*[a-z])
   * - At least one uppercase (?=.*[A-Z])
   * - At least one number (?=.*\d)
   * - At least one special character (?=.*[^A-Za-z0-9])
   * - One or more characters (.+)
   */
  private static hasOneOfEachRequiredCharacter(value: string): boolean {
    return isValidRegex(value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/);
  }

  /**
   * Checks that the password contains only permitted characters.
   *
   * City names across the world can include:
   * - Uppercase letters (A–Z)
   * - Lowercase letters (a–z)
   * - Numbers (0–9)
   * - Special characters: !@#$%^&*()_-+={}[]|\:;"'<>,.?/~`
   */
  private static hasOnlyPermittedCharacters(value: string): boolean {
    return isValidRegex(value, /^[A-Za-z0-9!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]+$/);
  }
}

type PasswordValidatorKey =
  | 'hasOneOfEachRequiredCharacter'
  | 'hasOnlyPermittedCharacters'
  | keyof typeof ValidationRuleService;
