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

export function checkHasValueChanged<T extends Record<any, any>>(key: keyof T, prev: T, next: Partial<T>) {
  return Object.prototype.hasOwnProperty.call(next, key) && prev[key] !== next[key];
}

export function checkHasObjectChanged<T extends Record<any, any>>(prev: Partial<T>, next: Partial<T>): boolean {
  return Object.keys(next).some(key => (prev as any)[key] !== (next as any)[key]);
}

export function isOriginalValue<T>(value: T, originalValue?: T): boolean {
  if (!originalValue) return false;

  if (typeof value === 'string' && typeof originalValue === 'string') {
    value = toLowercase(value) as T;
    originalValue = toLowercase(originalValue) as T;
  }
  return value === originalValue;
}
