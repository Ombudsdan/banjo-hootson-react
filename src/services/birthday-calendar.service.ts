/**
 * BirthdayCalendarService
 * Thin HTTP wrapper around plushie birthday calendar endpoints.
 * Responsibilities:
 *  - Build request paths for upcoming events, user events, single event lookup, creation.
 *  - Delegate network + auth header handling to HttpClientService.
 * No caching or transformation here; consumers (controllers) handle shaping for UI.
 */
import { IPlushieBirthday, IPlushieBirthdayFormData } from 'model/plushie-birthday.model';
import { HttpClientService } from 'services';

const BASE = '/plushie-birthdays';

export default class BirthdayCalendarService {
  static getUpcoming(days = 7) {
    return HttpClientService.request<IPlushieBirthday[]>({
      path: `${BASE}/upcoming`,
      query: { days }
    });
  }

  static getByUsername(username: string) {
    return HttpClientService.request<IPlushieBirthday[]>({
      path: `${BASE}/user/${encodeURIComponent(username)}`
    });
  }

  static getByEventId(eventId: string) {
    return HttpClientService.request<IPlushieBirthday>({
      path: `${BASE}/${encodeURIComponent(eventId)}`
    });
  }

  static create(form: IPlushieBirthdayFormData) {
    return HttpClientService.request<IPlushieBirthday, IPlushieBirthdayFormData>({
      path: `${BASE}/calendar`,
      method: 'POST',
      body: form
    });
  }
}
