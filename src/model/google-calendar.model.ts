import { calendar_v3 } from 'googleapis';

export interface IGoogleCalendarEvent extends Omit<calendar_v3.Schema$Event, 'id' | 'summary' | 'start' | 'end'> {
  id: string;
  summary: string;
  start: calendar_v3.Schema$EventDateTime;
  end?: calendar_v3.Schema$EventDateTime;
}
