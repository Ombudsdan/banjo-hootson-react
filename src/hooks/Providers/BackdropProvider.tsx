import { useCallback, useState, useRef, useMemo, useEffect, PropsWithChildren } from 'react';
import { BackdropContext, IBackdropContext } from 'hooks';
import { setInert } from 'utils';

export const BackdropProvider = ({ children }: BackdropProviderProps) => {
  const [open, setOpen] = useState(false);

  const listenersRef = useRef<Set<() => void>>(new Set());

  const openBackdrop = useCallback(() => setOpen(true), []);

  const closeBackdrop = useCallback(() => setOpen(false), []);

  const addBackdropClickListener = useCallback((callback: () => void) => listenersRef.current.add(callback), []);

  const removeBackdropClickListener = useCallback((callback: () => void) => listenersRef.current.delete(callback), []);

  const contextValue: IBackdropContext | undefined = useMemo(
    () => ({
      open,
      openBackdrop,
      closeBackdrop,
      addBackdropClickListener,
      removeBackdropClickListener,
      _listeners: listenersRef.current
    }),
    [open, openBackdrop, closeBackdrop, addBackdropClickListener, removeBackdropClickListener]
  );

  useEffect(() => setInert(['main', 'footer'], open), [open]);

  return <BackdropContext.Provider value={contextValue}>{children}</BackdropContext.Provider>;
};

export default BackdropProvider;

type BackdropProviderProps = PropsWithChildren;
