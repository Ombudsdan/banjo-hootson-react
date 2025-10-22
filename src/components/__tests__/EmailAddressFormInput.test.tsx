import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmailAddressFormInput } from 'components';
import { renderWithProviders } from 'test';

const ID = 'email-input';

describe('EmailAddressFormInput', () => {
  it('renders label, input and hint; validates invalid email on blur', async () => {
    renderWithProviders(
      <EmailAddressFormInput id={ID} initialValue="" label="Email" placeholder="you@example.com" hint="Hint" />,
      { withForm: true }
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Hint')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('you@example.com');
    await userEvent.type(input, 'invalid');
    await userEvent.tab(); // blur

    expect(screen.getByText(/not valid/i)).toBeInTheDocument();
  });

  it('renders readonly as plain text when isReadonly', () => {
    renderWithProviders(
      <EmailAddressFormInput id={ID} initialValue="test@example.com" label="Email" isReadonly={true} />,
      { withForm: true }
    );
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
