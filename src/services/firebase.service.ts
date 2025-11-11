import type { User, UserCredential } from 'firebase/auth';
import HttpClientService from './http-client.service';

export default class FirebaseService {
  static async getAuth() {
    return await HttpClientService.request<{ initialized: true }>({ path: '/firebase/getAuth', withCredentials: true });
  }

  static async getCurrentIdToken(): Promise<string | null> {
    const response = await HttpClientService.request<{ token: string | null }>({
      path: '/firebase/getCurrentIdToken',
      withCredentials: true
    });
    return response.token ?? null;
  }

  static onAuthTokenChange(callback: (token: string | null) => void) {
    // Fire-and-forget; return synchronous unsubscribe shim to match previous API
    HttpClientService.request<{ token: string | null }>({ path: '/firebase/onAuthTokenChange', withCredentials: true })
      .then(response => callback(response.token ?? null))
      .catch(() => callback(null));
    return () => {};
  }

  static async getCurrentUser(): Promise<User | null> {
    // The API returns a minimal user shape; cast to User for compatibility where only basic fields are used
    return await HttpClientService.request<User | null>({ path: '/firebase/getCurrentUser', withCredentials: true });
  }

  static async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    const response = await HttpClientService.request<ILoginSession | { error: string }>({
      path: '/firebase/signInWithEmailAndPassword',
      method: 'POST',
      body: { email, password },
      withCredentials: true
    }).catch(err => {
      throw new Error(`Failed to sign in: ${err.message}`);
    });

    const { user, token } = response as ILoginSession;
    return {
      user: {
        ...user,
        getIdToken: async () => token
      }
    } as UserCredential;
  }

  static async createUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> {
    const response = await HttpClientService.request<ILoginSession>({
      path: '/firebase/createUserWithEmailAndPassword',
      method: 'POST',
      body: { email, password, displayName },
      withCredentials: true
    }).catch((err: unknown) => {
      // Surface server-provided code/message when available (HttpClientService includes body on errors)
      const shaped = shapeHttpError(err);
      FirebaseService.throwError(shaped.message || 'Failed to create user', shaped.code);
    });

    if (isErrorEnvelope(response)) {
      FirebaseService.throwError(response.error, response.code);
    }

    const { user, token } = response as ILoginSession;
    return {
      user: {
        ...user,
        getIdToken: async () => token
      }
    } as UserCredential;
  }

  static async signOut(): Promise<void> {
    await HttpClientService.request<{ success: boolean }>({
      path: '/firebase/signOut',
      method: 'POST',
      withCredentials: true
    });
  }

  static throwError(errorMessage: string, code?: string) {
    const error = new Error(errorMessage);
    (error as Partial<CodedError>).code = code;
    throw error;
  }
}

export type { User as FirebaseUser };
export type { UserCredential as FirebaseUserCredential };

interface ILoginSession {
  user: User;
  token: string;
}

interface ErrorEnvelope {
  error: string;
  code?: string;
}

interface CodedError extends Error {
  code?: string;
  body?: unknown;
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (!value || typeof value !== 'object' || !('error' in value)) return false;
  const errVal = (value as Record<string, unknown>).error;
  return typeof errVal === 'string';
}

function shapeHttpError(err: unknown): { message?: string; code?: string } {
  if (!err) return {};
  const anyErr = err as Partial<CodedError> & { body?: Partial<ErrorEnvelope> };
  const body = anyErr.body as ErrorEnvelope | undefined;
  return {
    message: body?.error || anyErr.message,
    code: anyErr.code || body?.code
  };
}
