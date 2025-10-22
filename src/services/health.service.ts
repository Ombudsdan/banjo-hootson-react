import { HttpClient } from "services/http-client";

export interface IHealthResponse {
  status: string;
}

export class HealthService {
  static ping() {
    return HttpClient.request<IHealthResponse>({ path: "/health" });
  }
}
