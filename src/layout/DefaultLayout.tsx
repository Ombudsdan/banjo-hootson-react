import { Outlet } from "react-router-dom";
import { NavMenu, ScrollToTop, Footer } from "framework";
import { OverlayHost } from "components";
import {
  LayoutProviders,
  PageAlertOutlet,
  PageContainerOutlet,
  PageHeadingOutlet,
} from "layout";
import { PageValidationAlertOutlet } from "./PageValidationAlert";

export default function DefaultLayout() {
  return (
    <LayoutProviders>
      <NavMenu />
      <ScrollToTop />
      <OverlayHost />

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
