import { RefObject } from 'react';

/**
 * Use `as const` when calling createEnum to ensure literal type inference.
 * Example:
 *   const MY_ENUM = createEnum({ FOO: 'foo', BAR: 'bar' } as const);
 */
export function createEnum<T extends Record<string, string | number | symbol>>(obj: T) {
  return Object.freeze(obj);
}

export function generateClassName(classList: GenerateClassNameType): string {
  return classList.filter(Boolean).join(' ');
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

type GenerateClassNameType = (string | boolean | undefined | null)[];

export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;
