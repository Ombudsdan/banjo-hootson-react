/**
 * LocationService
 * Provides geo / location reference data lookups (e.g., countries list).
 * Intentionally read-only; transformations happen in controllers if needed.
 */
import { ICountry } from "model/location";
import { HttpClientService } from "services";

export default class LocationService {
  static getCountries() {
    return HttpClientService.request<ICountry[]>({
      path: "/location/countries",
    });
  }
}
