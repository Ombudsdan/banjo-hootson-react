import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlushieInstagramAccountsSelector } from 'components';
import { renderWithProviders } from 'test';

const ID = 'plushie-accounts';

describe('PlushieInstagramAccountsSelector', () => {
  it('adds a new account via dialog flow', async () => {
    renderWithProviders(<PlushieInstagramAccountsSelector id={ID} initialValue={[]} />, {
      withForm: true,
      withDialogs: true
    });

    await userEvent.click(screen.getByRole('button', { name: /add account/i }));

    // Dialog appears with input
    const input = await screen.findByPlaceholderText('Plushie Instagram Account');
    await userEvent.type(input, 'banjo');

    // Confirm submission
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));

    // New account appears in list
    expect(await screen.findByText('banjo')).toBeInTheDocument();
  });

  it('removes an account via confirmation dialog', async () => {
    renderWithProviders(
      <PlushieInstagramAccountsSelector id={ID} initialValue={[{ username: 'banjo', isPublic: true }]} />,
      {
        withForm: true,
        withDialogs: true
      }
    );

    // Click remove icon button
    const remove = screen.getByRole('button', { name: /remove account/i });
    await userEvent.click(remove);

    // Confirm (dialog confirm button labelled exactly "Remove")
    await userEvent.click(await screen.findByRole('button', { name: /^remove$/i }));

    // Item removed
    expect(screen.queryByText('banjo')).not.toBeInTheDocument();
  });
});
