import { HealthService } from "services/health.service";

export class HealthController {
  static async ping() {
    return HealthService.ping();
  }
}
