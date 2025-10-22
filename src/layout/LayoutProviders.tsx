/**
 * UIProviders
 * Thin composition component to reduce provider nesting noise in layout.
 * Each domain keeps its own context to preserve separation of concerns
 * (avoids large monolithic context objects & unrelated re-renders), while
 * giving layouts a single wrapper for common UI scaffolding.
 */

import { FC } from 'react';
import {
  BackdropProvider,
  DialogProvider,
  PageAlertProvider,
  PageContainerProvider,
  PageHeadingProvider,
  PageValidationAlertProvider
} from 'layout';
import { ILayoutProviders } from 'model/layout';

const LayoutProviders: FC<ILayoutProviders> = ({ children }) => {
  return (
    <PageHeadingProvider>
      <PageValidationAlertProvider>
        <PageAlertProvider>
          <BackdropProvider>
            <DialogProvider>
              <PageContainerProvider>{children}</PageContainerProvider>
            </DialogProvider>
          </BackdropProvider>
        </PageAlertProvider>
      </PageValidationAlertProvider>
    </PageHeadingProvider>
  );
};

export default LayoutProviders;
