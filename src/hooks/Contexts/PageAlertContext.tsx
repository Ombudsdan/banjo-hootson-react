import { createContext } from 'react';
import { IAlertCard } from 'framework';

const PageAlertContext = createContext<IPageAlertContext | undefined>(undefined);

export default PageAlertContext;

export interface IPageAlertContext {
  alerts: IAlertCard[];
  addAlert: (alert: IAlertCard) => string;
  dismissAlert: (id: string) => void;
  dismissAllAlerts: () => void;
  replaceAlerts: (alerts: IAlertCard[]) => void;
  updateAlert: (id: string, patch: Partial<Omit<IAlertCard, 'id'>>) => boolean;
  pauseAlertTimer?: (id: string) => void;
  resumeAlertTimer?: (id: string) => void;
  // entering/exiting sets are injected for outlet animation (not part of public hook API contract if consuming only add/dismiss methods)
  enteringIds?: Set<string>;
  exitingIds?: Set<string>;
}
