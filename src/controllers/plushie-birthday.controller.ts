import { IPlushieBirthday } from 'model/plushie-birthday.model';
import { IPlushieBirthdayDisplayProperties } from 'utils';

export default class PlushieBirthdayController {
  static extractPossessiveName(props?: IPlushieBirthdayDisplayProperties) {
    return props?.possessivePlushieName || '';
  }
  static extractUsername(props?: IPlushieBirthdayDisplayProperties) {
    return props?.username || '';
  }
  static fromEvent(event: IPlushieBirthday) {
    return event; // placeholder (kept for potential parity extension)
  }
}
