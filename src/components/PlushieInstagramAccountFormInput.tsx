import { useFormField } from 'hooks';
import { PlushieInstagramAccountValidator } from 'validators';
import { IPlushieInstagramAccount } from 'model/user.model';
import { FormValidationErrors } from 'framework';
import { IBaseInstagramInput, InstagramFormInput } from 'components';

/**
 * Single plushie Instagram account input with duplicate checking against an existing list.
 * Pass `existingAccounts` to enable uniqueness validation.
 */
export default function PlushieInstagramAccountFormInput({
  id,
  label,
  initialValue = '',
  hint,
  placeholder = 'Plushie Instagram Account',
  existingAccounts,
  isRequired
}: IPlushieInstagramAccountFormInput) {
  const { validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: PlushieInstagramAccountValidator,
    args: getArgs(),
    isRequired
  });

  return (
    <div className="form-group">
      <label className={`form-group__label ${isRequired ? 'form-group__label--required' : ''}`} htmlFor={id}>
        {label}
      </label>
      {hint && <div className="form-group__hint">{hint}</div>}
      <InstagramFormInput
        id={id}
        initialValue={initialValue}
        validator={PlushieInstagramAccountValidator}
        args={getArgs()}
        placeholder={placeholder}
      />
      <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );

  function getArgs(): { existingAccounts: string[]; originalValue: string } {
    return {
      existingAccounts: existingAccounts?.map(a => a.username) || [],
      originalValue: initialValue
    };
  }
}

/** Props for {@link PlushieInstagramAccountFormInput}. */
interface IPlushieInstagramAccountFormInput extends IBaseInstagramInput {
  label: string;
  hint?: string;
  existingAccounts: IPlushieInstagramAccount[];
}
