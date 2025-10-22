import { HttpClient } from "services/http-client";
import { IUserProfile, IUserUpdate } from "model/user.types";

export class UserService {
  static initUser() {
    return HttpClient.request<IUserProfile>({ path: "/users", method: "POST" });
  }

  static getCurrentUser() {
    return HttpClient.request<IUserProfile>({ path: "/users/me" });
  }

  static updateCurrentUser(updates: IUserUpdate) {
    return HttpClient.request<IUserProfile, IUserUpdate>({
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
