import { HttpClientService } from 'services';
import { FirebaseController, FirebaseUser, FirebaseUserCredential } from 'controllers';
import { IAuthUser } from 'model/auth.model';

export default class AuthController {
  static init() {
    FirebaseController.init();
    // Provide initial token fetcher
    HttpClientService.setTokenProvider(async () => await FirebaseController.getCurrentIdToken());
    // Keep in sync when token changes
    FirebaseController.onAuthTokenChange((token: string | null) => {
      // Optional: could refresh client state or trigger re-fetches
      // The HttpClient provider is always evaluated before each request
      if (!token) {
        // user signed out
      }
    });
  }

  static async getToken(): Promise<string | null> {
    return FirebaseController.getCurrentIdToken();
  }

  static getCurrentUser(): IAuthUser | null {
    const user = FirebaseController.getCurrentUser();
    return user ? this.mapUser(user) : null;
  }

  static async signInWithEmailPassword(email: string, password: string): Promise<ISignInResult> {
    const result = await FirebaseController.signInWithEmailAndPassword(email, password);
    return this.mapUserCredential(result);
  }

  static async signUpWithEmailPassword(email: string, password: string, displayName?: string): Promise<ISignInResult> {
    const result = await FirebaseController.createUserWithEmailAndPassword(email, password, displayName);
    return this.mapUserCredential(result);
  }

  static async signOut(): Promise<void> {
    await FirebaseController.signOut();
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    return FirebaseController.onAuthTokenChange(callback);
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
