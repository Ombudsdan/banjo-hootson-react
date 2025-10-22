import { SubscriptionTierType } from 'enums/subscription-tier.enum';

export type SubscriptionTier = 'standard' | 'supporter';

export interface IPlushieInstagramAccount {
  username: string;
  isPublic: boolean;
}

export interface IUserPreferences {
  emailNotifications?: boolean;
}

export interface IUser {
  uid: string;
  email: string;
  subscriptionTier: SubscriptionTierType;
  createdAt: string | number | Date;
  lastLogin: string | number | Date;
  profile?: {
    displayName?: string;
    preferences?: IUserPreferences;
  };
  city?: string;
  country?: string; // ISO 3166-1 alpha-2
  humanInstagram?: string;
  plushieInstagramAccounts?: IPlushieInstagramAccount[];
}

export type UserUpdateProps = Partial<Omit<IUser, 'uid' | 'createdAt'>>;
