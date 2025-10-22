export interface IPlushieBirthday {
  id: string;
  name: string;
  birthday: string;
  description?: string;
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
