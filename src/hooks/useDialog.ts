import { DialogContext } from "layout";
import { useContext } from "react";

export default function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}
