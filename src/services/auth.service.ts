import { IAuthUser } from 'model/auth.model';
import { FirebaseUser, FirebaseUserCredential } from './firebase.service';

export default class AuthService {
  static mapFirebaseUserToAuthUser(user: FirebaseUser): IAuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
  }

  static async getSignInResultFromUserCredential(credential: FirebaseUserCredential): Promise<ISignInResult> {
    const token = await credential.user.getIdToken();
    return { user: this.mapFirebaseUserToAuthUser(credential.user), token };
  }
}

export interface ISignInResult {
  user: IAuthUser;
  token: string;
}
