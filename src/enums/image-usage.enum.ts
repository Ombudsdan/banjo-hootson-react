import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const ImageUsage = createEnum({
  HEADING: 'heading',
  GALLERY: 'gallery',
  BIO: 'bio'
});

export type ImageUsageType = ValueOf<typeof ImageUsage>;
