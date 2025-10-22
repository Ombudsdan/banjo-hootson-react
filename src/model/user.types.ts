export type SubscriptionTier = "standard" | "supporter";

export interface IUserServiceProfile {
  uid: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  createdAt: string | number | Date;
  lastLogin: string | number | Date;
  profile?: {
    displayName?: string;
    preferences?: Record<string, unknown>;
  };
}

export type IUserUpdate = Partial<
  Omit<IUserServiceProfile, "uid" | "createdAt">
>;
