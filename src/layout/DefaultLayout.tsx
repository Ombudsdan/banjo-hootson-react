import { Outlet, useLocation, useNavigation, useRevalidator } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthController, HealthController } from 'controllers';
import { NavMenu, ScrollToTop, Footer } from 'framework';
import { reportAppError } from 'framework/ErrorBoundary';
import {
  DialogOutlet,
  PageAlertOutlet,
  PageContainerOutlet,
  PageHeadingOutlet,
  LoadingScreenOutlet,
  BackdropOutlet,
  PageValidationAlertOutlet,
  FormDialogOutlet,
  useLoadingScreen
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

  // Note: Route change dismissal is handled within providers via RouteChangeLoadingReset below

  return (
    <LayoutProviders>
      <AuthRevalidateOnTokenChange />
      <RouteChangeLoadingReset />
      <NavMenu />
      <ScrollToTop />
      <LoadingScreenOutlet />
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

function RouteChangeLoadingReset() {
  const location = useLocation();
  const navigation = useNavigation();
  const { dismissLoadingScreen, setLoadingScreen } = useLoadingScreen();
  useEffect(() => {
    dismissLoadingScreen();
  }, [location.key, dismissLoadingScreen]);

  // Show a global loading overlay during router-driven navigations (including loader fetches)
  useEffect(() => {
    const isLoading = navigation.state === 'loading';
    if (isLoading) setLoadingScreen({ id: 'route-loading', message: 'Loading page' });
    else dismissLoadingScreen('route-loading');
  }, [navigation.state, setLoadingScreen, dismissLoadingScreen]);
  return null;
}

function AuthRevalidateOnTokenChange() {
  const revalidator = useRevalidator();
  useEffect(() => {
    const unsub = AuthController.onAuthTokenChange(() => {
      // Re-run loaders so authLoader can redirect or pages can refresh data
      try {
        revalidator.revalidate();
      } catch {
        // ignore
      }
    });
    return () => unsub();
  }, [revalidator]);
  return null;
}
