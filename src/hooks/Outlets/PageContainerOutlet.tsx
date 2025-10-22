import { FC, PropsWithChildren, useContext } from 'react';
import { PageContainer } from 'framework';
import { PageContainerContext } from 'hooks';

// Outlet that wraps page content with PageContainer unless variant is full-width
const PageContainerOutlet: FC<IPageContainerOutlet> = ({ children }) => {
  const context = useContext(PageContainerContext);

  if (!context) {
    throw new Error('PageContainerOutlet must be used within PageContainerProvider');
  }

  return <PageContainer {...context.config}>{children}</PageContainer>;
};

export default PageContainerOutlet;

export interface IPageContainerOutlet extends PropsWithChildren {}
