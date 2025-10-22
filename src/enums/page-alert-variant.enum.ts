import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';
import { AlertCardVariant } from './alert-card-variant.enum';

export const PageAlertVariant = createEnum({
  // Currently casting the entire enum to match AlertCardVariant values
  // however if we want to diverge in the future we can do so here
  ...AlertCardVariant
});

export type PageAlertVariantType = ValueOf<typeof PageAlertVariant>;
