import { useMemo } from 'react';

/**
 * Thin wrapper around an iframe to embed a Google Calendar with simple width/height handling.
 * Accepts numeric or string dimensions and coerces them to valid iframe attributes.
 */
export default function GoogleCalendarIFrame({ source, title, width, height }: IGoogleCalendar) {
  const widthStr = useMemo(setWidthString, [width]);
  const heightStr = useMemo(setHeightString, [height]);

  return <iframe title={title} src={source} width={widthStr} height={heightStr} />;

  // TODO - I don't remember why these needed to be strings, although it doesn't
  // matter since i'll be replacing the iFrame with a custom calendar component later.

  function setWidthString() {
    if (!width) {
      width = '100%';
    }
    return typeof width === 'number' ? String(width) : width;
  }

  function setHeightString() {
    if (!height) {
      height = 600;
    }
    return typeof height === 'number' ? String(height) : height;
  }
}

/** Props for {@link GoogleCalendarIFrame} */
interface IGoogleCalendar {
  source: string;
  title: string;
  width?: string | number;
  height?: string | number;
}
