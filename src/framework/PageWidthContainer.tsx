import { PropsWithChildren } from "react";

export function PageWidthContainer({ children }: PropsWithChildren) {
  return <div className="page-width-container">{children}</div>;
}
