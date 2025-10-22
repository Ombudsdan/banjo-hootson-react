import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const DialogConfirm = createEnum({
  PRIMARY: 'primary',
  DANGER: 'danger'
});

export type DialogConfirmType = ValueOf<typeof DialogConfirm>;
