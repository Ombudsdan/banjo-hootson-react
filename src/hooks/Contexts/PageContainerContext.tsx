import { IPageContainer } from 'framework';
import { createContext } from 'react';

const PageContainerContext = createContext<IPageContainerContext | undefined>(undefined);

export default PageContainerContext;

export interface IPageContainerContext {
  config: IPageContainer;
  setContainer: (cfg: Partial<IPageContainer>) => void;
  resetContainer: () => void;
}
