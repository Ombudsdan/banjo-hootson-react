/**
 * UserService
 * Handles authenticated user lifecycle operations (init, fetch profile, update, delete).
 * Does not cache locally; callers manage memoization if required.
 */
import { IUserServiceProfile, IUserUpdate } from "model/user";
import { HttpClientService } from "services";

export default class UserService {
  static initUser() {
    return HttpClientService.request<IUserServiceProfile>({
      path: "/users",
      method: "POST",
    });
  }

  static getCurrentUser() {
    return HttpClientService.request<IUserServiceProfile>({
      path: "/users/me",
    });
  }

  static updateCurrentUser(updates: IUserUpdate) {
    return HttpClientService.request<IUserServiceProfile, IUserUpdate>({
      path: "/users/me",
      method: "PUT",
      body: updates,
    });
  }

  static deleteCurrentUser() {
    return HttpClientService.request<{ message: string }>({
      path: "/users/me",
      method: "DELETE",
    });
  }
}
