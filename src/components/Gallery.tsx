import { GalleryItem } from "controllers";
import { Image } from "framework";
import { ImageUsage } from "model/image";

export default function Gallery({ items }: IGallery) {
  return (
    <div className="gallery">
      {items.map((it, idx) => (
        <div className="gallery__item" key={`${it.fileName}-${idx}`}>
          <Image
            fileName={it.fileName}
            alt={it.alt}
            usage={ImageUsage.GALLERY}
          />
        </div>
      ))}
    </div>
  );
}

interface IGallery {
  items: GalleryItem[];
}
