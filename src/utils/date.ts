export function toIsoDateOnly(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
}

export function toISOString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number') return new Date(value).toISOString();
  return '';
}

/**
 * Checks whether a date string represents a future date.
 *
 * @param value - The date string (in a format parsable by `Date`).
 * @returns `true` if the date is in the future (compared to today), `false` otherwise.
 */
export function isFutureDate(value: string): boolean {
  const selectedDate = new Date(value);
  selectedDate.setUTCHours(0, 0, 0, 0);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return selectedDate > today;
}
