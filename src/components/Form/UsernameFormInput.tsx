import { useFormField } from 'hooks';
import { InstagramAccountValidator } from 'validators';
import { IBaseInstagramInput, InstagramInputGroup } from 'framework';
import { Form } from 'components';

/**
 * Instagram username input with validation. Uses a prefixed input group and shows inline errors.
 */
export default function UsernameFormInput({
  id,
  label,
  initialValue = '',
  hint,
  placeholder = 'Username'
}: IUsernameFormInput) {
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

/** Props for {@link UsernameFormInput}. */
interface IUsernameFormInput extends IBaseInstagramInput {
  label: string;
  hint?: string;
}
