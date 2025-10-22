import { PropsWithChildren } from 'react';

/**
 * Layout wrapper for grouping form action buttons.
 */
export default function FormActionsContainer({ children }: IFormActionsContainer) {
  return <div className="form-actions-container">{children}</div>;
}

/** Props for {@link FormActionsContainer}. */
interface IFormActionsContainer extends PropsWithChildren {}
