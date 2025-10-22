import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/app.routes";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";

// Bootstrap non-UI wiring
AuthController.initialize();
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
