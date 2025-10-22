import { IPageContainer, PageContainerVariant } from "model/page-container";
import { FC, ReactNode, useCallback, useState } from "react";
import PageContainerContext from "./PageContainerContext";

const DEFAULT_CONFIG: IPageContainer = {
  variant: PageContainerVariant.DEFAULT,
};

const PageContainerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<IPageContainer>(DEFAULT_CONFIG);

  const setContainer = useCallback((cfg: Partial<IPageContainer>) => {
    setConfig((prev) => {
      const next = { ...prev, ...cfg };
      // shallow compare to prevent unnecessary re-renders
      if (prev.variant === next.variant && prev.className === next.className)
        return prev;
      return next;
    });
  }, []);

  const resetContainer = useCallback(() => setConfig(DEFAULT_CONFIG), []);

  return (
    <PageContainerContext.Provider
      value={{ config, setContainer, resetContainer }}
    >
      {children}
    </PageContainerContext.Provider>
  );
};

export default PageContainerProvider;
