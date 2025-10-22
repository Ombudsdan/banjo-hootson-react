import { IValidation } from 'validators';

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

export interface IFormValidationErrors {
  showErrors: boolean;
  validation: IValidation;
}
