import { IPageHeadingContainer } from "model/page-heading";
import PageContainer from "./PageContainer";

export default function PageHeadingContainer({
  theme,
  image,
  heading,
  subheading,
  children,
}: IPageHeadingContainer) {
  return (
    <div className={`page-heading-container page-heading-container--${theme}`}>
      <PageContainer>
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
      </PageContainer>
    </div>
  );
}
