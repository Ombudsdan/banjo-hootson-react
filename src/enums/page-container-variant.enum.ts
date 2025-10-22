import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const PageContainerVariant = createEnum({
  DEFAULT: 'default',
  FULL_WIDTH: 'full-width'
});

export type PageContainerVariantType = ValueOf<typeof PageContainerVariant>;
