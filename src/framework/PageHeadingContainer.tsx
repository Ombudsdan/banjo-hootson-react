import { PropsWithChildren, ReactNode } from "react";
import { PageWidthContainer } from "./PageWidthContainer";
import { HeadingTheme } from "@/services/heading.service";

export function PageHeadingContainer({
  theme,
  image,
  heading,
  subheading,
  children,
}: Props) {
  return (
    <div className={`page-heading-container page-heading-container--${theme}`}>
      <PageWidthContainer>
        {image && <div className="page-heading-container__image">{image}</div>}

        <div className="page-heading-container__row">
          <div className="page-heading-container__content">
            {heading && (
              <h1 className="page-heading-container__heading">{heading}</h1>
            )}
            {subheading && (
              <p className="page-heading-container__subheading">{subheading}</p>
            )}
            {children}
          </div>
        </div>
      </PageWidthContainer>
    </div>
  );
}

type Props = PropsWithChildren<{
  heading?: ReactNode;
  subheading?: ReactNode;
  image?: ReactNode;
  theme?: HeadingTheme;
}>;
