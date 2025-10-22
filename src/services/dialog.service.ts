import { DialogConfirm, IDialog } from "model/dialog";

/**
 * DialogService
 * Manages a single active application modal dialog (imperative focus trap + resolve semantics).
 * Features:
 *  - Subscribe pattern for UI layer rendering
 *  - Focus management & inert background while open
 *  - Promise-based open() returning boolean (confirm/cancel)
 * Not responsible for stacking multiple dialogs – intentionally single-instance.
 */
class DialogServiceImpl {
  private active: IActiveDialog | null = null;
  private listeners: Set<Listener> = new Set();
  private previouslyFocusedEl: HTMLElement | null = null;

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.active);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getActive() {
    return this.active;
  }

  async open(config: IDialogConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.setInert(true);
      this.previouslyFocusedEl =
        (document.activeElement as HTMLElement) || null;
      this.active = {
        confirmText: "Confirm",
        cancelText: "Cancel",
        confirmType: DialogConfirm.PRIMARY,
        disableBackdropClose: false,
        ...config,
        resolver: resolve,
      };
      this.emit();

      requestAnimationFrame(() => {
        this.focusDialog();
      });
    });
  }

  confirm() {
    if (!this.active) return;
    this.active.resolver(true);
    this.finish();
  }

  cancel() {
    if (!this.active) return;
    this.active.resolver(false);
    this.finish();
  }

  private finish() {
    this.active = null;
    this.emit();
    this.setInert(false);
    this.restoreFocus();
  }

  private emit() {
    this.listeners.forEach((l) => l(this.active));
  }

  private setInert(active: boolean) {
    const targets: (HTMLElement | null)[] = [
      document.querySelector("main") as HTMLElement,
      document.querySelector("footer") as HTMLElement,
      document.querySelector(".navmenu") as HTMLElement,
    ];
    targets.forEach((el) => {
      if (!el) return;
      if (active) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  private focusDialog() {
    const dialogRoot = document.querySelector(
      "[data-dialog-root]"
    ) as HTMLElement | null;
    if (!dialogRoot) return;
    const focusable = dialogRoot.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0].focus();
      return;
    }
    dialogRoot.setAttribute("tabindex", "-1");
    dialogRoot.focus();
  }

  private restoreFocus() {
    if (
      this.previouslyFocusedEl &&
      document.contains(this.previouslyFocusedEl)
    ) {
      this.previouslyFocusedEl.focus();
    }
    this.previouslyFocusedEl = null;
  }
}

export const DialogService = new DialogServiceImpl();

export default DialogService;

export interface IDialogConfig {
  title: IDialog["title"];
  message: IDialog["message"];
  confirmText?: IDialog["confirmText"];
  cancelText?: IDialog["cancelText"];
  confirmType?: IDialog["confirmType"];
  disableBackdropClose?: boolean;
}

export interface IActiveDialog extends IDialogConfig {
  resolver: (value: boolean) => void;
}

type Listener = (active: IActiveDialog | null) => void;
