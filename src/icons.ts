import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faThreads } from '@fortawesome/free-brands-svg-icons';
import {
  faBeer,
  faBirthdayCake,
  faCalendarAlt,
  faCalendarPlus,
  faEdit,
  faListCheck,
  faPlusCircle,
  faTrash,
  faUser,
  faUserGear,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

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
  faListCheck,
  faEdit,
  faTrash,
  faPlusCircle,
  faXmark
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
  edit: faEdit,
  trash: faTrash,
  plus: faPlusCircle,
  close: faXmark
};
