import { UserService } from "services/user.service";
import { IUserProfile, IUserUpdate } from "model/user.types";

export class UserController {
  static init(): Promise<IUserProfile> {
    return UserService.initUser();
  }

  static me(): Promise<IUserProfile> {
    return UserService.getCurrentUser();
  }

  static update(updates: IUserUpdate): Promise<IUserProfile> {
    return UserService.updateCurrentUser(updates);
  }

  static delete(): Promise<{ message: string }> {
    return UserService.deleteCurrentUser();
  }
}
