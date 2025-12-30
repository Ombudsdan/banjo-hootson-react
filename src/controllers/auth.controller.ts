import { AuthService, FirebaseService, HttpClientService, ISignInResult } from 'services';
import { IAuthUser } from 'model/auth.model';
import { redirect } from 'react-router-dom';

export default class AuthController {
  private static subscribers = new Set<(token: string | null) => void>();
  private static _currentToken: string | null = null;
  private static _initializing = false;
  private static _initialized = false;
  private static STORAGE_KEY = 'auth_token';

  static async init() {
    // Guard: avoid duplicate init or concurrent racing calls
    if (this._initialized || this._initializing) return;

    this._initializing = true;

    try {
      // Initialize Firebase asynchronously; await so callers can observe failures
      await FirebaseService.getAuth();

      // Attempt to hydrate token from persistent storage (survives page refresh)
      try {
        const stored = typeof window !== 'undefined' ? window.localStorage.getItem(this.STORAGE_KEY) : null;
        if (stored) {
          this._currentToken = stored;
        }
      } catch {
        // ignore localStorage issues
      }

      // Provide token fetcher that prefers cached token and only performs a network fetch once if absent
      HttpClientService.setTokenProvider(async () => {
        // Prefer cached token
        if (this._currentToken) return this._currentToken;
        // Fallback to localStorage (may have been set on previous session)
        try {
          const stored = typeof window !== 'undefined' ? window.localStorage.getItem(this.STORAGE_KEY) : null;
          if (stored) {
            this._currentToken = stored;
            return stored;
          }
        } catch {}
        // Network snapshot (one attempt)
        try {
          const snapshot = await FirebaseService.getCurrentIdToken();
          if (snapshot) {
            this.notify(snapshot);
            return snapshot;
          }
        } catch {}
        return null;
      });

      // Subscribe to token change endpoint (one-shot snapshot semantics on backend)
      FirebaseService.onAuthTokenChange((token: string | null) => {
        // Always notify once backend responds; if no token it represents signed-out state
        this.notify(token);
      });
      // No immediate snapshot fetch: token provider above will lazily perform one network call if needed.
    } finally {
      this._initializing = false;
      this._initialized = true;
    }
  }

  static async getToken(): Promise<string | null> {
    return await FirebaseService.getCurrentIdToken()
      .then(token => {
        if (!token) throw redirect('/login?expired=1');
        return token;
      })
      .catch(() => {
        throw new Response('Unauthorized', { status: 401 });
      });
  }

  static async getCurrentUser(): Promise<IAuthUser | null> {
    const result = await FirebaseService.getCurrentUser();
    return result ? AuthService.mapFirebaseUserToAuthUser(result) : null;
  }

  static async signInWithEmailPassword(email: string, password: string): Promise<ISignInResult> {
    const result = await FirebaseService.signInWithEmailAndPassword(email, password);
    const mapped = await AuthService.getSignInResultFromUserCredential(result);
    this.notify(mapped.token);
    return mapped;
  }

  static async signUpWithEmailPassword(email: string, password: string, displayName?: string): Promise<ISignInResult> {
    const result = await FirebaseService.createUserWithEmailAndPassword(email, password, displayName);
    const mapped = await AuthService.getSignInResultFromUserCredential(result);
    this.notify(mapped.token);
    return mapped;
  }

  static async signOut(): Promise<void> {
    await FirebaseService.signOut();
    this.notify(null);
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    this.subscribers.add(callback);
    // Emit current snapshot immediately ONLY if initialization finished; otherwise caller should wait
    if (this._initialized) {
      try {
        callback(this.currentToken);
      } catch {
        // ignore subscriber errors
      }
    }
    return () => {
      this.subscribers.delete(callback);
    };
  }

  static get currentToken() {
    return this._currentToken;
  }

  static get initializing() {
    return this._initializing;
  }

  static get initialized() {
    return this._initialized;
  }

  private static notify(token: string | null) {
    this._currentToken = token;
    // Persist or clear token in storage for session continuity across reloads
    try {
      if (typeof window !== 'undefined') {
        if (token) {
          window.localStorage.setItem(this.STORAGE_KEY, token);
        } else {
          window.localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    } catch {
      // ignore storage failures
    }
    for (const cb of this.subscribers) {
      try {
        cb(token);
      } catch {
        // ignore
      }
    }
  }
}
