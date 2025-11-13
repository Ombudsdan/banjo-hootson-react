import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { PlushieBirthDateValidator } from 'validators';
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
    validator: PlushieBirthDateValidator,
    isRequired
  });
  return (
    <div className="form-group">
      <label className={`form-group__label ${isRequired ? 'form-group__label--required' : ''}`} htmlFor={id}>
        {label ?? 'Plushie Birth Date'}
      </label>
      {hint && <div className="form-group__hint">{hint}</div>}
      <div className="form-row">
        <input
          id={id}
          type="date"
          className={`form-group__input ${showErrors ? 'error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <button
          type="button"
          className="form__button form__button--secondary form__button--inline form__button--today"
          onClick={setToday}>
          Today
        </button>
      </div>
      <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );

  function setToday() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setValue(`${yyyy}-${mm}-${dd}`);
  }
}

/** Props for {@link PlushieNameFormInput}. */
interface IPlushieNameFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
  isRequired?: boolean;
}
