import { IUser, UserUpdateProps } from 'model/user.model';
import { UserService } from 'services';
import { toISOString } from 'utils';

export default class UserController {
  static async init(): Promise<IUser> {
    const user = await UserService.initUser();
    return this.toUserProfile(user);
  }

  static async me(): Promise<IUser> {
    const user = await UserService.getCurrentUser();
    return this.toUserProfile(user);
  }

  static async update(updates: UserUpdateProps): Promise<IUser> {
    const user = await UserService.updateCurrentUser(updates);
    return this.toUserProfile(user);
  }

  static delete(): Promise<{ message: string }> {
    return UserService.deleteCurrentUser();
  }

  private static toUserProfile(user: IUser): IUser {
    return {
      uid: user.uid,
      email: user.email,
      subscriptionTier: user.subscriptionTier,
      createdAt: toISOString(user.createdAt),
      lastLogin: toISOString(user.lastLogin),
      profile: {
        displayName: user.profile?.displayName,
        preferences: user.profile?.preferences
      },
      city: user.city || '',
      country: user.country || '',
      humanInstagram: user.humanInstagram || '',
      plushieInstagramAccounts: user.plushieInstagramAccounts || []
    };
  }
}
