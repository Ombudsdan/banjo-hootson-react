import { AlertCard, IAlertCard } from 'components';
import { AlertCardVariant } from 'enums';

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

interface IErrorCard extends Pick<IAlertCard, 'heading' | 'id'>, IErrorCardMessageList {}

interface IErrorCardMessageList {
  errorMessages: IErrorCardMessage['message'][];
}

interface IErrorCardMessage {
  key: number;
  message: string;
}
