import { useParams } from "react-router-dom";

export default function SubmitPlushieBirthdayConfirmationPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: 16 }}>
      <h1>Birthday Submitted</h1>
      <p>Event ID: {id}</p>
    </div>
  );
}
