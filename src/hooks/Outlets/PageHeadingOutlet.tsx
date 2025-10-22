import { FC, useContext } from 'react';
import { PageHeadingContext } from 'hooks';
import { PageHeading } from 'framework';

const PageHeadingOutlet: FC = () => {
  const context = useContext(PageHeadingContext);
  if (!context) throw new Error('HeadingOutlet must be used within HeadingProvider');
  if (!context.headingConfig) return null;
  return <PageHeading {...context.headingConfig} />;
};

export default PageHeadingOutlet;
