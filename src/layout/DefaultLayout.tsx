import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthController, HealthController } from 'controllers';
import { NavMenu, ScrollToTop, Footer } from 'framework';
import { reportAppError } from 'framework/ErrorBoundary';
import {
  DialogOutlet,
  PageAlertOutlet,
  PageContainerOutlet,
  PageHeadingOutlet,
  BackdropOutlet,
  PageValidationAlertOutlet,
  FormDialogOutlet
} from 'hooks';
import LayoutProviders from './LayoutProviders';

export default function DefaultLayout() {
  // Defer bootstrap until after React mounts so errors surface via unhandledrejection/window.error
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await AuthController.init();
      } catch (e) {
        if (!cancelled) reportError(e, 'AuthController.init');
      }

      try {
        await HealthController.ping();
      } catch (e) {
        if (!cancelled) reportError(e, 'HealthController.ping');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <LayoutProviders>
      <NavMenu />
      <ScrollToTop />
      <BackdropOutlet />
      <DialogOutlet />
      <FormDialogOutlet />
      <PageHeadingOutlet />
      <PageValidationAlertOutlet />
      <PageAlertOutlet />
      <PageContainerOutlet>
        <main>
          <Outlet />
        </main>
      </PageContainerOutlet>
      <Footer />
    </LayoutProviders>
  );

  function reportError(error: unknown, context: string) {
    const err = error instanceof Error ? error : new Error(String(error));
    const withContext = err as Error & { context?: string };
    withContext.context = context;
    reportAppError(withContext);
  }
}
