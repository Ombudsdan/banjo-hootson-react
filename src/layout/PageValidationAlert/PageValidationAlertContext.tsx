import { IValidationAlertContext } from "model/page-validation-alert";
import { createContext } from "react";

const PageValidationAlertContext = createContext<
  IValidationAlertContext | undefined
>(undefined);

export default PageValidationAlertContext;
