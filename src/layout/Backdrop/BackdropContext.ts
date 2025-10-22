import { createContext } from "react";
import { BackdropContextValue } from "model/backdrop";

export const BackdropContext = createContext<BackdropContextValue | undefined>(
  undefined
);

export default BackdropContext;
