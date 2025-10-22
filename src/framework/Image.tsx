import { useEffect, useRef, useState, useCallback } from "react";
// Allow use of webpack require.context in TypeScript ESM build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

type Usage = "heading" | "gallery" | "bio";
type Shape = "circle" | "rounded-square";
type Frame = "light" | "dark";

interface Props {
  fileName: string;
  alt: string;
  usage?: Usage; // determines default shape + frame overrides
  shape?: Shape; // explicit override
  frame?: Frame; // explicit override
  loading?: "eager" | "lazy";
}

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
export function Image({
  fileName,
  alt,
  usage,
  shape,
  frame,
  loading = "lazy",
}: Props) {
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

  const fallbackWebp = `/assets/images/${fileName}.webp`;
  const fallbackJpg = `/assets/images/${fileName}.jpg`;

  const webpSrc = resolvedWebp || fallbackWebp;
  const jpgSrc = resolvedJpg || fallbackJpg;

  const wantsLazy = loading === "lazy";
  const supportsIO =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const shouldUseObserver = wantsLazy && supportsIO;

  // If not using IO lazy path, set initial src immediately (parity with Angular eager behavior)
  const [src, setSrc] = useState(() => (!shouldUseObserver ? webpSrc : ""));
  const [hasErroredOnce, setHasErroredOnce] = useState(false);

  // Derive implicit overrides (mirrors Angular template logic)
  const effectiveShape: Shape | undefined =
    shape ||
    (usage === "heading" ? "circle" : undefined) ||
    (usage === "bio" || usage === "gallery" ? "rounded-square" : undefined);

  const effectiveFrame: Frame | undefined =
    frame || (usage === "heading" ? "dark" : undefined);

  // Build class list (match Angular BEM)
  const classes = [
    "image",
    usage && `image--${usage}`,
    effectiveShape && `image--${effectiveShape}`,
    (effectiveFrame || frame) && "image--framed",
    effectiveFrame === "light" && "image--framed--light",
    effectiveFrame === "dark" && "image--framed--dark",
    !src && wantsLazy && "image--loading",
  ]
    .filter(Boolean)
    .join(" ");

  const startLoadingWebp = useCallback(() => {
    setSrc((prev) => {
      if (prev) return prev; // already set
      return webpSrc;
    });
  }, [webpSrc]);

  // Kick off loading when needed
  useEffect(() => {
    if (!shouldUseObserver) {
      // Eager or no IO support: load immediately
      // If src already set from initial state, no action
      if (!src) startLoadingWebp();
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
    setSrc(!shouldUseObserver ? webpSrc : "");
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
      ref={imgRef}
      src={src}
      alt={alt}
      loading={shouldUseObserver ? "eager" : loading}
      className={classes}
      onError={handleError}
    />
  );
}
