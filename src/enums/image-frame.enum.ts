import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const ImageFrame = createEnum({
  LIGHT: 'light',
  DARK: 'dark'
});

export type ImageFrameType = ValueOf<typeof ImageFrame>;
