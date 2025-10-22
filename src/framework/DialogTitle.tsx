import { PropsWithChildren } from 'react';

/**
 * Dialog title heading, linked to the dialog via `id` for accessibility.
 */
export default function DialogTitle({ id, title, children }: IDialogTitle) {
  return (
    <h1 id={id} className="dialog__title">
      {title}
      {children}
    </h1>
  );
}

/** Props for {@link DialogTitle}. */
interface IDialogTitle extends PropsWithChildren {
  id: string;
  title: string;
}
