import { useMemo } from 'react';
import { Image } from 'framework';
import { usePageHeading } from 'hooks';
import { ImageUsage } from 'model/image';

export default function ContactPage() {
  const sendEmail = () => {
    location.href = 'mailto:hello@banjohootson.com';
  };
  usePageHeading('Get in touch!', {
    subheading:
      "Drop me a message if you want to share your plushie stories, be friends or do business together! I can't wait to hear from you!",
    image: useMemo(
      () => (
        <Image
          fileName="contact-heading-image"
          alt="Banjo wearing a grey jumper with Mickey Mouse's face on it and brown ushanka hat with a bear's face on it, standing next to a wall at Edinburgh Castle with the city in the background"
          usage={ImageUsage.HEADING}
          loading="eager"
        />
      ),
      []
    )
  });

  return (
    <div className="contact-page__message-container">
      <button className="button button--main" onClick={sendEmail}>
        Email Me
      </button>
    </div>
  );
}
