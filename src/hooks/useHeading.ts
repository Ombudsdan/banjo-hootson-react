/**
 * useHeading
 * Low-level hook accessing raw heading context (setHeading / clearHeading + config).
 * Prefer using higher-level helpers like usePageHeading for simple page titles.
 */
import { useContext } from "react";
import { PageHeadingContext } from "layout";

export default function useHeading() {
  const context = useContext(PageHeadingContext);
  if (!context) {
    throw new Error("useHeading must be used within HeadingProvider");
  }
  return context;
}
