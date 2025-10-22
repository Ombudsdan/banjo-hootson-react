import { LocationService } from "services/location.service";
import { ICountry } from "model/location.types";

export class LocationController {
  static async loadCountries(): Promise<ICountry[]> {
    return LocationService.getCountries();
  }
}
