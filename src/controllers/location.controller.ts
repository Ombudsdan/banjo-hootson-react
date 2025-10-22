import { ICountry } from "model/location";
import { LocationService } from "services";

export default class LocationController {
  static async loadCountries(): Promise<ICountry[]> {
    return LocationService.getCountries();
  }
}
