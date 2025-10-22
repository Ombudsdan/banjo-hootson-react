import { IPageHeading } from 'framework';
import { createContext } from 'react';

const PageHeadingContext = createContext<IPageHeadingContext | undefined>(undefined);

export default PageHeadingContext;

export interface IPageHeadingContext {
  headingConfig: IPageHeading | null;
  setHeading: (cfg: IPageHeading | null) => void;
  clearHeading: () => void;
}
