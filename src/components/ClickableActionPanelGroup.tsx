import { ClickableActionPanel } from 'components';
import { ClickableActionPanelGroupController } from 'controllers';
import { ClickableActionPanelGroupOptionType } from 'enums';

/**
 * Renders a group of clickable action panels given a group key.
 * The group is resolved via the controller and each option is displayed as a panel.
 */
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

/** Props for {@link ClickableActionPanelGroup} */
interface IClickableActionPanelGroup {
  group: ClickableActionPanelGroupOptionType;
}
