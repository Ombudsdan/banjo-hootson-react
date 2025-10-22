import { PropsWithChildren } from "react";

export default function FormActionsContainer({
  children,
}: IFormActionsContainer) {
  return <div className="form-actions-container">{children}</div>;
}

interface IFormActionsContainer extends PropsWithChildren {}
