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
  FormDialogProvider,
  PageAlertProvider,
  PageContainerProvider,
  PageHeadingProvider,
  PageValidationAlertProvider
} from 'hooks';

const LayoutProviders: FC<LayoutProvidersProps> = ({ children }) => {
  return (
    <PageHeadingProvider>
      <PageValidationAlertProvider>
        <PageAlertProvider>
          <BackdropProvider>
            <FormDialogProvider>
              <DialogProvider>
                <PageContainerProvider>{children}</PageContainerProvider>
              </DialogProvider>
            </FormDialogProvider>
          </BackdropProvider>
        </PageAlertProvider>
      </PageValidationAlertProvider>
    </PageHeadingProvider>
  );
};

export default LayoutProviders;

type LayoutProvidersProps = React.PropsWithChildren;
