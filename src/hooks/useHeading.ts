/**
 * useHeading
 * Low-level hook accessing raw heading context (setHeading / clearHeading + config).
 * Prefer using higher-level helpers like usePageHeading for simple page titles.
 */
import { useContext, useEffect } from 'react';
import { PageHeadingContext } from 'hooks';
import { IPageHeading } from 'framework';

export default function useHeading(config: IPageHeading) {
  const context = useContext(PageHeadingContext);
  if (!context) {
    throw new Error('useHeading must be used within HeadingProvider');
  }

  const { setHeading, clearHeading } = context;

  const { heading, subheading, image, theme } = config;

  useEffect(() => {
    setHeading(config);
    return () => clearHeading();
  }, [heading, subheading, image, theme, setHeading, clearHeading]);
}
