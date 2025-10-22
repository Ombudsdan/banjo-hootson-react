import { AlertCard } from "components";
import { IPageAlert, IPageAlertsContextValue } from "model/page-alert";
import { FC, useContext } from "react";
import { generateClassName } from "utils";
import PageAlertContext from "./PageAlertContext";

const PageAlertOutlet: FC = () => {
  const context = useContext(PageAlertContext);
  if (!context) {
    throw new Error("PageAlertsOutlet must be used within PageAlertsProvider");
  }

  const {
    alerts,
    dismissAlert,
    enteringIds,
    exitingIds,
    pauseAlertTimer,
    resumeAlertTimer,
  } = context as IPageAlertsOutletContextValue;

  // Access entering/exiting sets via closure above
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="page-alerts" role="region" aria-label="Page notifications">
      <div className="page-alerts__inner">
        <ul className="page-alerts__list">
          {alerts.map((a) => (
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
                  autoFocus={a.autoFocus}
                  cardId={`page-alert-${a.id}`}
                >
                  {a.content}
                  <button
                    type="button"
                    className="page-alerts__close"
                    aria-label={`Dismiss ${a.heading} notification`}
                    onClick={() => dismissAlert(a.id)}
                  >
                    ×
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
  enteringIds: IPageAlertsOutletContextValue["enteringIds"],
  exitingIds: IPageAlertsOutletContextValue["exitingIds"],
  id: IPageAlert["id"]
) {
  return generateClassName([
    "page-alerts__item",
    enteringIds.has(id) && "page-alerts__item--entering",
    exitingIds.has(id) && "page-alerts__item--exiting",
  ]);
}

interface IPageAlertsOutletContextValue extends IPageAlertsContextValue {
  enteringIds: Set<string>;
  exitingIds: Set<string>;
}
