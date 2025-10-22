export default function DialogBodyText({ id, text, children }: IDialogBodyText) {
  return (
    <p id={id} className="dialog__body-text">
      {text}
      {children}
    </p>
  );
}

interface IDialogBodyText {
  id: string;
  text: string;
  children?: string;
}
