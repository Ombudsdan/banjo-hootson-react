import { HttpClient } from "services/http-client";
import { ICountry } from "model/location.types";

export class LocationService {
  static getCountries() {
    return HttpClient.request<ICountry[]>({ path: "/location/countries" });
  }
}
