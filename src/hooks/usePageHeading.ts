import { useEffect, useMemo } from "react";
import { IHeadingConfig } from "@/services/heading.service";
import { useHeading } from "@/hooks/useHeading";
import { HeadingTheme } from "@/services/heading.service";

/**
 * usePageHeading
 * Convenience hook for pages that only need to set a simple heading (and optional subheading/image).
 * Ensures the heading is registered on mount and cleared on unmount.
 *
 * Example:
 *   function AboutPage() {
 *     usePageHeading('About Banjo');
 *     return <PageWidthContainer>...</PageWidthContainer>;
 *   }
 */
export function usePageHeading(heading: string, options?: IPageHeadingOptions) {
  const { setHeading, clearHeading } = useHeading();
  // Memoize config so effect only runs when actual values change, not on every render creating new object references
  const memoConfig: IHeadingConfig = useMemo(() => {
    return { heading, ...(options || {}) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heading, options?.subheading, options?.image, options?.theme]);

  useEffect(() => {
    setHeading(memoConfig);
    return () => clearHeading();
  }, [memoConfig, setHeading, clearHeading]);
}

/**
 * NOTE FOR CALLERS:
 * - Pass stable references for `image` (wrap in useMemo) to avoid unnecessary re-runs.
 * - The service guards redundant updates, but memoizing prevents wasted renders.
 */

interface IPageHeadingOptions {
  subheading?: string;
  image?: React.ReactNode;
  theme?: HeadingTheme;
}
