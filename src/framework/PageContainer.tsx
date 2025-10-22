import { PropsWithChildren, useMemo } from 'react';
import { PageContainerVariant, PageContainerVariantType } from 'enums';

export default function PageContainer({ variant = PageContainerVariant.DEFAULT, className, children }: IPageContainer) {
  const classes = useMemo(() => {
    const list: string[] = [];
    if (className) list.push(className);
    if (variant) list.push(`page-container--${variant}`);
    return list.join(' ');
  }, [className, variant]);

  return <div className={`page-container ${classes}`}>{children}</div>;
}

export interface IPageContainer extends PropsWithChildren {
  variant?: PageContainerVariantType;
  /** optional custom class list for future extension */
  className?: string;
}
