import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BirthdayController } from "@/controllers/birthday.controller";
import type { IPlushieBirthday } from "model/plushie-birthday.types";

export default function SubmitPlushieBirthdayConfirmationPage() {
  const { id } = useParams();
  const [item, setItem] = useState<IPlushieBirthday | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    BirthdayController.loadByEventId(id)
      .then((r) => setItem(r))
      .catch((e) => setError((e as Error)?.message || String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="page-section-container">
      <div className="page-width-container">
        <h1 className="page-heading-container__heading page-heading-container__heading--decorated">
          Birthday Submitted
        </h1>
        {loading && <p>Loading…</p>}
        {error && (
          <div className="form-group__error-message" role="alert">
            {error}
          </div>
        )}
        {item && !loading && (
          <div>
            <p>Thank you! Your plushie birthday has been submitted.</p>
            <p>
              <strong>{item.name}</strong> — {item.birthday}
            </p>
            <p>
              <Link
                className="nav__link"
                to={`/calendar/view/${encodeURIComponent(item.id)}`}
              >
                View this birthday
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
