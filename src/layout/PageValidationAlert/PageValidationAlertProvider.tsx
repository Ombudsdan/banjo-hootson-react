import { FC, useCallback, useState } from 'react';
import { IAlertCard, IPageValidationAlertProvider } from 'model/page-validation-alert';
import { PageValidationAlertContext } from '.';

const PageValidationAlertProvider: FC<IPageValidationAlertProvider> = ({ children }) => {
  const [alert, setAlert] = useState<IAlertCard | null>(null);

  const setValidationAlert = useCallback((cfg: IAlertCard | null) => setAlert(cfg), []);

  const clearValidationAlert = useCallback(() => setAlert(null), []);

  return (
    <PageValidationAlertContext.Provider value={{ alert, setValidationAlert, clearValidationAlert }}>
      {children}
    </PageValidationAlertContext.Provider>
  );
};

export default PageValidationAlertProvider;
