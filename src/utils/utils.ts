import { ValueOf } from 'model/utils.model';
import { RefObject } from 'react';

/**
 * Use `as const` when calling createEnum to ensure literal type inference.
 * Example:
 *   const MY_ENUM = createEnum({ FOO: 'foo', BAR: 'bar' } as const);
 */
export function createEnum<T extends Record<string, string | number | symbol>>(obj: T) {
  return Object.freeze(obj);
}

export function generateClassName(classList: (string | boolean | undefined | null)[]): string {
  return classList.filter(Boolean).join(' ');
}

export function isEmpty(val: unknown): boolean {
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === 'string') return val.length === 0;
  return val === null || val === undefined;
}

export function getElement<T extends Element = HTMLElement>(selector: string): T | null {
  return document.querySelector(selector) as T | null;
}

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

export function areJsonEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function excludeMatchingIndex<T>(array: T[], indexToExclude?: number): T[] {
  return array.filter((_, index) => index !== indexToExclude);
}

export function toLowercase(value: string): string {
  return value.trim().toLowerCase();
}

export function isArrayEmpty(value: string[]): boolean {
  return value.length === 0;
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkHasValueChanged<T extends Record<string, any>>(key: keyof T, prev: T, next: Partial<T>) {
  return Object.prototype.hasOwnProperty.call(next, key) && prev[key] !== next[key];
}

export function checkHasObjectChanged<T extends object>(prev: Partial<T>, next: Partial<T>): boolean {
  const prevRec = prev as Record<string, unknown>;
  const nextRec = next as Record<string, unknown>;
  return Object.keys(nextRec).some(k => prevRec[k] !== nextRec[k]);
}

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
