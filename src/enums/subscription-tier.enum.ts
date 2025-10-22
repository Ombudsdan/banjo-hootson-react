import { createEnum } from 'utils';
import { ValueOf } from 'model/utils.model';

export const SubscriptionTier = createEnum({
  STANDARD: 'standard',
  SUPPORTER: 'supporter'
});

export const DEFAULT_SUBSCRIPTION_TIER: SubscriptionTierType = SubscriptionTier.STANDARD;

export type SubscriptionTierType = ValueOf<typeof SubscriptionTier>;
