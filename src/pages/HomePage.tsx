import { ClickableActionPanelGroup } from "@/components/ClickableActionPanelGroup";
import { Gallery } from "@/components/Gallery";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { Image } from "@/framework/Image";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { GalleryController } from "@/controllers/gallery.controller";

export default function HomePage() {
  return (
    <>
      <div className="home-page__heading-container">
        <Image
          fileName="home-heading-image"
          alt="Home page heading image showing Banjo in Rotterdam with the TV tower in the background"
          usage="heading"
          loading="eager"
        />
        <h1 className="home-page__heading">Banjo Hootson</h1>
        <p className="home-page__subheading">
          Friendly neighbourhood Djungelskog and sound Yorkshireman
        </p>
      </div>

      <PageWidthContainer>
        <FlexColumnLayout spacing="medium">
          <PageSectionContainer heading="Plushie Community">
            <ClickableActionPanelGroup group={"community-links"} />
          </PageSectionContainer>

          <PageSectionContainer heading="Exploring the plushie world is my passion...">
            <Gallery items={GalleryController.homeItems} />
          </PageSectionContainer>

          <PageSectionContainer heading="Come join me on my adventures!">
            <ClickableActionPanelGroup group={"social-links"} />
          </PageSectionContainer>
        </FlexColumnLayout>
      </PageWidthContainer>
    </>
  );
}
