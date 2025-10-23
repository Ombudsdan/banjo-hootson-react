import { createRequire } from 'node:module';
import type { IEnvironment } from './src/env/types';

const require = createRequire(import.meta.url);

// Load the CommonJS implementation and provide strong typing
const getEnvCjs = require('./get-env.cjs') as (env: Partial<IEnvironment>) => IEnvironment;

export type { IEnvironment };
export default getEnvCjs;
