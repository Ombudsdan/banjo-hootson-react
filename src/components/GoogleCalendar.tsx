import { useMemo } from "react";

export default function GoogleCalendar({
  source,
  title,
  width,
  height,
}: IGoogleCalendar) {
  const widthStr = useMemo(() => {
    if (!width) {
      width = "100%";
    }
    return typeof width === "number" ? String(width) : width;
  }, [width]);

  const heightStr = useMemo(() => {
    if (!height) {
      height = 600;
    }
    return typeof height === "number" ? String(height) : height;
  }, [height]);

  return (
    <iframe
      title={title || "Google Calendar"}
      src={source}
      width={widthStr}
      height={heightStr}
    />
  );
}

interface IGoogleCalendar {
  source: string;
  title?: string;
  width?: string | number;
  height?: string | number;
}
