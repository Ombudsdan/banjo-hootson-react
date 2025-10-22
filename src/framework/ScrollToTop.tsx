import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * Lightweight scroll reset on pathname change.
 *
 * Behavior:
 *  - On every route (pathname) change it scrolls to the very top (html, body, window) using two RAF passes.
 *  - Skips resetting when:
 *      1. The target URL includes a hash fragment (native anchor jump should occur)
 *      2. The navigation state contains { preserveScroll: true }
 *
 * Why dual RAF?
 *  - First RAF fires after React commits the new route.
 *  - Second nested RAF fires one frame later, catching late layout shifts (fonts / async image decode) without loops.
 *
 * How to preserve scroll:
 *  navigate('/details/123', { state: { preserveScroll: true } });
 *  <Link to="/details/123" state={{ preserveScroll: true }}>Open</Link>
 *
 * Placement:
 *  Include exactly once near the top of the tree (e.g. inside the root layout) so it observes all location changes.
 *
 * Notes:
 *  - Native scrollRestoration is forced to 'manual' once so the browser does not counteract our resets.
 *  - We intentionally avoid scanning arbitrary containers for performance; explicit design keeps the app with a single primary scroller.
 */
export default function ScrollToTop() {
  const location = useLocation();

  // One-time: disable native restoration so we fully control resets.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        /* ignore */
      }
    }
  }, []);

  const { pathname, hash, state } = location as typeof location & {
    state?: { preserveScroll?: boolean };
  };

  useEffect(() => {
    if (hash || state?.preserveScroll) return;

    const reset = () => {
      // Explicitly target all potential root scrollers for broad compatibility.
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };

    // Two passes: immediate next frame + a later frame to catch late layout (fonts/images).
    requestAnimationFrame(reset);
    requestAnimationFrame(() => requestAnimationFrame(reset));
  }, [pathname, hash, state?.preserveScroll]);

  return null;
}
