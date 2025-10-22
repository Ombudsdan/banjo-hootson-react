import { createEnum, ValueOf } from "utils";

export const ImageUsage = createEnum({
  HEADING: "heading",
  GALLERY: "gallery",
  BIO: "bio",
});

export const ImageShape = createEnum({
  CIRCLE: "circle",
  ROUNDED_SQUARE: "rounded-square",
});

export const ImageFrame = createEnum({
  LIGHT: "light",
  DARK: "dark",
});

export const ImageLoadingState = createEnum({
  EAGER: "eager",
  LAZY: "lazy",
});

export type ImageUsageType = ValueOf<typeof ImageUsage>;
export type ImageShapeType = ValueOf<typeof ImageShape>;
export type ImageFrameType = ValueOf<typeof ImageFrame>;
export type ImageLoadingStateType = ValueOf<typeof ImageLoadingState>;

export interface IImage {
  fileName: string;
  alt: string;
  usage?: ImageUsageType;
  shape?: ImageShapeType;
  frame?: ImageFrameType;
  loading?: ImageLoadingStateType;
}
