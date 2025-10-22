import { ClickableActionPanelGroup } from "@/components/ClickableActionPanelGroup";
import { Gallery } from "@/components/Gallery";
import { FlexColumnLayout } from "@/framework/FlexColumnLayout";
import { Image } from "@/framework/Image";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { GalleryController } from "@/controllers/gallery.controller";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";

export default function HomePage() {
  return (
    <>
      <PageHeadingContainer
        variant="dark"
        heading="Banjo Hootson"
        subheading="Friendly neighbourhood Djungelskog and sound Yorkshireman"
        image={
          <Image
            fileName="home-heading-image"
            alt="Home page heading image showing Banjo in Rotterdam with the TV tower in the background"
            usage="heading"
            frame="light"
            loading="eager"
          />
        }
      />
      <div style={{ marginTop: "1rem" }}>
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
      </div>
    </>
  );
}
