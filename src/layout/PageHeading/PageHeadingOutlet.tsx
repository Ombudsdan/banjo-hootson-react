import { FC, useContext } from "react";
import PageHeadingContext from "./PageHeadingContext";
import { PageHeadingContainer } from "framework";

const PageHeadingOutlet: FC = () => {
  const context = useContext(PageHeadingContext);
  if (!context)
    throw new Error("HeadingOutlet must be used within HeadingProvider");
  const { headingConfig } = context;
  if (!headingConfig) return null;
  return <PageHeadingContainer {...headingConfig} />;
};

export default PageHeadingOutlet;
