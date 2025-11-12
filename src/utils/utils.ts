import { ValueOf } from 'model/utils.model';
import { RefObject } from 'react';

/**
 * Creates a frozen (immutable) enum-like object.
 *
 * @typeParam T - A record of key-value pairs to freeze.
 * @param obj - The object to convert into an immutable enum.
 * @returns The frozen object, preventing further modifications.
 *
 * @example
 * const Colors = createEnum({ Red: 'RED', Blue: 'BLUE' });
 * Colors.Red; // 'RED'
 */
export function createEnum<T extends Record<string, string | number | symbol>>(obj: T) {
  return Object.freeze(obj);
}

/**
 * Generates a space-separated class name string from a list of values,
 * filtering out falsy values (`false`, `null`, `undefined`, or empty strings).
 *
 * @param classList - An array of class name strings or falsy values.
 * @returns A concatenated class name string.
 *
 * @example
 * generateClassName(['btn', isActive && 'btn-active', null]); // 'btn btn-active'
 */
export function generateClassName(classList: (string | boolean | undefined | null)[]): string {
  return classList.filter(Boolean).join(' ');
}

/**
 * Determines whether a value is empty.
 *
 * - Arrays: empty if length is 0.
 * - Strings: empty if length is 0.
 * - Null or undefined: considered empty.
 *
 * @param val - The value to check.
 * @returns `true` if the value is empty; otherwise, `false`.
 *
 * @example
 * isEmpty([]);       // true
 * isEmpty('');       // true
 * isEmpty(null);     // true
 * isEmpty(['x']);    // false
 */
export function isEmpty(val: unknown): boolean {
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === 'string') return val.length === 0;
  return val === null || val === undefined;
}

/**
 * Retrieves a DOM element matching the given selector.
 *
 * @typeParam T - The expected element type.
 * @param selector - A CSS selector string.
 * @returns The first matching element, or `null` if not found.
 *
 * @example
 * const button = getElement<HTMLButtonElement>('#submit-btn');
 */
export function getElement<T extends Element = HTMLElement>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}

/**
 * Retrieves an element from a React `RefObject`, optionally querying within it using a selector.
 *
 * @typeParam T - The expected element type.
 * @param contentRef - The React ref pointing to a DOM element.
 * @param selector - Optional selector to find a nested element.
 * @returns The referenced element or a nested element matching the selector, or `null` if not found.
 *
 * @example
 * const div = getElementFromContentRef(ref, '.child-element');
 */
export function getElementFromContentRef<T extends Element = HTMLElement>(
  contentRef: RefObject<T | null>,
  selector?: string
): T | null {
  if (selector) {
    return contentRef.current?.querySelector(selector) as T | null;
  } else {
    return contentRef.current;
  }
}

/**
 * Compares two values by their JSON representations to determine equality.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` if both values are structurally identical; otherwise, `false`.
 *
 * @example
 * areJsonEqual({ a: 1 }, { a: 1 }); // true
 * areJsonEqual([1, 2], [2, 1]);     // false
 */
export function areJsonEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Returns a copy of an array excluding the element at the specified index.
 *
 * @typeParam T - The array element type.
 * @param array - The original array.
 * @param indexToExclude - The index to exclude (optional).
 * @returns A new array without the excluded element.
 *
 * @example
 * excludeMatchingIndex(['a', 'b', 'c'], 1); // ['a', 'c']
 */
export function excludeMatchingIndex<T>(array: T[], indexToExclude?: number): T[] {
  return array.filter((_, index) => index !== indexToExclude);
}

/**
 * Converts a string to lowercase and trims surrounding whitespace.
 *
 * @param value - The string to transform.
 * @returns The trimmed, lowercase string.
 *
 * @example
 * toLowercase('  Plushie  '); // 'plushie'
 */
