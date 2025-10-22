import { SubscriptionTierType } from 'enums/subscription-tier.enum';
import { CountryCodeType } from './country.model';

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
  country?: CountryCodeType;
  humanInstagram?: string;
  plushieInstagramAccounts?: IPlushieInstagramAccount[];
}

export type IUserUpdate = Partial<Omit<IUser, 'uid' | 'createdAt'>>;
