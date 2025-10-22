import { createContext } from "react";
import { IPageHeadingContextValue } from "model/page-heading";

const PageHeadingContext = createContext<IPageHeadingContextValue | undefined>(
  undefined
);

export default PageHeadingContext;
