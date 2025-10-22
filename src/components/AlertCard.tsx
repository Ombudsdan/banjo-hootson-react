import { useEffect, useRef } from "react";
type Variant = "success" | "info" | "warning" | "error";

type Props = {
  heading: string;
  messages?: string[];
  cardId?: string;
  variant?: Variant;
  children?: React.ReactNode;
  autoFocus?: boolean;
};

export default function AlertCard({
  heading,
  messages,
  cardId = "alert-card",
  variant = "info",
  children,
  autoFocus = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);
  const className = [
    "alert-card",
    variant === "success" && "alert-card--success",
    variant === "error" && "alert-card--error",
    variant === "info" && "alert-card--info",
    variant === "warning" && "alert-card--warning",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} tabIndex={-1} id={cardId} ref={ref}>
      <h2 className="alert-card__heading">{heading}</h2>
      {messages && messages.length > 0 && (
        <ul className="alert-card__messages">
          {messages.map((m, i) => (
            <li className="alert-card__message" key={i}>
              {m}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
