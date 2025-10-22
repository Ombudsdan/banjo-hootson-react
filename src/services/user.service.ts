import { HttpClient } from "services/http-client";
import { IUserServiceProfile, IUserUpdate } from "model/user.types";

export class UserService {
  static initUser() {
    return HttpClient.request<IUserServiceProfile>({
      path: "/users",
      method: "POST",
    });
  }

  static getCurrentUser() {
    return HttpClient.request<IUserServiceProfile>({ path: "/users/me" });
  }

  static updateCurrentUser(updates: IUserUpdate) {
    return HttpClient.request<IUserServiceProfile, IUserUpdate>({
      path: "/users/me",
      method: "PUT",
      body: updates,
    });
  }

  static deleteCurrentUser() {
    return HttpClient.request<{ message: string }>({
      path: "/users/me",
      method: "DELETE",
    });
  }
}
