import { useEffect, useState } from 'react';
import { LocationController } from 'controllers';
import { useFormField } from 'hooks';
import { FormValidationErrors } from 'framework';
import { ICountry } from 'model/country.model';

/**
 * Country selector bound to the form state. Populates countries via LocationController.
 */
export default function CountryFormInput({ id, label, initialValue, hint }: ICountryFormInput) {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { value, setValue, setTouched, validation, showErrors } = useFormField({
    id,
    initialValue
  });

  useEffect(loadCountries, []);

  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={id}>
        {label}
      </label>
      {hint && <div className="form-group__hint">{hint}</div>}
      <select id={id} value={value} onChange={e => setValue(e.target.value)} onBlur={() => setTouched(true)}>
        <option value="">Select your country</option>
        {countries.map(c => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
  <FormValidationErrors showErrors={showErrors} validation={validation} />
    </div>
  );

  function loadCountries() {
    LocationController.loadCountries().then(setCountries);
  }
}

/** Props for {@link CountryFormInput}. */
interface ICountryFormInput {
  id: string;
  initialValue: string;
  label: string;
  hint?: string;
}
