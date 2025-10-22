import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  type User,
} from "firebase/auth";
import { env } from "env";

const FIREBASE_CONFIG = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  appId: env.FIREBASE_APP_ID,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
};

export default class FirebaseController {
  static init() {
    if (!getApps().length) {
      initializeApp(FIREBASE_CONFIG);
    }
    return getAuth();
  }

  static async getCurrentIdToken(): Promise<string | null> {
    const user = this.getCurrentUser();
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch {
      return null;
    }
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    return onIdTokenChanged(getAuth(), async (user: User | null) => {
      const token = user ? await user.getIdToken() : null;
      callback(token);
    });
  }

  static getCurrentUser(): User | null {
    return getAuth().currentUser;
  }

  static async signInWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(getAuth(), email, password);
  }

  static async createUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName?: string
  ) {
    const result = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    if (displayName) {
      await updateProfile(result.user, { displayName });
    }

    return result;
  }

  static async signOut(): Promise<void> {
    await signOut(getAuth());
  }
}

export type { User as FirebaseUser };
export type { UserCredential as FirebaseUserCredential };
