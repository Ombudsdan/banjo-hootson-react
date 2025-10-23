import type { IEnvironment } from './types';

declare const __ENV__: IEnvironment;

export const env: IEnvironment = __ENV__;
