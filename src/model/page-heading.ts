import { PropsWithChildren, ReactNode } from 'react';
import { createEnum, ValueOf } from 'utils';

export const PageHeadingTheme = createEnum({
  LIGHT: 'light',
  DARK: 'dark'
});

export type PageHeadingThemeType = ValueOf<typeof PageHeadingTheme>;

export interface IPageHeadingContainer extends PropsWithChildren {
  heading?: ReactNode;
  subheading?: ReactNode;
  image?: ReactNode;
  theme?: PageHeadingThemeType;
}

export interface IPageHeadingContextValue {
  headingConfig: IPageHeadingContainer | null;
  setHeading: (cfg: IPageHeadingContainer | null) => void;
  clearHeading: () => void;
}
export interface IPageHeadingProvider extends PropsWithChildren {}
