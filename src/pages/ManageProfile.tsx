import { FormEvent, useEffect, useState } from 'react';
import { FormActionsContainer } from 'framework';
import { UserController } from 'controllers';
import { FormOutlet, FormSubmitContext, useHeading, useLoadingScreen, usePageAlerts } from 'hooks';
import { IPlushieInstagramAccount, IUser } from 'model/user.model';
import {
  CountryFormInput,
  EmailAddressFormInput,
  PlushieInstagramAccountsSelector,
  TownOrCityFormInput,
  UsernameFormInput
} from 'components';

const INPUT_ID = {
  townOrCity: 'town-or-city-input',
  country: 'country-input',
  yourInstagramAccount: 'your-instagram-account-input',
  plushieAccounts: 'plushie-accounts-input'
} as const;

export default function ManageProfile() {
  useHeading({ heading: 'Manage Profile' });
  const { addAlert } = usePageAlerts();
  const { setLoadingScreen, dismissLoadingScreen } = useLoadingScreen();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(fetchUser, []);

  return (
    <FormOutlet<IManageProfileFormFields> onSubmit={onSubmit} onSubmitFailure={onSubmitFailure}>
      <EmailAddressFormInput
        isReadonly={true}
        id="email-address"
        initialValue={user?.email || ''}
        label="Email Address"
        placeholder="Email Address"
        isRequired
      />
      <TownOrCityFormInput
        id={INPUT_ID.townOrCity}
        initialValue={user?.city || ''}
        label="Town or City"
        placeholder="Town or City"
        hint="For example: Sheffield"
      />
      <CountryFormInput
        id={INPUT_ID.country}
        initialValue={user?.country || ''}
        label="Country"
        hint="Your current country of residence"
      />
      <UsernameFormInput
        id={INPUT_ID.yourInstagramAccount}
        initialValue={user?.humanInstagram || ''}
        label="Your Instagram Account"
        hint="Your human Instagram account"
      />
      <PlushieInstagramAccountsSelector
        id={INPUT_ID.plushieAccounts}
        initialValue={user?.plushieInstagramAccounts || []}
        isRequired
      />
      <FormActionsContainer>
        <button type="submit" className="form__button form__button--primary">
          Save Profile
        </button>
      </FormActionsContainer>
    </FormOutlet>
  );

  function fetchUser() {
    UserController.me()
      .then(user => setUser(user))
      .catch(() => {
        addAlert({
          id: 'load-profile-error',
          variant: 'error',
          heading: 'Failed to load user profile. Please try again later.'
        });
      });
  }

  async function onSubmit(_e: FormEvent<HTMLFormElement>, form: FormSubmitContext<IManageProfileFormFields>) {
    setLoadingScreen({ id: 'save-profile', message: 'Saving profile information' });

    const fields = form.getFormFields();

    await UserController.update({
      ...user,
      city: fields[INPUT_ID.townOrCity] ?? user?.city ?? '',
      country: fields[INPUT_ID.country] ?? user?.country ?? '',
      humanInstagram: fields[INPUT_ID.yourInstagramAccount] ?? user?.humanInstagram ?? '',
      plushieInstagramAccounts: fields[INPUT_ID.plushieAccounts] ?? user?.plushieInstagramAccounts ?? []
    }).finally(() => dismissLoadingScreen('save-profile'));

    addAlert({
      id: 'save-profile-successful',
      variant: 'success',
      heading: 'Profile saved successfully!'
    });
  }

  async function onSubmitFailure(err?: Error) {
    addAlert({
      id: 'save-profile-failed',
      variant: 'error',
      heading: 'Failed to save profile. Please try again later.',
      messages: [...(err?.message || [])]
    });
  }
}

interface IManageProfileFormFields {
  [INPUT_ID.townOrCity]: string;
  [INPUT_ID.country]: string;
  [INPUT_ID.yourInstagramAccount]: string;
  [INPUT_ID.plushieAccounts]: IPlushieInstagramAccount[];
}
