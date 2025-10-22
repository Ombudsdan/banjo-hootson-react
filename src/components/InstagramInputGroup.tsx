import { useFormField, UseFormFieldArgsRecord } from 'hooks';
import { InputHTMLAttributes } from 'react';
import { BaseValidator } from 'validators';

export default function InstagramInputGroup({ id, initialValue, validator, placeholder, args }: IInstagramInputGroup) {
  const { value, setValue, setTouched, showErrors } = useFormField({ id, initialValue, validator, args });
  return (
    <div className="instagram-input-group">
      <span className="instagram-input-group__prefix"></span>
      <input
        id={id}
        type="text"
        className={`instagram-input-group__input ${showErrors ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value.replace(/^@+/, ''))}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
}

export interface IBaseInstagramInput extends Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  id: string;
  initialValue: string;
}

interface IInstagramInputGroup extends IBaseInstagramInput {
  validator: typeof BaseValidator;
  args?: UseFormFieldArgsRecord;
}
