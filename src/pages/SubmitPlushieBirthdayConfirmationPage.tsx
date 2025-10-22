import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BirthdayController } from "controllers";
import { getPropertiesFromPlushieBirthdayEventName } from "utils";
import { PlushieBirthdayController } from "controllers";
import { usePageHeading } from "hooks";
import { IPlushieBirthday } from "model/plushie-birthday";

export default function SubmitPlushieBirthdayConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const displayProperties = useMemo(() => {
    if (!item) return undefined;
    return getPropertiesFromPlushieBirthdayEventName(item);
  }, [item]);

  const headingText = useMemo(() => {
    if (!displayProperties) return "Birthday Submitted";
    return `${PlushieBirthdayController.extractPossessiveName(
      displayProperties
    )} birthday has been added to the calendar!`;
  }, [displayProperties]);

  const handleViewBirthday = useCallback(() => {
    if (!item) return;
    navigate(`/calendar/view/${encodeURIComponent(item.id)}`);
  }, [item, navigate]);

  const handleSubmitAnother = useCallback(() => {
    const username = displayProperties
      ? PlushieBirthdayController.extractUsername(displayProperties)
      : "";
    navigate(
      "/calendar/submit",
      username ? { state: { event: username } } : undefined
    );
  }, [displayProperties, navigate]);

  const handleRetry = useCallback(() => {
    navigate("/calendar/submit");
  }, [navigate]);

  usePageHeading(headingText);

  return (
    <div className="submit-plushie-birthday-confirmation">
      {loading && <p>Loading…</p>}
      {!loading && error && (
        <div className="alert-card alert-card--error" role="alert">
          <div className="alert-card__heading">Submission Error</div>
          <div className="alert-card__messages">
            <p>
              An error occurred while submitting your birthday. Please try again
              or drop me a message for assistance.
            </p>
          </div>
          <button
            className="button button--secondary--outline button--secondary--compact"
            onClick={handleRetry}
            type="button"
          >
            Try Again
          </button>
        </div>
      )}
      {!loading && !error && item && (
        <>
          <div className="submit-plushie-birthday-confirmation__action-button-wrapper">
            <button
              className="button button--secondary--outline button--secondary--compact"
              id="view-birthday-button"
              type="button"
              onClick={handleViewBirthday}
            >
              View Birthday
            </button>
            <button
              className="button button--secondary--outline button--secondary--compact"
              id="submit-another-birthday-button"
              type="button"
              onClick={handleSubmitAnother}
            >
              Submit Another Birthday
            </button>
          </div>
          <div className="submit-plushie-birthday-confirmation__support-card">
            <h2 className="submit-plushie-birthday-confirmation__support-card-title">
              Thank you for your submission! 🎉
            </h2>
            <p className="submit-plushie-birthday-confirmation__support-card-text">
              If you're enjoying the calendar, an optional donation helps cover
              running costs and keeps the birthday party going!
            </p>
            <a
              href="https://www.buymeacoffee.com/banjohootson"
              target="_blank"
              rel="noopener noreferrer"
              className="submit-plushie-birthday-confirmation__support-card-button"
            >
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=banjohootson&button_colour=c83200&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00"
                alt="Buy me a beer"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
