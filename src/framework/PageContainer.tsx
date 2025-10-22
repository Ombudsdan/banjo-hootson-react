import { useMemo } from "react";
import { IPageContainer, PageContainerVariant } from "model/page-container";

export default function PageContainer({
  variant = PageContainerVariant.DEFAULT,
  className,
  children,
}: IPageContainer) {
  const classes = useMemo(() => {
    const list: string[] = [];
    if (className) list.push(className);
    if (variant) list.push(`page-container--${variant}`);
    return list.join(" ");
  }, [className, variant]);

  return <div className={`page-container ${classes}`}>{children}</div>;
}
