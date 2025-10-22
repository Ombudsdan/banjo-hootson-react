/**
 * usePageContainer
 * Controls outer page content width/variant via the PageContainer context.
 * Typical use: set full-width or apply custom class; resets on unmount.
 */
import { useContext, useEffect } from 'react';
import { PageContainerContext } from 'hooks';
import { IPageContainer } from 'framework';

export default function usePageContainer(options?: IPageContainer) {
  const context = useContext(PageContainerContext);
  if (!context) throw new Error('usePageContainer must be used within PageContainerProvider');
  const { setContainer, resetContainer, config } = context;

  useEffect(() => {
    if (!options) return;
    if (options !== config) {
      setContainer(options);
    }
  }, [options, config, setContainer]);

  return { config, setContainer, resetContainer } as const;
}
