import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { PageHeadingContext } from 'hooks';
import { IPageHeading } from 'framework';

const PageHeadingProvider: FC<IPageHeadingProvider> = ({ children }) => {
  const [headingConfig, setHeadingConfig] = useState<IPageHeading | null>(null);

  const setHeading = useCallback((cfg: IPageHeading | null) => {
    // Prevent infinite update loops by avoiding setting identical objects
    setHeadingConfig(prev => {
      if (!prev && !cfg) return prev; // both null/undefined
      if (!prev || !cfg) return cfg; // one is null, other isn't
      if (
        prev.heading === cfg.heading &&
        prev.subheading === cfg.subheading &&
        prev.theme === cfg.theme &&
        prev.image === cfg.image // image reference must be stable to skip
      ) {
        return prev; // no change
      }
      return cfg;
    });
  }, []);

  const clearHeading = useCallback(() => setHeadingConfig(null), []);

  return (
    <PageHeadingContext.Provider value={{ headingConfig, setHeading, clearHeading }}>
      {children}
    </PageHeadingContext.Provider>
  );
};

export default PageHeadingProvider;

export interface IPageHeadingProvider extends PropsWithChildren {}
