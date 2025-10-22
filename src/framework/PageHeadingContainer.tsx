import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  variant?: "light" | "dark";
  image?: ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
}>;

export function PageHeadingContainer({
  variant = "light",
  image,
  heading,
  subheading,
  children,
}: Props) {
  return (
    <div
      className={`page-heading-container page-heading-container--${variant}`}
    >
      {/* Angular template renders image block before row */}
      <div className="page-heading-container__image">{image}</div>
      <div className="page-heading-container__row">
        <div className="page-heading-container__content">
          {heading && (
            <h1
              className={`page-heading-container__heading ${
                !subheading ? "page-heading-container__heading--decorated" : ""
              }`}
            >
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="page-heading-container__subheading">{subheading}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
