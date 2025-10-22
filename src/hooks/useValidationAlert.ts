import { useContext } from "react";
import { ValidationAlertContext } from "@/services/validation-alert.service";

export function useValidationAlert() {
  const ctx = useContext(ValidationAlertContext);
  if (!ctx)
    throw new Error(
      "useValidationAlert must be used within ValidationAlertProvider"
    );
  return ctx;
}
