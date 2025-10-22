import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { PageValidationAlertContext, PageValidationAlertErrorsRecord } from 'hooks';

const PageValidationAlertProvider: FC<PageValidationAlertProviderProps> = ({ children }) => {
  const [validationErrors, setValidationErrors] = useState<PageValidationAlertErrorsRecord | null>(null);

  const setValidationAlert = useCallback(
    (config: PageValidationAlertErrorsRecord | null) => setValidationErrors(config),
    []
  );

  const clearValidationAlert = useCallback(() => setValidationErrors(null), []);

  return (
    <PageValidationAlertContext.Provider value={{ validationErrors, setValidationAlert, clearValidationAlert }}>
      {children}
    </PageValidationAlertContext.Provider>
  );
};

export default PageValidationAlertProvider;

type PageValidationAlertProviderProps = PropsWithChildren;
