import { screen } from '@testing-library/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { renderWithProviders } from 'test';
import { DashboardCard } from 'components';

describe('DashboardCard', () => {
  it('renders icon, children and description, clickable when not locked', async () => {
    const onClick = vi.fn();
    renderWithProviders(
      <DashboardCard icon={faUser} description="Manage your profile" onClick={onClick}>
        Profile
      </DashboardCard>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Profile');
    expect(screen.getByTitle('Manage your profile')).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('renders as locked when isLocked is true and disables click', () => {
    const onClick = vi.fn();
    renderWithProviders(
      <DashboardCard description="Premium feature" isLocked onClick={onClick}>
        Premium
      </DashboardCard>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('dashboard-card--locked');
  });
});
