import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthTokenChange } from "@/auth/firebase";

export default function RequireAuth({
  children,
}: PropsWithChildren<{ children?: React.ReactNode }>) {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthTokenChange((token) => {
      setAuthed(!!token);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    return <div style={{ padding: 16 }}>Loading...</div>;
  }
  if (!authed) {
    return (
      <Navigate to="/login?expired=1" state={{ from: location }} replace />
    );
  }
  return <>{children}</>;
}
