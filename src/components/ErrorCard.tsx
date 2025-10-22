import { AlertCard, IAlertCard } from 'framework';
import { AlertCardVariant } from 'enums';

/**
 * Convenience wrapper around {@link AlertCard} for error presentations.
 * Renders a list of error messages under a heading with error styling.
 */
export default function ErrorCard({ heading, errorMessages, id }: IErrorCard) {
  return (
    <AlertCard heading={heading} variant={AlertCardVariant.ERROR} id={id}>
      <ErrorCardMessageList errorMessages={errorMessages} />
    </AlertCard>
  );
}

function ErrorCardMessageList({ errorMessages }: IErrorCardMessageList) {
  return (
    <ul className="error-card__messages">
      {errorMessages.map((message, index) => (
        <ErrorCardMessage message={message} key={index} />
      ))}
    </ul>
  );
}

function ErrorCardMessage({ message, key }: IErrorCardMessage) {
  return (
    <li className="error-card__message" key={key}>
      {message}
    </li>
  );
}

/** Props for {@link ErrorCard} */
interface IErrorCard extends Pick<IAlertCard, 'heading' | 'id'>, IErrorCardMessageList {}

/** Props for {@link ErrorCardMessageList} */
interface IErrorCardMessageList {
  errorMessages: IErrorCardMessage['message'][];
}

/** Props for {@link ErrorCardMessage} */
interface IErrorCardMessage {
  key: number;
  message: string;
}
