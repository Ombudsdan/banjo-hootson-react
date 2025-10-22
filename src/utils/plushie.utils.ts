import type { IPlushieBirthday } from "model/plushie-birthday.types";

// Minimal helpers ported from Angular version (simplified: excluding age/date formatting for now)
export function formatPlushieName(name: string): string {
  const sanitisedName = name.replace(/\s+/g, " ").trim().toLowerCase();
  return sanitisedName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatPossessivePlushieName(name: string): string {
  if (!name || !name.trim())
    throw new Error("Cannot format possessive name for empty string");
  const base = formatPlushieName(name);
  return base.endsWith("s") ? `${base}'` : `${base}'s`;
}

function getPlushieNameFromEventName(text: string): string {
  const apostropheIndex = text.indexOf("'");
  const plushieName =
    apostropheIndex === -1 ? text : text.substring(0, apostropheIndex);
  return formatPlushieName(plushieName);
}

function getBirthYearFromEventName(name: string): number | undefined {
  const yearMatch = name.match(/\((\d{4})\)/);
  if (!yearMatch) return undefined;
  return parseInt(yearMatch[1]);
}

function getUsernameFromEventName(text: string): string {
  const atIndex = text.indexOf("@");
  if (atIndex === -1) return "";
  const remaining = text.substring(atIndex + 1);
  const end = remaining.search(/\s|\)|$/);
  return remaining.substring(0, end).trim().toLowerCase();
}

export function getPropertiesFromPlushieBirthdayEventName(
  event: IPlushieBirthday
): IPlushieBirthdayDisplayProperties {
  const plushieName = getPlushieNameFromEventName(event.name);
  const birthYear = getBirthYearFromEventName(event.name);
  return {
    plushieName,
    possessivePlushieName: formatPossessivePlushieName(plushieName),
    birthYear,
    age: undefined,
    writtenDate: undefined,
    username: getUsernameFromEventName(event.name),
  };
}

export interface IPlushieBirthdayDisplayProperties {
  plushieName: string;
  possessivePlushieName: string;
  birthYear: number | undefined;
  age: number | undefined;
  writtenDate: string | undefined;
  username: string;
}
