import { createContext } from "react";
import { DialogContextValue } from "model/dialog";

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export default DialogContext;
