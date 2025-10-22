import {
  ClickableActionPanelGroupOption,
  ClickableActionPanelGroupOptionType,
  ClickableActionPanelOption,
  ClickableActionPanelOptionType
} from 'enums';

export default class ClickableActionPanelGroupController {
  static getGroup(option: ClickableActionPanelGroupOptionType) {
    const panelGroup = ACTION_PANEL_GROUP_MAP.get(option);
    if (!panelGroup) {
      console.error('Invalid option provided');
      return undefined;
    }
    return panelGroup;
  }
}

const ACTION_PANEL_GROUP_MAP = new Map<ClickableActionPanelGroupOptionType, ClickableActionPanelOptionType[]>([
  [
    ClickableActionPanelGroupOption.SOCIAL_LINKS,
    [ClickableActionPanelOption.INSTAGRAM, ClickableActionPanelOption.FACEBOOK, ClickableActionPanelOption.THREADS]
  ],
  [
    ClickableActionPanelGroupOption.COMMUNITY_LINKS,
    [ClickableActionPanelOption.CALENDAR, ClickableActionPanelOption.SUBMIT_BIRTHDAY, ClickableActionPanelOption.BEER]
  ]
]);
