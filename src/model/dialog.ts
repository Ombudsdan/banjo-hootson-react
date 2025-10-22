import { PropsWithChildren } from "react";
import { createEnum, ValueOf } from "utils";

export const DialogConfirm = createEnum({
  PRIMARY: "primary",
  DANGER: "danger",
});

export type DialogConfirmType = ValueOf<typeof DialogConfirm>;

export interface IDialog extends PropsWithChildren {
  title?: string;
  message?: string;
  confirmType?: DialogConfirmType;
  confirmText?: string;
  confirmLoadingText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
