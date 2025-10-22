import type { IPlushieBirthday } from "model/plushie-birthday.types";
import type { IPlushieBirthdayDisplayProperties } from "@/utils/plushie.utils";

export class PlushieBirthdayController {
  static extractPossessiveName(props?: IPlushieBirthdayDisplayProperties) {
    return props?.possessivePlushieName || "";
  }
  static extractUsername(props?: IPlushieBirthdayDisplayProperties) {
    return props?.username || "";
  }
  static fromEvent(event: IPlushieBirthday) {
    return event; // placeholder (kept for potential parity extension)
  }
}
