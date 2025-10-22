import { ValueOf } from 'model/utils.model';
import { createEnum } from 'utils';

export const ClickableActionPanelGroupOption = createEnum({
  SOCIAL_LINKS: 'social-links',
  COMMUNITY_LINKS: 'community-links'
});

export type ClickableActionPanelGroupOptionType = ValueOf<typeof ClickableActionPanelGroupOption>;
