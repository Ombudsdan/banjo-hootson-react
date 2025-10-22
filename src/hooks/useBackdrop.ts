import { useContext } from "react";
import { BackdropContext } from "layout";

export default function useBackdrop() {
  const context = useContext(BackdropContext);
  if (!context) {
    throw new Error("useBackdrop must be used within BackdropProvider");
  }
  return context;
}
