import { useEffect, useRef, useState } from "react";

type Usage = "heading" | "gallery" | "bio";
type Shape = "circle" | "rounded-square";

type Props = {
  fileName: string;
  alt: string;
  usage?: Usage;
  shape?: Shape;
  loading?: "eager" | "lazy";
};

export function Image({
  fileName,
  alt,
  usage,
  shape,
  loading = "lazy",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);
  const classes = [
    "image",
    usage ? `image--${usage}` : "",
    shape ? `image--${shape}` : "",
    "image--framed",
    "image--framed--light",
    !loaded ? "image--loading" : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const onLoad = () => setLoaded(true);
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, []);

  const webp = `/assets/images/${fileName}.webp`;
  const jpg = `/assets/images/${fileName}.jpg`;

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        ref={ref}
        src={jpg}
        alt={alt}
        loading={loading}
        className={classes}
      />
    </picture>
  );
}
