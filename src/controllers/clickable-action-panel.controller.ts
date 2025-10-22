import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ClickableActionPanelOptionType, ClickableActionPanelTheme, ClickableActionPanelThemeType } from 'enums';
import { ICONS } from 'icons';
import { getEnum, isExternalLink } from 'utils';

export default class ClickableActionPanelController {
  static getPanelContent(option: ClickableActionPanelOptionType): IClickableActionPanelConfig | undefined {
    const panelContent = PANEL_CONTENT_MAP.get(option);
    if (!panelContent) {
      console.error('Invalid option provided');
      return undefined;
    }

    return {
      ...panelContent,
      isExternal: isExternalLink(panelContent.link),
      theme: getEnum(option, ClickableActionPanelTheme, ClickableActionPanelTheme.DEFAULT)
    };
  }
}

const PANEL_CONTENT_MAP = new Map<ClickableActionPanelOptionType, IClickableActionPanelConfig>([
  [
    'instagram',
    {
      icon: ICONS.instagram,
      link: 'https://instagram.com/banjohootson',
      text: 'Instagram'
    }
  ],
  [
    'facebook',
    {
      icon: ICONS.facebook,
      link: 'https://facebook.com/banjohootson',
      text: 'Facebook'
    }
  ],
  [
    'threads',
    {
      icon: ICONS.threads,
      link: 'https://threads.net/banjohootson',
      text: 'Threads'
    }
  ],
  ['calendar', { icon: ICONS.calendar, link: '/calendar', text: 'Birthday Calendar' }],
  [
    'submitBirthday',
    {
      icon: ICONS.submitBirthday,
      link: '/calendar/submit',
      text: 'Submit Birthday'
    }
  ],
  [
    'beer',
    {
      icon: ICONS.beer,
      link: 'https://buymeacoffee.com/banjohootson',
      text: 'Buy Me A Beer?'
    }
  ]
]);

export interface IClickableActionPanelConfig {
  icon?: IconDefinition;
  link: string;
  text: string;
  isExternal?: boolean;
  theme?: ClickableActionPanelThemeType;
}
