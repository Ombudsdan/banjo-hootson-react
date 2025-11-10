export interface IEnvironment {
  API_URL: string;
  GOOGLE_ADSENSE_PUBLISHER_ID: string;
  GOOGLE_ADSENSE_TEST_SLOT: string;
  PORT: number;
  NODE_ENV?: 'development' | 'production' | 'test';
}
