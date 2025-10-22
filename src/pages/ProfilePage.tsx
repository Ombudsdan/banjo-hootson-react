import { useEffect, useState } from "react";
import { UserController } from "@/controllers/user.controller";
import type { IUserProfile } from "model";

export default function ProfilePage() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    UserController.me()
      .then((u) => setUser(u))
      .catch((e) => setError(String(e)));
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h1>My Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
