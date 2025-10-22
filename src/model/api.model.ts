export interface ApiError {
  statusCode?: number;
  message: string;
  originalError?: unknown;
}

export interface IApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
