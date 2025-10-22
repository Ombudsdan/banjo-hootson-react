import { IValidation } from 'validators';

/**
 * Renders a list of inline validation error messages for a field when `showErrors` is true.
 */
export default function FormValidationErrors({ showErrors, validation }: IFormValidationErrors) {
  if (!validation.errors || !showErrors) return null;

  return (
    <div className="form-group__error-message">
      {validation.errorMessages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}

/** Props for {@link FormValidationErrors} */
export interface IFormValidationErrors {
  showErrors: boolean;
  validation: IValidation;
}
