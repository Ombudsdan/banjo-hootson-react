import { IPageContainerContext } from "model/page-container";
import { createContext } from "react";

const PageContainerContext = createContext<IPageContainerContext | undefined>(
  undefined
);
export default PageContainerContext;
