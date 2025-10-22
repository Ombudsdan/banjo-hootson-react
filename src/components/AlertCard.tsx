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

export interface IAlertCard extends PropsWithChildren, Pick<Partial<IAlertCardMessageList>, 'messages'> {
  id: string;
  heading: string;
  variant?: AlertCardVariantType;
  disableAutoFocus?: boolean;
  /** auto-dismiss after provided milliseconds */
  timeoutMs?: number;
}

interface IAlertCardMessageList {
  messages: IAlertCardMessage['message'][];
}

interface IAlertCardMessage {
  key: number;
  message: string;
}
