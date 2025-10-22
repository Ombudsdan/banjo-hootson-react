import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickableActionPanelController, ActionPanelOption, IActionPanel } from 'controllers';
import { generateClassName } from 'utils';

export default function ClickableActionPanel({ option }: IClickableActionPanel) {
  const content = ClickableActionPanelController.getPanelContent(option);

  if (!content) return null;

  const { icon, text, link, isExternal, theme } = content;
  const bodyProps = { icon, text };

  const className = useMemo(() => {
    return generateClassName(['clickable-action-panel', theme && `clickable-action-panel--${theme}`]);
  }, [content.theme]);

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

interface IClickableActionPanel {
  option: ActionPanelOption;
}

interface IClickableActionPanelLink extends Pick<IActionPanel, 'link'> {
  className: string;
  bodyProps: IClickableActionPanelBody;
}

interface IClickableActionPanelBody extends Pick<IActionPanel, 'icon' | 'text'> {}
