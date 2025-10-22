import { PropsWithChildren } from "react";
import { createEnum, ValueOf } from "utils";

export const PageContentContainerSpacing = createEnum({
  NONE: "none",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

export type PageContentContainerSpacingType = ValueOf<
  typeof PageContentContainerSpacing
>;

export interface IPageContentContainer extends PropsWithChildren {
  spacing?: PageContentContainerSpacingType;
}

export interface IPageContentContainerContext {
  config: IPageContentContainer | null;
  setContainer: (cfg: Partial<IPageContentContainer> | null) => void;
  clearContainer: () => void;
}
