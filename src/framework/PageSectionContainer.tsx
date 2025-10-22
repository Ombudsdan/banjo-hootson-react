import { PropsWithChildren, ReactNode } from "react";
import { generateClassName } from "utils";

export default function PageSectionContainer({
  heading,
  className,
  children,
}: IPageSectionContainer) {
  return (
    <section
      className={generateClassName(["page-section-container", className])}
    >
      {heading ? <h2 className="heading">{heading}</h2> : null}
      {children}
    </section>
  );
}

interface IPageSectionContainer extends PropsWithChildren {
  heading?: ReactNode;
  className?: string;
}
