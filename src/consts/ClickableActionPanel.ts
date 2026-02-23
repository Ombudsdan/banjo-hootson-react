import { ClickableActionPanelTheme, ClickableActionPanelThemeType } from 'enums';
import { ICONS } from 'icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum ClickableActionPanelLink {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  THREADS = 'threads',
  DISCORD = 'discord',
  CALENDAR = 'calendar',
  SUBMIT_BIRTHDAY = 'submitBirthday',
  BEER = 'beer'
}

export const ClickableActionPanelContent: Record<ClickableActionPanelLink, IClickableActionPanelConfig> = {
  [ClickableActionPanelLink.INSTAGRAM]: {
    icon: ICONS.instagram,
    link: 'https://instagram.com/banjohootson',
    text: 'Instagram',
    isExternal: true,
    theme: ClickableActionPanelTheme.INSTAGRAM
  },
  [ClickableActionPanelLink.FACEBOOK]: {
    icon: ICONS.facebook,
    link: 'https://facebook.com/banjohootson',
    text: 'Facebook',
    isExternal: true,
    theme: ClickableActionPanelTheme.FACEBOOK
  },
  [ClickableActionPanelLink.THREADS]: {
    icon: ICONS.threads,
    link: 'https://threads.net/banjohootson',
    text: 'Threads',
    isExternal: true,
    theme: ClickableActionPanelTheme.THREADS
  },
  [ClickableActionPanelLink.DISCORD]: {
    icon: ICONS.discord,
    link: 'https://discord.gg/gv8hPb3yV6',
    text: 'The Plushie Realm',
    isExternal: true,
    theme: ClickableActionPanelTheme.DISCORD
  },
  [ClickableActionPanelLink.CALENDAR]: {
    icon: ICONS.calendar,
    link: '/calendar',
    text: 'Birthday Calendar',
    theme: ClickableActionPanelTheme.DEFAULT
  },
  [ClickableActionPanelLink.SUBMIT_BIRTHDAY]: {
    icon: ICONS.submitBirthday,
    link: '/calendar/submit',
    text: 'Submit Birthday',
    theme: ClickableActionPanelTheme.DEFAULT
  },
  [ClickableActionPanelLink.BEER]: {
    icon: ICONS.beer,
    link: 'https://buymeacoffee.com/banjohootson',
    text: 'Buy Me A Beer?',
    isExternal: true,
    theme: ClickableActionPanelTheme.DEFAULT
  }
};

export interface IClickableActionPanelConfig {
  icon?: IconDefinition;
  link: string;
  text: string;
  isExternal?: boolean;
  theme?: ClickableActionPanelThemeType;
}
