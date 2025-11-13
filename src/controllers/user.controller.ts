import { IUser, UserUpdateProps } from 'model/user.model';
import { UserService } from 'services';

export default class UserController {
  static async init(): Promise<IUser> {
    const user = await UserService.initUser();
    return UserService.convertUserToUserProfile(user);
  }

  static async getCurrentUserProfile(): Promise<IUser> {
    return await UserService.getCurrentUser()
      .then(user => {
        if (!user) throw new Response('User not found', { status: 404 });
        return UserService.convertUserToUserProfile(user);
      })
      .catch(error => {
        if (error instanceof Response) throw error;
        if (error instanceof Error) throw new Response(error.message, { status: 500 });
        throw new Response('Failed to load user', { status: 500 });
      });
  }

  static async updateCurrentUser(updates: UserUpdateProps): Promise<IUser> {
    const user = await UserService.updateCurrentUser(updates);
    return UserService.convertUserToUserProfile(user);
  }

  static deleteUser(userId: string): Promise<{ message: string }> {
    return UserService.deleteUser(userId);
  }
}
