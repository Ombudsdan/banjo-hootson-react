export type Year = number & { readonly __brand: unique symbol };

export type DateString = string & { readonly __brand: unique symbol };

export interface ICalendarEventDateRange {
  startDate: Date;
  endDate: Date;
}
