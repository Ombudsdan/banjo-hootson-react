import AlertCard from "@/components/AlertCard";

type Props = {
  heading: string;
  errorMessages: string[];
  cardId?: string;
};

export default function ErrorCard({
  heading,
  errorMessages,
  cardId = "error-card",
}: Props) {
  return (
    <AlertCard heading={heading} variant="error" cardId={cardId}>
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
