import { useEffect, useState } from "react";
import { BirthdayController } from "@/controllers/birthday.controller";
import type { IPlushieBirthday } from "model";

export default function CalendarPage() {
  const [items, setItems] = useState<IPlushieBirthday[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    BirthdayController.loadUpcoming()
      .then((r: IPlushieBirthday[]) => setItems(r))
      .catch((e: unknown) => setError(String(e)));
  }, []);
  return (
    <div style={{ padding: 16 }}>
      <h1>Upcoming Birthdays</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((b) => (
          <li key={b.id}>
            {b.name} — {b.birthday}
          </li>
        ))}
      </ul>
    </div>
  );
}
