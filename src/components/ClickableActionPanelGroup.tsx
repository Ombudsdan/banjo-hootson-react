import { ClickableActionPanel } from 'components';
import { ClickableActionPanelGroupController, ActionPanelGroupOption } from 'controllers';

export default function ClickableActionPanelGroup({ group }: IClickableActionPanelGroup) {
  const options = ClickableActionPanelGroupController.getGroup(group);

  if (!options) return null;

  return (
    <div className="clickable-action-panel-group">
      {options.map(opt => (
        <ClickableActionPanel option={opt} key={opt} />
      ))}
    </div>
  );
}

interface IClickableActionPanelGroup {
  group: ActionPanelGroupOption;
}
