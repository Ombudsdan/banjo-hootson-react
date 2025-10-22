// Static page; no router/state used
import { PageWidthContainer } from "@/framework/PageWidthContainer";
import { usePageHeading } from "@/hooks/usePageHeading";
import { PageSectionContainer } from "@/framework/PageSectionContainer";
import GoogleCalendar from "@/components/GoogleCalendar";

export default function ViewPlushieBirthdaysPage() {
  usePageHeading("Plushie Birthday Calendar");
  return (
    <>
      <PageWidthContainer>
        <PageSectionContainer>
          <div className="google-calendar-container google-calendar-container--large">
            <GoogleCalendar
              title="Plushie Birthday Calendar (Month)"
              source="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&mode=MONTH&showTitle=0&showCalendars=0&showTz=0&showTabs=0&hl=en_GB&src=Nzk4MDcxZmRiNDBkMDJmMDBmZmJhYTgyMzRkMDUyMWRmMWFjNmFhMmUzMDE1ZTU5ZmU2Y2Q0NGEwZWViZDExNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23026f1e"
            />
          </div>
          <div className="google-calendar-container google-calendar-container--small">
            <GoogleCalendar
              title="Plushie Birthday Calendar (Agenda)"
              source="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&mode=AGENDA&showTitle=0&showCalendars=0&showTz=0&showTabs=0&hl=en_GB&src=Nzk4MDcxZmRiNDBkMDJmMDBmZmJhYTgyMzRkMDUyMWRmMWFjNmFhMmUzMDE1ZTU5ZmU2Y2Q0NGEwZWViZDExNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23026f1e"
            />
          </div>
        </PageSectionContainer>
      </PageWidthContainer>
    </>
  );
}
