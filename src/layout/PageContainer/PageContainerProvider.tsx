import { FC, useCallback, useState } from 'react';
import { IPageContainer, IPageContainerProvider, PageContainerVariant } from 'model/page-container';
import PageContainerContext from './PageContainerContext';

const DEFAULT_CONFIG: IPageContainer = {
  variant: PageContainerVariant.DEFAULT
};

const PageContainerProvider: FC<IPageContainerProvider> = ({ children }) => {
  const [config, setConfig] = useState<IPageContainer>(DEFAULT_CONFIG);

  const setContainer = useCallback((cfg: Partial<IPageContainer>) => {
    setConfig(prev => {
      const next = { ...prev, ...cfg };
      // shallow compare to prevent unnecessary re-renders
      if (prev.variant === next.variant && prev.className === next.className) return prev;
      return next;
    });
  }, []);

  const resetContainer = useCallback(() => setConfig(DEFAULT_CONFIG), []);

  return (
    <PageContainerContext.Provider value={{ config, setContainer, resetContainer }}>
      {children}
    </PageContainerContext.Provider>
  );
};

export default PageContainerProvider;
