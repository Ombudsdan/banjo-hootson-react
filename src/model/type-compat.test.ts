// This file ensures TypeScript compatibility of our shared models.
// It is not executed at runtime; it must type-check successfully.

import { ApiError, IApiErrorResponse } from "./api";
import { DateString, ICalendarEventDateRange, Year } from "./date";
import { ICountry } from "./location";
import {
  IPlushieBirthday,
  IPlushieBirthdayDisplayProperties,
} from "./plushie-birthday";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
  IUserProfile,
} from "./user-profile";

// Sample assignments to validate structural compatibility
const SAMPLE_ERROR: ApiError = { message: "oops" };
const SAMPLE_API_ERROR: IApiErrorResponse = {
  error: "Bad",
  message: "Nope",
  statusCode: 400,
};

const SAMPLE_DATE: DateString = "2024-01-15" as DateString;
const SAMPLE_YEAR: Year = 2024 as unknown as Year;
const SAMPLE_RANGE: ICalendarEventDateRange = {
  startDate: new Date(),
  endDate: new Date(),
};

const SAMPLE_COUNTRY: ICountry = { id: 1, name: "UK", code: "GB", flag: "🇬🇧" };

const SAMPLE_BDAY: IPlushieBirthday = {
  id: "1",
  name: "Banjo",
  birthday: "2023-01-15",
  createdAt: new Date().toISOString(),
};

const SAMPLE_BDAY_DISPLAY: IPlushieBirthdayDisplayProperties = {
  plushieName: "Banjo",
  possessivePlushieName: "Banjo's",
  birthYear: 2023,
  age: 2,
  writtenDate: "January 15, 2023",
  username: "banjo",
};

const SAMPLE_USER: IUserProfile = {
  uid: "abc",
  subscriptionTier: "standard",
  createdAt: "2025-01-01",
  lastLogin: "2025-01-02",
  email: "banjo@example.com",
  city: "London",
  country: "UK",
  humanInstagram: "hooman",
  plushieInstagramAccounts: [{ username: "banjo_plush", isPublic: true }],
};

const SAMPLE_CREATE: ICreateUserRequest = {
  displayName: "Banjo",
  city: "London",
};
const SAMPLE_UPDATE: IUpdateUserRequest = {
  preferences: { emailNotifications: true },
};

void [
  SAMPLE_ERROR,
  SAMPLE_API_ERROR,
  SAMPLE_DATE,
  SAMPLE_YEAR,
  SAMPLE_RANGE,
  SAMPLE_COUNTRY,
  SAMPLE_BDAY,
  SAMPLE_BDAY_DISPLAY,
  SAMPLE_USER,
  SAMPLE_CREATE,
  SAMPLE_UPDATE,
];
