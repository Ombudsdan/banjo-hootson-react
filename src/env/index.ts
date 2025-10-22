export interface IEnv {
  API_URL: string;
}

declare const __ENV__: IEnv;

export const env: IEnv = {
  API_URL: __ENV__.API_URL,
};
