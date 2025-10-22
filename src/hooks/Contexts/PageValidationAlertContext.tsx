import { createContext } from 'react';

const PageValidationAlertContext = createContext<IValidationAlertContext | undefined>(undefined);

export default PageValidationAlertContext;

export interface IValidationAlertContext {
  validationErrors: PageValidationAlertErrorsRecord | null;
  setValidationAlert: (config: PageValidationAlertErrorsRecord | null) => void;
  clearValidationAlert: () => void;
}

/** Record<error-id, error-message> */
export type PageValidationAlertErrorsRecord = Record<string, string[]>; //
