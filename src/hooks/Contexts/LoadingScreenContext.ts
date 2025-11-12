import { createContext } from 'react';

export const LoadingScreenContext = createContext<ILoadingScreenContext | undefined>(undefined);

export default LoadingScreenContext;

export interface ILoadingScreenContext {
  open: boolean;
  message?: string;
  /**
   * Show the global loading screen. Returns the id used (useful if not provided).
   * If called multiple times, the most recently set message is shown until dismissed.
   */
  setLoadingScreen: (options?: { id?: string; message?: string }) => string;
  /**
   * Dismiss the loading screen. If an id is provided, only that entry is removed.
   * If no id is provided, all active loading entries are cleared.
   */
  dismissLoadingScreen: (id?: string) => void;
}
