import { useLoadingScreen } from 'hooks';

export default function LoadingScreenOutlet() {
  const { open, message } = useLoadingScreen();

  if (!open) return null;

  const text = message || 'Loading';

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__content" role="presentation" aria-hidden={!open}>
        <h1 className="loading-screen__message">
          {text}
          <span className="loading-screen__dots" aria-hidden="true" />
        </h1>
      </div>
    </div>
  );
}
