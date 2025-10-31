export interface IEnv {
  API_URL: string;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_APP_ID: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
}

declare const __ENV__: IEnv;

const buildEnv: Partial<IEnv> =
  typeof __ENV__ !== 'undefined' ? (__ENV__ as IEnv) : ({} as Partial<IEnv>);

export const env: IEnv = {
  API_URL: buildEnv.API_URL ?? '',
  FIREBASE_API_KEY: buildEnv.FIREBASE_API_KEY ?? '',
  FIREBASE_AUTH_DOMAIN: buildEnv.FIREBASE_AUTH_DOMAIN ?? '',
  FIREBASE_PROJECT_ID: buildEnv.FIREBASE_PROJECT_ID ?? '',
  FIREBASE_APP_ID: buildEnv.FIREBASE_APP_ID ?? '',
  FIREBASE_MESSAGING_SENDER_ID: buildEnv.FIREBASE_MESSAGING_SENDER_ID ?? ''
};
