import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const ClickableActionPanelTheme = createEnum({
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  THREADS: 'threads',
  DEFAULT: 'default'
});

export type ClickableActionPanelThemeType = ValueOf<typeof ClickableActionPanelTheme>;
