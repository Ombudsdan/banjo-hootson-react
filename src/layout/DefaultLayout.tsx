import { Outlet } from "react-router-dom";
import { NavMenu } from "../framework/NavMenu";
import { ScrollToTop } from "../framework/ScrollToTop";
import { Footer } from "../framework/Footer";
import OverlayHost from "@/components/OverlayHost";
import { HeadingProvider, HeadingOutlet } from "@/services/heading.service";
import {
  ValidationAlertProvider,
  ValidationAlertOutlet,
} from "@/services/validation-alert.service";
import {
  PageAlertsProvider,
  PageAlertsOutlet,
} from "@/services/page-alerts.service";

export default function DefaultLayout() {
  return (
    <HeadingProvider>
      <ValidationAlertProvider>
        <PageAlertsProvider>
          <div className="default-page-layout">
            <NavMenu />
            <ScrollToTop />
            <OverlayHost />
            <HeadingOutlet />
            <ValidationAlertOutlet />
            <PageAlertsOutlet />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </PageAlertsProvider>
      </ValidationAlertProvider>
    </HeadingProvider>
  );
}
