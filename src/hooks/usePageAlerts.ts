/**
 * usePageAlerts
 * Accessor for stacked page alerts context (add/update/dismiss logic).
 * Use for transient notification UX; validation errors use validation alert context instead.
 */
import { useContext } from 'react';
import { PageAlertContext } from 'hooks';

export default function usePageAlerts() {
  const context = useContext(PageAlertContext);
  if (!context) {
    throw new Error('usePageAlerts must be used within PageAlertsProvider');
  }
  return context;
}
