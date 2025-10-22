export default function UserSubscriptionTierBadge({
  tier,
}: IUserSubscriptionTierBadge) {
  const normalized = (tier || "standard").toLowerCase();
  const cls = `user-subscription-tier-badge user-subscription-tier-badge--${normalized}`;
  return <span className={cls}>{normalized}</span>;
}

interface IUserSubscriptionTierBadge {
  tier?: string | null;
}
