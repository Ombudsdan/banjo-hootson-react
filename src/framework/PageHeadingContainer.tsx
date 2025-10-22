import { PropsWithChildren, ReactNode } from "react";
import { PageWidthContainer } from "./PageWidthContainer";

export function PageHeadingContainer({
  variant = "light",
  image,
  heading,
  subheading,
  children,
}: Props) {
  return (
    <div
      className={`page-heading-container page-heading-container--${
        variant || "light"
      }`}
    >
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
  variant?: "light" | "dark";
  image?: ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
}>;
