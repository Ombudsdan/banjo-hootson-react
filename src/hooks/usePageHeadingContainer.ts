import { useMemo } from 'react';
import { useHeading } from 'hooks';
import { IPageHeading } from 'framework';

/**
 * usePageHeading
 * Convenience hook for pages that only need to set a simple heading (and optional subheading/image).
 * Ensures the heading is registered on mount and cleared on unmount.
 *
 * Example:
 *   function AboutPage() {
 *     usePageHeading('About Banjo');
 *     return <PageContainer>...</PageContainer>;
 *   }
 *
 * NOTE FOR CALLERS:
 * - Pass stable references for `image` (wrap in useMemo) to avoid unnecessary re-runs.
 * - The service guards redundant updates, but memoizing prevents wasted renders.
 */
export default function usePageHeadingContainer(heading: string, options?: IPageHeading) {
  const memoConfig: IPageHeading = useMemo(() => {
    return { heading, ...(options || {}) };
  }, [heading, options?.subheading, options?.image, options?.theme]);

  useHeading(memoConfig);
}
