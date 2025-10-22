import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{ heading?: ReactNode; className?: string }>;

export function PageSectionContainer({ heading, className, children }: Props) {
  const cls = ["page-section-container", className].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      {heading ? <h2 className="heading">{heading}</h2> : null}
      {children}
    </section>
  );
}
