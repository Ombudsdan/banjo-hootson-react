import { Outlet } from 'react-router-dom';
import { NavMenu, ScrollToTop, Footer } from 'framework';
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
}
