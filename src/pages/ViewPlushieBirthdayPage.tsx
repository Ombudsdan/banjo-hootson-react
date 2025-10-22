import { useParams } from "react-router-dom";

export default function ViewPlushieBirthdayPage() {
  const { id } = useParams();
  return (
    <div style={{ padding: 16 }}>
      <h1>Plushie Birthday</h1>
      <p>Viewing event: {id}</p>
    </div>
  );
}
