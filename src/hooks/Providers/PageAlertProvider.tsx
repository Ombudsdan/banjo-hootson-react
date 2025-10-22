import { FC, PropsWithChildren, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageAlertContext } from 'hooks';
import { IAlertCard } from 'framework';

const PageAlertProvider: FC<PageAlertProviderProps> = ({ children }) => {
  const location = useLocation();
  const [alerts, setAlerts] = useState<IAlertCard[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());

  const reactUnique = useId(); // assists uniqueness fallback
  const timersRef = useRef<Record<string, number>>({});
  const expiryRef = useRef<Record<string, number>>({});
  const remainingRef = useRef<Record<string, number>>({});
  const ANIMATION_MS = 250;

  const performRemoval = useCallback(handlePerformRemoval, []);

  const beginDismiss = useCallback(handleBeginDismiss, [performRemoval]);

  const addAlert = useCallback(handleAddAlert, [reactUnique, beginDismiss]);

  const dismissAlert = useCallback((id: string) => beginDismiss(id), [beginDismiss]);

  const dismissAllAlerts = useCallback(handleDismissAllAlerts, []);

  const replaceAlerts = useCallback(handleReplaceAlerts, [alerts, beginDismiss]);

  const updateAlert = useCallback(handleUpdateAlert, [beginDismiss]);

  const pauseAlertTimer = useCallback(handlePauseAlertTimer, []);

  const resumeAlertTimer = useCallback(handleResumeAlertTimer, [beginDismiss]);

  useEffect(manageEnteringClassRemoval, [enteringIds]);

  useEffect(cleanupTimersOnUnmount, []);

  useEffect(dismissAlertsOnRouteChange, [location.key]);

  return (
    <PageAlertContext.Provider
      value={{
        alerts,
        addAlert,
        dismissAlert,
        dismissAllAlerts,
        replaceAlerts,
        updateAlert,
        pauseAlertTimer,
        resumeAlertTimer,
        enteringIds,
        exitingIds
      }}>
      {children}
    </PageAlertContext.Provider>
  );

  function handlePerformRemoval(id: string) {
    setAlerts(prev => prev.filter(a => a.id !== id));
    setExitingIds(prev => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
    delete timersRef.current[id];
    delete expiryRef.current[id];
    delete remainingRef.current[id];
  }

  function handleBeginDismiss(id: string) {
    setExitingIds(prev => {
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
  }

  function handleAddAlert(alert: IAlertCard) {
    let isExistingAlert = false;

    setAlerts(prev => {
      isExistingAlert = prev.some(a => a.id === alert.id);
      return isExistingAlert ? prev : [...prev, alert];
    });

    if (isExistingAlert) return alert.id;

    setEnteringIds(prev => new Set(prev).add(alert.id));

    if (alert.timeoutMs && alert.timeoutMs > 0) {
      expiryRef.current[alert.id] = Date.now() + alert.timeoutMs;
      const handle = window.setTimeout(() => beginDismiss(alert.id), alert.timeoutMs);
      timersRef.current[alert.id] = handle;
    }
    return alert.id;
  }

  /** Instantly remove all alerts (no animation) */
  function handleDismissAllAlerts() {
    setAlerts([]);
    setExitingIds(new Set());
    setEnteringIds(new Set());
    Object.values(timersRef.current).forEach(h => window.clearTimeout(h));
    timersRef.current = {};
    expiryRef.current = {};
    remainingRef.current = {};
  }

  function handleReplaceAlerts(incoming: Omit<IAlertCard, 'id'>[]) {
    // Dismiss existing (animate out) then add new after animation for smoother swap
    if (alerts.length) {
      alerts.forEach(a => beginDismiss(a.id));
      window.setTimeout(() => createAlerts(incoming), ANIMATION_MS);
    } else {
      createAlerts(incoming);
    }
  }

  function createAlerts(alerts: Omit<IAlertCard, 'id'>[]) {
    const mapped = alerts.map(a => ({
      ...a,
      // eslint-disable-next-line sonarjs/pseudo-random
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`
    }));
    setAlerts(mapped);
    setEnteringIds(new Set(mapped.map(m => m.id)));
  }

  function handleUpdateAlert(id: string, patch: Partial<Omit<IAlertCard, 'id'>>) {
    let updated = false;
    setAlerts(prev =>
      prev.map(a => {
        if (a.id !== id) return a;

        updated = true;
        const next: IAlertCard = { ...a, ...patch } as IAlertCard;
        const hasTimeoutChanged = 'timeoutMs' in patch;

        if (hasTimeoutChanged && timersRef.current[id]) clearTimers(id);
        if (hasTimeoutChanged && patch.timeoutMs && patch.timeoutMs > 0) updateTimers(id, patch.timeoutMs);

        return next;
      })
    );
    return updated;
  }

  function handlePauseAlertTimer(id: string) {
    const t = timersRef.current[id];
    if (t) {
      window.clearTimeout(t);
      delete timersRef.current[id];
      const remaining = (expiryRef.current[id] || Date.now()) - Date.now();
      if (remaining > 0) remainingRef.current[id] = remaining;
    }
  }

  function handleResumeAlertTimer(id: string) {
    if (remainingRef.current[id] && !timersRef.current[id]) {
      const remaining = remainingRef.current[id];
      expiryRef.current[id] = Date.now() + remaining;
      const handle = window.setTimeout(() => beginDismiss(id), remaining);
      timersRef.current[id] = handle;
      delete remainingRef.current[id];
    }
  }

  function clearTimers(id: string) {
    window.clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    delete expiryRef.current[id];
    delete remainingRef.current[id];
  }

  function updateTimers(id: string, timeoutMs: number) {
    expiryRef.current[id] = Date.now() + timeoutMs;
    const handle = window.setTimeout(() => beginDismiss(id), timeoutMs);
    timersRef.current[id] = handle;
  }

  function manageEnteringClassRemoval() {
    if (!enteringIds.size) return;
    const handle = window.requestAnimationFrame(() => {
      setEnteringIds(new Set());
    });
    return () => window.cancelAnimationFrame(handle);
  }

  function cleanupTimersOnUnmount() {
    return () => Object.values(timersRef.current).forEach(h => window.clearTimeout(h));
  }

  function dismissAlertsOnRouteChange() {
    if (alerts.length) {
      dismissAllAlerts();
    }
  }
};

export default PageAlertProvider;

type PageAlertProviderProps = PropsWithChildren;
