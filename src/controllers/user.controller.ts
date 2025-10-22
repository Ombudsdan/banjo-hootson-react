import { UserService } from "services/user.service";
import { IUserServiceProfile, IUserUpdate } from "model/user.types";
import { IUserProfile } from "model/user-profile.types";

export class UserController {
  static init(): Promise<IUserProfile> {
    return UserService.initUser().then(this.toUiProfile);
  }

  static me(): Promise<IUserProfile> {
    return UserService.getCurrentUser().then(this.toUiProfile);
  }

  static update(updates: IUserUpdate): Promise<IUserProfile> {
    return UserService.updateCurrentUser(updates).then(this.toUiProfile);
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
      // IProfile fields (not yet populated by backend)
      city: "",
      country: "",
      humanInstagram: "",
      plushieInstagramAccounts: [],
    };
  }
}
