import { PageSectionContainer } from 'framework';
import { GoogleCalendarIFrame } from 'components';
import { usePageContainer, usePageHeading } from 'hooks';
import { PageContainerVariant } from 'enums';

export default function CalendarPage() {
  usePageHeading('Plushie Birthday Calendar');
  usePageContainer({ variant: PageContainerVariant.FULL_WIDTH });

  return (
    <PageSectionContainer>
      <div className="google-calendar-container google-calendar-container--large">
        <GoogleCalendarIFrame
          title="Plushie Birthday Calendar (Month)"
          source="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&mode=MONTH&showTitle=0&showCalendars=0&showTz=0&showTabs=0&hl=en_GB&src=Nzk4MDcxZmRiNDBkMDJmMDBmZmJhYTgyMzRkMDUyMWRmMWFjNmFhMmUzMDE1ZTU5ZmU2Y2Q0NGEwZWViZDExNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23026f1e"
        />
      </div>
      <div className="google-calendar-container google-calendar-container--small">
        <GoogleCalendarIFrame
          title="Plushie Birthday Calendar (Agenda)"
          source="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&mode=AGENDA&showTitle=0&showCalendars=0&showTz=0&showTabs=0&hl=en_GB&src=Nzk4MDcxZmRiNDBkMDJmMDBmZmJhYTgyMzRkMDUyMWRmMWFjNmFhMmUzMDE1ZTU5ZmU2Y2Q0NGEwZWViZDExNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23026f1e"
        />
      </div>
    </PageSectionContainer>
  );
}
