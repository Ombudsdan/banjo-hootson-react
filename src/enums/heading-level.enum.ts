import { createEnum } from 'utils';

export const HeadingLevel = createEnum({
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6'
} as Record<string, HeadingLevelType>);

export type HeadingLevelType = keyof Pick<HTMLElementTagNameMap, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
