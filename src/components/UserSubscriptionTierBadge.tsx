import { useMemo } from 'react';
import { generateClassName } from 'utils';

export default function UserSubscriptionTierBadge({ tier }: IUserSubscriptionTierBadge) {
  const normalized = (tier || 'standard').toLowerCase();
  const className = useMemo(() => {
    return generateClassName(['user-subscription-tier-badge', `user-subscription-tier-badge--${normalized}`]);
  }, [normalized]);

  return <span className={className}>{normalized}</span>;
}

interface IUserSubscriptionTierBadge {
  tier?: string | null;
}
