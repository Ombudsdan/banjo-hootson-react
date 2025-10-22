import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DialogOutlet, FormDialogOutlet, FormProvider } from 'hooks';
import { LayoutProviders } from 'layout';

export function renderWithProviders(ui: ReactElement, opts: IProviderOptions = {}) {
  const { withForm = false, withDialogs = false } = opts;

  const Wrapper = ({ children }: { children: ReactElement }) => {
    return (
      <MemoryRouter>
        <LayoutProviders>
          {withForm ? <FormProvider>{children}</FormProvider> : children}
          {withDialogs && (
            <>
              <DialogOutlet />
              <FormDialogOutlet />
            </>
          )}
        </LayoutProviders>
      </MemoryRouter>
    );
  };

  return render(ui, { wrapper: Wrapper as any });
}

interface IProviderOptions {
  withForm?: boolean;
  withDialogs?: boolean;
}
