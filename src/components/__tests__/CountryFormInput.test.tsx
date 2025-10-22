import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryFormInput } from 'components';
import { renderWithProviders } from 'test';

vi.mock('controllers', () => ({
  LocationController: {
    loadCountries: () =>
      Promise.resolve([
        { code: 'GB', name: 'United Kingdom' },
        { code: 'US', name: 'United States' }
      ])
  }
}));

const ID = 'country';

describe('CountryFormInput', () => {
  it('renders label and countries, selecting value updates form field', async () => {
    renderWithProviders(
      <CountryFormInput id={ID} initialValue="US" label="Country" hint="Your current country of residence" />,
      { withForm: true }
    );

    expect(await screen.findByText('United Kingdom')).toBeInTheDocument();
    const select = screen.getByLabelText('Country') as HTMLSelectElement;
    expect(select.value).toBe('US');

    await userEvent.selectOptions(select, 'GB');
    expect(select.value).toBe('GB');
  });
});
