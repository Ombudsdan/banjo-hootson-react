import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsernameFormInput } from 'components';
import { UnitTestUtils } from 'test';

const ID = 'username';

describe('UsernameFormInput', () => {
  it('renders group with prefix and strips leading @, shows error on invalid', async () => {
    new UnitTestUtils(
      (<UsernameFormInput id={ID} initialValue="" label="Your Instagram Account" placeholder="Username" />),
      { withForm: true }
    );

    const input = screen.getByPlaceholderText('Username') as HTMLInputElement;
    await userEvent.type(input, '@@@abc');
    expect(input.value).toBe('abc');

    await userEvent.clear(input);
    await userEvent.type(input, '!!!');
    await userEvent.tab();
    expect(screen.getByText(/contain only letters/i)).toBeInTheDocument();
  });
});
