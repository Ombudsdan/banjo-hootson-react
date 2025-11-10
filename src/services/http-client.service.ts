/**
 * HttpClientService
 * Centralized fetch wrapper adding:
 *  - Base URL resolution with query serialization
 *  - Optional auth token injection via token provider
 *  - Uniform logging + timing + error shaping (throws Error with status/body)
 *  - Lightweight redirect handling for 401/403 to auth routes
 * Pure static methods – no instance state except optional token provider.
 */
import { env } from 'env';

export default class HttpClientService {
  private static tokenProvider: (() => Promise<string | null>) | null = null;

  static setTokenProvider(provider: () => Promise<string | null>) {
    this.tokenProvider = provider;
  }

  private static buildUrl(path: string, query?: RequestOptions<unknown>['query']) {
    const url = new URL(path, env.API_URL);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
      });
    }
    return url.toString();
  }

  static async request<TResponse = unknown, TBody = unknown>(options: RequestOptions<TBody>): Promise<TResponse> {
    const { path, method = 'GET', body, headers, query, withCredentials = false } = options;
    const url = this.buildUrl(path, query);
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();

    console.debug('[HTTP] ->', method, url, body ? { body } : '');

    // Only fetch a token when the request explicitly requires auth to avoid recursion
    const authHeader = options.requireAuth && this.tokenProvider ? await this.tokenProvider() : null;

    if (options.requireAuth && !authHeader) this.throwError('No authentication token available', 401);

    let res: Response | null = null;
    try {
      res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader ? { Authorization: `Bearer ${authHeader}` } : {}),
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: withCredentials ? 'include' : 'omit'
      });
    } catch (networkError) {
      console.error('[HTTP] network error', method, url, networkError);
      // Throw a unified error; mark as NETWORK_ERROR so UI can present friendlier copy
      this.throwError('Network error', undefined, e => {
        (e as MyError & { code?: string; cause?: unknown }).code = 'NETWORK_ERROR';
        (e as MyError & { cause?: unknown }).cause = networkError;
      });
    }
    if (!res) {
      // Defensive (TypeScript narrowing); will never reach due to throw above
      this.throwError('No response', undefined, e => {
        (e as MyError & { code?: string }).code = 'NETWORK_ERROR';
      });
      // following line is to satisfy TS control flow
      res = null as unknown as Response;
    }

    const text = await res!.text();
    const data: unknown = text ? JSON.parse(text) : (text as unknown);
    const elapsed = Math.round((typeof performance !== 'undefined' ? performance.now() : Date.now()) - start);
    const statusInfo = `${res!.status} ${res!.statusText}`;

    if (!res!.ok) {
      if (typeof window !== 'undefined' && (res!.status === 401 || res!.status === 403))
        this.handleUnauthorisedResponse(res!);

      this.throwError(`HTTP ${res!.status}: ${res!.statusText}`, res!.status, error => {
        error.body = data;
        console.error('[HTTP] x', method, url, statusInfo, {
          elapsedMs: elapsed,
          response: data
        });
      });
    }

    console.debug('[HTTP] <-', method, url, statusInfo, { elapsedMs: elapsed });
    return data as TResponse;
  }

  private static throwError(message: string, status?: number | undefined, callback?: (x: MyError) => void) {
    const error = new Error(message) as MyError;
    error.status = status;
    callback?.(error);
    throw error;
  }

  private static handleUnauthorisedResponse(res: Response) {
    try {
      const currentPath = window.location.pathname || '';
      const isAuthRoute = currentPath.startsWith('/login') || currentPath.startsWith('/signup');
      if (!isAuthRoute) {
        if (res.status === 401 && currentPath !== '/login') {
          // Replace the current history entry to avoid stale back/forward navigation containing expired param
          window.location.replace('/login?expired=1');
        } else if (res.status === 403 && currentPath !== '/unauthorized') {
          window.location.replace('/unauthorized');
        }
      }
    } catch {
      // noop: best-effort redirect
    }
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions<TBody> {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  /** When true, request requires an auth token; throws if unavailable. */
  requireAuth?: boolean;
  /**
   * When true will send cookies / auth-related credentials cross-origin.
   * Keep false (default) for public / cacheable endpoints to simplify CORS.
   */
  withCredentials?: boolean;
}

type MyError = Error & { status?: number; body?: unknown; code?: string };
