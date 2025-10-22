import { ImageUsage } from 'enums';
import { Image } from 'framework';

/**
 * Simple image gallery grid. Delegates image rendering to the shared Image component.
 */
export default function Gallery({ items }: IGallery) {
  return (
    <div className="gallery">
      {items.map((it, idx) => (
        <GalleryItem fileName={it.fileName} alt={it.alt} key={idx} />
      ))}
    </div>
  );
}

function GalleryItem({ fileName, alt, key }: IGalleryItem & { key: number }) {
  return (
    <div className="gallery__item" key={key}>
      <Image fileName={fileName} alt={alt} usage={ImageUsage.GALLERY} />
    </div>
  );
}

/** Props for {@link Gallery} */
interface IGallery {
  items: IGalleryItem[];
}

/** Props for {@link GalleryItem} */
export interface IGalleryItem {
  fileName: string;
  alt: string;
}
