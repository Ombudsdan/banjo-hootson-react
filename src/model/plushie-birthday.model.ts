export interface IPlushieBirthday {
  id: string;
  name: string;
  birthday: string;
  description?: string;
  username?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  googleCalendarEventId?: string;
  recurringEventId?: string;
  recurrence?: string[];
}

export interface IPlushieBirthdayFormData {
  name: string;
  dateOfBirth: string;
  username: string;
  description?: string;
}

export interface IPlushieBirthdayDisplayProperties {
  plushieName: string;
  possessivePlushieName: string;
  birthYear: number | undefined;
  age: number | undefined;
  writtenDate: string | undefined;
  username: string;
}
