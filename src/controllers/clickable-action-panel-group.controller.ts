import { ActionPanelOption } from "./clickable-action-panel.controller";

export type ActionPanelGroupOption = "social-links" | "community-links";

export class ClickableActionPanelGroupController {
  static getGroup(option: ActionPanelGroupOption) {
    const panelGroup = ACTION_PANEL_GROUP_MAP.get(option);
    if (!panelGroup) {
      console.error("Invalid option provided");
      return undefined;
    }
    return panelGroup;
  }
}

const ACTION_PANEL_GROUP_MAP = new Map<
  ActionPanelGroupOption,
  ActionPanelOption[]
>([
  ["social-links", ["instagram", "facebook", "threads"]],
  ["community-links", ["calendar", "submitBirthday", "beer"]],
]);
