import { useState, useEffect, useMemo, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BirthdayController } from 'controllers';
import { IPlushieBirthdayFormData } from 'model/plushie-birthday.model';
import { FormActionsContainer } from 'components';
import { useValidationAlert, useHeading } from 'hooks';
import { Validation, runValidators, firstErrorMessage } from 'utils';

const EMPTY: IPlushieBirthdayFormData = {
  name: '',
  dateOfBirth: '',
  username: ''
};

export default function SubmitPlushieBirthdayPage() {
  const [form, setForm] = useState<IPlushieBirthdayFormData>(EMPTY);
  const [touched, setTouched] = useState<{
    name: boolean;
    username: boolean;
    dateOfBirth: boolean;
  }>({ name: false, username: false, dateOfBirth: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();
  useHeading({ heading: 'Submit a Birthday' });
  const { setValidationAlert, clearValidationAlert } = useValidationAlert();

  const update = (patch: Partial<IPlushieBirthdayFormData>) => setForm(f => ({ ...f, ...patch }));

  // Individual field validators mirroring Angular
  const nameValidators = [Validation.required, Validation.maxLength(80), Validation.namePattern];
  const usernameValidators = [Validation.required, Validation.validFirstChar, Validation.validRemainingChars];
  const dateValidators = [Validation.required, Validation.noFutureDate()];
  const computeErrors = () => {
    return {
      name: runValidators(form.name, nameValidators),
      username: runValidators(form.username, usernameValidators),
      dateOfBirth: runValidators(form.dateOfBirth, dateValidators)
    } as const;
  };

  const errors = computeErrors();

  const showErrors = (field: 'name' | 'username' | 'dateOfBirth') => touched[field] || submitted;

  const nameErrorText = showErrors('name')
    ? firstErrorMessage(errors.name, {
        required: 'Name is required',
        maxlength: 'Name cannot exceed 80 characters',
        pattern: 'Name can only contain letters, numbers, spaces, hyphens, and apostrophes'
      })
    : '';

  const usernameErrorText = showErrors('username')
    ? firstErrorMessage(errors.username, {
        required: 'Username is required',
        invalidFirstChar: 'Username must start with either a letter, number, @, underscore, dot or hyphen',
        invalidRemainingChars:
          'Username must only contain letters, numbers, underscores, periods, hyphens and @ (as long as it is the at the start)'
      })
    : '';

  const dateErrorText = showErrors('dateOfBirth')
    ? firstErrorMessage(errors.dateOfBirth, {
        required: 'Date of birth is required',
        futureDate: 'Date cannot be in the future'
      })
    : '';

  const formValid = !errors.name && !errors.username && !errors.dateOfBirth;

  // Aggregate validation errors (only after submit attempt)
  const aggregatedErrors: string[] = useMemo(
    () => (submitted && !formValid ? [nameErrorText, usernameErrorText, dateErrorText].filter(Boolean) : []),
    [submitted, formValid, nameErrorText, usernameErrorText, dateErrorText]
  );

  // Show aggregated validation alert after submit attempt
  useEffect(() => {
    if (aggregatedErrors.length) {
      setValidationAlert({
        messages: aggregatedErrors
      });
    } else {
      clearValidationAlert();
    }
  }, [aggregatedErrors, setValidationAlert, clearValidationAlert]);

  const setToday = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    update({ dateOfBirth: `${yyyy}-${mm}-${dd}` });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setGlobalError('');
    // Mark all fields touched to reveal errors if invalid
    setTouched({ name: true, username: true, dateOfBirth: true });
    if (!formValid) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        username: form.username.startsWith('@') ? form.username.slice(1) : form.username
      };
      const created = await BirthdayController.create(payload);
      navigate(`/calendar/submit/confirmation/${encodeURIComponent(created.id)}`);
    } catch (err) {
      setGlobalError((err as Error)?.message || 'Failed to create birthday. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label className="form-group__label form-group__label--required" htmlFor="name">
          Plushie Name
        </label>
        <div className="form-group__hint">For example: Banjo Hootson</div>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={e => update({ name: e.target.value })}
          onBlur={() => setTouched(t => ({ ...t, name: true }))}
          placeholder="Plushie Name"
          className={nameErrorText ? 'error' : ''}
        />
        {nameErrorText && <div className="form-group__error-message">{nameErrorText}</div>}
      </div>

      <div className="form-group">
        <label className="form-group__label form-group__label--required" htmlFor="username">
          Username of Account
        </label>
        <div className="form-group__hint">For example: banjohootson</div>
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={e => update({ username: e.target.value.replace(/^@+/, '') })}
          onBlur={() => setTouched(t => ({ ...t, username: true }))}
          placeholder="Username"
          className={usernameErrorText ? 'error' : ''}
        />
        {usernameErrorText && <div className="form-group__error-message">{usernameErrorText}</div>}
      </div>

      <div className="form-group">
        <label className="form-group__label form-group__label--required" htmlFor="dob">
          Plushie Birth Date
        </label>
        <div className="form-group__hint">When was your plushie born or adopted?</div>
        <div className="form-row">
          <input
            id="dob"
            type="date"
            value={form.dateOfBirth}
            onChange={e => update({ dateOfBirth: e.target.value })}
            onBlur={() => setTouched(t => ({ ...t, dateOfBirth: true }))}
            className={dateErrorText ? 'error' : ''}
          />
          <button
            type="button"
            className="form__button form__button--secondary form__button--inline form__button--today"
            onClick={setToday}
          >
            Today
          </button>
        </div>
        {dateErrorText && <div className="form-group__error-message">{dateErrorText}</div>}
      </div>

      {globalError && (
        <div className="form-group__error-message" role="alert">
          {globalError}
        </div>
      )}

      <FormActionsContainer>
        <button className="form__button form__button--primary" type="submit" disabled={submitting}>
          {submitting ? 'Submitting Birthday...' : 'Submit Birthday'}
        </button>
      </FormActionsContainer>
    </form>
  );
}
