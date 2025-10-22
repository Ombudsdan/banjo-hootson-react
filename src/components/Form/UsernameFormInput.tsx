import { useFormField } from 'hooks';
import { InstagramAccountValidator } from 'validators';
import { IBaseInstagramInput, InstagramInputGroup } from 'framework';
import { Form } from 'components';

export default function UsernameFormInput({
  id,
  label,
  initialValue = '',
  hint,
  placeholder = 'Username'
}: IUsernameInput) {
  const { validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: InstagramAccountValidator
  });

  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>
        {label}
      </label>
      {hint && <div className="form-group__hint">{hint}</div>}
      <InstagramInputGroup
        id={id}
        initialValue={initialValue}
        validator={InstagramAccountValidator}
        placeholder={placeholder}
      />
      <Form.ValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );
}

interface IUsernameInput extends IBaseInstagramInput {
  label: string;
  hint?: string;
}
