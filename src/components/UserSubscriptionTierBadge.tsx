type Props = {
  tier?: string | null;
};

export default function UserSubscriptionTierBadge({ tier }: Props) {
  const normalized = (tier || "standard").toLowerCase();
  const cls = `user-subscription-tier-badge user-subscription-tier-badge--${normalized}`;
  return <span className={cls}>{normalized}</span>;
}
