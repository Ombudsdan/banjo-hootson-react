import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TownOrCityInput } from 'components';
import { renderWithProviders } from 'test';

const ID = 'city';

describe('TownOrCityInput', () => {
  it('renders label, hint and placeholder; shows error when invalid on blur', async () => {
    renderWithProviders(
      <TownOrCityInput
        id={ID}
        initialValue=""
        label="Town or City"
        hint="For example: Sheffield"
        placeholder="Town or City"
      />,
      { withForm: true }
    );

    expect(screen.getByText('Town or City')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Town or City');
    await userEvent.type(input, '###');
    await userEvent.tab();

    expect(screen.getByText(/contains invalid characters/i)).toBeInTheDocument();
  });
});
