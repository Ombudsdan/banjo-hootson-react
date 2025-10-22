import { useCallback } from "react";

export default function useErrorBoundary() {
  const throwError = useCallback((error: unknown) => {
    throw error instanceof Error ? error : new Error(String(error));
  }, []);

  return { throwError } as const;
}
