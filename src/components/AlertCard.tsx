import { useEffect, useMemo, useRef } from "react";
import { AlertCardVariant, IAlertCard } from "model/page-validation-alert";
import { generateClassName } from "utils";

export default function AlertCard({
  heading,
  messages,
  cardId = "alert-card",
  variant = AlertCardVariant.INFO,
  children,
  autoFocus = false,
}: IAlertCard) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  const className = useMemo(() => {
    return generateClassName([
      "alert-card",
      variant && `alert-card--${variant}`,
    ]);
  }, [variant]);

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
