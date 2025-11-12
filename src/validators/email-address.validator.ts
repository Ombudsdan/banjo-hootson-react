import { ValidationMessageService, ValidationRuleService } from 'services';
import { getEmailParts, isValidRegex } from 'utils';
import { BaseValidator } from 'validators';

/**
 * Maximum total length of an email address, including the local part,
 * the '@' symbol, and the domain part.
 *
 * RFC 5321 | 4.5.3.1.3 – The maximum total length of a reverse-path or forward-path is 256 octets
 * (including punctuation and element separators). In practice, 254 characters is used.
 */
const MAX_CHAR_LENGTH = 254;
/**
 * Maximum length of the local part of an email address (the part before '@').
 *
 * RFC 5321 | 4.5.3.1.1 – The maximum total length of a user name or other local-part is 64 octets.
 */
const LOCAL_PART_MAX_CHAR_LENGTH = 64;

/**
 * Maximum length of the domain part of an email address (the part after '@').
 *
 * RFC 5321 | 4.5.3.1.2 – The maximum total length of a domain name or number is 255 octets.
 */
const DOMAIN_PART_MAX_CHAR_LENGTH = 255;

/**
 * Validator for email addresses.
 *
 * @extends BaseValidator
 */
export default class EmailAddressValidator extends BaseValidator {
  protected static _inputLabel = 'Email address';

  protected static errorMessageMap: Map<EmailAddressValidatorKey, string> = new Map([
    ['isValidEmailAddress', `${this.inputLabel} is not valid.`],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return EmailAddressValidator.executeValidation(value, {
      isValidEmailAddress: EmailAddressValidator.isValidEmailAddress(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }

  /**
   * Performs comprehensive validation of an email address.
   *
   * Splits the input into local and domain parts, then validates:
   *  - Overall structure (presence and position of "@")
   *  - Local part pattern
   *  - Domain part pattern
   *  - Maximum length limits for the entire address and each part
   *
   * Returns `true` if *any* of these checks pass, ensuring that
   * the address conforms to both RFC guidelines and application
   * length constraints.
   *
   * @private
   * @param value - The full email address to validate.
   * @returns `true` if the email is considered valid, otherwise `false`.
   */
  private static isValidEmailAddress(value: string): boolean {
    const [localPart, domainPart] = getEmailParts(value);

    if (!localPart || !domainPart) return false;

    return [
      EmailAddressValidator.isValidBasicEmailAddress(value) &&
        EmailAddressValidator.isValidEmailLocalPart(localPart) &&
        EmailAddressValidator.isValidEmailDomainPart(domainPart) &&
        ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH) &&
        ValidationRuleService.isValidMaxLength(localPart, LOCAL_PART_MAX_CHAR_LENGTH) &&
        ValidationRuleService.isValidMaxLength(domainPart, DOMAIN_PART_MAX_CHAR_LENGTH)
    ].every(Boolean);
  }

  /**
   * Validates the overall structure of an email address.
   *
   * Ensures that the input contains exactly one "@" symbol, with
   * non-whitespace characters on both sides.
   *
   * Example matches:
   * - `user@example.com`
   * - `first.last@sub.domain.org`
   *
   * @private
   * @param value - The email address to validate.
   * @returns `true` if the email has a valid overall structure, otherwise `false`.
   */
  private static isValidBasicEmailAddress(value: string): boolean {
    return isValidRegex(value, /^[^\s@]+@[^\s@]+$/);
  }

  /**
   * Validates the local part (before the "@") of an email address.
   *
   * Allows letters, digits, dots, underscores, hyphens, and plus signs,
   * following basic RFC-compliant patterns. This does not include quoted
   * local-parts or edge-case RFC 5321 exceptions.
   *
   * Example matches:
   * - `user.name`
   * - `john_doe+test`
   *
   * @private
   * @param value - The local part of the email to validate.
   * @returns `true` if the local part is valid, otherwise `false`.
   */
  private static isValidEmailLocalPart(value: string): boolean {
    return isValidRegex(value, /^[a-zA-Z0-9._%+-]+$/);
  }

  /**
   * Validates the domain part (after the "@") of an email address.
   *
   * Ensures the domain consists of one or more labels separated by dots,
   * where each label contains alphanumeric characters or hyphens and
   * ends with a valid top-level domain (TLD) of at least two letters.
   *
   * Example matches:
   * - `example.com`
   * - `mail.co.uk`
   *
   * @private
   * @param value - The domain part of the email to validate.
   * @returns `true` if the domain part is valid, otherwise `false`.
   */
  private static isValidEmailDomainPart(value: string): boolean {
    if (value.length > DOMAIN_PART_MAX_CHAR_LENGTH) return false; // Early exit to avoid ReDoS.

    // eslint-disable-next-line security/detect-unsafe-regex
    return isValidRegex(value, /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/);
  }
}

/**
 * Keys used in `EmailAddressValidator` to indicate validation failures.
 *
 * - `'isValidEmailAddress'` – triggered when the email is syntactically invalid.
 * - `'isValidMaxLength'` – triggered when the email exceeds the maximum length.
 */
export type EmailAddressValidatorKey = 'isValidEmailAddress' | keyof typeof ValidationRuleService;
