import { PropsWithChildren } from 'react';

export interface BackdropContextValue {
  open: boolean;
  openBackdrop: () => void;
  closeBackdrop: () => void;
  addBackdropClickListener: (cb: () => void) => void;
  removeBackdropClickListener: (cb: () => void) => void;
}

export interface IBackdropProvider extends PropsWithChildren {}
