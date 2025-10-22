import { PropsWithChildren } from 'react';

export default function DialogTitle({ id, title, children }: IDialogTitle) {
  return (
    <h1 id={id} className="dialog__title">
      {title}
      {children}
    </h1>
  );
}

interface IDialogTitle extends PropsWithChildren {
  id: string;
  title: string;
}
