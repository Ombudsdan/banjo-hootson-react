/**
 * useValidationAlert
 * Aggregated form-wide validation messaging (heading + list of issues) surfaced near top of page.
 * Intended for submit-time validation summaries, not inline field errors.
 */
import { PageValidationAlertContext } from "layout/PageValidationAlert";
import { useContext } from "react";

export default function useValidationAlert() {
  const context = useContext(PageValidationAlertContext);
  if (!context)
    throw new Error(
      "useValidationAlert must be used within ValidationAlertProvider"
    );
  return context;
}
