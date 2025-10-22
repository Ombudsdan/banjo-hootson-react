import { PropsWithChildren } from 'react';
import { createEnum, ValueOf } from 'utils';

export const PageContainerVariant = createEnum({
  DEFAULT: 'default',
  FULL_WIDTH: 'full-width'
});

type PageContainerVariantType = ValueOf<typeof PageContainerVariant>;

export interface IPageContainer extends PropsWithChildren {
  variant?: PageContainerVariantType;
  /** optional custom class list for future extension */
  className?: string;
}

export interface IPageContainerContext {
  config: IPageContainer;
  setContainer: (cfg: Partial<IPageContainer>) => void;
  resetContainer: () => void;
}

export interface IPageContainerProvider extends PropsWithChildren {}

export interface IPageContainerOutlet extends PropsWithChildren {}
