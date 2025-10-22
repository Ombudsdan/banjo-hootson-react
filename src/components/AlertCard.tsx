import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { generateClassName } from 'utils';
import { AlertCardVariant, AlertCardVariantType } from 'enums';

export default function AlertCard({
  id,
  heading,
  messages,
  variant = AlertCardVariant.INFO,
  children,
  disableAutoFocus = false
}: IAlertCard) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!disableAutoFocus && ref.current) {
      ref.current.focus();
    }
  }, [disableAutoFocus, messages, children]);

  const className = useMemo(() => {
    return generateClassName(['alert-card', variant && `alert-card--${variant}`]);
  }, [variant]);

  return (
    <div className={className} tabIndex={-1} id={id} ref={ref} aria-live="assertive" role="alert">
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

export interface IAlertCard extends PropsWithChildren {
  id: string;
  heading: string;
  messages?: string[];
  variant?: AlertCardVariantType;
  disableAutoFocus?: boolean;
  timeoutMs?: number; // auto-dismiss after provided milliseconds
}
