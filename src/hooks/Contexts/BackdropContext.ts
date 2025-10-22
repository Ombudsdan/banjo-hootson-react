import { createContext } from 'react';

export const BackdropContext = createContext<IBackdropContext | undefined>(undefined);

export default BackdropContext;

export interface IBackdropContext {
  open: boolean;
  openBackdrop: () => void;
  closeBackdrop: () => void;
  addBackdropClickListener: (cb: () => void) => void;
  removeBackdropClickListener: (cb: () => void) => void;
}
