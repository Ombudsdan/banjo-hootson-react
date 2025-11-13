import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { IPlushieBirthday } from 'model/plushie-birthday.model';
import { AlertCard } from 'framework';
import { usePageHeading } from 'hooks';
import { AlertCardVariant } from 'enums';
import { BirthdayController } from 'controllers';

export default function ViewPlushieBirthdayPage() {
  const navigate = useNavigate();
  const { item } = useLoaderData() as { item: IPlushieBirthday | null };

  const username = useMemo(() => item?.username ?? '', [item]);
  const birthDateText = useMemo(getBirthDateText, [item]);
  const ageText = useMemo(getAgeText, [item]);
  const countdownText = useMemo(getCountdownText, [item]);

  usePageHeading(item?.name || 'Plushie Birthday Details');

  return (
    <div className="view-plushie-birthday">
      {item ? (
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
                    className="view-plushie-birthday__link">
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
              onClick={() => navigate('/calendar/submit')}>
              Submit a New Birthday
            </button>
          </div>
        </>
      ) : (
        <AlertCard
          id="error-loading-birthday"
          variant={AlertCardVariant.ERROR}
          heading="Oops! This plushie seems to be hiding!"
          messages={['Unable to load birthday details. Please try again.']}>
          <button className="button button--main" onClick={() => navigate('/calendar')}>
            Explore Other Birthdays
          </button>
        </AlertCard>
      )}
    </div>
  );

  function getBirthDateText() {
    if (!item?.birthday) return '';

    const d = new Date(item.birthday);

    if (isNaN(d.getTime())) return item.birthday;

    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getAgeText() {
    if (!item?.birthday) return '';

    const d = new Date(item.birthday);

    if (isNaN(d.getTime()) || isNaN(d.getFullYear())) return '';

    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();

    const hasHadBirthdayThisYear =
      now.getMonth() > d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() >= d.getDate());

    if (!hasHadBirthdayThisYear) age -= 1;

    return age >= 0 ? `${age} years old` : '';
  }

  function getCountdownText() {
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
  }
}

/**
 * Loads a plushie birthday record based on the event ID provided in the route parameters.
 *
 * Throws a `404 Not Found` response if the ID is missing or no matching item is found.
 * Throws a `500 Internal Server Error` response if an unexpected error occurs.
 *
 * @param params - The route parameters containing the event ID.
 * @returns A promise resolving to an object containing the loaded birthday item.
 */
export async function viewPlushieBirthdayLoader({ params }: LoaderFunctionArgs) {
  const id = params.id as string | undefined;
  if (!id) throw new Response('Not Found', { status: 404 });
  return await BirthdayController.loadByEventId(id)
    .then(item => {
      if (!item) throw new Response('Not Found', { status: 404 });
      return { item };
    })
    .catch(err => {
      if (err instanceof Response) throw err;
      if (err instanceof Error) throw new Response(err.message, { status: 500 });
      throw new Response('Failed to load item', { status: 500 });
    });
}
