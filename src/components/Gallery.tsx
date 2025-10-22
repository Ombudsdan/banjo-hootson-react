import { ImageUsage } from 'enums';
import { Image } from 'framework';

/**
 * Simple image gallery grid. Delegates image rendering to the shared Image component.
 */
export default function Gallery({ items }: IGallery) {
  return (
    <div className="gallery">
      {items.map((item, index) => (
        <GalleryItem key={index} fileName={item.fileName} alt={item.alt} />
      ))}
    </div>
  );
}

function GalleryItem({ fileName, alt }: GalleryItemProps) {
  return (
    <div className="gallery__item">
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

type GalleryItemProps = IGalleryItem;
