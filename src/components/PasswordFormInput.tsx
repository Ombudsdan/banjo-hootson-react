import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { FormValidationErrors } from 'framework';
import { PasswordValidator } from 'validators';

/**
 * Password input with validation and inline error display.
 * Uses form context via useFormField and PasswordValidator.
 */
export default function PasswordFormInput({
  id,
  initialValue,
  label,
  hint,
  placeholder,
  isRequired
}: IPasswordFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: PasswordValidator,
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

/** Props for {@link PasswordFormInput}. */
interface IPasswordFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
  isRequired?: boolean;
}
