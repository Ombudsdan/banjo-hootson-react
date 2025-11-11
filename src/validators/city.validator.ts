import { ValidationMessageService, ValidationRuleService } from 'services';
import { BaseValidator } from '.';
import { isValidRegex } from 'utils';

const MAX_CHAR_LENGTH = 80;

export default class CityValidator extends BaseValidator {
  protected static _inputLabel = 'City name';

  static readonly errorMessageMap = new Map<TownOrCityValidatorKey, string>([
    ['hasValidTownOrCityCharacters', `${this.inputLabel} contains invalid characters.`],
    ['isValidMaxLength', ValidationMessageService.isValidMaxLength(this.inputLabel, MAX_CHAR_LENGTH)]
  ]);

  static validate(value: string) {
    return CityValidator.executeValidation(value, {
      hasValidTownOrCityCharacters: hasValidTownOrCityCharacters(value),
      isValidMaxLength: ValidationRuleService.isValidMaxLength(value, MAX_CHAR_LENGTH)
    });
  }
}

/**
 * Allows only Unicode letters, marks, spaces, apostrophes, periods, and hyphens.
 * For town/city field: /^[\p{L}\p{M}\s'.-]+$/u.
 *
 * City names across the world can include:
 * - Letters (A–Z, a–z, plus accented ones like é, ö, ç, ñ, ł, etc.)
 * - Spaces
 * - Hyphens (e.g., “Aix-en-Provence”, “Newcastle-upon-Tyne”)
 * - Apostrophes / single quotes (e.g., “O’Fallon”, “Nuku’alofa”)
 * - Periods / dots (e.g., “St. Louis”)
 * - Commas (rare, but e.g. “Washington, D.C.”)
 * - Diacritics and Unicode letters (to support names in non-Latin scripts like Cyrillic, Greek, Arabic, etc.)
 */
function hasValidTownOrCityCharacters(value: string): boolean {
  return isValidRegex(value, /^[\p{L}\p{M}\s'.-]+$/u);
}

type TownOrCityValidatorKey = 'hasValidTownOrCityCharacters' | keyof typeof ValidationRuleService;
