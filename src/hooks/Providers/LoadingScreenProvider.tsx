import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingScreenContext, ILoadingScreenContext } from 'hooks';
import { setInert } from 'utils';

const MIN_VISIBLE_MS = 1000; // minimum time to keep overlay visible to avoid flashes

const LoadingScreenProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const idCounterRef = useRef(0);
  const itemsRef = useRef<Map<string, { message?: string; ts: number }>>(new Map());
  const visibleSinceRef = useRef<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setLoadingScreen = useCallback<ILoadingScreenContext['setLoadingScreen']>(options => {
    const id = options?.id ?? `loading-${++idCounterRef.current}`;
    // If transitioning from closed -> open, record start and cancel any pending close
    if (itemsRef.current.size === 0) {
      visibleSinceRef.current = Date.now();
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }
    itemsRef.current.set(id, { message: options?.message, ts: Date.now() });
    updateStateFromItems();
    return id;
  }, []);

  const dismissLoadingScreen = useCallback<ILoadingScreenContext['dismissLoadingScreen']>(id => {
    if (id) itemsRef.current.delete(id);
    else itemsRef.current.clear();

    if (itemsRef.current.size === 0) {
      attemptCloseWithMinimum();
    } else {
      updateStateFromItems();
    }
  }, []);

  const contextValue = useMemo<IROMaybe<ILoadingScreenContext>>(
    () => ({ open, message, setLoadingScreen, dismissLoadingScreen }),
    [open, message, setLoadingScreen, dismissLoadingScreen]
  );

  useEffect(() => setInert(['main', 'footer'], open), [open]);

  return <LoadingScreenContext.Provider value={contextValue}>{children}</LoadingScreenContext.Provider>;

  function updateStateFromItems() {
    const size = itemsRef.current.size;
    if (size === 0) return; // closure handled elsewhere to respect minimum duration
    setOpen(true);
    // Show the most recently set message, if any
    const last = Array.from(itemsRef.current.values()).reduce((a, b) => (a.ts > b.ts ? a : b));
    setMessage(last.message);
  }

  function attemptCloseWithMinimum() {
    const now = Date.now();
    const since = visibleSinceRef.current ?? now;
    const elapsed = now - since;
    const remaining = MIN_VISIBLE_MS - elapsed;

    if (remaining <= 0) {
      updateStateToClosed();
    } else {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        // Only close if nothing reopened in the meantime
        if (itemsRef.current.size === 0) updateStateToClosed();
        closeTimerRef.current = null;
      }, remaining);
    }
  }

  function updateStateToClosed() {
    setOpen(false);
    setMessage(undefined);
    visibleSinceRef.current = null;
  }
};

export default LoadingScreenProvider;

type IROMaybe<T> = T | undefined;
