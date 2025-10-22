import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  spacing?: "none" | "small" | "medium" | "large";
}>;

export function FlexColumnLayout({ spacing = "medium", children }: Props) {
  const cls = `flex-column-layout flex-column-layout--spacing-${spacing}`;
  return <div className={cls}>{children}</div>;
}
