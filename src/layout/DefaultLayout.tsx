import { Outlet } from 'react-router-dom';
import { NavMenu, ScrollToTop, Footer } from 'framework';
import { DialogOutlet, LayoutProviders, PageAlertOutlet, PageContainerOutlet, PageHeadingOutlet } from 'layout';
import { BackdropOutlet } from 'layout/Backdrop';
import { PageValidationAlertOutlet } from './PageValidationAlert';

export default function DefaultLayout() {
  return (
    <LayoutProviders>
      <NavMenu />
      <ScrollToTop />
      <BackdropOutlet />
      <DialogOutlet />
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
