import React, { createContext, useState, useCallback } from "react";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";

export const HeadingContext = createContext<IHeadingContextValue | undefined>(
  undefined
);

export const HeadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headingConfig, setHeadingConfig] = useState<IHeadingConfig | null>(
    null
  );
  const setHeading = useCallback((cfg: IHeadingConfig | null) => {
    // Prevent infinite update loops by avoiding setting identical objects
    setHeadingConfig((prev) => {
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
    <HeadingContext.Provider
      value={{ headingConfig, setHeading, clearHeading }}
    >
      {children}
    </HeadingContext.Provider>
  );
};

export const HeadingOutlet: React.FC = () => {
  const ctx = React.useContext(HeadingContext);
  if (!ctx)
    throw new Error("HeadingOutlet must be used within HeadingProvider");
  const { headingConfig } = ctx;
  if (!headingConfig) return null;
  return <PageHeadingContainer {...headingConfig} />;
};

export type HeadingTheme = "light" | "dark";

export interface IHeadingConfig {
  heading: string;
  subheading?: string;
  image?: React.ReactNode;
  theme?: HeadingTheme;
}

interface IHeadingContextValue {
  headingConfig: IHeadingConfig | null;
  setHeading: (cfg: IHeadingConfig | null) => void;
  clearHeading: () => void;
}
