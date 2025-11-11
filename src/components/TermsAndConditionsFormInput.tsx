import { useFormField } from 'hooks';
import { TermsAndConditionsValidator } from 'validators';
import { FormValidationErrors } from 'framework';

/**
 * Terms and Conditions form input with validation and inline error display.
 * Uses form context via useFormField and TermsAndConditionsValidator.
 */
export default function TermsAndConditionsFormInput({
  id,
  initialValue = false,
  isRequired
}: ITermsAndConditionsFormInput) {
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue,
    validator: TermsAndConditionsValidator,
    isRequired
  });

  return (
    <div className="form-group">
      <label className="form-group__checkbox-label">
        <input
          id={id}
          type="checkbox"
          className={`form-group__input ${showErrors ? 'error' : ''}`}
          checked={value}
          onChange={e => setValue(e.target.checked)}
          onBlur={() => setTouched(true)}
        />
        <span className={`terms-and-conditions-label ${isRequired ? 'terms-and-conditions-label--required' : ''}`}>
          I agree to the
          <button
            type="button"
            className="button button--link"
            onClick={() => window.open('/terms', '_blank', 'noopener')}>
            terms and conditions
          </button>
        </span>
      </label>
      <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );
}

/** Props for {@link TermsAndConditionsFormInput}. */
interface ITermsAndConditionsFormInput {
  id: string;
  initialValue: boolean;
  isRequired?: boolean;
}
