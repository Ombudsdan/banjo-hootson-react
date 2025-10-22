import { createEnum, ValueOf } from 'utils';

/** Define the responsive breakpoints. Measurements are in pixels. */
export const Breakpoint = createEnum({
  XS: 480,
  S: 540,
  M: 720,
  L: 960,
  XL: 1140
});

export type BreakpointType = ValueOf<typeof Breakpoint>;
