import { AlertCard, IAlertCard } from 'framework';
import { AlertCardVariant } from 'enums';

/**
 * Convenience wrapper around {@link AlertCard} for error presentations.
 * Renders a list of error messages under a heading with error styling.
 */
export default function ErrorCard({ heading, errorMessages, id }: ErrorCardProps) {
  return (
    <AlertCard heading={heading} variant={AlertCardVariant.ERROR} id={id}>
      <ul className="error-card__messages">
        {errorMessages.map((message, index) => (
          <ErrorCardMessage key={index} message={message} />
        ))}
      </ul>
    </AlertCard>
  );
}

function ErrorCardMessage({ message }: IErrorCardMessage) {
  return <li className="error-card__message">{message}</li>;
}

/** Props for {@link ErrorCard} */
type ErrorCardProps = Pick<IAlertCard, 'heading' | 'id'> & IErrorCardMessageList;

/** Props for {@link ErrorCardMessageList} */
interface IErrorCardMessageList {
  errorMessages: IErrorCardMessage['message'][];
}

/** Props for {@link ErrorCardMessage} */
interface IErrorCardMessage {
  message: string;
}
