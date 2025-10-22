import { InputHTMLAttributes } from 'react';
import { useFormField } from 'hooks';
import FormValidationErrors from '../FormValidationErrors';
import { EmailAddressValidator } from 'validators';

export default function EmailAddressFormInput({
  id,
  initialValue,
  label,
  hint,
  placeholder,
  isReadonly
}: IEmailAddressFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: EmailAddressValidator
  });

  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={isReadonly ? undefined : id}>
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

interface IEmailAddressFormInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
  isReadonly?: boolean;
}
