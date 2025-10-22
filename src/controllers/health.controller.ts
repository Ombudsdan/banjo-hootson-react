import { HealthService } from "services";

export default class HealthController {
  static async ping() {
    return HealthService.ping();
  }
}
