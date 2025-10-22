import { HttpClient } from "services/http-client";
import {
  IPlushieBirthday,
  IPlushieBirthdayFormData,
} from "model/plushie-birthday.types";

const BASE = "/plushie-birthdays";

export class BirthdayCalendarService {
  static getUpcoming(days = 7) {
    return HttpClient.request<IPlushieBirthday[]>({
      path: `${BASE}/upcoming`,
      query: { days },
    });
  }

  static getByUsername(username: string) {
    return HttpClient.request<IPlushieBirthday[]>({
      path: `${BASE}/user/${encodeURIComponent(username)}`,
    });
  }

  static getByEventId(eventId: string) {
    return HttpClient.request<IPlushieBirthday>({
      path: `${BASE}/${encodeURIComponent(eventId)}`,
    });
  }

  static create(form: IPlushieBirthdayFormData) {
    return HttpClient.request<IPlushieBirthday, IPlushieBirthdayFormData>({
      path: `${BASE}/`,
      method: "POST",
      body: form,
    });
  }
}
