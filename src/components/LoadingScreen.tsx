export default function LoadingScreen({ text, isOpen }: ILoadingScreen) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__content" role="presentation" aria-hidden={!isOpen}>
        <h1 className="loading-screen__message">
          {text ?? 'Loading'}
          <span className="loading-screen__dots" aria-hidden="true" />
        </h1>
      </div>
    </div>
  );
}

interface ILoadingScreen {
  text?: string;
  isOpen: boolean;
}
