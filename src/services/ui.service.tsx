import React, { createContext, useContext, useState, useCallback } from "react";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import AlertCard from "@/components/AlertCard";

interface IHeadingConfig {
  heading: string;
  subheading?: string;
  image?: React.ReactNode;
}

interface IValidationAlertConfig {
  heading: string;
  messages: string[];
  variant?: "error" | "warning" | "info" | "success";
  focus?: boolean;
}

interface IUIContextValue {
  headingConfig: IHeadingConfig | null;
  setHeading: (cfg: IHeadingConfig | null) => void;
  validationAlert: IValidationAlertConfig | null;
  setValidationAlert: (cfg: IValidationAlertConfig | null) => void;
  clearValidationAlert: () => void;
}

const UIContext = createContext<IUIContextValue | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headingConfig, setHeadingConfig] = useState<IHeadingConfig | null>(
    null
  );
  const [validationAlert, setValidationAlertState] =
    useState<IValidationAlertConfig | null>(null);

  const setHeading = useCallback(
    (cfg: IHeadingConfig | null) => setHeadingConfig(cfg),
    []
  );
  const setValidationAlert = useCallback(
    (cfg: IValidationAlertConfig | null) => setValidationAlertState(cfg),
    []
  );
  const clearValidationAlert = useCallback(
    () => setValidationAlertState(null),
    []
  );

  return (
    <UIContext.Provider
      value={{
        headingConfig,
        setHeading,
        validationAlert,
        setValidationAlert,
        clearValidationAlert,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}

export const UIOutletElements: React.FC = () => {
  const { headingConfig, validationAlert } = useUI();
  return (
    <>
      {headingConfig && (
        <PageHeadingContainer
          heading={headingConfig.heading}
          subheading={headingConfig.subheading}
          image={headingConfig.image}
        />
      )}
      {validationAlert && validationAlert.messages.length > 0 && (
        <div className="page-validation-alert">
          <AlertCard
            heading={validationAlert.heading}
            messages={validationAlert.messages}
            variant={validationAlert.variant || "error"}
            autoFocus={validationAlert.focus}
            cardId="global-validation-alert"
          />
        </div>
      )}
    </>
  );
};
