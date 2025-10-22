import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const ClickableActionPanelOption = createEnum({
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  THREADS: 'threads',
  CALENDAR: 'calendar',
  SUBMIT_BIRTHDAY: 'submitBirthday',
  BEER: 'beer'
});

export type ClickableActionPanelOptionType = ValueOf<typeof ClickableActionPanelOption>;
