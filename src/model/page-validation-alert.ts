import { ReactNode } from "react";
import { createEnum, ValueOf } from "utils";

export const AlertCardVariant = createEnum({
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
});

export type AlertCardVariantType = ValueOf<typeof AlertCardVariant>;

export interface IAlertCard {
  heading: string;
  messages?: string[];
  cardId?: string;
  variant?: AlertCardVariantType;
  children?: ReactNode;
  autoFocus?: boolean;
}

export interface IValidationAlertContext {
  alert: IAlertCard | null;
  setValidationAlert: (cfg: IAlertCard | null) => void;
  clearValidationAlert: () => void;
}
