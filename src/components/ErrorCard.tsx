import { AlertCard, IAlertCard } from 'components';
import { AlertCardVariant } from 'enums';

export default function ErrorCard({ heading, errorMessages, id }: IErrorCard) {
  return (
    <AlertCard heading={heading} variant={AlertCardVariant.ERROR} id={id}>
      <ul className="error-card__messages">
        {errorMessages.map((msg, i) => (
          <li className="error-card__message" key={i}>
            {msg}
          </li>
        ))}
      </ul>
    </AlertCard>
  );
}

interface IErrorCard extends Pick<IAlertCard, 'heading' | 'id'> {
  errorMessages: string[];
}
