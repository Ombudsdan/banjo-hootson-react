import { IInstagramAccount } from "./user-profile";

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
  city?: string;
  country?: string;
  humanInstagram?: string;
  plushieInstagramAccounts?: IInstagramAccount[];
}

export type IUserUpdate = Partial<
  Omit<IUserServiceProfile, "uid" | "createdAt">
>;
