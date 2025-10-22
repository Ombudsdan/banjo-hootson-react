import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const AlertCardVariant = createEnum({
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
});

export type AlertCardVariantType = ValueOf<typeof AlertCardVariant>;
