/**
 * Paragraph body text for dialogs. Associates the text with the dialog via `id` for a11y.
 */
export default function DialogBodyText({ id, text, children }: IDialogBodyText) {
  return (
    <p id={id} className="dialog__body-text">
      {text}
      {children}
    </p>
  );
}

/** Props for {@link DialogBodyText}. */
interface IDialogBodyText {
  id: string;
  text: string;
  children?: string;
}
