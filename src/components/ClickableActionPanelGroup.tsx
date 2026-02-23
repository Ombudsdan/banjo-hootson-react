import { ClickableActionPanel } from 'components';
import { ClickableActionPanelLink } from 'src/consts/ClickableActionPanel';

/**
 * Renders a group of clickable action panels given a group key.
 * The group is resolved via the controller and each option is displayed as a panel.
 */
export default function ClickableActionPanelGroup({ options }: IClickableActionPanelGroup) {
  return (
    <div className="clickable-action-panel-group">
      {options && options.length > 0 && options.map(opt => <ClickableActionPanel option={opt} key={opt} />)}
    </div>
  );
}

/** Props for {@link ClickableActionPanelGroup} */
interface IClickableActionPanelGroup {
  options: ClickableActionPanelLink[];
}
