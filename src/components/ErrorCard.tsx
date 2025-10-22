import { AlertCard } from "components";
import { AlertCardVariant, IAlertCard } from "model/page-validation-alert";

export default function ErrorCard({
  heading,
  errorMessages,
  cardId,
}: IErrorCard) {
  return (
    <AlertCard
      heading={heading}
      variant={AlertCardVariant.ERROR}
      cardId={cardId || "error-card"}
    >
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

interface IErrorCard extends Pick<IAlertCard, "heading" | "cardId"> {
  errorMessages: string[];
}
