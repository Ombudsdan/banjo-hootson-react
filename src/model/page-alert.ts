import { AlertCardVariant } from "model/page-validation-alert";
import { ReactNode } from "react";
import { createEnum, ValueOf } from "utils";

export const PageAlertVariant = createEnum({
  // Currently casting the entire enum to match AlertCardVariant values
  // however if we want to diverge in the future we can do so here
  ...AlertCardVariant,
});

export type PageAlertVariantType = ValueOf<typeof PageAlertVariant>;

export interface IPageAlert {
  id: string;
  heading: string;
  messages?: string[];
  variant?: PageAlertVariantType;
  autoFocus?: boolean;
  content?: ReactNode;
  timeoutMs?: number; // auto-dismiss after provided milliseconds
}

export interface IPageAlertsContextValue {
  alerts: IPageAlert[];
  addAlert: (alert: IPageAlert) => string;
  dismissAlert: (id: string) => void;
  dismissAll: () => void;
  replaceAlerts: (alerts: IPageAlert[]) => void;
  updateAlert: (id: string, patch: Partial<Omit<IPageAlert, "id">>) => boolean;
  pauseAlertTimer?: (id: string) => void;
  resumeAlertTimer?: (id: string) => void;
  // entering/exiting sets are injected for outlet animation (not part of public hook API contract if consuming only add/dismiss methods)
  enteringIds?: Set<string>;
  exitingIds?: Set<string>;
}
