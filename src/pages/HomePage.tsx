import { useMemo } from 'react';
import { ClickableActionPanelGroup, Gallery } from 'components';
import { Image, PageContentContainer, PageSectionContainer } from 'framework';
import { GalleryController } from 'controllers';
import { usePageHeading } from 'hooks';
import { PageHeadingTheme } from 'model/page-heading';
import { ImageFrame, ImageUsage } from 'model/image';

export default function HomePage() {
  usePageHeading('Banjo Hootson', {
    subheading: 'Friendly neighbourhood Djungelskog and sound Yorkshireman',
    theme: PageHeadingTheme.DARK,
    image: useMemo(
      () => (
        <Image
          fileName="home-heading-image"
          alt="Home page heading image showing Banjo in Rotterdam with the TV tower in the background"
          usage={ImageUsage.HEADING}
          frame={ImageFrame.LIGHT}
          loading="eager"
        />
      ),
      []
    )
  });

  return (
    <PageContentContainer spacing="medium">
      <PageSectionContainer heading="Plushie Community">
        <ClickableActionPanelGroup group={'community-links'} />
      </PageSectionContainer>

      <PageSectionContainer heading="Exploring the plushie world is my passion...">
        <Gallery items={GalleryController.homeItems} />
      </PageSectionContainer>

      <PageSectionContainer heading="Come join me on my adventures!">
        <ClickableActionPanelGroup group={'social-links'} />
      </PageSectionContainer>
    </PageContentContainer>
  );
}
