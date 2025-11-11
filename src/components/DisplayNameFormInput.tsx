import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { DisplayNameValidator } from 'validators';
import { FormValidationErrors } from 'framework';

/**
 * Display name input with validation and inline error display.
 * Uses form context via useFormField and DisplayNameValidator.
 */
export default function DisplayNameFormInput({
  id,
  initialValue,
  label,
  hint,
  placeholder,
  isReadonly,
  isRequired
}: IDisplayNameFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: DisplayNameValidator,
    isRequired
  });

  return (
    <div className="form-group">
      <label
        className={`form-group__label ${isRequired ? 'form-group__label--required' : ''}`}
        htmlFor={isReadonly ? undefined : id}>
        {label}
      </label>
      {isReadonly && <p>{value}</p>}
      {!isReadonly && (
        <>
          {hint && <div className="form-group__hint">{hint}</div>}
          <input
            id={id}
            type="text"
            className={`form-group__input ${showErrors ? 'error' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <FormValidationErrors showErrors={showErrors} validation={validation} />
        </>
      )}
    </div>
  );
}

/** Props for {@link DisplayNameFormInput}. */
interface IDisplayNameFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
  isReadonly?: boolean;
  isRequired?: boolean;
}
