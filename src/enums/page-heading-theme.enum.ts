import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const PageHeadingTheme = createEnum({
  LIGHT: 'light',
  DARK: 'dark'
});

export type PageHeadingThemeType = ValueOf<typeof PageHeadingTheme>;
