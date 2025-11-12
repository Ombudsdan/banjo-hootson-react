import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { PlushieNameValidator } from 'validators';
import { FormValidationErrors } from 'framework';

/**
 * Text input for plushie name with validation and inline error display.
 */
export default function PlushieNameFormInput({
  id,
  label,
  initialValue,
  hint,
  placeholder,
  isRequired
}: IPlushieNameFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: PlushieNameValidator,
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
        type="text"
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

/** Props for {@link PlushieNameFormInput}. */
interface IPlushieNameFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
  isRequired?: boolean;
}
