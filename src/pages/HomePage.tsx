import { useMemo } from 'react';
import { ClickableActionPanelGroup } from 'components';
import { Image, PageContentContainer } from 'framework';
import { usePageHeading } from 'hooks';
import { ImageFrame, ImageUsage, PageHeadingTheme } from 'enums';
import { ClickableActionPanelLink } from 'consts';

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
      <ClickableActionPanelGroup
        options={[
          ClickableActionPanelLink.CALENDAR,
          ClickableActionPanelLink.SUBMIT_BIRTHDAY,
          ClickableActionPanelLink.BEER,
          ClickableActionPanelLink.DISCORD,
          ClickableActionPanelLink.INSTAGRAM,
          ClickableActionPanelLink.FACEBOOK,
          ClickableActionPanelLink.THREADS
        ]}
      />
    </PageContentContainer>
  );
}
