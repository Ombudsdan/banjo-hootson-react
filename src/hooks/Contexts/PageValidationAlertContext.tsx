import { createContext } from 'react';

const PageValidationAlertContext = createContext<IValidationAlertContext | undefined>(undefined);

export default PageValidationAlertContext;

export interface IValidationAlertContext {
  validationErrors: PageValidationAlertErrors | null;
  setValidationAlert: (config: PageValidationAlertErrors | null) => void;
  clearValidationAlert: () => void;
}

/** Record<error-id, error-message> */
export type PageValidationAlertErrors = Record<string, string[]>; //
