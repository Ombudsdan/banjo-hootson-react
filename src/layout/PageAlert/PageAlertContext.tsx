import { createContext } from "react";
import { IPageAlertsContextValue } from "model/page-alert";

const PageAlertContext = createContext<IPageAlertsContextValue | undefined>(
  undefined
);

export default PageAlertContext;
