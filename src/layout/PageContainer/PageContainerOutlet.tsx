import { FC, ReactNode, useContext } from "react";
import { PageContainerContext } from ".";
import { PageContainer } from "framework";

// Outlet that wraps page content with PageContainer unless variant is full-width
const PageContainerOutlet: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(PageContainerContext);

  if (!context) {
    throw new Error(
      "PageContainerOutlet must be used within PageContainerProvider"
    );
  }

  return <PageContainer {...context.config}>{children}</PageContainer>;
};

export default PageContainerOutlet;
