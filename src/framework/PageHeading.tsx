import PageContainer from './PageContainer';
import { PropsWithChildren, ReactNode } from 'react';
import { PageHeadingThemeType } from 'enums/page-heading-theme.enum';

export default function PageHeading({ theme, image, heading, subheading, children }: IPageHeading) {
  return (
    <div className={`page-heading-container page-heading-container--${theme}`}>
      <PageContainer>
        {image && <div className="page-heading-container__image">{image}</div>}

        <div className="page-heading-container__row">
          <div className="page-heading-container__content">
            {heading && <h1 className="page-heading-container__heading">{heading}</h1>}
            {subheading && <p className="page-heading-container__subheading">{subheading}</p>}
            {children}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

export interface IPageHeading extends PropsWithChildren {
  heading?: ReactNode;
  subheading?: ReactNode;
  image?: ReactNode;
  theme?: PageHeadingThemeType;
}
