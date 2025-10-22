import { useContext } from "react";
import { PageAlertsContext } from "@/services/page-alerts.service";

export function usePageAlerts() {
  const ctx = useContext(PageAlertsContext);
  if (!ctx)
    throw new Error("usePageAlerts must be used within PageAlertsProvider");
  return ctx;
}
