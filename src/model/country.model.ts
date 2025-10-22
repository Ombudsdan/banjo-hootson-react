export type CountryCodeType = string; // ISO 3166-1 alpha-2

export interface ICountry {
  id: number;
  name: string;
  code: CountryCodeType;
  flag: string;
}
