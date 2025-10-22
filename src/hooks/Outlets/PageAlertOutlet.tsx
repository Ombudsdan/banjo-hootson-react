import { FC, useContext } from 'react';
import { AlertCard, IAlertCard } from 'framework';
import { generateClassName } from 'utils';
import { IPageAlertContext, PageAlertContext } from 'hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from 'icons';

const PageAlertOutlet: FC = () => {
  const context = useContext(PageAlertContext);
  if (!context) {
    throw new Error('PageAlertsOutlet must be used within PageAlertsProvider');
  }

  const {
    alerts,
    dismissAlert,
    enteringIds,
    exitingIds,
    pauseAlertTimer,
    resumeAlertTimer
  } = context as IPageAlertsOutlet;

  if (!alerts.length) return null;

  return (
    <div className="page-alerts" role="region" aria-label="Page notifications">
      <div className="page-alerts__inner">
        <ul className="page-alerts__list">
          {alerts.map(a => (
            <li
              key={a.id}
              className={generateAlertClass(enteringIds, exitingIds, a.id)}
              onMouseEnter={() => pauseAlertTimer?.(a.id)}
              onMouseLeave={() => resumeAlertTimer?.(a.id)}
            >
              <div className="page-alerts__card-wrapper">
                <AlertCard
                  heading={a.heading}
                  messages={a.messages}
                  variant={a.variant}
                  disableAutoFocus={a.disableAutoFocus}
                  id={`page-alert-${a.id}`}
                >
                  {a.children}
                  <button
                    type="button"
                    className="page-alerts__close"
                    aria-label={`Dismiss ${a.heading} notification`}
                    onClick={() => dismissAlert(a.id)}
                  >
                    <FontAwesomeIcon icon={ICONS.close} />
                  </button>
                </AlertCard>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageAlertOutlet;

function generateAlertClass(
  enteringIds: IPageAlertsOutlet['enteringIds'],
  exitingIds: IPageAlertsOutlet['exitingIds'],
  id: IAlertCard['id']
) {
  return generateClassName([
    'page-alerts__item',
    enteringIds.has(id) && 'page-alerts__item--entering',
    exitingIds.has(id) && 'page-alerts__item--exiting'
  ]);
}

interface IPageAlertsOutlet extends IPageAlertContext {
  enteringIds: Set<string>;
  exitingIds: Set<string>;
}
