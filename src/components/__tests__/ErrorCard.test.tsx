import { screen, within } from '@testing-library/react';
import { ErrorCard } from 'components';
import { renderWithProviders } from 'test';

describe('ErrorCard', () => {
  it('renders heading and messages and uses error variant class', () => {
    renderWithProviders(<ErrorCard id="e1" heading="Oops" errorMessages={['A', 'B']} />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert-card');
    expect(alert).toHaveClass('alert-card--error');

    expect(screen.getByText('Oops')).toBeInTheDocument();
    const list = within(alert).getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('A');
    expect(items[1]).toHaveTextContent('B');
  });
});
