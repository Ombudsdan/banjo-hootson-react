import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";

// Bootstrap non-UI wiring
AuthController.initialize();
HealthController.ping()
  .then((r) => console.info("[health]", r))
  .catch((e) => console.warn("[health] failed", e));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
