import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { generateClassName } from 'utils';
import { AlertCardVariant, AlertCardVariantType } from 'enums';

/**
 * Accessible alert container used to display important page-level messages.
 * - Renders a heading and optional list of messages; accepts arbitrary children for extra content.
 * - Auto-focuses when mounted unless `disableAutoFocus` is true to aid screen readers.
 * - Visual style is controlled via the `variant` (e.g., info, error).
 */
export default function AlertCard({
  id,
  heading,
  messages,
  variant = AlertCardVariant.INFO,
  children,
  disableAutoFocus = false
}: IAlertCard) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(triggerAutoFocus, [disableAutoFocus, messages, children]);

  const className = useMemo(() => generateClassName(['alert-card', variant && `alert-card--${variant}`]), [variant]);
  const hasMessages = messages && messages.length > 0;

  return (
    <div className={className} tabIndex={-1} id={id} ref={ref} aria-live="assertive" role="alert">
      <h2 className="alert-card__heading">{heading}</h2>
      {hasMessages && <AlertCardMessageList messages={messages} />}
      {children}
    </div>
  );

  /** Automatically focus on the current alert card when it is rendered unless disableAutoFocus is true */
  function triggerAutoFocus() {
    if (!disableAutoFocus && ref.current) {
      ref.current.focus();
    }
  }
}

function AlertCardMessageList({ messages }: IAlertCardMessageList) {
  return (
    <ul className="alert-card__messages">
      {messages.map((message, index) => (
        <AlertCardMessage message={message} key={index} />
      ))}
    </ul>
  );
}

function AlertCardMessage({ message, key }: IAlertCardMessage) {
  return (
    <li className="alert-card__message" key={key}>
      {message}
    </li>
  );
}

/** Props for {@link AlertCard} */
export interface IAlertCard extends PropsWithChildren, Pick<Partial<IAlertCardMessageList>, 'messages'> {
  id: string;
  heading: string;
  variant?: AlertCardVariantType;
  disableAutoFocus?: boolean;
  /** auto-dismiss after provided milliseconds */
  timeoutMs?: number;
}

/** Props for {@link AlertCardMessageList} */
interface IAlertCardMessageList {
  messages: IAlertCardMessage['message'][];
}

/** Props for {@link AlertCardMessage} */
interface IAlertCardMessage {
  key: number;
  message: string;
}
