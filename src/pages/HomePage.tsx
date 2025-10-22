import { useEffect, useState } from "react";
import { HealthController } from "@/controllers/health.controller";

export default function HomePage() {
  const [status, setStatus] = useState<string>("Checking...");
  useEffect(() => {
    HealthController.ping()
      .then((r) => setStatus(JSON.stringify(r)))
      .catch((e) => setStatus(`Failed: ${String(e)}`));
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h1>Home</h1>
      <p>Health: {status}</p>
    </div>
  );
}
