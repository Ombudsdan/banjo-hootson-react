import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { PageHeadingContainer } from "@/framework/PageHeadingContainer";
import { Image } from "@/framework/Image";

export default function ContactPage() {
  const sendEmail = () => {
    location.href = "mailto:hello@banjohootson.com";
  };

  return (
    <>
      <PageHeadingContainer
        heading="Get in touch!"
        subheading="Drop me a message if you want to share your plushie stories, be friends or do business together! I can't wait to hear from you!"
        image={
          <Image
            fileName="contact-heading-image"
            alt="Banjo wearing a grey jumper with Mickey Mouse's face on it and brown ushanka hat with a bear's face on it, standing next to a wall at Edinburgh Castle with the city in the background"
            usage="heading"
            loading="eager"
          />
        }
      />
      <PageWidthContainer>
        <div className="contact-page__message-container">
          <button className="button button--main" onClick={sendEmail}>
            Email Me
          </button>
        </div>
      </PageWidthContainer>
    </>
  );
}
