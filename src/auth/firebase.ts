import { initializeApp, getApps } from "firebase/app";
import { getAuth, onIdTokenChanged, type User } from "firebase/auth";
import { env } from "env";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  appId: env.FIREBASE_APP_ID,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
};

export function initFirebase() {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  return getAuth();
}

export async function getCurrentIdToken(): Promise<string | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}

export function onAuthTokenChange(callback: (token: string | null) => void) {
  const auth = getAuth();
  return onIdTokenChanged(auth, async (user: User | null) => {
    const token = user ? await user.getIdToken() : null;
    callback(token);
  });
}
