import { PropsWithChildren } from 'react';

/**
 * Layout wrapper for grouping form action buttons.
 */
export default function FormActionsContainer({ children }: FormActionsContainerProps) {
  return <div className="form-actions-container">{children}</div>;
}

/** Props for {@link FormActionsContainer}. */
type FormActionsContainerProps = PropsWithChildren;
