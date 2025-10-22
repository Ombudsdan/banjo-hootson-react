export function createEnum<
  const T extends Record<string, string | number | symbol>
>(obj: T) {
  return Object.freeze(obj);
}

export function generateClassName(classList: GenerateClassNameType): string {
  return classList.filter(Boolean).join(" ");
}

type GenerateClassNameType = (string | boolean | undefined | null)[];

export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;
