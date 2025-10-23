import { screen } from '@testing-library/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DashboardCard } from 'components';
import { UnitTestUtils } from 'test';

describe('DashboardCard', () => {
  it('renders icon, children and description, clickable when not locked', async () => {
    const onClick = vi.fn();
    new UnitTestUtils(
      (
        <DashboardCard icon={faUser} description="Manage your profile" onClick={onClick}>
          Profile
        </DashboardCard>
      )
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Profile');
    expect(screen.getByText('Manage your profile')).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('renders as locked when isLocked is true and disables click', () => {
    const onClick = vi.fn();
    new UnitTestUtils(
      (
        <DashboardCard description="Premium feature" isLocked onClick={onClick}>
          Premium
        </DashboardCard>
      )
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('dashboard-card--locked');
  });
});
