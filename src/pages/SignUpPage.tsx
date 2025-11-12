/* eslint sonarjs/no-hardcoded-passwords: off -- These are field IDs and labels, not secrets */
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormOutlet, FormSubmitContext, useLoadingScreen, usePageHeading } from 'hooks';
import { FormActionsContainer } from 'framework';
import { UserController, AuthController } from 'controllers';
import usePageAlerts from 'hooks/usePageAlerts';
import PageAlert from 'builders/page-alert.builder';
import {
  EmailAddressFormInput,
  DisplayNameFormInput,
  PasswordFormInput,
  ConfirmPasswordFormInput,
  TermsAndConditionsFormInput
} from 'components';

const INPUT_ID = {
  emailAddress: 'email-address',
  displayName: 'display-name',
  password: 'password',
  confirmPassword: 'confirm-password',
  termsAndConditions: 'terms-and-conditions'
};

export default function SignupPage() {
  const navigate = useNavigate();
  const { addAlert } = usePageAlerts();
  const { setLoadingScreen, dismissLoadingScreen } = useLoadingScreen();

  usePageHeading('Sign Up');

  return (
    <>
      <FormOutlet<ISignUpFormFields> onSubmit={onSubmit} onSubmitFailure={onSubmitFailure}>
        <EmailAddressFormInput
          id={INPUT_ID.emailAddress}
          initialValue={''}
          label="Email Address"
          placeholder="Email Address"
          isRequired
        />
        <DisplayNameFormInput
          id={INPUT_ID.displayName}
          initialValue={''}
          label="Display Name"
          placeholder="Display Name"
          isRequired
        />
        <PasswordFormInput
          id={INPUT_ID.password}
          initialValue={''}
          label="Password"
          placeholder="Enter your password"
          isRequired
        />
        <ConfirmPasswordFormInput
          id={INPUT_ID.confirmPassword}
          passwordId={INPUT_ID.password}
          initialValue={''}
          label="Confirm Password"
          placeholder="Re-enter your password"
          isRequired
        />
        <TermsAndConditionsFormInput id={INPUT_ID.termsAndConditions} initialValue={false} isRequired />
        <FormActionsContainer>
          <button type="submit" className="form__button form__button--primary">
            Save Profile
          </button>
        </FormActionsContainer>
      </FormOutlet>

      <div className="sign-in-section">
        <span>Already have an account?</span>
        <button type="button" className="button button--link" onClick={() => navigate('/login')}>
          Sign In
        </button>
      </div>
    </>
  );

  async function onSubmit(_e: FormEvent<HTMLFormElement>, form: FormSubmitContext<ISignUpFormFields>) {
    const fields = form.getFormFields();
    const termsAccepted = (fields[INPUT_ID.termsAndConditions] as boolean) ?? false;

    if (!termsAccepted) {
      addAlert(
        PageAlert.error(
          'You must agree to the terms and conditions to create an account.',
          'terms-and-conditions-error'
        )
      );
      return;
    }

    setLoadingScreen({ id: 'signup', message: 'Creating your account' });

    const emailAddress = (fields[INPUT_ID.emailAddress] as string) ?? '';
    const password = (fields[INPUT_ID.password] as string) ?? '';
    const displayName = (fields[INPUT_ID.displayName] as string) ?? '';

    try {
      await AuthController.signUpWithEmailPassword(emailAddress, password, displayName);
      await UserController.init();
      addAlert(PageAlert.success('Profile saved successfully!', 'save-profile-successful'));
      navigate('/dashboard');
    } catch (error: unknown) {
      const { message: finalMessage } = mapSignupError(error);
      addAlert(PageAlert.error(finalMessage, 'signup-error'));
      dismissLoadingScreen('signup');
    }
  }

  async function onSubmitFailure(err?: Error) {
    addAlert({
      id: 'create-account-failed',
      variant: 'error',
      heading: 'Failed to create account.',
      messages: [...(err?.message || [])]
    });
  }
}

function mapSignupError(error: unknown): { message: string; code?: string } {
  let message = 'An error occurred during signup. Please try again.';
  const code = (error as { code?: string; message?: string } | undefined)?.code;
  if (code) {
    switch (code) {
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists. Please sign in instead.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger password.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection and try again.';
        break;
      default: {
        const m = (error as { message?: string } | undefined)?.message;
        if (m) message = `Signup failed: ${m}`;
      }
    }
  }
  return { message, code };
}

interface ISignUpFormFields {
  [INPUT_ID.emailAddress]: string;
  [INPUT_ID.displayName]: string;
  [INPUT_ID.password]: string;
  [INPUT_ID.confirmPassword]: string;
  [INPUT_ID.termsAndConditions]: boolean;
}
