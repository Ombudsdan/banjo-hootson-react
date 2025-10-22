import { PropsWithChildren } from 'react';

/**
 * Dialog container with role and keyboard handling. Stops backdrop click propagation
 * and closes on Escape via the provided `onClose` callback.
 */
export default function DialogContainer({ children, onClose, titleId, bodyTextId }: IDialogContainer) {
  return (
    <div className="dialog-container">
      <div
        className="dialog"
        role="dialog"
        aria-labelledby={titleId}
        aria-describedby={bodyTextId}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => {
          if (e.key === 'Escape') onClose();
        }}
        data-dialog-root
      >
        {children}
      </div>
    </div>
  );
}

/** Props for {@link DialogContainer}. */
interface IDialogContainer extends PropsWithChildren {
  titleId: string;
  bodyTextId: string;
  onClose: () => void;
}
