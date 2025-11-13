/**
 * UserService
 * Handles authenticated user lifecycle operations (init, fetch profile, update, delete).
 * Does not cache locally; callers manage memoization if required.
 */
import { IUser, UserUpdateProps } from 'model/user.model';
import { HttpClientService } from 'services';
import { toISOString } from 'utils';

export default class UserService {
  static initUser() {
    return HttpClientService.request<IUser>({
      path: '/users',
      method: 'POST',
      requireAuth: true
    });
  }

  static getCurrentUser() {
    return HttpClientService.request<IUser>({
      path: '/users/me',
      requireAuth: true
    });
  }

  static updateCurrentUser(updates: UserUpdateProps) {
    return HttpClientService.request<IUser, UserUpdateProps>({
      path: '/users/me',
      method: 'PUT',
      body: updates,
      requireAuth: true
    });
  }

  static deleteCurrentUser() {
    return HttpClientService.request<{ message: string }>({
      path: '/users/me',
      method: 'DELETE',
      requireAuth: true
    });
  }

  static deleteUser(userId: string) {
    return HttpClientService.request<{ message: string }>({
      path: `/users/${encodeURIComponent(userId)}`,
      method: 'DELETE',
      requireAuth: true
    });
  }

  static convertUserToUserProfile(user: IUser): IUser {
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
