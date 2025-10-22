type Props = {
  source: string;
  title?: string;
  width?: string | number;
  height?: string | number;
};

export default function GoogleCalendar({
  source,
  title = "Plushie Birthday Calendar",
  width = "100%",
  height = 600,
}: Props) {
  return (
    <iframe
      title={title}
      src={source}
      width={typeof width === "number" ? String(width) : width}
      height={typeof height === "number" ? String(height) : height}
      frameBorder={0}
    />
  );
}
