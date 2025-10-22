import { Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { AuthController, HealthController } from "controllers";

import "./styles/index.scss";

// Bootstrap non-UI wiring
AuthController.init();
HealthController.ping()
  .then((r) => console.info("[health]", r))
  .catch((e) => console.warn("[health] failed", e));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);

// Mark body as loaded after initial paint to trigger CSS fade-in
requestAnimationFrame(() => document.body.classList.add("loaded"));
