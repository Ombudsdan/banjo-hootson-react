import { GalleryItem } from "@/controllers/gallery.controller";
import { Image } from "@/framework/Image";

export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="gallery">
      {items.map((it, idx) => (
        <div className="gallery__item" key={`${it.fileName}-${idx}`}>
          <Image fileName={it.fileName} alt={it.alt} usage="gallery" />
        </div>
      ))}
    </div>
  );
}
