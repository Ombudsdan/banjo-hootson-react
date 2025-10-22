import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { BirthdayController } from 'controllers';
import { IPlushieBirthday } from 'model/plushie-birthday.model';
import { AlertCard } from 'components';
import { usePageHeading } from 'hooks';
import { AlertCardVariant } from 'enums';

export default function ViewPlushieBirthdayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<IPlushieBirthday | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    BirthdayController.loadByEventId(id)
      .then(r => setItem(r))
      .catch(e => setError((e as Error)?.message || String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const heading = item?.name || 'Plushie Birthday Details';

  const username = useMemo(() => item?.username || '', [item]);

  const birthDateText = useMemo(() => {
    if (!item?.birthday) return '';
    const d = new Date(item.birthday);
    if (isNaN(d.getTime())) return item.birthday;
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [item]);

  const ageText = useMemo(() => {
    if (!item?.birthday) return '';
    const d = new Date(item.birthday);
    if (isNaN(d.getTime()) || isNaN(d.getFullYear())) return '';
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const hasHadBirthdayThisYear =
      now.getMonth() > d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() >= d.getDate());
    if (!hasHadBirthdayThisYear) age -= 1;
    return age >= 0 ? `${age} years old` : '';
  }, [item]);

  const countdownText = useMemo(() => {
    if (!item?.birthday) return '';
    const d = new Date(item.birthday);
    if (isNaN(d.getTime())) return '';
    const now = new Date();
    const thisYear = now.getFullYear();
    let next = new Date(thisYear, d.getMonth(), d.getDate());
    if (next < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      next = new Date(thisYear + 1, d.getMonth(), d.getDate());
    }
    const diffMs = next.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today is the big day!';
    if (days === 1) return '1 day to go';
    return `${days} days to go`;
  }, [item]);

  usePageHeading(heading);

  return (
    <div className="view-plushie-birthday">
      {loading && <p>Loading…</p>}
      {item && !loading && !error && (
        <>
          <div className="view-plushie-birthday__event">
            <div className="view-plushie-birthday__event-row">
              <span className="view-plushie-birthday__event-detail-label">Name</span>
              <span className="view-plushie-birthday__event-detail-value">{item.name}</span>
            </div>
            <div className="view-plushie-birthday__event-row">
              <span className="view-plushie-birthday__event-detail-label">Account</span>
              <div className="view-plushie-birthday__event-detail-value">
                <span
                  aria-hidden="true"
                  className="view-plushie-birthday__icon view-plushie-birthday__icon--instagram"
                />
                {username ? (
                  <a
                    href={`https://instagram.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="view-plushie-birthday__link"
                  >
                    {username}
                  </a>
                ) : (
                  <span className="view-plushie-birthday__link">Unknown</span>
                )}
              </div>
            </div>
            <div className="view-plushie-birthday__event-row">
              <span className="view-plushie-birthday__event-detail-label">Birthday</span>
              <span className="view-plushie-birthday__event-detail-value" id="birthDate">
                {birthDateText}
              </span>
              <span className="view-plushie-birthday__event-detail-value" id="age">
                {ageText}
              </span>
              <span className="view-plushie-birthday__event-detail-value" id="countdown">
                {countdownText}
              </span>
            </div>
          </div>
          <div className="view-plushie-birthday__action-button-wrapper">
            <button
              className="button button--secondary--outline button--secondary--compact"
              id="submit-a-new-birthday-button"
              onClick={() => navigate('/calendar/submit')}
            >
              Submit a New Birthday
            </button>
          </div>
        </>
      )}

      {!item && !loading && (
        <AlertCard
          id="error-loading-birthday"
          variant={AlertCardVariant.ERROR}
          heading="Oops! This plushie seems to be hiding!"
          messages={['Unable to load birthday details. Please try again.']}
        >
          <button className="button button--main" onClick={() => navigate('/calendar')}>
            Explore Other Birthdays
          </button>
        </AlertCard>
      )}
    </div>
  );
}
