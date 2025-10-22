import {
  IPageContentContainer,
  PageContentContainerSpacing,
} from "model/page-content-container";

export default function PageContentContainer({
  spacing = PageContentContainerSpacing.NONE,
  children,
}: IPageContentContainer) {
  return (
    <div
      className={`page-content-container page-content-container--spacing-${spacing}`}
    >
      {children}
    </div>
  );
}
