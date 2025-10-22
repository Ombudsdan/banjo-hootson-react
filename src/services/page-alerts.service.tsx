import React, {
  createContext,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import AlertCard from "@/components/AlertCard";

export const PageAlertsContext = createContext<
  IPageAlertsContextValue | undefined
>(undefined);

export const PageAlertsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<IPageAlert[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());
  const reactUnique = useId(); // assists uniqueness fallback
  const timersRef = useRef<Record<string, number>>({});
  const expiryRef = useRef<Record<string, number>>({});
  const remainingRef = useRef<Record<string, number>>({});
  const ANIMATION_MS = 250;

  const performRemoval = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setExitingIds((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
    delete timersRef.current[id];
    delete expiryRef.current[id];
    delete remainingRef.current[id];
  }, []);

  const beginDismiss = useCallback(
    (id: string) => {
      setExitingIds((prev) => {
        if (prev.has(id)) return prev;
        const n = new Set(prev);
        n.add(id);
        return n;
      });
      const existingTimer = timersRef.current[id];
      if (existingTimer) {
        window.clearTimeout(existingTimer);
        delete timersRef.current[id];
      }
      window.setTimeout(() => performRemoval(id), ANIMATION_MS);
    },
    [performRemoval]
  );

  const addAlert = useCallback(
    (alert: Omit<IPageAlert, "id"> & { id?: string }) => {
      const id =
        alert.id ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}-${reactUnique}`;
      setAlerts((prev) => [...prev, { ...alert, id }]);
      setEnteringIds((prev) => new Set(prev).add(id));
      if (alert.timeoutMs && alert.timeoutMs > 0) {
        expiryRef.current[id] = Date.now() + alert.timeoutMs;
        const handle = window.setTimeout(
          () => beginDismiss(id),
          alert.timeoutMs
        );
        timersRef.current[id] = handle;
      }
      return id;
    },
    [reactUnique, beginDismiss]
  );

  // (moved performRemoval & beginDismiss above addAlert for dependency ordering)

  const dismissAlert = useCallback(
    (id: string) => {
      beginDismiss(id);
    },
    [beginDismiss]
  );

  const dismissAll = useCallback(() => {
    alerts.forEach((a) => beginDismiss(a.id));
  }, [alerts, beginDismiss]);

  const replaceAlerts = useCallback(
    (incoming: Omit<IPageAlert, "id">[]) => {
      // Dismiss existing (animate out) then add new after animation for smoother swap
      if (alerts.length) {
        alerts.forEach((a) => beginDismiss(a.id));
        window.setTimeout(() => {
          const mapped = incoming.map((a) => ({
            ...a,
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          }));
          setAlerts(mapped);
          setEnteringIds(new Set(mapped.map((m) => m.id)));
        }, ANIMATION_MS);
      } else {
        const mapped = incoming.map((a) => ({
          ...a,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        }));
        setAlerts(mapped);
        setEnteringIds(new Set(mapped.map((m) => m.id)));
      }
    },
    [alerts, beginDismiss]
  );

  const updateAlert = useCallback(
    (id: string, patch: Partial<Omit<IPageAlert, "id">>) => {
      let updated = false;
      setAlerts((prev) =>
        prev.map((a) => {
          if (a.id !== id) return a;
          updated = true;
          const next: IPageAlert = { ...a, ...patch } as IPageAlert;
          if ("timeoutMs" in patch) {
            if (timersRef.current[id]) {
              window.clearTimeout(timersRef.current[id]);
              delete timersRef.current[id];
              delete expiryRef.current[id];
              delete remainingRef.current[id];
            }
            if (patch.timeoutMs && patch.timeoutMs > 0) {
              expiryRef.current[id] = Date.now() + patch.timeoutMs;
              const handle = window.setTimeout(
                () => beginDismiss(id),
                patch.timeoutMs
              );
              timersRef.current[id] = handle;
            }
          }
          return next;
        })
      );
      return updated;
    },
    [beginDismiss]
  );

  const pauseAlertTimer = useCallback((id: string) => {
    const t = timersRef.current[id];
    if (t) {
      window.clearTimeout(t);
      delete timersRef.current[id];
      const remaining = (expiryRef.current[id] || Date.now()) - Date.now();
      if (remaining > 0) remainingRef.current[id] = remaining;
    }
  }, []);

  const resumeAlertTimer = useCallback(
    (id: string) => {
      if (remainingRef.current[id] && !timersRef.current[id]) {
        const remaining = remainingRef.current[id];
        expiryRef.current[id] = Date.now() + remaining;
        const handle = window.setTimeout(() => beginDismiss(id), remaining);
        timersRef.current[id] = handle;
        delete remainingRef.current[id];
      }
    },
    [beginDismiss]
  );

  // Manage entering class removal next micro-task / frame
  useEffect(() => {
    if (!enteringIds.size) return;
    const handle = window.requestAnimationFrame(() => {
      setEnteringIds(new Set());
    });
    return () => window.cancelAnimationFrame(handle);
  }, [enteringIds]);

  // Cleanup timers on unmount
  useEffect(
    () => () => {
      Object.values(timersRef.current).forEach((h) => window.clearTimeout(h));
    },
    []
  );

  return (
    <PageAlertsContext.Provider
      value={{
        alerts,
        addAlert,
        dismissAlert,
        dismissAll,
        replaceAlerts,
        updateAlert,
        pauseAlertTimer,
        resumeAlertTimer,
        enteringIds,
        exitingIds,
      }}
    >
      {children}
    </PageAlertsContext.Provider>
  );
};

export const PageAlertsOutlet: React.FC = () => {
  const ctx = React.useContext(PageAlertsContext);
  if (!ctx)
    throw new Error("PageAlertsOutlet must be used within PageAlertsProvider");
  const {
    alerts,
    dismissAlert,
    enteringIds,
    exitingIds,
    pauseAlertTimer,
    resumeAlertTimer,
  } = ctx as IPageAlertsContextValue & {
    enteringIds: Set<string>;
    exitingIds: Set<string>;
  };
  // Access entering/exiting sets via closure above
  if (!alerts.length) return null;
  return (
    <div className="page-alerts" role="region" aria-label="Page notifications">
      <div className="page-alerts__inner">
        <ul className="page-alerts__list">
          {alerts.map((a) => (
            <li
              key={a.id}
              className={[
                "page-alerts__item",
                enteringIds.has(a.id) && "page-alerts__item--entering",
                exitingIds.has(a.id) && "page-alerts__item--exiting",
              ]
                .filter(Boolean)
                .join(" ")}
              onMouseEnter={() => pauseAlertTimer?.(a.id)}
              onMouseLeave={() => resumeAlertTimer?.(a.id)}
            >
              <div className="page-alerts__card-wrapper">
                <AlertCard
                  heading={a.heading}
                  messages={a.messages}
                  variant={a.variant}
                  autoFocus={a.autoFocus}
                  cardId={`page-alert-${a.id}`}
                >
                  {a.content}
                  <button
                    type="button"
                    className="page-alerts__close"
                    aria-label={`Dismiss ${a.heading} notification`}
                    onClick={() => dismissAlert(a.id)}
                  >
                    ×
                  </button>
                </AlertCard>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Builder helpers for common patterns
export const PageAlertBuilders = {
  success(
    options: Omit<Partial<IPageAlert>, "variant" | "id"> & { heading: string }
  ): Omit<IPageAlert, "id"> {
    return { variant: "success", autoFocus: true, ...options, id: "" } as Omit<
      IPageAlert,
      "id"
    >;
  },
  error(
    options: Omit<Partial<IPageAlert>, "variant" | "id"> & { heading: string }
  ): Omit<IPageAlert, "id"> {
    return { variant: "error", autoFocus: true, ...options, id: "" } as Omit<
      IPageAlert,
      "id"
    >;
  },
  info(
    options: Omit<Partial<IPageAlert>, "variant" | "id"> & { heading: string }
  ): Omit<IPageAlert, "id"> {
    return { variant: "info", ...options, id: "" } as Omit<IPageAlert, "id">;
  },
  warning(
    options: Omit<Partial<IPageAlert>, "variant" | "id"> & { heading: string }
  ): Omit<IPageAlert, "id"> {
    return { variant: "warning", ...options, id: "" } as Omit<IPageAlert, "id">;
  },
  // Common semantic templates
  saved(entity: string = "Changes"): Omit<IPageAlert, "id"> {
    return {
      heading: `${entity} saved`,
      variant: "success",
      autoFocus: true,
      timeoutMs: 4000,
    };
  },
  deleted(entity: string = "Item"): Omit<IPageAlert, "id"> {
    return {
      heading: `${entity} deleted`,
      variant: "info",
      autoFocus: true,
      timeoutMs: 4000,
    };
  },
};

export type PageAlertVariant = "success" | "info" | "warning" | "error";

export interface IPageAlert {
  id: string;
  heading: string;
  messages?: string[];
  variant?: PageAlertVariant;
  autoFocus?: boolean;
  content?: React.ReactNode;
  timeoutMs?: number; // auto-dismiss after provided milliseconds
}

interface IPageAlertsContextValue {
  alerts: IPageAlert[];
  addAlert: (alert: Omit<IPageAlert, "id"> & { id?: string }) => string;
  dismissAlert: (id: string) => void;
  dismissAll: () => void;
  replaceAlerts: (alerts: Omit<IPageAlert, "id">[]) => void;
  updateAlert: (id: string, patch: Partial<Omit<IPageAlert, "id">>) => boolean;
  pauseAlertTimer?: (id: string) => void;
  resumeAlertTimer?: (id: string) => void;
  // entering/exiting sets are injected for outlet animation (not part of public hook API contract if consuming only add/dismiss methods)
  enteringIds?: Set<string>;
  exitingIds?: Set<string>;
}
