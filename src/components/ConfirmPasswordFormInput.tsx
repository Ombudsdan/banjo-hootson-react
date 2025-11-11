import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { FormValidationErrors } from 'framework';
import { ConfirmPasswordValidator } from 'validators';

/**
 * Confirm Password input with validation and inline error display.
 * Uses form context via useFormField and ConfirmPasswordValidator.
 */
export default function ConfirmPasswordFormInput({
  id,
  initialValue,
  label,
  hint,
  placeholder,
  passwordId,
  isRequired
}: IConfirmPasswordFormInput) {
  const passwordField = useFormField({ id: passwordId, initialValue: '' });
  const passwordValue = (passwordField.value as string) ?? '';
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: ConfirmPasswordValidator,
    // Look up the current value of the password field for validation
    args: { password: passwordValue },
    isRequired
  });

  return (
    <div className="form-group">
      <label className={`form-group__label ${isRequired ? 'form-group__label--required' : ''}`} htmlFor={id}>
        {label}
      </label>
      {hint && <div className="form-group__hint">{hint}</div>}
      <input
        id={id}
        type="password"
        className={`form-group__input ${showErrors ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );
}

/** Props for {@link ConfirmPasswordFormInput}. */
interface IConfirmPasswordFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  /** The ID of the password field to compare against for validation. */
  passwordId: string;
  initialValue: string;
  label: string;
  hint?: string;
  isRequired?: boolean;
}
