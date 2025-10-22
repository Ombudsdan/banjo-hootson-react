import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { PageValidationAlertContext, PageValidationAlertErrors } from 'hooks';

const PageValidationAlertProvider: FC<IPageValidationAlertProvider> = ({ children }) => {
  const [validationErrors, setValidationErrors] = useState<PageValidationAlertErrors | null>(null);

  const setValidationAlert = useCallback((config: PageValidationAlertErrors | null) => setValidationErrors(config), []);

  const clearValidationAlert = useCallback(() => setValidationErrors(null), []);

  return (
    <PageValidationAlertContext.Provider value={{ validationErrors, setValidationAlert, clearValidationAlert }}>
      {children}
    </PageValidationAlertContext.Provider>
  );
};

export default PageValidationAlertProvider;

export interface IPageValidationAlertProvider extends PropsWithChildren {}
