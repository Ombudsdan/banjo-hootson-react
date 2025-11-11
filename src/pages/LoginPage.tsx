import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePageHeading } from 'hooks';
import { PageContentContainer } from 'framework';
import { UserController, AuthController } from 'controllers';
import usePageAlerts from 'hooks/usePageAlerts';
import PageAlert from 'builders/page-alert.builder';
import { Validation, runValidators, firstErrorMessage } from 'utils';

const LOGIN_ERROR_ALERT_ID = 'login-error';

export default function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addAlert, dismissAlert } = usePageAlerts();

  useEffect(() => {
    const msg = params.get('message');
    const hasLoggedOut = params.get('loggedOut') === '1';
    const hasExpired = params.get('expired') === '1';
    const next = new URLSearchParams(params);

    if (msg) {
      addAlert(PageAlert.info(msg, 'info-message'));
    }

    if (hasLoggedOut) {
      next.delete('loggedOut');
      addAlert(PageAlert.success('Signed out successfully', 'session-logged-out'));
    }

    if (hasExpired) {
      next.delete('expired');
      addAlert(PageAlert.warning('Your session expired. Please sign in again.', 'session-expired'));
    }

    if (hasLoggedOut || hasExpired) {
      const newSearch = next.toString();
      const hasQuery = newSearch.length > 0;
      const newUrl = window.location.pathname + (hasQuery ? '?' + newSearch : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [params, addAlert]);

  // Validators mirroring Angular expectations: required + email format; password min length 6
  const emailErrors = runValidators(email, [Validation.required, Validation.email]);
  const passwordErrors = runValidators(password, [Validation.required, Validation.minLength(6)]);

  const showErrors = (field: 'email' | 'password') => touched[field] || submitted;

  const emailErrorMessagesMap = {
    required: 'Email is required',
    email: 'Please enter a valid email address'
  } as const;
  const emailErrorText = showErrors('email') ? firstErrorMessage(emailErrors, emailErrorMessagesMap) : '';

  const passwordErrorMessagesMap = {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters'
  } as const;
  const passwordErrorText = showErrors('password') ? firstErrorMessage(passwordErrors, passwordErrorMessagesMap) : '';

  const formValid = !emailErrors && !passwordErrors;

  const onSubmit = async (e: FormEvent) => {
    dismissAlert(LOGIN_ERROR_ALERT_ID);

    e.preventDefault();

    setSubmitted(true);
    setTouched({ email: true, password: true });

    if (!formValid) return;

    setIsLoading(true);

    try {
      await AuthController.signInWithEmailPassword(email, password);
      await UserController.me();
      navigate('/dashboard');
    } catch (err: unknown) {
      const code = (err as { code?: string; message?: string } | undefined)?.code;
      let message = 'An error occurred during login. Please try again.';
      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          message = 'Invalid email or password. Please check your credentials and try again.';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed login attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          message = 'Network error. Please check your connection and try again.';
          break;
        default: {
          const m = (err as { message?: string } | undefined)?.message;
          if (m) message = `Login failed: ${m}`;
        }
      }
      addAlert(PageAlert.error(message, LOGIN_ERROR_ALERT_ID));
    } finally {
      setIsLoading(false);
    }
  };

  usePageHeading('Sign In');
  return (
    <PageContentContainer>
      <div className="login-page">
        <div className="login-page__container">
          <form onSubmit={onSubmit} className="login-page__form">
            <div className="form-group">
              <label htmlFor="email" className="form-group__label form-group__label--required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                className={emailErrorText ? 'error' : undefined}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {emailErrorText && <div className="form-group__error-message">{emailErrorText}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-group__label form-group__label--required">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                className={passwordErrorText ? 'error' : undefined}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {passwordErrorText && <div className="form-group__error-message">{passwordErrorText}</div>}
            </div>

            <button type="submit" className="form__button form__button--primary" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="login-page__signup-prompt">
              <p>
                Don't have an account?
                <button
                  type="button"
                  className="login-page__link-button"
                  onClick={() => navigate('/signup')}
                  disabled={isLoading}>
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageContentContainer>
  );
}
