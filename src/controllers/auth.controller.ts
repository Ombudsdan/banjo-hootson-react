import { HttpClient } from "services/http-client";
import {
  getCurrentIdToken,
  initFirebase,
  onAuthTokenChange,
} from "@/auth/firebase";
import {
  getAuth,
  signOut,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  AuthCredential,
  type User,
} from "firebase/auth";
import type { IAuthUser } from "model/auth.types";

export class AuthController {
  static initialize() {
    initFirebase();
    // Provide initial token fetcher
    HttpClient.setTokenProvider(async () => await getCurrentIdToken());
    // Keep in sync when token changes
    onAuthTokenChange((token: string | null) => {
      // Optional: could refresh client state or trigger re-fetches
      // The HttpClient provider is always evaluated before each request
      if (!token) {
        // user signed out
      }
    });
  }

  static async getToken(): Promise<string | null> {
    return getCurrentIdToken();
  }

  static getCurrentUser(): IAuthUser | null {
    const user = getAuth().currentUser;
    return user ? this.mapUser(user) : null;
  }

  static async signInWith(
    credential: AuthCredential
  ): Promise<{ user: IAuthUser; token: string }> {
    const auth = getAuth();
    const result = await signInWithCredential(auth, credential);
    const token = await result.user.getIdToken();
    return { user: this.mapUser(result.user), token };
  }

  static async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<{ user: IAuthUser; token: string }> {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    return { user: this.mapUser(result.user), token };
  }

  static async signUpWithEmailPassword(
    email: string,
    password: string,
    displayName?: string
  ): Promise<{ user: IAuthUser; token: string }> {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    const token = await result.user.getIdToken();
    return { user: this.mapUser(result.user), token };
  }

  static async signOut(): Promise<void> {
    await signOut(getAuth());
  }

  private static mapUser(user: User): IAuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }
}
