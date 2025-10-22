import { IUserServiceProfile, IUserUpdate } from "model/user";
import { IUserProfile } from "model/user-profile";
import { UserService } from "services";

export default class UserController {
  static async init(): Promise<IUserProfile> {
    const user = await UserService.initUser();
    return this.toUiProfile(user);
  }

  static async me(): Promise<IUserProfile> {
    const user = await UserService.getCurrentUser();
    return this.toUiProfile(user);
  }

  static async update(updates: IUserUpdate): Promise<IUserProfile> {
    const user = await UserService.updateCurrentUser(updates);
    return this.toUiProfile(user);
  }

  static delete(): Promise<{ message: string }> {
    return UserService.deleteCurrentUser();
  }

  private static toUiProfile(user: IUserServiceProfile): IUserProfile {
    const toIso = (v: unknown): string => {
      if (typeof v === "string") return v;
      if (v instanceof Date) return v.toISOString();
      if (typeof v === "number") return new Date(v).toISOString();
      return "";
    };

    return {
      uid: user.uid,
      email: user.email,
      subscriptionTier: user.subscriptionTier,
      createdAt: toIso(user.createdAt),
      lastLogin: toIso(user.lastLogin),
      displayName: user.profile?.displayName,
      preferences: user.profile?.preferences,
      city: user.city || "",
      country: user.country || "",
      humanInstagram: user.humanInstagram || "",
      plushieInstagramAccounts: user.plushieInstagramAccounts || [],
    };
  }
}
