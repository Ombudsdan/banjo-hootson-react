import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateClassName } from 'utils';
import {
  ClickableActionPanelOption,
  ClickableActionPanelOptionType,
  ClickableActionPanelTheme,
  ClickableActionPanelThemeType
} from 'enums';
import { ICONS } from 'icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Clickable panel that navigates to an internal route or external URL based on the provided option.
 * Resolves display/content via the ClickableActionPanelController and renders appropriately styled link.
 */
export default function ClickableActionPanel({ option }: IClickableActionPanel) {
  const content = getPanelContent(option);

  const className = useMemo(() => {
    const theme = content?.theme;
    return generateClassName(['clickable-action-panel', theme && `clickable-action-panel--${theme}`]);
  }, [content?.theme]);

  if (!content) return null;

  const { icon, text, link, isExternal } = content;
  const bodyProps = { icon, text };
  return isExternal ? (
    <ClickableActionPanelExternalLink link={link} className={className} bodyProps={bodyProps} />
  ) : (
    <ClickableActionPanelInternalLink link={link} className={className} bodyProps={bodyProps} />
  );
}

function ClickableActionPanelExternalLink({ link, className, bodyProps }: IClickableActionPanelLink) {
  return (
    <a className={className} href={link} target="_blank" rel="noopener noreferrer">
      <ClickableActionPanelBody {...bodyProps} />
    </a>
  );
}

function ClickableActionPanelInternalLink({ link, className, bodyProps }: IClickableActionPanelLink) {
  return (
    <Link className={className} to={link}>
      <ClickableActionPanelBody {...bodyProps} />
    </Link>
  );
}

function ClickableActionPanelBody({ icon, text }: IClickableActionPanelBody) {
  return (
    <>
      {icon && <FontAwesomeIcon className="clickable-action-panel__icon" icon={icon} title={text} />}
      <span className="clickable-action-panel__text">{text}</span>
    </>
  );
}

function getPanelContent(option: ClickableActionPanelOptionType): IClickableActionPanelConfig | undefined {
  switch (option) {
    case ClickableActionPanelOption.INSTAGRAM:
      return {
        icon: ICONS.instagram,
        link: 'https://instagram.com/banjohootson',
        text: 'Instagram',
        isExternal: true,
        theme: ClickableActionPanelTheme.INSTAGRAM
      };
    case ClickableActionPanelOption.FACEBOOK:
      return {
        icon: ICONS.facebook,
        link: 'https://facebook.com/banjohootson',
        text: 'Facebook',
        isExternal: true,
        theme: ClickableActionPanelTheme.FACEBOOK
      };
    case ClickableActionPanelOption.THREADS:
      return {
        icon: ICONS.threads,
        link: 'https://threads.net/banjohootson',
        text: 'Threads',
        isExternal: true,
        theme: ClickableActionPanelTheme.THREADS
      };
    case ClickableActionPanelOption.CALENDAR:
      return {
        icon: ICONS.calendar,
        link: '/calendar',
        text: 'Birthday Calendar',
        theme: ClickableActionPanelTheme.DEFAULT
      };
    case ClickableActionPanelOption.SUBMIT_BIRTHDAY:
      return {
        icon: ICONS.submitBirthday,
        link: '/calendar/submit',
        text: 'Submit Birthday',
        theme: ClickableActionPanelTheme.DEFAULT
      };
    case ClickableActionPanelOption.BEER:
      return {
        icon: ICONS.beer,
        link: 'https://buymeacoffee.com/banjohootson',
        text: 'Buy Me A Beer?',
        isExternal: true,
        theme: ClickableActionPanelTheme.DEFAULT
      };
    default:
      return undefined;
  }
}

/** Props for {@link ClickableActionPanel} */
interface IClickableActionPanel {
  option: ClickableActionPanelOptionType;
}

/** Props for {@link ClickableActionPanelLink} */
interface IClickableActionPanelLink extends Pick<IClickableActionPanelConfig, 'link'> {
  className: string;
  bodyProps: IClickableActionPanelBody;
}

/** Props for {@link ClickableActionPanelBody} */
type IClickableActionPanelBody = Pick<IClickableActionPanelConfig, 'icon' | 'text'>;

export interface IClickableActionPanelConfig {
  icon?: IconDefinition;
  link: string;
  text: string;
  isExternal?: boolean;
  theme?: ClickableActionPanelThemeType;
}
