import { FormEvent, useEffect, useState } from 'react';
import { PageSectionContainer, PageContentContainer, FormSectionHeader, FormActionsContainer } from 'framework';
import { UserController, LocationController } from 'controllers';
import { Validation, runValidators, firstErrorMessage } from 'utils';
import { ICountry } from 'model/country.model';
import { IUser } from 'model/user.model';

export default function ProfileTabSection() {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [instagram, setInstagram] = useState('');
  const [touched, setTouched] = useState<{
    city: boolean;
    country: boolean;
    instagram: boolean;
  }>({ city: false, country: false, instagram: false });
  const [submitted, setSubmitted] = useState(false);

  // Validators (city optional max length / simple pattern allowing letters, spaces and hyphens; instagram username reuse username pattern rules minus leading @ enforcement handled separately)
  const cityErrors = runValidators(city, [Validation.maxLength(80)]);
  // Instagram: allow optional; if present apply validFirstChar + validRemainingChars
  const instagramErrors = instagram
    ? runValidators(instagram, [Validation.validFirstChar, Validation.validRemainingChars])
    : null;

  const showErrors = (field: keyof typeof touched) => touched[field] || submitted;
  const cityErrorText = showErrors('city')
    ? firstErrorMessage(cityErrors, {
        maxlength: 'Town or City cannot exceed 80 characters'
      })
    : '';
  const instagramErrorText = showErrors('instagram')
    ? firstErrorMessage(instagramErrors, {
        invalidFirstChar: 'Username must start with either a letter, number, @, underscore, dot or hyphen',
        invalidRemainingChars:
          'Username must only contain letters, numbers, underscores, periods, hyphens and @ (as long as it is at the start)'
      })
    : '';

  const formValid = !cityErrors && !instagramErrors;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ city: true, country: true, instagram: true });
    if (!formValid) return;
    // TODO: hook up save call when API ready
  };

  useEffect(() => {
    UserController.me().then(setProfile);
    LocationController.loadCountries().then(setCountries);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <PageContentContainer spacing="medium">
        {/* Alerts placeholder */}
        {/* <ProfilePageAlert errorMessages={[]} successMessage={null} /> */}

        <PageSectionContainer>
          {/* Personal Information */}
          <FormSectionHeader title="Personal Information" />

          <div className="form-group">
            <label className="form-group__label form-group__label--required">Email Address</label>
            <p>{profile?.email || ''}</p>
          </div>

          <div className="form-group">
            <label className="form-group__label">Town or City</label>
            <div className="form-group__hint">For example: Sheffield</div>
            <input
              type="text"
              className={`form-group__input ${cityErrorText ? 'error' : ''}`}
              placeholder="Town or City"
              value={city}
              onChange={e => setCity(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, city: true }))}
            />
            {cityErrorText && <div className="form-group__error-message">{cityErrorText}</div>}
          </div>

          <div className="form-group">
            <label className="form-group__label">Country</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, country: true }))}
            >
              <option value="">Select your country</option>
              {countries.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-group__label">Your Instagram Account</label>
            <div className="form-group__hint">Your human Instagram account</div>
            <div className="instagram-input-group">
              <span className="instagram-input-group__prefix"></span>
              <input
                type="text"
                className={`instagram-input-group__input ${instagramErrorText ? 'error' : ''}`}
                placeholder="my_human_username"
                value={instagram}
                onChange={e => setInstagram(e.target.value.replace(/^@+/, ''))}
                onBlur={() => setTouched(t => ({ ...t, instagram: true }))}
              />
            </div>
            {instagramErrorText && <div className="form-group__error-message">{instagramErrorText}</div>}
          </div>
        </PageSectionContainer>

        <PageSectionContainer>
          {/* Plushie Instagram Accounts */}
          <FormSectionHeader title="Plushie Instagram Accounts" />
          <div className="plushie-instagram-account-section__description">
            No plushie Instagram accounts added yet. Connect one or more of your Instagram accounts to your profile
          </div>
          <div className="form-content">
            <button className="button--link" type="button">
              Add Another Account
            </button>
          </div>
        </PageSectionContainer>

        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary" disabled={!formValid && submitted}>
            Save Profile
          </button>
        </FormActionsContainer>
      </PageContentContainer>
    </form>
  );
}
