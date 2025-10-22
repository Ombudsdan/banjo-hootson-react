import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlushieInstagramAccountFormInput } from 'components';
import type { IPlushieInstagramAccount } from 'model/user.model';
import { UnitTestUtils } from 'test';

const existing: IPlushieInstagramAccount[] = [
  { username: 'banjo', isPublic: true }
];

const ID = 'plushie-ig';

describe('PlushieInstagramAccountFormInput', () => {
  it('shows duplicate error when username already exists and changed', async () => {
    new UnitTestUtils(
      <PlushieInstagramAccountFormInput id={ID} label="Plushie Instagram Account" initialValue="" existingAccounts={existing} />,
      { withForm: true }
    );

    const input = screen.getByPlaceholderText('Plushie Instagram Account') as HTMLInputElement;
    await userEvent.type(input, 'banjo');
    await userEvent.tab();
    expect(screen.getByText(/already been added/i)).toBeInTheDocument();
  });

  it('treats original value as unique (no error) when unchanged', async () => {
    new UnitTestUtils(
      <PlushieInstagramAccountFormInput id={ID} label="Plushie Instagram Account" initialValue="banjo" existingAccounts={existing} />,
      { withForm: true }
    );

  // focus/blur to trigger validation without using the variable
  await userEvent.tab();
    expect(screen.queryByText(/already been added/i)).not.toBeInTheDocument();
  });
});
