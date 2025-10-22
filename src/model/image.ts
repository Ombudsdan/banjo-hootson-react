import { createEnum, ValueOf } from 'utils';

export const ImageUsage = createEnum({
  HEADING: 'heading',
  GALLERY: 'gallery',
  BIO: 'bio'
});

export const ImageShape = createEnum({
  CIRCLE: 'circle',
  ROUNDED_SQUARE: 'rounded-square'
});

export const ImageFrame = createEnum({
  LIGHT: 'light',
  DARK: 'dark'
});

export type ImageUsageType = ValueOf<typeof ImageUsage>;
export type ImageShapeType = ValueOf<typeof ImageShape>;
export type ImageFrameType = ValueOf<typeof ImageFrame>;

export interface IImage {
  fileName: string;
  alt: string;
  usage?: ImageUsageType;
  shape?: ImageShapeType;
  frame?: ImageFrameType;
  loading?: HTMLImageElement['loading'];
}
