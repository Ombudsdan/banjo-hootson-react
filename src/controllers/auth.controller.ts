import { FirebaseService, FirebaseUser, FirebaseUserCredential, HttpClientService } from 'services';
import { IAuthUser } from 'model/auth.model';

export default class AuthController {
  static async init() {
    // Initialize Firebase asynchronously; await so callers can observe failures
    await FirebaseService.getAuth();
    // Provide initial token fetcher
    HttpClientService.setTokenProvider(async () => await FirebaseService.getCurrentIdToken());
    // Keep in sync when token changes
    FirebaseService.onAuthTokenChange((token: string | null) => {
      if (!token) {
        // user signed out (optional hook)
      }
    });
  }

  static async getToken(): Promise<string | null> {
    return FirebaseService.getCurrentIdToken();
  }

  static async getCurrentUser(): Promise<IAuthUser | null> {
    const result = await FirebaseService.getCurrentUser();
    return result ? this.mapUser(result) : null;
  }

  static async signInWithEmailPassword(email: string, password: string): Promise<ISignInResult> {
    const result = await FirebaseService.signInWithEmailAndPassword(email, password);
    return this.mapUserCredential(result);
  }

  static async signUpWithEmailPassword(email: string, password: string, displayName?: string): Promise<ISignInResult> {
    const result = await FirebaseService.createUserWithEmailAndPassword(email, password, displayName);
    return this.mapUserCredential(result);
  }

  static async signOut(): Promise<void> {
    await FirebaseService.signOut();
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    return FirebaseService.onAuthTokenChange(callback);
  }

  private static mapUser(user: FirebaseUser): IAuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
  }

  private static async mapUserCredential(credential: FirebaseUserCredential): Promise<ISignInResult> {
    const token = await credential.user.getIdToken();
    return { user: this.mapUser(credential.user), token };
  }
}

interface ISignInResult {
  user: IAuthUser;
  token: string;
}
