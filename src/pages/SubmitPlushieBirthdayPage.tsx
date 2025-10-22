import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BirthdayController } from "@/controllers/birthday.controller";
import type { IPlushieBirthdayFormData } from "model/plushie-birthday.types";
import FormActionsContainer from "@/components/FormActionsContainer";

type FormState = IPlushieBirthdayFormData;

const EMPTY: FormState = {
  name: "",
  dateOfBirth: "",
  username: "",
  description: "",
};

export default function SubmitPlushieBirthdayPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const update = (patch: Partial<FormState>) =>
    setForm((f) => ({ ...f, ...patch }));

  const validate = (f: FormState) => {
    if (!f.name.trim()) return "Plushie name is required";
    if (!f.dateOfBirth) return "Date of birth is required";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.dateOfBirth))
      return "Date must be YYYY-MM-DD";
    if (!f.username.trim()) return "Instagram username is required";
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const message = validate(form);
    if (message) {
      setError(message);
      return;
    }
    setSubmitting(true);
    try {
      const created = await BirthdayController.create(form);
      navigate(
        `/calendar/submit/confirmation/${encodeURIComponent(created.id)}`
      );
    } catch (err) {
      setError((err as Error)?.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-section-container">
      <div className="page-width-container">
        <h1 className="page-heading-container__heading page-heading-container__heading--decorated">
          Submit Plushie Birthday
        </h1>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-section">
            <div className="form-content">
              <div className="form-group">
                <label
                  className="form-group__label form-group__label--required"
                  htmlFor="name"
                >
                  Plushie Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="e.g. Banjo"
                />
              </div>

              <div className="form-group">
                <label
                  className="form-group__label form-group__label--required"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => update({ dateOfBirth: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label
                  className="form-group__label form-group__label--required"
                  htmlFor="username"
                >
                  Instagram Username
                </label>
                <div className="instagram-input-group">
                  <span
                    className="instagram-input-group__prefix"
                    aria-hidden="true"
                  />
                  <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      update({ username: e.target.value.replace(/^@+/, "") })
                    }
                    placeholder="banjohootson"
                  />
                </div>
                <small className="form-group__hint">
                  Do not include the @ symbol
                </small>
              </div>

              <div className="form-group">
                <label className="form-group__label" htmlFor="description">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="form-group__error-message" role="alert">
              {error}
            </div>
          )}

          <FormActionsContainer>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </FormActionsContainer>
        </form>
      </div>
    </div>
  );
}
