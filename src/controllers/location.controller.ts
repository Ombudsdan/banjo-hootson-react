import { ICountry } from 'model/country.model';
import { LocationService } from 'services';

export default class LocationController {
  static async loadCountries(): Promise<ICountry[]> {
    return LocationService.getCountries();
  }
}
