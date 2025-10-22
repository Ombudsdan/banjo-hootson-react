import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const PageContentContainerSpacing = createEnum({
  NONE: 'none',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
});

export type PageContentContainerSpacingType = ValueOf<typeof PageContentContainerSpacing>;
