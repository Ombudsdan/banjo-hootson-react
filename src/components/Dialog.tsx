import { IDialog } from "model/dialog";

export default function Dialog({
  title,
  message,
  confirmType = "primary",
  confirmText = "Confirm",
  confirmLoadingText = "Confirming...",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onClose,
  children,
}: IDialog) {
  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-dialog="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-body-text"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        data-dialog-root
      >
        {title && (
          <h1 id="dialog-title" className="dialog__title">
            {title}
          </h1>
        )}
        {message && (
          <p id="dialog-body-text" className="dialog__body-text">
            {message}
          </p>
        )}
        {children}
        <div className="dialog__action-buttons">
          <button
            type="button"
            className={`button button--${confirmType}`}
            onClick={onConfirm}
            autoFocus
          >
            {isLoading ? confirmLoadingText : confirmText}
          </button>
          <button
            type="button"
            className="button button--tertiary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
