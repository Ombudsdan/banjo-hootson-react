import { useMemo } from 'react';
import { generateClassName } from 'utils';

/**
 * Small label showing the user's subscription tier with tier-based styling.
 */
export default function UserSubscriptionTierBadge({ tier }: IUserSubscriptionTierBadge) {
  const normalized = (tier || 'standard').toLowerCase();
  const className = useMemo(() => {
    return generateClassName(['user-subscription-tier-badge', `user-subscription-tier-badge--${normalized}`]);
  }, [normalized]);

  return <span className={className}>{normalized}</span>;
}

/** Props for {@link UserSubscriptionTierBadge}. */
interface IUserSubscriptionTierBadge {
  tier?: string | null;
}
