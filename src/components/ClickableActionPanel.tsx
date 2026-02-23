import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateClassName } from 'utils';
import { ClickableActionPanelContent, ClickableActionPanelLink, IClickableActionPanelConfig } from 'consts';

/**
 * Clickable panel that navigates to an internal route or external URL based on the provided option.
 * Resolves display/content via the ClickableActionPanelContent and renders appropriately styled link.
 */
export default function ClickableActionPanel({ option }: IClickableActionPanel) {
  const content = ClickableActionPanelContent[option];

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

/** Props for {@link ClickableActionPanel} */
interface IClickableActionPanel {
  option: ClickableActionPanelLink;
}

/** Props for {@link ClickableActionPanelLink} */
interface IClickableActionPanelLink extends Pick<IClickableActionPanelConfig, 'link'> {
  className: string;
  bodyProps: IClickableActionPanelBody;
}

/** Props for {@link ClickableActionPanelBody} */
type IClickableActionPanelBody = Pick<IClickableActionPanelConfig, 'icon' | 'text'>;
