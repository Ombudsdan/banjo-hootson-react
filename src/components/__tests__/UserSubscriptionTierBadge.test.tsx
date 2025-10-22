import { screen } from '@testing-library/react';
import { UserSubscriptionTierBadge } from 'components';
import { renderWithProviders } from 'test';

describe('UserSubscriptionTierBadge', () => {
  it('renders lowercase tier text and class for provided tier', () => {
    renderWithProviders(<UserSubscriptionTierBadge tier="Premium" />);
    const badge = screen.getByText('premium');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('user-subscription-tier-badge');
    expect(badge).toHaveClass('user-subscription-tier-badge--premium');
  });

  it('defaults to standard when tier is null/undefined', () => {
    renderWithProviders(<UserSubscriptionTierBadge tier={null} />);
    const badge = screen.getByText('standard');
    expect(badge).toHaveClass('user-subscription-tier-badge--standard');
  });
});
