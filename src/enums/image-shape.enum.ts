import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const ImageShape = createEnum({
  CIRCLE: 'circle',
  ROUNDED_SQUARE: 'rounded-square'
});

export type ImageShapeType = ValueOf<typeof ImageShape>;
