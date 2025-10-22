import { Outlet } from "react-router-dom";
import { NavMenu } from "../framework/NavMenu";
import { Footer } from "../framework/Footer";
import OverlayHost from "@/components/OverlayHost";

export default function DefaultLayout() {
  return (
    <div className="default-page-layout">
      <NavMenu />
      <OverlayHost />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
