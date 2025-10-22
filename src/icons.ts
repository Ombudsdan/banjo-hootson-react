import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBeer,
  faBirthdayCake,
  faCalendarAlt,
  faCalendarPlus,
  faListCheck,
  faUser,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

// Register icons once
library.add(
  faFacebook,
  faInstagram,
  faThreads,
  faBeer,
  faBirthdayCake,
  faCalendarPlus,
  faCalendarAlt,
  faUser,
  faUserGear,
  faListCheck
);

export const ICONS = {
  instagram: faInstagram,
  facebook: faFacebook,
  threads: faThreads,
  calendar: faBirthdayCake,
  submitBirthday: faCalendarPlus,
  beer: faBeer,
  user: faUser,
  calendarAlt: faCalendarAlt,
  userGear: faUserGear,
  listCheck: faListCheck,
};
