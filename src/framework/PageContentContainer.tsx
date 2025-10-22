import { PropsWithChildren } from 'react';
import { PageContentContainerSpacing, PageContentContainerSpacingType } from 'enums';

export default function PageContentContainer({
  spacing = PageContentContainerSpacing.NONE,
  children
}: IPageContentContainer) {
  return <div className={`page-content-container page-content-container--spacing-${spacing}`}>{children}</div>;
}

export interface IPageContentContainer extends PropsWithChildren {
  spacing?: PageContentContainerSpacingType;
}
