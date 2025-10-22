import React, { createContext, useState, useCallback } from "react";
import AlertCard from "@/components/AlertCard";

export interface IValidationAlertConfig {
  heading: string;
  messages: string[];
  variant?: "error" | "warning" | "info" | "success";
  focus?: boolean;
}

interface IValidationAlertContextValue {
  alert: IValidationAlertConfig | null;
  setValidationAlert: (cfg: IValidationAlertConfig | null) => void;
  clearValidationAlert: () => void;
}

export const ValidationAlertContext = createContext<
  IValidationAlertContextValue | undefined
>(undefined);

export const ValidationAlertProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<IValidationAlertConfig | null>(null);
  const setValidationAlert = useCallback(
    (cfg: IValidationAlertConfig | null) => setAlert(cfg),
    []
  );
  const clearValidationAlert = useCallback(() => setAlert(null), []);
  return (
    <ValidationAlertContext.Provider
      value={{ alert, setValidationAlert, clearValidationAlert }}
    >
      {children}
    </ValidationAlertContext.Provider>
  );
};

export const ValidationAlertOutlet: React.FC = () => {
  const ctx = React.useContext(ValidationAlertContext);
  if (!ctx)
    throw new Error(
      "ValidationAlertOutlet must be used within ValidationAlertProvider"
    );
  const { alert } = ctx;
  if (!alert || !alert.messages.length) return null;
  return (
    <div className="page-validation-alert">
      <AlertCard
        heading={alert.heading}
        messages={alert.messages}
        variant={alert.variant || "error"}
        autoFocus={alert.focus}
        cardId="global-validation-alert"
      />
    </div>
  );
};
