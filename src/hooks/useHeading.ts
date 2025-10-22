import { useContext } from "react";
import { HeadingContext } from "@/services/heading.service";

export function useHeading() {
  const ctx = useContext(HeadingContext);
  if (!ctx) throw new Error("useHeading must be used within HeadingProvider");
  return ctx;
}
