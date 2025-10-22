import { PlushieBioController } from "@/controllers/plushie-bio.controller";
import { PlushieBio } from "@/components/PlushieBio";
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import { Image } from "@/framework/Image";
import { usePageHeading } from "@/hooks/usePageHeading";
import { useMemo } from "react";

export default function AboutPage() {
  const plushies = PlushieBioController.getAllPlushies();
  usePageHeading("All about Banjo", {
    subheading:
      "Join me in my plushie adventures as we explore the world together. Let's embark on new journeys and create memories that will last a lifetime! Travel is not just about the places we go; it's about the moments we experience and the stories we share. Come along and be a part of my plushie travel story.",
    image: useMemo(
      () => (
        <Image
          fileName="about-heading-image"
          alt="Banjo stood infront of a wall wearing a white shirt with crabs on it and with a felt-stitched monkey holding a banana in his shirt pocket"
          usage="heading"
          loading="eager"
        />
      ),
      []
    ),
  });

  return (
    <PageWidthContainer>
      <PageSectionContainer heading="Meet My Family">
        <div className="about-page__plushie-bio-container">
          {plushies.map((plushie, i) => (
            <PlushieBio plushie={plushie} position={i} key={plushie.fileName} />
          ))}
        </div>
      </PageSectionContainer>
    </PageWidthContainer>
  );
}
