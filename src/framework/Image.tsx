import {
  IImage,
  ImageFrame,
  ImageLoadingState,
  ImageShape,
  ImageUsage,
} from "model/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { generateClassName } from "utils";
// Allow use of webpack require.context in TypeScript ESM build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

// Transparent 1x1 gif for error fallback (mirrors Angular placeholder)
const ERROR_SRC = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

/**
 * Image component (Angular parity)
 *
 * Props:
 *  - fileName: base file name (without extension) present in /assets/images as .webp + .jpg pair
 *  - alt: accessible alt text (required)
 *  - usage: 'heading' | 'gallery' | 'bio' determines default shape / frame
 *  - shape: explicit override ('circle' | 'rounded-square') otherwise inferred: heading=>circle, bio|gallery=>rounded-square
 *  - frame: explicit override ('light' | 'dark'); heading defaults to dark frame
 *  - loading: 'lazy' | 'eager' (default 'lazy'). When 'lazy' + browser supports IntersectionObserver this component:
 *      * sets real <img loading="eager"> but defers assigning src until ~50px before viewport (preload effect)
 *      * shows shimmer skeleton via .image--loading until src is set & loaded
 *
 * Behavior:
 *  - Starts with empty src to allow CSS shimmer.
 *  - On intersection (or immediately if eager / no IO) sets webp src.
 *  - On error: if webp attempted -> try jpg; if jpg fails -> transparent gif placeholder.
 *  - Class names mirror Angular BEM structure for styling reuse.
 */
export default function Image({
  fileName,
  alt,
  usage,
  shape,
  frame,
  loading = ImageLoadingState.LAZY,
}: IImage) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Internal src starts empty to allow lazy + shimmer styles
  // Resolve asset URLs via webpack so they are emitted (direct string paths under /assets/images won't be served
  // unless placed in /public). This mirrors Angular's /assets/ pattern but leverages bundler for React build.
  let resolvedWebp: string | undefined;
  let resolvedJpg: string | undefined;
  try {
    const webpContext = require.context("../assets/images", false, /\.webp$/);
    resolvedWebp = webpContext(`./${fileName}.webp`);
  } catch {
    // ignore – will fall back to static path
  }
  try {
    const jpgContext = require.context("../assets/images", false, /\.(jpe?g)$/);
    resolvedJpg = jpgContext(`./${fileName}.jpg`);
  } catch {
    // ignore
  }

  const webpSrc = resolvedWebp || `/assets/images/${fileName}.webp`;
  const jpgSrc = resolvedJpg || `/assets/images/${fileName}.jpg`;

  const isLazyLoaded = loading === ImageLoadingState.LAZY;
  const supportsIO =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const shouldUseObserver = isLazyLoaded && supportsIO;

  // If not using IO lazy path, set initial src immediately (parity with Angular eager behavior)
  // Use null instead of empty string so we can omit the src attribute entirely until a value is ready.
  const [src, setSrc] = useState<string | null>(() =>
    !shouldUseObserver ? webpSrc : null
  );
  const [hasErroredOnce, setHasErroredOnce] = useState(false);
  const isLoading = !src && isLazyLoaded;
  const className = generateClass(usage, shape, frame, isLoading);

  const startLoadingWebp = useCallback(
    () => setSrc((prev) => prev || webpSrc),
    [webpSrc]
  );

  // Kick off loading when needed
  useEffect(() => {
    if (!shouldUseObserver) {
      // Eager or no IO support: load immediately
      // If src already set from initial state, no action
      if (!src) {
        startLoadingWebp();
      }
      return;
    }

    const el = imgRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !src) {
            startLoadingWebp();
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px", threshold: 0.1 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUseObserver, fileName, src, startLoadingWebp]);

  // When fileName changes, reset state.
  useEffect(() => {
    // Reset when filename changes; if not using observer, immediately set new webp
    setSrc(!shouldUseObserver ? webpSrc : null);
    setHasErroredOnce(false);
  }, [fileName, shouldUseObserver, webpSrc]);

  // Fallback: if using observer but still not loaded after short delay (e.g., IO failed), trigger load if in/near viewport
  useEffect(() => {
    if (!shouldUseObserver || src) return;
    const timer = setTimeout(() => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vpHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const inPreloadRange = rect.top < vpHeight + 100; // 100px preload buffer
      if (inPreloadRange) startLoadingWebp();
    }, 400);
    return () => clearTimeout(timer);
  }, [shouldUseObserver, src, webpSrc, startLoadingWebp]);

  // startLoadingWebp handled via useCallback above

  function handleError() {
    // If currently webp, try jpg; else if already switched once, final fallback.
    if (src === webpSrc) {
      setSrc(jpgSrc);
    } else if (!hasErroredOnce) {
      setSrc(ERROR_SRC);
      setHasErroredOnce(true);
    }
  }

  return (
    <img
      {...{
        ref: imgRef,
        alt,
        loading: shouldUseObserver ? ImageLoadingState.EAGER : loading,
        className,
        ...(src ? { src, onError: handleError } : {}),
      }}
    />
  );
}

function generateClass(
  usage: IImage["usage"],
  shape: IImage["shape"],
  frame: IImage["frame"],
  isLoading: boolean
) {
  return generateClassName([
    "image",
    usage && `image--${usage}`,
    generateShapeClass(shape, usage),
    generateFrameClass(frame, usage),
    isLoading && "image--loading",
  ]);
}

/** Generate the shape class for the image */
function generateShapeClass(
  shape: IImage["shape"],
  usage: IImage["usage"]
): string | undefined {
  if (shape) {
    return `image--${shape}`;
  } else if (usage === ImageUsage.HEADING) {
    return `image--${ImageShape.CIRCLE}`;
  } else if (usage === ImageUsage.BIO || usage === ImageUsage.GALLERY) {
    return `image--${ImageShape.ROUNDED_SQUARE}`;
  } else return undefined;
}

/** Generate the frame class for the image */
function generateFrameClass(frame: IImage["frame"], usage: IImage["usage"]) {
  const classes = [];

  const hasFrame = !!frame || usage === ImageUsage.HEADING;
  if (hasFrame) {
    classes.push(`image--framed`);
  }

  if (frame) {
    classes.push(`image--framed--${frame}`);
  } else if (usage === ImageUsage.HEADING) {
    classes.push(`image--framed--${ImageFrame.DARK}`);
  }

  return generateClassName(classes);
}
