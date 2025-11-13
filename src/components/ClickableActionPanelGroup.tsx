import { ClickableActionPanel } from 'components';
import {
  ClickableActionPanelGroupOption,
  ClickableActionPanelGroupOptionType,
  ClickableActionPanelOption,
  ClickableActionPanelOptionType
} from 'enums';

/**
 * Renders a group of clickable action panels given a group key.
 * The group is resolved via the controller and each option is displayed as a panel.
 */
export default function ClickableActionPanelGroup({ group }: IClickableActionPanelGroup) {
  const options = getOptions(group);

  if (!options) return null;

  return (
    <div className="clickable-action-panel-group">
      {options.map(opt => (
        <ClickableActionPanel option={opt} key={opt} />
      ))}
    </div>
  );
}

/**
 * Returns the list of available clickable action panel options for a given group.
 *
 * Maps a {@link ClickableActionPanelGroupOptionType} to its corresponding set of
 * {@link ClickableActionPanelOptionType} values. If the group does not match any
 * known category, `undefined` is returned.
 *
 * @param group - The action panel group to retrieve options for.
 * @returns An array of related clickable options, or `undefined` if no match is found.
 */
function getOptions(group: ClickableActionPanelGroupOptionType): ClickableActionPanelOptionType[] | undefined {
  switch (group) {
    case ClickableActionPanelGroupOption.SOCIAL_LINKS:
      return [
        ClickableActionPanelOption.INSTAGRAM,
        ClickableActionPanelOption.FACEBOOK,
        ClickableActionPanelOption.THREADS
      ];
    case ClickableActionPanelGroupOption.COMMUNITY_LINKS:
      return [
        ClickableActionPanelOption.CALENDAR,
        ClickableActionPanelOption.SUBMIT_BIRTHDAY,
        ClickableActionPanelOption.BEER
      ];
    default:
      return undefined;
  }
}

/** Props for {@link ClickableActionPanelGroup} */
interface IClickableActionPanelGroup {
  group: ClickableActionPanelGroupOptionType;
}
