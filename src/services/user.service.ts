/**
 * UserService
 * Handles authenticated user lifecycle operations (init, fetch profile, update, delete).
 * Does not cache locally; callers manage memoization if required.
 */
import { IUser, IUserUpdate } from 'model/user.model';
import { HttpClientService } from 'services';

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

  static updateCurrentUser(updates: IUserUpdate) {
    return HttpClientService.request<IUser, IUserUpdate>({
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
}
