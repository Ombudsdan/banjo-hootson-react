import { FormEvent, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormOutlet, FormSubmitContext, useLoadingScreen, usePageHeading } from 'hooks';
import { FormActionsContainer } from 'framework';
import { UserController, AuthController } from 'controllers';
import usePageAlerts from 'hooks/usePageAlerts';
import PageAlert from 'builders/page-alert.builder';
import { EmailAddressFormInput, PasswordFormInput } from 'components';

const INPUT_ID = {
  emailAddress: 'email-address',
  // eslint-disable-next-line sonarjs/no-hardcoded-passwords
  password: 'password'
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const { addAlert } = usePageAlerts();
  const { setLoadingScreen, dismissLoadingScreen } = useLoadingScreen();

  useEffect(loadPageAlerts, [params, addAlert]);

  usePageHeading('Sign In');

  return (
    <>
      <FormOutlet<ISignInFormFields> onSubmit={onSubmit} onSubmitFailure={onSubmitFailure}>
        <EmailAddressFormInput id={INPUT_ID.emailAddress} label="Email Address" initialValue={''} isRequired />
        <PasswordFormInput id={INPUT_ID.password} label="Password" initialValue={''} isRequired />
        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary">
            Sign In
          </button>
        </FormActionsContainer>
      </FormOutlet>
      <div className="sign-up-section">
        <span>Don't have an account?</span>
        <button type="button" className="button button--link" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </>
  );

  async function onSubmit(_e: FormEvent<HTMLFormElement>, form: FormSubmitContext<ISignInFormFields>) {
    const fields = form.getFormFields();
    const emailAddress = (fields[INPUT_ID.emailAddress] as string) ?? '';
    const password = (fields[INPUT_ID.password] as string) ?? '';

    try {
      setLoadingScreen({ id: 'sign-in-loading', message: 'Signing in' });
      await AuthController.signInWithEmailPassword(emailAddress, password);
      await UserController.getCurrentUserProfile();
      navigate('/dashboard');
    } catch (error: unknown) {
      dismissLoadingScreen();
      const { message } = mapSignInError(error);
      addAlert(PageAlert.error(message, 'sign-in-error'));
    }
  }

  async function onSubmitFailure(err?: Error) {
    dismissLoadingScreen();
    addAlert({
      id: 'sign-in-failed',
      variant: 'error',
      heading: 'Failed to sign in.',
      messages: [...(err?.message || [])]
    });
  }

  function mapSignInError(err: unknown) {
    const error = err as { code?: string; message?: string };
    const code = error?.code ?? '';
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
        const m = (error as { message?: string } | undefined)?.message;
        if (m) message = `Login failed: ${m}`;
      }
    }

    return { message, code };
  }

  function loadPageAlerts() {
    const msg = params.get('message');
    if (msg) displayCustomMessageAlert(msg, 'custom-login-message');

    const possiblePageAlerts: SignInPageAlertMessageType[] = ['loggedOut', 'expired', 'deleted'];
    const pageAlerts: Record<SignInPageAlertMessageType, boolean> = possiblePageAlerts.reduce((acc, key) => {
      acc[key] = params.get(key) === '1';
      return acc;
    }, {} as Record<SignInPageAlertMessageType, boolean>);
    const hasAlerts = Object.values(pageAlerts).some(v => v);

    if (!hasAlerts) return;

    const next = new URLSearchParams(params);

    if (pageAlerts['loggedOut']) displaySignedOutAlert(next);
    if (pageAlerts['expired']) displaySessionExpiredAlert(next);
    if (pageAlerts['deleted']) displayAccountDeletedAlert(next);

    if (hasAlerts) clearUrl(next);
  }

  function displayCustomMessageAlert(message: string, alertId: string) {
    addAlert(PageAlert.info(message, alertId));
  }

  function displaySignedOutAlert(next: URLSearchParams) {
    next.delete('loggedOut');
    addAlert(PageAlert.success('Signed out successfully', 'session-logged-out'));
  }

  function displaySessionExpiredAlert(next: URLSearchParams) {
    next.delete('expired');
    addAlert(PageAlert.warning('Your session expired. Please sign in again.', 'session-expired'));
  }

  function displayAccountDeletedAlert(next: URLSearchParams) {
    next.delete('deleted');
    addAlert(PageAlert.success('Your account was deleted successfully.', 'account-deleted'));
  }

  /**
   * Clears the URL of specific query parameters without reloading the page.
   */
  function clearUrl(next: URLSearchParams) {
    const newSearch = next.toString();
    const hasQuery = newSearch.length > 0;
    const newUrl = window.location.pathname + (hasQuery ? '?' + newSearch : '');
    window.history.replaceState({}, '', newUrl);
  }
}

interface ISignInFormFields {
  [INPUT_ID.emailAddress]: string;
  [INPUT_ID.password]: string;
}

type SignInPageAlertMessageType = 'loggedOut' | 'expired' | 'deleted';
