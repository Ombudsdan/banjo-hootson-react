/**
 * HealthService
 * Minimal service for API liveness checks. Returns backend health status.
 * Future: enrich with backend version / dependency indicators without bloating callers.
 */
import { HttpClientService } from "services";

export default class HealthService {
  static ping() {
    return HttpClientService.request<IHealthResponse>({ path: "/health" });
  }
}

export interface IHealthResponse {
  status: string;
}
