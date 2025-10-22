import { useFormField } from 'hooks';
import { PlushieInstagramAccountValidator } from 'validators';
import { IBaseInstagramInput, InstagramInputGroup } from 'framework';
import { IPlushieInstagramAccount } from 'model/user.model';
import { Form } from 'components';

export default function PlushieInstagramAccountFormInput({
  id,
  label,
  initialValue = '',
  hint,
  placeholder = 'Plushie Instagram Account',
  existingAccounts
}: IPlushieInstagramAccountFormInput) {
  const { validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: PlushieInstagramAccountValidator,
    args: getArgs()
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
        validator={PlushieInstagramAccountValidator}
        args={getArgs()}
        placeholder={placeholder}
      />
      <Form.ValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );

  function getArgs(): { existingAccounts: string[]; originalValue: string } {
    return {
      existingAccounts: existingAccounts?.map(a => a.username) || [],
      originalValue: initialValue
    };
  }
}

interface IPlushieInstagramAccountFormInput extends IBaseInstagramInput {
  label: string;
  hint?: string;
  existingAccounts: IPlushieInstagramAccount[];
}
