import { PropsWithChildren } from 'react';

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

interface IDialogContainer extends PropsWithChildren {
  titleId: string;
  bodyTextId: string;
  onClose: () => void;
}
