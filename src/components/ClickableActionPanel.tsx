import { Link } from "react-router-dom";
import {
  ClickableActionPanelController,
  ActionPanelOption,
} from "@/controllers/clickable-action-panel.controller";

export function ClickableActionPanel({
  option,
}: {
  option: ActionPanelOption;
}) {
  const content = ClickableActionPanelController.getPanelContent(option);
  if (!content) return null;
  const themeClass = content.theme
    ? `clickable-action-panel--${content.theme}`
    : "";
  const className = `clickable-action-panel ${themeClass}`.trim();
  const body = (
    <>
      {/* Icon omitted (no FA dependency in React build). Keep spacing consistent. */}
      <span className="clickable-action-panel__text">{content.text}</span>
    </>
  );
  return content.isExternal ? (
    <a
      className={className}
      href={content.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {body}
    </a>
  ) : (
    <Link className={className} to={content.link}>
      {body}
    </Link>
  );
}