export function toLowercase(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Checks whether an array of strings is empty.
 *
 * @param value - The array to check.
 * @returns `true` if the array is empty; otherwise, `false`.
 *
 * @example
 * isArrayEmpty([]);        // true
 * isArrayEmpty(['fluff']); // false
 */
export function isArrayEmpty(value: string[]): boolean {
  return value.length === 0;
}

/**
 * Sets or removes the `inert` and `aria-hidden` attributes on elements matching the given selectors.
 *
 * Throws an error if no selectors are provided.
 *
 * @param selectors - An array of CSS selectors to target elements.
 * @param shouldSetInert - Whether to set (`true`) or remove (`false`) the inert state.
 *
 * @example
 * setInert(['#modal', '.overlay'], true);  // Make elements inert
 * setInert(['#modal', '.overlay'], false); // Restore interactivity
 */
export function setInert(selectors: string[], shouldSetInert: boolean) {
  if (selectors.length === 0) {
    throw new Error('selectors array cannot be empty');
  }

  return selectors
    .map(getElement)
    .filter(el => el !== null)
    .forEach(el => {
      if (shouldSetInert) {
        el.setAttribute('inert', '');
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('inert');
        el.setAttribute('aria-hidden', 'false');
      }
    });
}

/**
 * Determines whether a specific property value has changed between two objects.
 *
 * @typeParam T - The object type.
 * @param key - The property key to check.
 * @param prev - The previous object.
 * @param next - The next (partial) object.
 * @returns `true` if the property exists in `next` and its value differs from `prev`; otherwise, `false`.
 *
 * @example
 * checkHasValueChanged('name', { name: 'Fluff' }, { name: 'Puff' }); // true
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkHasValueChanged<T extends Record<string, any>>(key: keyof T, prev: T, next: Partial<T>) {
  return Object.prototype.hasOwnProperty.call(next, key) && prev[key] !== next[key];
}

/**
 * Checks whether any property values differ between two objects.
 *
 * @typeParam T - The object type.
 * @param prev - The previous object.
 * @param next - The next (partial) object.
 * @returns `true` if at least one property value differs; otherwise, `false`.
 *
 * @example
 * checkHasObjectChanged({ a: 1 }, { a: 2 }); // true
 * checkHasObjectChanged({ a: 1 }, { a: 1 }); // false
 */
export function checkHasObjectChanged<T extends object>(prev: Partial<T>, next: Partial<T>): boolean {
  const prevRec = prev as Record<string, unknown>;
  const nextRec = next as Record<string, unknown>;
  return Object.keys(nextRec).some(k => prevRec[k] !== nextRec[k]);
}

/**
 * Checks whether a value matches its original value, ignoring case for strings.
 *
 * @typeParam T - The value type.
 * @param value - The current value.
 * @param originalValue - The original value to compare against.
 * @returns `true` if both values are equal (case-insensitive for strings); otherwise, `false`.
 *
 * @example
 * isOriginalValue('Fluffy', 'fluffy'); // true
 * isOriginalValue(42, 42);             // true
 * isOriginalValue('Fluff', 'Puff');    // false
 */
export function isOriginalValue<T>(value: T, originalValue?: T): boolean {
  if (!originalValue) return false;

  if (typeof value === 'string' && typeof originalValue === 'string') {
    value = toLowercase(value) as T;
    originalValue = toLowercase(originalValue) as T;
  }
  return value === originalValue;
}

/**
 * Safely retrieves a value from a string-valued enum by key or value name,
 * with a fallback to a default enum value if the provided key is invalid or missing.
 *
 * @template T - The type of the enum (must be a record of string keys to string values).
 * @param value - The string key (or potential enum key) to look up in the enum.
 * @param selectedEnum - The enum object to look up the value from.
 * @param fallbackEnum - The default enum value to return if the lookup fails.
 * @returns The corresponding enum value if found, otherwise the provided fallback value.
 *
 * @example
 * ```ts
 * enum Color {
 *   Red = 'red',
 *   Blue = 'blue',
 *   Default = 'default',
 * }
 *
 * const result1 = getEnum('Red', Color, Color.Default);
 * // → "red"
 *
 * const result2 = getEnum('NotAColor', Color, Color.Default);
 * // → "default"
 * ```
 */
export function getEnum<T extends Record<string, string>>(
  value: string | keyof T,
  selectedEnum: T,
  fallbackEnum: ValueOf<T>
): ValueOf<T> {
  return selectedEnum[value as keyof T] ?? fallbackEnum;
}

/**
 * Determines whether a given URL or path string represents an external link.
 *
 * This function performs a simple heuristic check for common external link patterns:
 * - Contains `"http://"` or `"https://"`
 * - Starts with `"www"`
 *
 * @param link - The URL or path string to check.
 * @returns `true` if the link appears to be external, otherwise `false`.
 *
 * @example
 * ```ts
 * isExternalLink('https://example.com'); // true
 * isExternalLink('www.example.com');     // true
 * isExternalLink('/about');              // false
 * isExternalLink('mailto:test@example.com'); // false
 * ```
 */
export function isExternalLink(link: string): boolean {
  const lowercasedLink = toLowercase(link);
  return lowercasedLink.includes('http://') || lowercasedLink.includes('https://') || lowercasedLink.startsWith('www');
}

/**
 * Determines whether a given string represents a `mailto:` link.
 *
 * This function checks if the input begins with the `"mailto:"` scheme,
 * which is commonly used for clickable email address links.
 *
 * @param link - The string or URL to check.
 * @returns `true` if the link starts with `"mailto:"`, otherwise `false`.
 *
 * @example
 * ```ts
 * isMailToLink('mailto:hello@example.com'); // true
 * isMailToLink('tel:+441234567890');        // false
 * isMailToLink('/contact');                 // false
 * ```
 */
export function isMailToLink(link: string): boolean {
  return toLowercase(link).startsWith('mailto:');
}

/**
 * Determines whether a given string represents a `tel:` link.
 *
 * This function checks if the input begins with the `"tel:"` scheme,
 * which is commonly used for clickable phone number links.
 *
 * @param link - The string or URL to check.
 * @returns `true` if the link starts with `"tel:"`, otherwise `false`.
 *
 * @example
 * ```ts
 * isTelephoneLink('tel:+441234567890'); // true
 * isTelephoneLink('mailto:test@x.com'); // false
 * isTelephoneLink('/support');          // false
 * ```
 */
export function isTelephoneLink(link: string): boolean {
  return toLowercase(link).startsWith('tel:');
}

/**
 * Splits an email string into its local part and domain part.
 *
 * This function safely parses an email address and returns a tuple:
 * - The first element is the local part (before the `@`).
 * - The second element is the domain part (after the `@`).
 *
 * If the input is not a valid email containing exactly one `@`, it returns `[null, null]`.
 *
 * @param value - The email string to split.
 * @returns A tuple `[local, domain]` if the email is valid, otherwise `[null, null]`.
 *
 * @example
 * ```ts
 * getEmailParts('user@example.com'); // ["user", "example.com"]
 * getEmailParts('invalid-email');    // [null, null]
 * ```
 */
export function getEmailParts(value: string): [string, string] | [null, null] {
  const parts = value.split('@');
  if (parts.length === 2) {
    return [parts[0], parts[1]];
  }
  return [null, null];
}

/**
 * Checks whether a given value exists within an array, performing a case-insensitive comparison for strings.
 *
 * If the array is not provided, an empty list is assumed.
 *
 * @typeParam T - The type of values being compared.
 * @param value - The value to check for.
 * @param existingValues - The optional array of existing values.
 * @returns `true` if the value exists in the array (case-insensitive for strings); otherwise, `false`.
 *
 * @example
 * isValueInArray('Fluffy', ['fluffy', 'Spot']); // true
 * isValueInArray(42, [1, 2, 42]);               // true
 * isValueInArray('Cat', ['Dog', 'Mouse']);      // false
 */
export function isValueInArray<T>(value: T, existingValues?: T[]): boolean {
  const list = existingValues ?? [];
  const normalisedValue = typeof value === 'string' ? toLowercase(value as unknown as string) : value;
  const normalisedArray = list.map(v => (typeof v === 'string' ? toLowercase(v as unknown as string) : v));
  return normalisedArray.includes(normalisedValue);
}

/**
 * Tests whether a given string matches a specified regular expression.
 *
 * @param value - The string to validate.
 * @param regex - The regular expression to test against.
 * @returns `true` if the string matches the pattern; otherwise, `false`.
 *
 * @example
 * isValidRegex('Plushie123', /^[A-Za-z0-9]+$/); // true
 * isValidRegex('Plushie!', /^[A-Za-z0-9]+$/);   // false
 */
export function isValidRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}
