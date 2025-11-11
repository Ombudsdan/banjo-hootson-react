import { FirebaseService, FirebaseUser, FirebaseUserCredential, HttpClientService } from 'services';
import { IAuthUser } from 'model/auth.model';

export default class AuthController {
  private static subscribers = new Set<(token: string | null) => void>();
  private static _currentToken: string | null = null;
  private static _initializing = false;
  private static _initialized = false;

  static async init() {
    // Guard: avoid duplicate init or concurrent racing calls
    if (this._initialized || this._initializing) return;
    this._initializing = true;
    try {
      // Initialize Firebase asynchronously; await so callers can observe failures
      await FirebaseService.getAuth();
      // Provide initial token fetcher used for requireAuth requests
      HttpClientService.setTokenProvider(async () => await FirebaseService.getCurrentIdToken());
      // Subscribe to token change endpoint (one-shot snapshot semantics on backend)
      FirebaseService.onAuthTokenChange((token: string | null) => {
        // Always notify once backend responds; if no token it represents signed-out state
        AuthController.notify(token);
      });
      // Fetch a snapshot directly (silently) in case backend change endpoint is delayed
      try {
        const snapshot = await FirebaseService.getCurrentIdToken();
        AuthController.notify(snapshot);
      } catch {
        // ignore snapshot failure (network etc.) – stays unauth until user acts
      }
    } finally {
      this._initializing = false;
      this._initialized = true;
    }
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
    const mapped = await this.mapUserCredential(result);
    AuthController.notify(mapped.token);
    return mapped;
  }

  static async signUpWithEmailPassword(email: string, password: string, displayName?: string): Promise<ISignInResult> {
    const result = await FirebaseService.createUserWithEmailAndPassword(email, password, displayName);
    const mapped = await this.mapUserCredential(result);
    AuthController.notify(mapped.token);
    return mapped;
  }

  static async signOut(): Promise<void> {
    await FirebaseService.signOut();
    AuthController.notify(null);
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    AuthController.subscribers.add(callback);
    // Emit current snapshot immediately ONLY if initialization finished; otherwise caller should wait
    if (this._initialized) {
      try {
        callback(AuthController.currentToken);
      } catch {
        // ignore subscriber errors
      }
    }
    return () => {
      AuthController.subscribers.delete(callback);
    };
  }

  static get currentToken() {
    return AuthController._currentToken;
  }

  static get initializing() {
    return AuthController._initializing;
  }

  static get initialized() {
    return AuthController._initialized;
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

  private static notify(token: string | null) {
    AuthController._currentToken = token;
    for (const cb of AuthController.subscribers) {
      try {
        cb(token);
      } catch {
        // ignore
      }
    }
  }
}

interface ISignInResult {
  user: IAuthUser;
  token: string;
}
