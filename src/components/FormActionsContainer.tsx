type Props = { children?: React.ReactNode };

export default function FormActionsContainer({ children }: Props) {
  return <div className="form-actions-container">{children}</div>;
}
