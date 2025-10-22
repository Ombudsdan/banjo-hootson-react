import { ClickableActionPanel } from "./ClickableActionPanel";
import {
  ClickableActionPanelGroupController,
  ActionPanelGroupOption,
} from "@/controllers/clickable-action-panel-group.controller";

export function ClickableActionPanelGroup({
  group,
}: {
  group: ActionPanelGroupOption;
}) {
  const options = ClickableActionPanelGroupController.getGroup(group) || [];
  if (!options.length) return null;
  return (
    <div className="clickable-action-panel-group">
      {options.map((opt) => (
        <ClickableActionPanel option={opt} key={opt} />
      ))}
    </div>
  );
}
