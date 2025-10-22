import { FC, ReactNode } from "react";
import {
  PageAlertProvider,
  PageContainerProvider,
  PageHeadingProvider,
} from "layout";
import { PageValidationAlertProvider } from "./PageValidationAlert";

/**
 * UIProviders
 * Thin composition component to reduce provider nesting noise in layout.
 * Each domain keeps its own context to preserve separation of concerns
 * (avoids large monolithic context objects & unrelated re-renders), while
 * giving layouts a single wrapper for common UI scaffolding.
 */
const LayoutProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PageHeadingProvider>
      <PageValidationAlertProvider>
        <PageAlertProvider>
          <PageContainerProvider>{children}</PageContainerProvider>
        </PageAlertProvider>
      </PageValidationAlertProvider>
    </PageHeadingProvider>
  );
};

export default LayoutProviders;
