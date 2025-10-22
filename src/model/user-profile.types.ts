export type SubscriptionTierEnum = "standard" | "supporter";

export const SUBSCRIPTION_TIER = {
  STANDARD: "standard",
  SUPPORTER: "supporter",
} as const;

export const DEFAULT_SUBSCRIPTION_TIER: SubscriptionTierEnum =
  SUBSCRIPTION_TIER.STANDARD;

export interface IInstagramAccount {
  username: string;
  isPublic: boolean;
}

export interface IProfile {
  email: string;
  city: string;
  country: string;
  humanInstagram: string;
  plushieInstagramAccounts: IInstagramAccount[];
}

export interface IUserPreferences {
  emailNotifications?: boolean;
}

export interface IUserProfile extends IProfile {
  uid: string;
  subscriptionTier: SubscriptionTierEnum;
  createdAt: string;
  lastLogin: string;
  displayName?: string;
  preferences?: IUserPreferences;
}

export interface ICreateUserRequest {
  displayName?: string;
  city?: IProfile["city"];
  country?: IProfile["country"];
  humanInstagram?: IProfile["humanInstagram"];
  plushieInstagramAccounts?: IProfile["plushieInstagramAccounts"];
  preferences?: IUserPreferences;
}

export interface IUpdateUserRequest {
  displayName?: string;
  city?: IProfile["city"];
  country?: IProfile["country"];
  humanInstagram?: IProfile["humanInstagram"];
  plushieInstagramAccounts?: IProfile["plushieInstagramAccounts"];
  preferences?: IUserPreferences;
}
