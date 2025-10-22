import { IPlushieBirthday, IPlushieBirthdayFormData } from 'model/plushie-birthday.model';
import { BirthdayCalendarService } from 'services';

export default class BirthdayController {
  static async loadUpcoming(days = 7): Promise<IPlushieBirthday[]> {
    return BirthdayCalendarService.getUpcoming(days);
  }

  static async loadByUsername(username: string): Promise<IPlushieBirthday[]> {
    return BirthdayCalendarService.getByUsername(username);
  }

  static async loadByEventId(eventId: string): Promise<IPlushieBirthday> {
    return BirthdayCalendarService.getByEventId(eventId);
  }

  static async create(form: IPlushieBirthdayFormData): Promise<IPlushieBirthday> {
    return BirthdayCalendarService.create(form);
  }
}
