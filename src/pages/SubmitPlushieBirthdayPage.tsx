import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BirthdayController } from 'controllers';
import { FormActionsContainer } from 'framework';
import { useHeading, FormOutlet, usePageAlerts, FormSubmitContext, useLoadingScreen } from 'hooks';
import { PlushieBirthDateFormInput, PlushieNameFormInput, UsernameFormInput } from 'components';

const INPUT_ID = {
  plushieName: 'plushie-name',
  accountUsername: 'account-username',
  plushieBirthDate: 'plushie-date-of-birth'
};

export default function SubmitPlushieBirthdayPage() {
  const { addAlert } = usePageAlerts();
  const { setLoadingScreen, dismissLoadingScreen } = useLoadingScreen();
  const navigate = useNavigate();

  useHeading({ heading: 'Submit a Birthday' });

  return (
    <FormOutlet<ISubmitPlushieBirthdayFormFields> onSubmit={onSubmit} onSubmitFailure={onSubmitFailure}>
      <PlushieNameFormInput
        id={INPUT_ID.plushieName}
        initialValue={''}
        label="Plushie Name"
        hint="For example: Banjo Hootson"
        placeholder="Plushie Name"
        isRequired
      />
      <UsernameFormInput
        id={INPUT_ID.accountUsername}
        initialValue={''}
        label="Username of Account"
        hint="For example: banjohootson"
        placeholder="Username"
        isRequired
      />
      <PlushieBirthDateFormInput
        id={INPUT_ID.plushieBirthDate}
        initialValue={''}
        label="Plushie Birth Date"
        hint="When was your plushie born or adopted?"
        isRequired
      />
      <FormActionsContainer>
        <button type="submit" className="form__button form__button--primary">
          Submit Birthday
        </button>
      </FormActionsContainer>
    </FormOutlet>
  );

  async function onSubmit(_e: FormEvent<HTMLFormElement>, form: FormSubmitContext<ISubmitPlushieBirthdayFormFields>) {
    setLoadingScreen({ id: 'submit-plushie-birthday', message: 'Submitting plushie birthday' });

    const fields = form.getFormFields();
    const accountUsername = fields[INPUT_ID.accountUsername] ?? '';

    await BirthdayController.create({
      name: fields[INPUT_ID.plushieName] ?? '',
      username: accountUsername.startsWith('@') ? accountUsername.slice(1) : accountUsername,
      dateOfBirth: fields[INPUT_ID.plushieBirthDate] ?? ''
    }).then(created => {
      navigate(`/calendar/submit/confirmation/${encodeURIComponent(created.id)}`);
    });
  }

  async function onSubmitFailure(err?: Error) {
    addAlert({
      id: 'submit-plushie-birthday-failed',
      variant: 'error',
      heading: 'Failed to submit plushie birthday. Please try again later or contact Banjo.',
      messages: [...(err?.message || [])]
    });
  }
}

interface ISubmitPlushieBirthdayFormFields {
  [INPUT_ID.plushieName]: string;
  [INPUT_ID.accountUsername]: string;
  [INPUT_ID.plushieBirthDate]: string;
}
