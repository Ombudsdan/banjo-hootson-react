import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import { CityValidator } from 'validators';
import { Form } from 'components';

export default function TownOrCityInput({ id, label, initialValue, hint, placeholder }: ITownOrCityFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: CityValidator
  });
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>
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
      <Form.ValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );
}

interface ITownOrCityFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
}
